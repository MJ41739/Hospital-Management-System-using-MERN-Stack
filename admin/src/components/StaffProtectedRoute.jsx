import React from "react";
import { Navigate } from "react-router-dom";

const StaffProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("staffRole");

  if (!token || (role !== "nurse" && role !== "receptionist")) {
    return <Navigate to="/staff-login" />;
  }

  return children;
};

export default StaffProtectedRoute;
