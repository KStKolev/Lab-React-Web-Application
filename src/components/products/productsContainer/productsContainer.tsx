import { ProductProps } from "@/interfaces/product";
import ProductCard from "../productCard/productCard";
import * as style from "./productsContainer.m.scss";

interface ProductsContainerProps {
  products: ProductProps[];
}

export default function ProductsContainer(props: ProductsContainerProps) {
  return (
    <div className={style.productsContainer}>
      {props.products.map((product) => {
        return <ProductCard product={{ ...product }} key={product.id} />;
      })}
    </div>
  );
}
