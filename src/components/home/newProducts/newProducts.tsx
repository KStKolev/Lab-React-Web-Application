import { useCallback, useEffect, useState } from "react";
import { ProductProps } from "@/interfaces/product";
import apiEndpoints from "@/api.endpoints";
import ProductCard from "../../products/productCard/productCard";
import ProductModal from "../../modal/productModal";
import * as style from "./newProducts.m.scss";

export default function NewProducts() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | undefined>(undefined);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchTopProducts = async () => {
      const response = await fetch(apiEndpoints.topProducts);
      const productsData: ProductProps[] = await response.json();
      setProducts(productsData);
    };

    fetchTopProducts();
  }, [refreshTrigger]);

  const handleOpenEditModal = useCallback((product: ProductProps) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(undefined);
  };

  const handleSubmitProduct = async (product: Partial<ProductProps>) => {
    await fetch(apiEndpoints.updateProduct, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    setRefreshTrigger((prev) => prev + 1);
    handleCloseModal();
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct?.id) {
      return;
    }

    await fetch(apiEndpoints.deleteProduct(selectedProduct.id), {
      method: "DELETE",
    });

    setRefreshTrigger((prev) => prev + 1);
    handleCloseModal();
  };

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
        <ProductModal
          mode="edit"
          product={selectedProduct}
          onClose={handleCloseModal}
          onSubmit={handleSubmitProduct}
          onDelete={handleDeleteProduct}
        />
      )}
    </section>
  );
}
