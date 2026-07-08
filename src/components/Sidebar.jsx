import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Settings as SettingsIcon,
  Plus,
  Trash2,
  Library,
  Star,
} from "lucide-react";
import { ChatContext } from "../context/ChatContext";
import Modal from "./Modal";
import Button from "./Button";

function Sidebar() {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    createNewConversation,
    deleteConversation,
  } = useContext(ChatContext);

  const [conversationToDelete, setConversationToDelete] = useState(null);

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/" },
    { label: "Chat", icon: MessageSquare, path: "/chat" },
    { label: "Prompt Library", icon: Library, path: "/prompt-library" },
    { label: "Bookmark", icon: Star, path: "/bookmark" },
    { label: "Pengaturan", icon: SettingsIcon, path: "/settings" },
  ];

  const handleConfirmDelete = () => {
    deleteConversation(conversationToDelete);
    setConversationToDelete(null);
  };

  return (
    <aside className="w-64 h-screen bg-gray-800 p-4 flex flex-col">
      <p className="text-white font-semibold mb-6">Menu</p>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
                  isActive
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <button
        onClick={createNewConversation}
        className="flex items-center gap-2 px-3 py-2 mt-6 mb-3 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
      >
        <Plus size={16} />
        Percakapan Baru
      </button>

      <div className="flex-1 overflow-y-auto">
        <p className="text-gray-400 text-xs font-semibold uppercase mb-2 px-3">
          Percakapan
        </p>
        <div className="flex flex-col gap-1">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setActiveConversationId(conv.id)}
              className={`group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm ${
                conv.id === activeConversationId
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <span className="truncate">{conv.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setConversationToDelete(conv.id);
                }}
                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 shrink-0 ml-2"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={conversationToDelete !== null}
        onClose={() => setConversationToDelete(null)}
        title="Hapus Percakapan"
      >
        <p className="text-gray-300 mb-4">
          Apakah kamu yakin ingin menghapus percakapan ini? Tindakan ini tidak
          dapat dibatalkan.
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => setConversationToDelete(null)}
          >
            Batal
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Hapus
          </Button>
        </div>
      </Modal>
    </aside>
  );
}

export default Sidebar;
