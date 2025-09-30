import Navbar from "./navbar";
import * as style from "./header.m.scss";

export default function Header() {
  return (
    <header className={style.header}>
      <h1 className={style.headerTitle}>Games Market</h1>
      <Navbar />
    </header>
  );
}
