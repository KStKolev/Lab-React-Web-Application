import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import AuthModal from "../modal/authModal";
import SignIn from "../auth/signIn";
import SignUp from "../auth/signUp";
import userIcon from "../../assets/images/icons/user.png";
import arrowDropDown from "../../assets/images/icons/arrowDrop.svg";
import shoppingCartIcon from "../../assets/images/icons/shoppingCart.png";
import logoutIcon from "../../assets/images/icons/logout.png";
import * as style from "./navbar.m.scss";
import useAuth from "../customHooks/useAuth";

export default function Navbar() {
  const { isAuthenticated, signIn, signUp, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();
  const [pendingNav, setPendingNav] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleProtectedNav = (e: React.MouseEvent, route: string) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setPendingNav(route);
      setShowSignIn(true);
      window.alert("You need to be signed in to access this page.");
    }
  };

  return (
    <nav>
      <ul className={style.navList}>
        <NavLink to={ROUTES.HOME} className={({ isActive }) => `${style.navItem} ${isActive ? style.active : ""}`}>
          Home
        </NavLink>
        <div className={style.dropdownWrapper} ref={dropdownRef}>
          <button type="button" className={`${style.dropdown} ${style.navItem}`} aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
            <span>Products</span>
            <img className={`${style.arrowDropdown} ${isOpen ? style.open : ""}`} src={arrowDropDown} alt="arrowDropDown" />
          </button>
          {isOpen && (
            <div className={style.dropdownContent}>
              <NavLink
                to={ROUTES.PC}
                className={({ isActive }) => `${style.navItem} ${isActive ? style.active : ""}`}
                onClick={(e) => handleProtectedNav(e, ROUTES.PC)}
              >
                PC
              </NavLink>
              <NavLink
                to={ROUTES.PS}
                className={({ isActive }) => `${style.navItem} ${isActive ? style.active : ""}`}
                onClick={(e) => handleProtectedNav(e, ROUTES.PS)}
              >
                Playstation 5
              </NavLink>
              <NavLink
                to={ROUTES.XBOX}
                className={({ isActive }) => `${style.navItem} ${isActive ? style.active : ""}`}
                onClick={(e) => handleProtectedNav(e, ROUTES.XBOX)}
              >
                XBox One
              </NavLink>
            </div>
          )}
        </div>
        <NavLink
          to={ROUTES.ABOUT}
          className={({ isActive }) => `${style.navItem} ${isActive ? style.active : ""}`}
          onClick={(e) => handleProtectedNav(e, ROUTES.ABOUT)}
        >
          About
        </NavLink>
        {isAuthenticated ? (
          <>
            <NavLink to={ROUTES.PROFILE} className={({ isActive }) => `${style.navItem} ${isActive ? style.active : ""}`}>
              <img src={userIcon} className={style.userIcon} alt="User Icon" />
              User Name
            </NavLink>
            <NavLink to={ROUTES.CART} className={({ isActive }) => `${style.navItem} ${isActive ? style.active : ""}`}>
              <img src={shoppingCartIcon} className={style.cartIcon} alt="Cart Icon" />
              <span className={style.cartItemCount}>0</span>
            </NavLink>
            <li className={style.navButtonItem}>
              <button type="button" className={style.navButton} onClick={logout}>
                <img src={logoutIcon} className={style.logoutIcon} alt="Logout Icon" />
              </button>
            </li>
          </>
        ) : (
          <>
            <li className={style.navButtonItem}>
              <button type="button" className={style.navButton} onClick={() => setShowSignIn(true)}>
                Sign In
              </button>
            </li>
            <li className={style.navButtonItem}>
              <button type="button" className={style.navButton} onClick={() => setShowSignUp(true)}>
                Sign Up
              </button>
            </li>
          </>
        )}
      </ul>

      {showSignIn && (
        <AuthModal onClose={() => setShowSignIn(false)} modalTitle="Authorization">
          <SignIn
            onSignInSuccess={() => {
              signIn();
              setShowSignIn(false);
              if (pendingNav) {
                navigate(pendingNav);
                setPendingNav(null);
              }
            }}
          />
        </AuthModal>
      )}

      {showSignUp && (
        <AuthModal onClose={() => setShowSignUp(false)} modalTitle="Registration">
          <SignUp
            onSignUpSuccess={() => {
              signUp();
              setShowSignUp(false);
            }}
          />
        </AuthModal>
      )}
    </nav>
  );
}
