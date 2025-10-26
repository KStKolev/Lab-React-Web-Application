import { ProductProps } from "@/interfaces/product";
import RatingStars from "./ratingStars";
import Platforms from "./platforms";
import gameImages from "../../../assets/images/games/gameImages";
import * as style from "./productCard.m.scss";

interface ProductCardProps {
  product: ProductProps;
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <div className={style.flipCard}>
      <div className={style.flipCardInner}>
        <div className={style.flipCardFront}>
          <Platforms platforms={props.product.platforms} />
          <img className={style.productImage} src={gameImages[props.product.imageUrl]} alt={props.product.title} />
          <div className={style.spacer}>
            <h2 className={style.productTitle}>{props.product.title}</h2>
            <p className={style.productPrice}>{props.product.price}$</p>
          </div>
          <RatingStars rating={props.product.rating} />
        </div>
        <div className={style.flipCardBack}>
          <p className={style.productDescription}>{props.product.description}</p>
          <p className={style.productAge}>{props.product.age}</p>
          <button className={style.addToCartButton} type="button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
