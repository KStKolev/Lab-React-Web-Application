import * as style from "./home.m.scss";
import backgroundImage from "../../assets/images/background.jpg";
import Categories from "./categories/categories";
import ProductsInput from "./productsInput/productsInput";
import NewGames from "./newGames/newGames";

export default function Home() {
  return (
    <main className={style.homeMain} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <ProductsInput />
      <Categories />
      <NewGames />
    </main>
  );
}
