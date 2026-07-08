import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../hooks/useTheme";

function MainLayout({ children }) {
  const { isDarkMode } = useTheme();

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
