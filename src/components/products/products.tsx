import { useState, useCallback } from "react";
import { useParams, Navigate } from "react-router-dom";
import { ProductProps } from "@/interfaces/product";
import { allowedCategories } from "@/constants/platforms";
import defaultProductFilters from "@/constants/productFilters";
import { useLoader } from "@/customHooks/useLoader";
import useAuth from "@/customHooks/useAuth";
import useProductModal from "@/customHooks/useProductModal";
import routes from "@/constants/routes";
import apiEndpoints from "@/api.endpoints";
import backgroundImage from "@/assets/images/background.jpg";
import ProductsAside from "./productsAside/productsAside";
import ProductsContainer from "./productsContainer/productsContainer";
import ProductInputSearch from "./productInputSearch";
import ProductModal from "../modal/productModal";
import Loader from "../loader";
import * as style from "./products.m.scss";

export default function Products() {
  const [filters, setFilters] = useState<Record<string, string>>(defaultProductFilters);
  const [timer, setTimer] = useState<number>(500);
  const [oldCategory, setCategory] = useState<string>("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const params = useParams<{ category: string }>();
  const { category } = params;
  const { user } = useAuth();
  const { isModalOpen, modalMode, selectedProduct, handleOpenAddModal, handleOpenEditModal, handleCloseModal, handleSubmit, handleDelete } =
    useProductModal(() => setRefreshTrigger((prev) => prev + 1));

  if (!category || !allowedCategories.includes(category.toLowerCase())) {
    return <Navigate to={routes.HOME} replace />;
  }

  if (oldCategory !== category) {
    setCategory(category.toLowerCase());
    setFilters(defaultProductFilters);
    setTimer(500);
  }

  const fetchProducts = useCallback(async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`${apiEndpoints.getProducts}/${category}?${query}`);
    const productsData: ProductProps[] = await res.json();

    if (productsData.length !== 0) {
      setTimer(0);
    }

    return productsData;
  }, [filters, category, refreshTrigger]);

  const { data: products, loading } = useLoader(fetchProducts, timer);

  return (
    <main className={style.productsMain} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <ProductsAside category={category} filters={filters} setFilters={setFilters} />

      <section className={style.productsContent}>
        <div className={style.productsContentHeader}>
          <ProductInputSearch filters={filters} setFilters={setFilters} />

          {user?.authority === "admin" && (
            <button type="button" className={style.addProductButton} onClick={handleOpenAddModal}>
              Create Card
            </button>
          )}
        </div>

        <section className={style.productsSection}>
          <h1 className={style.productsTitle}>Products</h1>
          <hr />

          {loading ? <Loader /> : <ProductsContainer key={category} products={products || []} onEdit={handleOpenEditModal} />}
        </section>
      </section>

      {isModalOpen && (
        <ProductModal
          mode={modalMode}
          product={selectedProduct}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          onDelete={modalMode === "edit" ? handleDelete : undefined}
        />
      )}
    </main>
  );
}
