import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import LoadingOverlay from "./LoadingOverlay";

function PublicRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  if (loading) {
    return <LoadingOverlay />;
  }
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default PublicRoute;
