import { NavLink } from "react-router-dom";
import * as style from "./navbar.m.scss";
import { ROUTES } from "../../routes";

export default function Navbar() {
  return (
    <nav>
      <ul className={style.navList}>
        <NavLink to={ROUTES.HOME} className={({ isActive }) => `${style.navItem} ${isActive ? style.active : ""}`}>
          Home
        </NavLink>
        <NavLink to={ROUTES.PRODUCTS} className={({ isActive }) => `${style.navItem} ${isActive ? style.active : ""}`}>
          Products
        </NavLink>
        <NavLink to={ROUTES.ABOUT} className={({ isActive }) => `${style.navItem} ${isActive ? style.active : ""}`}>
          About
        </NavLink>
      </ul>
    </nav>
  );
}
