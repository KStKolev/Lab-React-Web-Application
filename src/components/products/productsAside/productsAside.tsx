import { genreOptions, ageFilterOptions } from "@/constants/productOptions";
import SortProducts from "./sortProducts";
import FilterProducts from "./filterProducts";
import * as style from "./productsAside.m.scss";

interface ProductsAsideProps {
  category: string;
  filters: Record<string, string>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export default function ProductsAside(props: ProductsAsideProps) {
  return (
    <aside className={style.productsAside}>
      <h2 className={style.productsAsideTitle}>{props.category.toUpperCase()}</h2>
      <hr />

      <SortProducts filters={props.filters} setFilters={props.setFilters} />

      <FilterProducts
        filterTitle="Genres"
        filterType="genre"
        values={[...genreOptions]}
        filters={props.filters}
        setFilters={props.setFilters}
      />

      <FilterProducts
        filterTitle="Age"
        filterType="age"
        values={[...ageFilterOptions]}
        filters={props.filters}
        setFilters={props.setFilters}
      />
    </aside>
  );
}
