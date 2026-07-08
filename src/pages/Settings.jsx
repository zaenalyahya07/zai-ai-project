import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, LogOut } from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../hooks/useTheme";

function Settings() {
  const { user, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Pengaturan</h1>
      <p className="text-gray-400 mt-2">
        Kelola akun dan preferensi tampilan kamu.
      </p>

      <div className="flex flex-col gap-4 mt-6 max-w-md">
        <Card>
          <p className="text-white font-semibold mb-3">Informasi Akun</p>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Nama</span>
              <span className="text-gray-200">{user?.name || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Email</span>
              <span className="text-gray-200">{user?.email || "-"}</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-semibold">Mode Tampilan</p>
              <p className="text-gray-400 text-sm mt-1">
                {isDarkMode ? "Dark Mode aktif" : "Light Mode aktif"}
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>
          </div>
        </Card>

        <Button variant="danger" onClick={handleLogout}>
          <span className="flex items-center justify-center gap-2">
            <LogOut size={18} />
            Keluar dari Akun
          </span>
        </Button>
      </div>
    </div>
  );
}

export default Settings;
