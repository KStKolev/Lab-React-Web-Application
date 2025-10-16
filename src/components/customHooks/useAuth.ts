import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { signIn, signUp, logout } from "../../store/authSlice";
import { ROUTES } from "../../routes";

export default function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleSignIn = () => dispatch(signIn());
  const handleSignUp = () => dispatch(signUp());
  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.HOME);
  };

  return { isAuthenticated, signIn: handleSignIn, signUp: handleSignUp, logout: handleLogout };
}
