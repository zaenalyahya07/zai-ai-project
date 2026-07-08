import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Chat = lazy(() => import("./pages/Chat"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const PromptLibrary = lazy(() => import("./pages/PromptLibrary"));
const Bookmark = lazy(() => import("./pages/Bookmark"));
const Settings = lazy(() => import("./pages/Settings"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <p className="text-gray-400">Memuat halaman...</p>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Chat />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/prompt-library"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PromptLibrary />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookmark"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Bookmark />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Settings />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
