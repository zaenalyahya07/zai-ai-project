import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full h-16 bg-gray-800 flex items-center justify-between px-6">
      <h1 className="text-white text-xl font-bold">AI Assistant</h1>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="text-gray-300 hover:text-white transition-colors"
        >
          {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        {user && (
          <>
            <span className="text-gray-300 text-sm hidden sm:block">
              {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-red-500 transition-colors"
              title="Keluar"
            >
              <LogOut size={20} />
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
