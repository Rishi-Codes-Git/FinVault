import React, { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      api
        .get("/api/v1/account")
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem("accessToken"));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
