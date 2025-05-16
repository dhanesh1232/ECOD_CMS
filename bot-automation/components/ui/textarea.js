import React from "react";
import clsx from "clsx";

export const Textarea = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      disabled = false,
      error = false,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: `
        border-gray-300 focus:border-primary-500 focus:ring-primary-500
        dark:border-gray-600 dark:bg-gray-700 dark:text-white
        dark:focus:border-primary-400 dark:focus:ring-primary-400
      `,
      error: `
        border-red-500 focus:border-red-500 focus:ring-red-500
        dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400
      `,
    };

    const sizes = {
      sm: "py-1 px-2 text-sm",
      default: "py-2 px-3 text-base",
      lg: "py-3 px-4 text-lg",
    };

    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={clsx(
          "w-full rounded-xl border bg-white text-gray-900 shadow-sm",
          "placeholder:text-gray-400 focus:outline-none focus:ring-2",
          "transition-colors duration-200 ease-in-out",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:placeholder:text-gray-400 dark:shadow-none",
          variants[variant] || variants.default,
          sizes[size] || sizes.default,
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
