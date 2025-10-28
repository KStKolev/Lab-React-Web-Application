import Rating from "@mui/material/Rating";
import * as style from "./ratingStars.m.scss";

interface RatingStarsProps {
  rating: number;
}

export default function RatingStars({ rating }: RatingStarsProps) {
  return (
    <div className={style.ratingContainer}>
      <Rating
        name="read-only-rating"
        value={rating}
        precision={0.1}
        readOnly
        sx={{
          fontSize: "1.5rem",
          "& .MuiRating-iconFilled": {
            color: "#ffc107",
          },
          "& .MuiRating-iconEmpty": {
            color: "#e0e0e0",
          },
        }}
      />
    </div>
  );
}
