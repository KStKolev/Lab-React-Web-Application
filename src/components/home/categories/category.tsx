import * as style from "./category.m.scss";

interface CategoryProps {
  iconUrl: string;
  name: string;
}

export default function Category(props: CategoryProps) {
  return (
    <div className={style.categoryContainer}>
      <img className={style.categoryIcon} src={props.iconUrl} alt={props.name} />
      <h3 className={style.categoryName}>{props.name}</h3>
    </div>
  );
}
