import { useEffect, useState } from "react";
import { ProductProps } from "@/interfaces/product";
import apiEndpoints from "@/api.endpoints";
import useProductModal from "@/customHooks/useProductModal";
import ProductCard from "../../products/productCard/productCard";
import ProductModal from "../../modal/productModal";
import * as style from "./newProducts.m.scss";

export default function NewProducts() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { isModalOpen, selectedProduct, handleOpenEditModal, handleCloseModal, handleSubmit, handleDelete } = useProductModal(() =>
    setRefreshTrigger((prev) => prev + 1),
  );

  useEffect(() => {
    const fetchTopProducts = async () => {
      const response = await fetch(apiEndpoints.topProducts);
      const productsData: ProductProps[] = await response.json();
      setProducts(productsData);
    };

    fetchTopProducts();
  }, [refreshTrigger]);

  return (
    <section className={style.newProductsSection}>
      <h2 className={style.newProductsTitle}>New Games</h2>
      <hr />

      <div className={style.newProductsContainer}>
        {products.map((product) => {
          return <ProductCard product={product} key={product.id} onEdit={handleOpenEditModal} />;
        })}
      </div>

      {isModalOpen && (
        <ProductModal mode="edit" product={selectedProduct} onClose={handleCloseModal} onSubmit={handleSubmit} onDelete={handleDelete} />
      )}
    </section>
  );
}
