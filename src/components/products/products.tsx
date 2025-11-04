import { useState, useCallback } from "react";
import { useParams, Navigate } from "react-router-dom";
import { ProductProps } from "@/interfaces/product";
import { allowedCategories } from "@/constants/platforms";
import { useLoader } from "@/customHooks/useLoader";
import useAuth from "@/customHooks/useAuth";
import routes from "@/routes";
import apiEndpoints from "@/api.endpoints";
import backgroundImage from "@/assets/images/background.jpg";
import ProductsAside from "./productsAside/productsAside";
import ProductsContainer from "./productsContainer/productsContainer";
import ProductInputSearch from "./productInputSearch";
import ProductModal from "../modal/productModal";
import Loader from "../loader";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | undefined>(undefined);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const params = useParams<{ category: string }>();
  const { category } = params;
  const { user } = useAuth();

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
    }

    return productsData;
  }, [filters, category, refreshTrigger]);

  const { data: products, loading } = useLoader(fetchProducts, timer);

  const handleOpenAddModal = () => {
    setModalMode("add");
    setSelectedProduct(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = useCallback((product: ProductProps) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(undefined);
  };

  const handleSubmitProduct = async (product: Partial<ProductProps>) => {
    if (modalMode === "add") {
      await fetch(apiEndpoints.createProduct, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
    } else {
      await fetch(apiEndpoints.updateProduct, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
    }

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
          onSubmit={handleSubmitProduct}
          onDelete={modalMode === "edit" ? handleDeleteProduct : undefined}
        />
      )}
    </main>
  );
}
