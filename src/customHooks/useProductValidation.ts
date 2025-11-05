import { useState } from "react";
import { ProductProps } from "@/interfaces/product";

export default function useProductValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (formData: Partial<ProductProps>): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      newErrors.title = "Name is required";
    }

    if (!formData.genre?.trim()) {
      newErrors.genre = "Category is required";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!formData.imageUrl?.trim()) {
      newErrors.imageUrl = "Image URL is required";
    }

    if (!formData.description?.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.platforms || formData.platforms.length === 0) {
      newErrors.platforms = "At least one platform must be selected";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateForm, setErrors };
}
