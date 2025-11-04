import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import routes from "@/constants/routes";
import useAuth from "@/customHooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();
  return user ? children : <Navigate to={routes.HOME} replace />;
}
