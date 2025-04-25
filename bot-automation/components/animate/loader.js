const LoaderThreeDots = ({
  size = 16,
  color = "bg-slate-600",
  speed = "normal",
  spacing = 20,
}) => {
  // Animation speed configuration
  const speedConfig = {
    slow: "animate-ping-slow",
    normal: "animate-ping-normal",
    fast: "animate-ping-fast",
  };

  // Size mapping to Tailwind classes
  const sizeClasses = {
    8: "w-2 h-2",
    12: "w-3 h-3",
    16: "w-4 h-4",
    20: "w-5 h-5",
    24: "w-6 h-6",
  };

  // Spacing mapping
  const spacingClasses = {
    4: "space-x-1",
    8: "space-x-2",
    12: "space-x-3",
    16: "space-x-4",
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div
        className={`flex items-center justify-center ${
          spacingClasses[spacing] || `space-x-[${spacing}px]`
        } h-20`}
      >
        <div
          className={`${sizeClasses[size] || `w-[${size}px] h-[${size}px]`} 
          rounded-full ${color} ${speedConfig[speed]} 
          [animation-delay:-0.4s]`}
        ></div>
        <div
          className={`${sizeClasses[size] || `w-[${size}px] h-[${size}px]`} 
          rounded-full ${color} ${speedConfig[speed]} 
          [animation-delay:-0.2s]`}
        ></div>
        <div
          className={`${sizeClasses[size] || `w-[${size}px] h-[${size}px]`} 
          rounded-full ${color} ${speedConfig[speed]}`}
        ></div>
      </div>
    </div>
  );
};

export default LoaderThreeDots;
