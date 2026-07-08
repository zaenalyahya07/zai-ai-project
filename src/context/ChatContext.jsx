import { createContext, useState, useCallback } from "react";

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: "Percakapan Baru",
      messages: [],
    },
  ]);
  const [activeConversationId, setActiveConversationId] = useState(1);

  const activeConversation = conversations.find(
    (conv) => conv.id === activeConversationId,
  );
  const messages = activeConversation ? activeConversation.messages : [];

  const setMessages = useCallback(
    (updater) => {
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id !== activeConversationId) return conv;

          const newMessages =
            typeof updater === "function" ? updater(conv.messages) : updater;

          const isFirstMessage =
            conv.messages.length === 0 && newMessages.length > 0;
          const newTitle = isFirstMessage
            ? newMessages[0].text.slice(0, 30) +
              (newMessages[0].text.length > 30 ? "..." : "")
            : conv.title;

          return { ...conv, messages: newMessages, title: newTitle };
        }),
      );
    },
    [activeConversationId],
  );

  const createNewConversation = useCallback(() => {
    const newId = Date.now();
    const newConversation = {
      id: newId,
      title: "Percakapan Baru",
      messages: [],
    };

    setConversations((prev) => [...prev, newConversation]);
    setActiveConversationId(newId);
  }, []);

  const deleteConversation = useCallback(
    (id) => {
      setConversations((prev) => {
        const filtered = prev.filter((conv) => conv.id !== id);

        if (filtered.length === 0) {
          const newId = Date.now();
          const newConversation = {
            id: newId,
            title: "Percakapan Baru",
            messages: [],
          };
          setActiveConversationId(newId);
          return [newConversation];
        }

        if (id === activeConversationId) {
          setActiveConversationId(filtered[0].id);
        }

        return filtered;
      });
    },
    [activeConversationId],
  );

  const value = {
    conversations,
    activeConversationId,
    setActiveConversationId,
    messages,
    setMessages,
    createNewConversation,
    deleteConversation,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
