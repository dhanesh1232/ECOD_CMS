const LoadingSpinner = ({
  size = "md",
  color = "primary",
  className = "",
  fullScreen = false,
}) => {
  const sizeClasses = {
    xs: "h-3 w-3 border-2",
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
    xl: "h-16 w-16 border-4",
  };

  const colorClasses = {
    primary:
      "border-t-blue-500 border-r-blue-500 border-b-blue-300 border-l-blue-300",
    white: "border-t-white border-r-white border-b-gray-200 border-l-gray-200",
    gray: "border-t-gray-500 border-r-gray-500 border-b-gray-300 border-l-gray-300",
    dark: "border-t-gray-800 border-r-gray-800 border-b-gray-400 border-l-gray-400",
  };

  const spinner = (
    <div
      className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      style={{ animationDuration: "0.75s" }}
    />
  );

  if (fullScreen) {
    return (
      <div className="h-full w-full fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
