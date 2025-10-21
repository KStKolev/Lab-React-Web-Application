import { useEffect, useState } from "react";
import { ProductProps } from "@/interfaces/product";
import ProductCard from "../../products/productCard/productCard";
import apiEndpoints from "../../../api.endpoints";
import * as style from "./newProducts.m.scss";

export default function NewProducts() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      const response = await fetch(apiEndpoints.topProducts);
      const productsData: ProductProps[] = await response.json();
      setProducts(productsData);
    };

    fetchTopProducts();
  }, []);

  return (
    <section className={style.newProductsSection}>
      <h2 className={style.newProductsTitle}>New Games</h2>
      <hr />
      <div className={style.newProductsContainer}>
        {products.map((product) => {
          return <ProductCard product={{ ...product }} key={product.id} />;
        })}
      </div>
    </section>
  );
}
