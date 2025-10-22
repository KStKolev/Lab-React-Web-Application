import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { signIn, signUp, logout, updateUser } from "../../store/authSlice";
import routes from "../../routes";

export default function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleSignIn = (userData: object) => dispatch(signIn(userData));
  const handleSignUp = (userData: object) => dispatch(signUp(userData));
  const handleLogout = () => {
    dispatch(logout());
    navigate(routes.HOME);
  };
  const handleUpdateUser = (userData: object) => dispatch(updateUser(userData));

  return { user, signIn: handleSignIn, signUp: handleSignUp, logout: handleLogout, updateUser: handleUpdateUser };
}
