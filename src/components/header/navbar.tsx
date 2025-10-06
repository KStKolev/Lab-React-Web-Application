import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as style from "./navbar.m.scss";
import { ROUTES } from "../../routes";
import arrowDropDown from "../../assets/images/icons/arrowDrop.svg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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
                className={({ isActive }) => `${style.dropdownItem} ${style.navItem} ${isActive ? style.active : ""}`}
              >
                PC
              </NavLink>
              <NavLink
                to={ROUTES.PS}
                className={({ isActive }) => `${style.dropdownItem} ${style.navItem} ${isActive ? style.active : ""}`}
              >
                Playstation 5
              </NavLink>
              <NavLink
                to={ROUTES.XBOX}
                className={({ isActive }) => `${style.dropdownItem} ${style.navItem} ${isActive ? style.active : ""}`}
              >
                XBox One
              </NavLink>
            </div>
          )}
        </div>
        <NavLink to={ROUTES.ABOUT} className={({ isActive }) => `${style.navItem} ${isActive ? style.active : ""}`}>
          About
        </NavLink>
      </ul>
    </nav>
  );
}
