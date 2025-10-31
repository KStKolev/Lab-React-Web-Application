import { sortCriteriaOptions, sortDirectionOptions } from "@/constants/productOptions";
import * as styles from "./sortProducts.m.scss";
import SortProductsOption from "./sortProductsOption";

interface SortProductsProps {
  filters: Record<string, string>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export default function SortProducts(props: SortProductsProps) {
  return (
    <div className={styles.sortProductsContainer}>
      <h3 className={styles.sortTitle}>Sort</h3>
      <hr />

      <SortProductsOption
        type="Criteria"
        values={[...sortCriteriaOptions]}
        filters={props.filters}
        setFilters={props.setFilters}
        sortKey="sortType"
      />

      <SortProductsOption
        type="Type"
        values={[...sortDirectionOptions]}
        filters={props.filters}
        setFilters={props.setFilters}
        sortKey="sortDir"
      />
    </div>
  );
}
