import * as style from "./categories.m.scss";
import Category from "./category";
import pcImage from "../../../assets/images/categories/computer.svg";
import psImage from "../../../assets/images/categories/playstation.svg";
import xboxImage from "../../../assets/images/categories/xbox.svg";

export default function Categories() {
  return (
    <section className={style.categoriesSection}>
      <h2 className={style.categoryTitle}>Categories</h2>
      <hr />
      <div className={style.categoriesContainer}>
        <Category iconUrl={pcImage} name="PC" />
        <Category iconUrl={psImage} name="Playstation 5" />
        <Category iconUrl={xboxImage} name="Xbox One" />
      </div>
    </section>
  );
}
