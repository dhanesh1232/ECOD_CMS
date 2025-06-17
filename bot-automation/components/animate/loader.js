const LoaderThreeDots = ({
  size = 16,
  color = "bg-blue-500",
  speed = "normal",
  spacing = 20,
}) => {
  // Animation speed configuration
  const speedConfig = {
    slow: 1800,
    normal: 1200,
    fast: 600,
  };

  // Size mapping to Tailwind classes
  const sizeClasses = {
    8: "w-2 h-2",
    12: "w-3 h-3",
    16: "w-4 h-4",
    20: "w-5 h-5",
    24: "w-6 h-6",
  };

  // Get animation duration based on speed
  const duration = speedConfig[speed] || speedConfig.normal;

  return (
    <div className="w-full h-screen flex items-center bg-gray-100 dark:bg-gray-800 justify-center">
      <div
        className="flex items-center justify-center h-20"
        style={{ gap: `${spacing}px` }}
      >
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`${sizeClasses[size] || `w-[${size}px] h-[${size}px]`} 
              rounded-full ${color} relative shadow-lg`}
            style={{
              animation: `dot-pulse ${duration}ms cubic-bezier(0.4, 0, 0.6, 1) infinite`,
              animationDelay: `${index * (duration / 3)}ms`,
            }}
          >
            {/* Optional inner glow */}
            <div className="absolute inset-0 rounded-full opacity-30 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoaderThreeDots;
