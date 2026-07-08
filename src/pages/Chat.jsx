import { useEffect, useRef, useState, useContext } from "react";
import { Send, Library, Star } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Input from "../components/Input";
import Button from "../components/Button";
import { sendMessageToAI } from "../services/aiService";
import { ChatContext } from "../context/ChatContext";
import Modal from "../components/Modal";
import Card from "../components/Card";
import { PromptContext } from "../context/PromptContext";
import { BookmarkContext } from "../context/BookmarkContext"

function CodeBlock({ inline, className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || "");

  if (!inline && match) {
    return (
      <SyntaxHighlighter
        style={oneDark}
        language={match[1]}
        PreTag="div"
        customStyle={{ borderRadius: "0.5rem", fontSize: "0.85rem" }}
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  }

  return (
    <code className="bg-gray-800 text-pink-400 px-1 rounded" {...props}>
      {children}
    </code>
  );
}

function Chat() {
  const { messages, setMessages } = useContext(ChatContext);

  const { prompts } = useContext(PromptContext);
  const { addBookmark, removeBookmark, isBookmarked } =
    useContext(BookmarkContext);

  const handleToggleBookmark = (msg) => {
    if (isBookmarked(msg.id)) {
      removeBookmark(msg.id);
    } else {
      addBookmark(msg);
    }
  };

  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);

  const handleSelectPrompt = (content) => {
    setInputValue(content);
    setIsPromptModalOpen(false);
  };

  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      role: "user",
      text: inputValue,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsSending(true);

    try {
      const aiReply = await sendMessageToAI(inputValue);

      const aiMessage = {
        id: Date.now() + 1,
        role: "ai",
        text: aiReply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        role: "ai",
        text: "Maaf, terjadi kesalahan saat menghubungi AI.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsSending(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem-3rem)]">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            Belum ada percakapan. Mulai ketik pesan di bawah.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`group flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-md ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-100"
                  }`}
                >
                  {msg.role === "ai" ? (
                    <div className="prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown components={{ code: CodeBlock }}>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
                {msg.role === "ai" && (
                  <button
                    onClick={() => handleToggleBookmark(msg)}
                    className={`opacity-0 group-hover:opacity-100 shrink-0 ${
                      isBookmarked(msg.id)
                        ? "text-yellow-400"
                        : "text-gray-500 hover:text-yellow-400"
                    }`}
                  >
                    <Star
                      size={16}
                      fill={isBookmarked(msg.id) ? "currentColor" : "none"}
                    />
                  </button>
                )}
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-400 px-4 py-2 rounded-lg">
                  AI sedang mengetik...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="flex items-end gap-3 pt-4 border-t border-gray-700">
        <Button variant="secondary" onClick={() => setIsPromptModalOpen(true)}>
          <Library size={18} />
        </Button>
        <div className="flex-1" onKeyDown={handleKeyDown}>
          <Input
            placeholder="Ketik pesan kamu di sini..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <Button variant="primary" onClick={handleSendMessage}>
          <Send size={18} />
        </Button>
      </div>

      <Modal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        title="Pilih Prompt"
      >
        {prompts.length === 0 ? (
          <p className="text-gray-400 text-sm">Belum ada prompt tersimpan.</p>
        ) : (
          <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
            {prompts.map((prompt) => (
              <Card
                key={prompt.id}
                className="cursor-pointer hover:border-gray-500"
              >
                <div onClick={() => handleSelectPrompt(prompt.content)}>
                  <p className="text-white font-semibold text-sm">
                    {prompt.title}
                  </p>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                    {prompt.content}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Chat;
