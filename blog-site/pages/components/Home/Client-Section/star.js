const { StarRatingSVG } = require("@/public/Assets/svg");
import { useState } from "react";
const StarRating = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className="focus:outline-none"
        >
          <StarRatingSVG
            width={24}
            height={24}
            fill={star <= (hoverRating || rating) ? "#FFD700" : "#CCCCCC"}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
