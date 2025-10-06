import * as style from "./gameCard.m.scss";
import RatingStars from "./ratingStars";
import Platforms from "./platforms";
import { PlatformType } from "../../../platforms";

interface GameCardProps {
  game: {
    title: string;
    price: number;
    image: string;
    rating: number;
    description: string;
    age: string;
    platforms: PlatformType[];
  };
}

export default function GameCard(props: GameCardProps) {
  return (
    <div className={style.flipCard}>
      <div className={style.flipCardInner}>
        <div className={style.flipCardFront}>
          <Platforms platforms={props.game.platforms} />
          <img className={style.gameImage} src={props.game.image} alt={props.game.title} />
          <div className={style.spacer}>
            <h2 className={style.gameTitle}>{props.game.title}</h2>
            <p className={style.gamePrice}>{props.game.price}$</p>
          </div>
          <RatingStars rating={props.game.rating} />
        </div>
        <div className={style.flipCardBack}>
          <p className={style.gameDescription}>{props.game.description}</p>
          <p className={style.gameAge}>{props.game.age}</p>
          <button className={style.addToCartButton} type="button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
