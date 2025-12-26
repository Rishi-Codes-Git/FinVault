import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const { user } = useContext(AuthContext);

  // If user is logged in, redirect to dashboard
  return user ? <Navigate to="/dashboard" /> : children;
}
