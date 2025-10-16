import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import useAuth from "../customHooks/useAuth";
import { ROUTES } from "../../routes";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();
  return user ? children : <Navigate to={ROUTES.HOME} replace />;
}
