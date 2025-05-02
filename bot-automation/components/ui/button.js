// components/ui/button.jsx
import * as React from "react";

export const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const baseClasses =
      "px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2";
    const variantClasses = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      destructive: "bg-red-600 text-white hover:bg-red-700",
      outline:
        "border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800",
    };

    return (
      <button
        className={`${baseClasses} ${
          variantClasses[variant] || variantClasses.default
        } ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
