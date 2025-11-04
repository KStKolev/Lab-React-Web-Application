import { useState, useCallback } from "react";
import { ProductProps } from "@/interfaces/product";
import apiEndpoints from "@/api.endpoints";

interface UseProductModalReturn {
  isModalOpen: boolean;
  modalMode: "add" | "edit";
  selectedProduct: ProductProps | undefined;
  handleOpenAddModal: () => void;
  handleOpenEditModal: (product: ProductProps) => void;
  handleCloseModal: () => void;
  handleSubmit: (product: Partial<ProductProps>) => Promise<void>;
  handleDelete: () => Promise<void>;
}

export default function useProductModal(onSuccess?: () => void): UseProductModalReturn {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | undefined>(undefined);

  const handleOpenAddModal = useCallback(() => {
    setModalMode("add");
    setSelectedProduct(undefined);
    setIsModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((product: ProductProps) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(undefined);
  }, []);

  const handleSubmit = useCallback(
    async (product: Partial<ProductProps>) => {
      const endpoint = modalMode === "add" ? apiEndpoints.createProduct : apiEndpoints.updateProduct;
      const method = modalMode === "add" ? "POST" : "PUT";

      await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      onSuccess?.();
      handleCloseModal();
    },
    [modalMode, onSuccess],
  );

  const handleDelete = useCallback(async () => {
    if (!selectedProduct?.id) {
      return;
    }

    await fetch(apiEndpoints.deleteProduct(selectedProduct.id), {
      method: "DELETE",
    });

    onSuccess?.();
    handleCloseModal();
  }, [selectedProduct, onSuccess]);

  return {
    isModalOpen,
    modalMode,
    selectedProduct,
    handleOpenAddModal,
    handleOpenEditModal,
    handleCloseModal,
    handleSubmit,
    handleDelete,
  };
}
