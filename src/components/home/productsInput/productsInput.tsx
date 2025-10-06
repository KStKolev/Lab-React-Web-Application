import { useState, useEffect, useRef, useCallback, KeyboardEvent } from "react";
import * as style from "./productsInput.m.scss";
import apiEndpoints from "../../../api.endpoints";
import loadingIcon from "../../../assets/images/loading.svg";

export default function ProductsInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
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
    const response = await fetch(`${apiEndpoints.searchGames}/${encodeURIComponent(query)}`);
    const data = await response.json();
    setResults(data);
    setShowDropdown(data.length > 0);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setFocusedIndex(-1);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      performSearch(event.target.value);
    }, 300);
  };

  const handleItemSelect = (item: string) => {
    alert("got product");
    setSearchTerm(item);
    setShowDropdown(false);
    setFocusedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) {
      return;
    }

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
        if (focusedIndex >= 0 && focusedIndex < results.length) {
          handleItemSelect(results[focusedIndex]);
        }
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

  const handleItemKeyDown = (event: KeyboardEvent<HTMLDivElement>, item: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleItemSelect(item);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className={style.searchContainer}>
      <div className={style.inputWrapper}>
        <input
          ref={inputRef}
          className={style.productsInput}
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => searchTerm.trim() && setShowDropdown(true)}
          aria-expanded={showDropdown}
          aria-controls="search-results"
          role="combobox"
          aria-autocomplete="list"
        />
        <div className={style.iconWrapper}>{loading && <img src={loadingIcon} alt="Loading..." className={style.loaderIcon} />}</div>
      </div>

      {showDropdown && (
        <div ref={dropdownRef} className={style.dropdown}>
          {results.map((result, index) => (
            <div
              key={`result-${result}`}
              className={`${style.dropdownItem} ${index === focusedIndex ? style.dropdownItemFocused : ""}`}
              onClick={() => handleItemSelect(result)}
              onKeyDown={(e) => handleItemKeyDown(e, result)}
              role="option"
              aria-selected={index === focusedIndex}
              tabIndex={0}
            >
              {result}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
