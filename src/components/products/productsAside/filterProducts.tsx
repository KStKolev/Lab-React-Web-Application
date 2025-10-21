import * as styles from "./filterProducts.m.scss";

interface FilterProductsProps {
  filterTitle: string;
  filterType: string;
  values: string[];
  filters: Record<string, string>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export default function FilterProducts(props: FilterProductsProps) {
  const handleFilterChange = (value: string) => {
    props.setFilters((prev: Record<string, string>) => ({ ...prev, [props.filterType]: value }));
  };

  return (
    <div className={styles.filterProductsContainer}>
      <h3 className={styles.filterTitle}>{props.filterTitle}</h3>
      <hr />
      {props.values.map((value) => (
        <label htmlFor={value} key={value} className={styles.filterLabel}>
          <input
            type="radio"
            name={props.filterType}
            value={value.toLowerCase()}
            className={styles.filterInput}
            checked={props.filters[props.filterType] === value.toLowerCase()}
            onChange={() => handleFilterChange(value.toLowerCase())}
          />
          {value}
        </label>
      ))}
    </div>
  );
}
