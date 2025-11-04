import { memo } from "react";
import { useNavigate } from "react-router-dom";
import routes from "@/constants/routes";
import * as style from "./category.m.scss";

interface CategoryProps {
  iconUrl: string;
  name: string;
  urlProperty: string;
}

function Category(props: CategoryProps) {
  const navigate = useNavigate();

  const categoryNavigate = () => {
    navigate(routes.PRODUCTS.replace(":category", props.urlProperty.toLowerCase()));
  };

  return (
    <button type="button" onClick={categoryNavigate} className={style.categoryButton}>
      <img className={style.categoryIcon} src={props.iconUrl} alt={props.name} />
      <h3 className={style.categoryName}>{props.name}</h3>
    </button>
  );
}

export default memo(Category);
