import filledStar from "../../../assets/images/icons/starFilled.svg";
import emptyStar from "../../../assets/images/icons/star.svg";
import * as style from "./ratingStars.m.scss";

interface RatingStarsProps {
  rating: number;
}

export default function RatingStars({ rating }: RatingStarsProps) {
  return (
    <div className={style.ratingContainer}>
      {Array.from({ length: 5 }).map((_, i) => {
        const starNumber = i + 1;
        const fillPercentage = Math.max(Math.min(rating - (starNumber - 1), 1), 0) * 100;

        return (
          <div className={style.starWrapper} key={`star-${starNumber}`}>
            <img src={emptyStar} alt="empty star" className={style.star} />
            <img
              src={filledStar}
              alt="filled star"
              className={style.starFilled}
              style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
            />
          </div>
        );
      })}
    </div>
  );
}
