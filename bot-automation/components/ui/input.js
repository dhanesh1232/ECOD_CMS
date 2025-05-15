import * as React from "react";

export const Input = React.forwardRef(
  (
    {
      className,
      type = "text",
      variant = "default", // 'default', 'ghost', 'filled'
      size = "md", // 'sm', 'md', 'lg'
      error, // error state
      success, // success state
      icon, // optional icon
      iconPosition = "left", // 'left' or 'right'
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "flex w-full rounded-md border ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-colors";

    const sizeClasses = {
      sm: "h-8 px-2.5 py-1.5 text-xs",
      md: "h-10 px-3 py-2 text-sm",
      lg: "h-12 px-4 py-3 text-base",
    };

    const variantClasses = {
      default:
        "bg-background border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:bg-gray-900 dark:border-gray-700 dark:focus-visible:ring-gray-500",
      ghost:
        "bg-transparent border-transparent focus-visible:bg-background focus-visible:border-input dark:focus-visible:bg-gray-900 dark:focus-visible:border-gray-700",
      filled:
        "bg-gray-100 border-transparent focus-visible:bg-background focus-visible:border-input dark:bg-gray-800 dark:focus-visible:bg-gray-900 dark:focus-visible:border-gray-700",
    };

    const stateClasses = error
      ? "border-red-500 dark:border-red-400 focus-visible:ring-red-200 dark:focus-visible:ring-red-900"
      : success
      ? "border-green-500 dark:border-green-400 focus-visible:ring-green-200 dark:focus-visible:ring-green-900"
      : "";

    const iconClasses = icon ? (iconPosition === "left" ? "pl-9" : "pr-9") : "";

    return (
      <div className="relative w-full">
        {icon && iconPosition === "left" && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={`
            ${baseClasses}
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${stateClasses}
            ${iconClasses}
            ${className || ""}
          `}
          ref={ref}
          {...props}
        />
        {icon && iconPosition === "right" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            {icon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
