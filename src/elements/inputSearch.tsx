import { forwardRef } from "react";
import { SearchInputProps } from "@/interfaces/searchInput";
import loadingIcon from "@/assets/images/loading.svg";
import Input from "./input";
import * as style from "./inputSearch.m.scss";

const InputSearch = forwardRef<HTMLInputElement, SearchInputProps>((props, ref) => {
  return (
    <div className={style.searchContainer}>
      <Input
        ref={ref}
        type="text"
        name="text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        onFocus={props.onFocus}
        iconUrl={props.loading ? loadingIcon : undefined}
        customStyles={props.customStyles}
      />

      {props.showDropdown && props.results && props.results.length > 0 && (
        <div ref={props.dropdownRef} className={style.dropdown}>
          {props.results.map((result, index) => (
            <div
              key={result}
              className={`${style.dropdownItem} ${index === props.focusedIndex ? style.dropdownItemFocused : ""}`}
              onClick={() => props.onItemClick?.(result)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  props.onItemClick?.(result);
                }
              }}
              role="button"
              tabIndex={0}
            >
              {result}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default InputSearch;
