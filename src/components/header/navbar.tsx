import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "@/customHooks/useAuth";
import useCart from "@/customHooks/useCart";
import routes from "@/routes";
import userIcon from "@/assets/images/icons/user.png";
import arrowDropDown from "@/assets/images/icons/arrowDrop.svg";
import shoppingCartIcon from "@/assets/images/icons/shoppingCart.png";
import logoutIcon from "@/assets/images/icons/logout.png";
import Modal from "../modal/modal";
import SignIn from "../auth/signIn";
import SignUp from "../auth/signUp";
import * as style from "./navbar.m.scss";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [pendingNav, setPendingNav] = useState<string | null>(null);
  const { cartCount } = useCart();
  const { user, signIn, signUp, logout } = useAuth();
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
    if (!user) {
      e.preventDefault();
      setPendingNav(route);
      setShowSignIn(true);
      window.alert("You need to be signed in to access this page.");
    }
  };

  return (
    <nav>
      <ul className={style.navList}>
        <NavLink to={routes.HOME} className={({ isActive }) => `${style.navItem} ${isActive ? style.active : ""}`}>
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
                to={routes.PC}
                className={({ isActive }) => `${style.navItem} ${isActive ? style.active : ""}`}
                onClick={(e) => handleProtectedNav(e, routes.PC)}
              >
                PC
              </NavLink>

              <NavLink
                to={routes.PS}
                className={({ isActive }) => `${style.navItem} ${isActive ? style.active : ""}`}
                onClick={(e) => handleProtectedNav(e, routes.PS)}
              >
                Playstation 5
              </NavLink>

              <NavLink
                to={routes.XBOX}
                className={({ isActive }) => `${style.navItem} ${isActive ? style.active : ""}`}
                onClick={(e) => handleProtectedNav(e, routes.XBOX)}
              >
                XBox One
              </NavLink>
            </div>
          )}
        </div>

        <NavLink
          to={routes.ABOUT}
          className={({ isActive }) => `${style.navItem} ${isActive ? style.active : ""}`}
          onClick={(e) => handleProtectedNav(e, routes.ABOUT)}
        >
          About
        </NavLink>

        {user ? (
          <>
            <NavLink to={routes.PROFILE} className={({ isActive }) => `${style.navItem} ${isActive ? style.active : ""}`}>
              <img src={userIcon} className={style.userIcon} alt="User Icon" />
              {user.username}
            </NavLink>

            <NavLink to={routes.CART} className={({ isActive }) => `${style.navItem} ${isActive ? style.active : ""}`}>
              <img src={shoppingCartIcon} className={style.cartIcon} alt="Cart Icon" />
              <span className={style.cartItemCount}>{cartCount}</span>
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
        <Modal
          onClose={() => setShowSignIn(false)}
          modalTitle="Authorization"
          customStyles={{
            overlay: {
              backgroundColor: "rgb(76, 76, 76)",
            },
            wrapper: { width: "50%" },
            title: { fontSize: "1.8rem" },
          }}
        >
          <SignIn
            signIn={signIn}
            onSignInSuccess={() => {
              setShowSignIn(false);
              if (pendingNav) {
                navigate(pendingNav);
                setPendingNav(null);
              }
            }}
          />
        </Modal>
      )}

      {showSignUp && (
        <Modal
          onClose={() => setShowSignUp(false)}
          modalTitle="Registration"
          customStyles={{
            overlay: {
              backgroundColor: "rgb(76, 76, 76)",
            },
            wrapper: { width: "50%" },
            title: { fontSize: "1.8rem" },
          }}
        >
          <SignUp
            signUp={signUp}
            onSignUpSuccess={() => {
              setShowSignUp(false);
            }}
          />
        </Modal>
      )}
    </nav>
  );
}
