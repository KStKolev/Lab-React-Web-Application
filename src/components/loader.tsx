import loadingIcon from "@/assets/images/loading.svg";
import * as styles from "./loader.m.scss";

export default function Loader() {
  return (
    <div className={`${styles.loader} ${loadingIcon ? styles.visible : ""}`}>
      <img src={loadingIcon} alt="Loading..." />
    </div>
  );
}
