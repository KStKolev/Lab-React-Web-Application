import { useState } from "react";
import { productSearchInputStyles } from "@/constants/searchInputStyles";
import InputSearch from "@/elements/inputSearch";

interface ProductInputProps {
  filters: Record<string, string>;
  setFilters: (newFilters: Record<string, string>) => void;
}

export default function ProductInputSearch(props: ProductInputProps) {
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setFilters({ ...props.filters, searchName: event.target.value });
    if (event.target.value.trim() === "") {
      setLoading(false);
      return;
    }
    setLoading(true);
  };

  return (
    <InputSearch
      value={props.filters.searchName}
      loading={loading}
      onChange={handleInputChange}
      placeholder="Search products..."
      customStyles={productSearchInputStyles}
    />
  );
}
