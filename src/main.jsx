import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ChatProvider } from "./context/ChatContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PromptProvider } from "./context/PromptContext.jsx";
import { BookmarkProvider } from "./context/BookmarkContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <PromptProvider>
              <BookmarkProvider>
                <ChatProvider>
                  <App />
                </ChatProvider>
              </BookmarkProvider>
            </PromptProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
