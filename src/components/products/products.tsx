import { useParams } from "react-router-dom";
import * as style from "./products.m.scss";

export default function Products() {
  const params = useParams<{ category: string }>();
  const { category } = params;
  return (
    <section className={style.productsSection}>
      <h1>Products Page</h1>
      <p>{category}</p>
    </section>
  );
}
