import useCart from "@/components/customHooks/useCart";
import useAuth from "@/components/customHooks/useAuth";
import { ProductProps } from "@/utils/interfaces/product";
import { CartProductProps } from "@/utils/interfaces/cartProduct";
import { getImageSrc } from "@/utils/imageUtils";
import RatingStars from "./ratingStars";
import Platforms from "./platforms";
import * as style from "./productCard.m.scss";

interface ProductCardProps {
  product: ProductProps;
  onEdit: (product: ProductProps) => void;
}

export default function ProductCard(props: ProductCardProps) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  function handleAddToCart() {
    const cartProduct: CartProductProps = {
      productName: props.product.title,
      platforms: props.product.platforms,
      orderDate: new Date().toLocaleDateString("en-US"),
      amount: 1,
      price: props.product.price,
    };
    addToCart(cartProduct);
  }

  const handleEdit = () => {
    props.onEdit(props.product);
  };

  return (
    <div className={style.flipCard}>
      <div className={style.flipCardInner}>
        <div className={style.flipCardFront}>
          <Platforms platforms={props.product.platforms} />
          <img className={style.productImage} src={getImageSrc(props.product.imageUrl)} alt={props.product.title} />
          <div className={style.spacer}>
            <h2 className={style.productTitle}>{props.product.title}</h2>
            <p className={style.productPrice}>{props.product.price}$</p>
          </div>
          <RatingStars rating={props.product.rating} />
        </div>

        <div className={style.flipCardBack}>
          <p className={style.productDescription}>{props.product.description}</p>
          <p className={style.productAge}>{props.product.age}</p>
          <div className={style.buttonContainer}>
            <button className={style.cardButton} type="button" onClick={handleAddToCart}>
              Add to Cart
            </button>
            {user?.authority === "admin" && (
              <button className={style.cardButton} type="button" onClick={handleEdit}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
