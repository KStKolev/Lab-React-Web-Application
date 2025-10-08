import { createContext, useContext, useState, useMemo, useCallback, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";

interface AuthContextProps {
  isAuthenticated: boolean;
  signIn: () => void;
  signUp: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isAuthenticated", String(isAuthenticated));
  }, [isAuthenticated]);

  const signIn = useCallback(() => setIsAuthenticated(true), [setIsAuthenticated]);
  const signUp = useCallback(() => setIsAuthenticated(true), [setIsAuthenticated]);
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    navigate(ROUTES.HOME);
  }, [navigate, setIsAuthenticated]);

  const value = useMemo(() => ({ isAuthenticated, signIn, signUp, logout }), [isAuthenticated, signIn, signUp, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextProps {
  return useContext(AuthContext) as AuthContextProps;
}
