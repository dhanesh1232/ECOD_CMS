import React from "react";
import clsx from "clsx";

export const Textarea = React.forwardRef(
  (
    {
      className,
      variant = "default", // 'default', 'ghost', 'filled'
      size = "md", // 'sm', 'md', 'lg'
      error, // error state
      success, // success state
      disabled = false,
      ...props
    },
    ref
  ) => {
    const baseClasses = `
      flex w-full rounded-md border ring-offset-background
      placeholder:text-muted-foreground focus-visible:outline-none
      disabled:cursor-not-allowed disabled:opacity-50
      transition-all duration-200 ease-in-out
      shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2
    `;

    const sizeClasses = {
      sm: "px-2.5 py-1.5 text-xs min-h-[60px]",
      md: "px-3 py-2 text-sm min-h-[80px]",
      lg: "px-4 py-3 text-base min-h-[100px]",
    };

    const variantClasses = {
      default: `
        bg-background border-input
        focus-visible:ring-ring
        dark:bg-gray-900 dark:border-gray-700
        dark:focus-visible:ring-gray-500
      `,
      ghost: `
        bg-transparent border-transparent
        focus-visible:bg-background focus-visible:border-input
        dark:focus-visible:bg-gray-900 dark:focus-visible:border-gray-700
      `,
      filled: `
        bg-gray-100 border-transparent
        focus-visible:bg-background focus-visible:border-input
        dark:bg-gray-800 dark:focus-visible:bg-gray-900
        dark:focus-visible:border-gray-700
      `,
    };

    const stateClasses = error
      ? `
          border-red-500 dark:border-red-400
          focus-visible:ring-red-200 dark:focus-visible:ring-red-900
        `
      : success
      ? `
          border-green-500 dark:border-green-400
          focus-visible:ring-green-200 dark:focus-visible:ring-green-900
        `
      : "";

    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={clsx(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          stateClasses,
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
