import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth.jsx";
import LoadingOverlay from "./LoadingOverlay.jsx";

const ProtectedRoute = ({ children }) => {
  const { isloggedIn, loading } = useAuth();
  if (loading) {
    return <LoadingOverlay />;
  }
  if (!isloggedIn) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
