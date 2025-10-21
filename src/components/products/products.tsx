import { useState, useCallback } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useLoader } from "@/components/customHooks/useLoader";
import { ProductProps } from "@/interfaces/product";
import { allowedCategories } from "@/platforms";
import ProductsAside from "./productsAside/productsAside";
import ProductsContainer from "./productsContainer/productsContainer";
import ProductInputSearch from "./productInputSearch";
import Loader from "../loader";
import apiEndpoints from "../../api.endpoints";
import backgroundImage from "../../assets/images/background.jpg";
import routes from "../../routes";
import * as style from "./products.m.scss";

const defaultFilters = {
  sortType: "rating",
  sortDir: "ascending",
  genre: "all genres",
  age: "all ages",
  searchName: "",
};

export default function Products() {
  const [filters, setFilters] = useState<Record<string, string>>(defaultFilters);
  const [timer, setTimer] = useState<number>(500);
  const [oldCategory, setCategory] = useState<string>("");
  const params = useParams<{ category: string }>();
  const { category } = params;

  if (!category || !allowedCategories.includes(category.toLowerCase())) {
    return <Navigate to={routes.HOME} replace />;
  }

  if (oldCategory !== category) {
    setCategory(category.toLowerCase());
    setFilters(defaultFilters);
    setTimer(500);
  }

  const fetchProducts = useCallback(async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`${apiEndpoints.getProducts}/${category}?${query}`);
    const productsData: ProductProps[] = await res.json();

    if (productsData.length !== 0) {
      setTimer(0);
    } else {
      setTimer(500);
    }

    return productsData;
  }, [filters, category]);

  const { data: products, loading } = useLoader(fetchProducts, timer);

  return (
    <main className={style.productsMain} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <ProductsAside category={category} filters={filters} setFilters={setFilters} />
      <section className={style.productsContent}>
        <ProductInputSearch filters={filters} setFilters={setFilters} />
        <section className={style.productsSection}>
          <h1 className={style.productsTitle}>Products</h1>
          <hr />
          {loading ? <Loader /> : <ProductsContainer key={category} products={products || []} />}
        </section>
      </section>
    </main>
  );
}
