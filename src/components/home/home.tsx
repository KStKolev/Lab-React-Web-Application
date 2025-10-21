import * as style from "./home.m.scss";
import backgroundImage from "../../assets/images/background.jpg";
import Categories from "./categories/categories";
import HomeInputSearch from "./homeInputSearch/homeInputSearch";
import NewProducts from "./newProducts/newProducts";

export default function Home() {
  return (
    <main className={style.homeMain} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <HomeInputSearch />
      <Categories />
      <NewProducts />
    </main>
  );
}
