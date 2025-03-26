import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const StarRating = ({
  rating = 0,
  setRating,
  starCount = 5,
  size = 24,
  activeColor = "#FFD700",
  inactiveColor = "#CCCCCC",
  readOnly = false,
  className = "",
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const stars = useMemo(
    () => Array.from({ length: starCount }, (_, i) => i + 1),
    [starCount]
  );

  // Event Handlers
  const handleClick = (star) => {
    if (!readOnly && rating !== star) {
      setRating(star);
    }
  };

  const handleMouseEnter = (star) => {
    if (!readOnly) setHoverRating(star);
  };

  const handleMouseLeave = () => {
    if (!readOnly) setHoverRating(0);
  };

  // Calculate fill percentage for partial stars
  const getFillPercentage = (star) => {
    if (hoverRating) return star <= hoverRating ? 100 : 0;
    if (star <= Math.floor(rating)) return 100;
    if (star === Math.ceil(rating) && rating % 1 > 0) return (rating % 1) * 100;
    return 0;
  };

  return (
    <div
      className={`flex items-center ${className}`}
      role="radiogroup"
      aria-label="Star rating"
    >
      {stars.map((star) => {
        const fillPercentage = getFillPercentage(star);
        const isInteractive = !readOnly;
        const isHighlighted = star <= (hoverRating || rating);

        return (
          <motion.button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            className={`focus:outline-none ${isInteractive ? "cursor-pointer" : "cursor-default"}`}
            whileHover={isInteractive ? { scale: 1.1 } : {}}
            whileTap={isInteractive ? { scale: 0.9 } : {}}
            role="radio"
            aria-checked={isHighlighted}
            aria-label={`Rate ${star} out of ${starCount}`}
            tabIndex={isInteractive ? 0 : -1}
          >
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              className="transition-colors duration-150"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id={`partialFill-${star}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset={`${fillPercentage}%`} stopColor={activeColor} />
                  <stop
                    offset={`${fillPercentage}%`}
                    stopColor={inactiveColor}
                  />
                </linearGradient>
              </defs>
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill={
                  fillPercentage === 100
                    ? activeColor
                    : fillPercentage === 0
                      ? inactiveColor
                      : `url(#partialFill-${star})`
                }
              />
            </svg>
          </motion.button>
        );
      })}
      {!readOnly && (
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
          {hoverRating || rating || 0}/{starCount}
        </span>
      )}
    </div>
  );
};

export default StarRating;
