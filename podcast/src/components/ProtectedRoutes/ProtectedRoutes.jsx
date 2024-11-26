import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = localStorage.getItem("user");

  try {
    const parsedUser = JSON.parse(user);
    return parsedUser?.email ? <Outlet /> : <Navigate to="/login" />;
  } catch {
    console.error("Invalid user data in localStorage.");
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
