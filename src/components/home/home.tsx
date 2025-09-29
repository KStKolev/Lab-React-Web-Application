import * as style from "./home.m.scss";
import backgroundImage from "../../assets/images/background.jpg";

export default function Home() {
  return (
    <main>
      <img src={backgroundImage} className={style.background} alt="Background" />
    </main>
  );
}
