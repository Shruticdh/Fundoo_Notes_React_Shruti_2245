import { Import } from "lucide-react";
import React from "react";
import { Navigate } from "react-router-dom";
import userAuth from "./UserAuth";

const ProtectedRoute = ({ children }) => {
  // const token = localStorage.getItem("token");

  return userAuth() ? children : <Navigate to="/" />;
};

export default ProtectedRoute;