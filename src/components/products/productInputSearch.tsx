import { useState } from "react";
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
      customStyles={{
        inputField: {
          fontSize: "1.2rem",
          width: "100%",
          color: "rgb(218, 218, 218)",
          border: "2px solid rgb(166, 166, 166)",
          backgroundColor: "rgba(0, 0, 0, 0.301)",
          borderRadius: "1.3rem",
          padding: "0.8em 1.3em",
        },
        icon: {
          position: "absolute",
          top: "50%",
          right: "2%",
          height: "40px",
          width: "40px",
          transform: "translateY(-50%)",
        },
      }}
    />
  );
}
