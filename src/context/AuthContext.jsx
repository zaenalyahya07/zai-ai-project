import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const getRegisteredUsers = () => {
    const stored = localStorage.getItem("registeredUsers");
    return stored ? JSON.parse(stored) : [];
  };

  const register = (name, email, password) => {
    const users = getRegisteredUsers();
    const emailExists = users.some((u) => u.email === email);

    if (emailExists) {
      return {
        success: false,
        message: "Email sudah terdaftar. Silakan masuk.",
      };
    }

    const updatedUsers = [...users, { name, email, password }];
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    return { success: true };
  };

  const login = (email, password) => {
    const users = getRegisteredUsers();
    const foundUser = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!foundUser) {
      return { success: false, message: "Email atau password salah." };
    }

    const userData = { name: foundUser.name, email: foundUser.email };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
