import { useSelector, useDispatch } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "@/redux/store";
import { setUser, logout } from "@/redux/authSlice";
import routes from "@/routes";

export default function useAuth() {
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleSignIn = (userData: object) => dispatch(setUser(userData));
  const handleSignUp = (userData: object) => dispatch(setUser(userData));
  const handleLogout = () => {
    dispatch(logout());
    navigate(routes.HOME);
  };
  const handleUpdateUser = (userData: object) => dispatch(setUser(userData));

  return { user, signIn: handleSignIn, signUp: handleSignUp, logout: handleLogout, updateUser: handleUpdateUser };
}
