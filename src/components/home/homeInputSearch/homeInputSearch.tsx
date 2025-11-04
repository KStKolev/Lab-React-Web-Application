import { useState, useEffect, useRef, useCallback, KeyboardEvent, ChangeEvent } from "react";
import { homeSearchInputStyles } from "@/constants/searchInputStyles";
import InputSearch from "@/elements/inputSearch";
import apiEndpoints from "@/api.endpoints";

export default function HomeInputSearch() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const performSearch = useCallback(async (query: string) => {
    setFocusedIndex(-1);

    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    const res = await fetch(`${apiEndpoints.searchProducts}/${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
    setShowDropdown(data.length > 0);
  }, []);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      setFocusedIndex(-1);
      performSearch(e.target.value);
    },
    [performSearch],
  );

  const handleItemClick = (item: string) => {
    alert(`Selected item: ${item}`);
    setValue(item);
    setShowDropdown(false);
    setFocusedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setFocusedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        event.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        event.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < results.length) handleItemClick(results[focusedIndex]);
        break;
      case "Escape":
      case "Tab":
        setShowDropdown(false);
        setFocusedIndex(-1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <InputSearch
      ref={inputRef}
      dropdownRef={dropdownRef}
      value={value}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onFocus={() => value.trim() && setShowDropdown(true)}
      results={results}
      showDropdown={showDropdown}
      focusedIndex={focusedIndex}
      onItemClick={handleItemClick}
      loading={loading}
      placeholder="Search"
      customStyles={homeSearchInputStyles}
    />
  );
}
