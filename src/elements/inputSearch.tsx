import { SearchInputProps } from "@/interfaces/searchInput";
import loadingIcon from "../assets/images/loading.svg";
import * as style from "./inputSearch.m.scss";

export default function InputSearch(props: SearchInputProps) {
  return (
    <div className={style.searchContainer}>
      <div className={style.inputWrapper}>
        <input
          ref={props.inputRef}
          className={style.productsInput}
          type="text"
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          onKeyDown={props.onKeyDown}
          onFocus={props.onFocus}
        />
        <div className={style.iconWrapper}>{props.loading && <img src={loadingIcon} alt="Loading..." className={style.loaderIcon} />}</div>
      </div>

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
}
