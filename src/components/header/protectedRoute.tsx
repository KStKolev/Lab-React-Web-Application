import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../../customHooks/authContext";
import { ROUTES } from "../../routes";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
}
