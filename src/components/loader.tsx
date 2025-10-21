import * as styles from "./loader.m.scss";
import loadingIcon from "../assets/images/loading.svg";

export default function Loader() {
  return (
    <div className={`${styles.loader} ${loadingIcon ? styles.visible : ""}`}>
      <img src={loadingIcon} alt="Loading..." />
    </div>
  );
}
