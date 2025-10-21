import * as styles from "./sortProductsOption.m.scss";

interface SortProductsProps {
  type: string;
  values: string[];
  filters: Record<string, string>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  sortKey: string;
}

export default function SortProductsOption(props: SortProductsProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    props.setFilters((prev: Record<string, string>) => ({ ...prev, [props.sortKey]: value }));
  };

  return (
    <div className={styles.sortGroup}>
      <h4 className={styles.sortSubtitle}>{props.type}</h4>
      <select className={styles.sortSelect} value={props.filters[props.sortKey]} onChange={handleChange}>
        {props.values.map((value) => (
          <option key={`${value}-option`} value={value.toLowerCase()}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
