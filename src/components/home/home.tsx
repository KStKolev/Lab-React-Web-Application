import * as style from "./home.m.scss";
import backgroundImage from "../../assets/images/background.jpg";

export default function Home() {
  return <main className={style.background} style={{ backgroundImage: `url(${backgroundImage})` }} />;
}
