import backgroundImage from "@/assets/images/background.jpg";
import HomeInputSearch from "./homeInputSearch/homeInputSearch";
import Categories from "./categories/categories";
import NewProducts from "./newProducts/newProducts";
import * as style from "./home.m.scss";

export default function Home() {
  return (
    <main className={style.homeMain} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <HomeInputSearch />
      <Categories />
      <NewProducts />
    </main>
  );
}
