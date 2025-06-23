const LoaderThreeDots = ({
  size = 16,
  color = "bg-blue-500",
  speed = "normal",
  spacing = 12,
  center = true, // New prop to control centering behavior
  className = "", // Additional className for container
}) => {
  const speedConfig = {
    slow: 1800,
    normal: 1200,
    fast: 600,
    faster: 400,
    instant: 200,
  };

  const sizeClasses = {
    8: "w-2 h-2",
    12: "w-3 h-3",
    16: "w-4 h-4",
    20: "w-5 h-5",
    24: "w-6 h-6",
    32: "w-8 h-8",
    40: "w-10 h-10",
  };

  const duration = speedConfig[speed] || speedConfig.normal;

  // Container classes with conditional centering
  const containerClasses = `
    ${
      center
        ? "w-full h-screen flex items-center justify-center"
        : "inline-flex items-end"
    }
    ${className}
  `;

  // Background classes (only applied when centered)
  const bgClasses = center ? "bg-gray-100 dark:bg-gray-800" : "";

  return (
    <div className={`${containerClasses} ${bgClasses}`}>
      <div
        className="flex items-end justify-center"
        style={{ gap: `${spacing}px` }}
      >
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`
              ${sizeClasses[size] || `w-[${size}px] h-[${size}px]`}
              ${color} rounded-full dot-wave
              transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.4,1)]
            `}
            style={{
              animationDuration: `${duration}ms`,
              animationDelay: `${(index * duration) / 3}ms`,
              transformOrigin: "center bottom", // More precise transform origin
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoaderThreeDots;
