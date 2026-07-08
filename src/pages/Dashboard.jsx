import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import Card from "../components/Card";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { conversations, setActiveConversationId } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const recentConversations = [...conversations].reverse().slice(0, 5);

  const handleOpenConversation = (id) => {
    setActiveConversationId(id);
    navigate("/chat");
  };

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-white">Dashboard</h1>
      <p className="text-gray-400 mt-2">
        Selamat datang, {user?.name || "Pengguna"} 👋
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <Card>
          <p className="text-white font-semibold">Total Chat</p>
          <p className="text-gray-400 text-sm mt-1">
            {conversations.length} percakapan
          </p>
        </Card>
        <Card>
          <p className="text-white font-semibold">Prompt Tersimpan</p>
          <p className="text-gray-400 text-sm mt-1">5 prompt</p>
        </Card>
        <Card>
          <p className="text-white font-semibold">Bookmark</p>
          <p className="text-gray-400 text-sm mt-1">3 pesan</p>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="text-white font-semibold mb-3">Percakapan Terbaru</h2>
        {recentConversations.length === 0 ? (
          <p className="text-gray-500 text-sm">Belum ada percakapan.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {recentConversations.map((conv) => (
              <Card
                key={conv.id}
                className="cursor-pointer hover:border-gray-500"
              >
                <div
                  onClick={() => handleOpenConversation(conv.id)}
                  className="flex items-center gap-3"
                >
                  <MessageSquare size={18} className="text-gray-400 shrink-0" />
                  <span className="text-gray-200 text-sm truncate">
                    {conv.title}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
