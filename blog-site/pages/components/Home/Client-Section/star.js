import { useState, useMemo } from "react";
import { StarRatingSVG } from "@/public/Assets/svg"; // ✅ Use ES6 import

const StarRating = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const stars = useMemo(() => [1, 2, 3, 4, 5], []); // ✅ Prevent re-creation on every render

  // ✅ Event Handlers
  const handleClick = (star) => {
    if (rating !== star) setRating(star);
  };

  const handleMouseEnter = (star) => setHoverRating(star);
  const handleMouseLeave = () => setHoverRating(0);

  return (
    <div className="flex space-x-1">
      {stars.map((star) => {
        const isHighlighted = star <= (hoverRating || rating);
        return (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            className="focus:outline-none"
          >
            <StarRatingSVG
              width={24}
              height={24}
              fill={isHighlighted ? "#FFD700" : "#CCCCCC"}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
