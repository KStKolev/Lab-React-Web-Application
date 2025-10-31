import { useState, useEffect } from "react";
import { ProductProps } from "@/interfaces/product";
import { PlatformType } from "@/constants/platforms";

export default function useProductForm(initialProduct?: ProductProps) {
  const [formData, setFormData] = useState<Partial<ProductProps>>({
    title: "",
    genre: "",
    price: 0,
    imageUrl: "",
    description: "",
    age: "3+",
    platforms: [],
  });
  const [originalTitle, setOriginalTitle] = useState<string>("");

  useEffect(() => {
    if (initialProduct) {
      setFormData(initialProduct);
      setOriginalTitle(initialProduct.title);
    }
  }, [initialProduct]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "price") {
      const normalizedValue = value.replace(",", ".");
      setFormData((prev) => ({ ...prev, price: parseFloat(normalizedValue) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePlatformChange = (platform: PlatformType) => {
    setFormData((prev) => {
      const platforms = prev.platforms || [];
      const isSelected = platforms.includes(platform);
      return {
        ...prev,
        platforms: isSelected ? platforms.filter((p) => p !== platform) : [...platforms, platform],
      };
    });
  };

  return { formData, originalTitle, handleInputChange, handlePlatformChange };
}
