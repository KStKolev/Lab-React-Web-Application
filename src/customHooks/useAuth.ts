import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "@/routes";
import { RootState } from "@/store/store";
import { setUser, logout } from "@/store/authSlice";

export default function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleSignIn = (userData: object) => dispatch(setUser(userData));
  const handleSignUp = (userData: object) => dispatch(setUser(userData));
  const handleLogout = () => {
    dispatch(logout());
    navigate(routes.HOME);
  };
  const handleUpdateUser = (userData: object) => dispatch(setUser(userData));

  return { user, signIn: handleSignIn, signUp: handleSignUp, logout: handleLogout, updateUser: handleUpdateUser };
}
