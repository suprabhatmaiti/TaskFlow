import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";

function PublicRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default PublicRoute;
