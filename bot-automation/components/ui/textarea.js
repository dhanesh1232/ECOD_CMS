"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

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
    const baseClasses = cn(
      "flex w-full rounded-md border border-gray-300 bg-white ring-offset-white",
      "placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed",
      "disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:ring-offset-gray-900",
      "dark:placeholder:text-gray-400 dark:focus-visible:ring-blue-500"
    );

    const sizeClasses = {
      sm: "px-2.5 py-1.5 text-xs min-h-[60px]",
      md: "px-3 py-2 text-sm min-h-[80px]",
      lg: "px-4 py-3 text-base min-h-[100px]",
    };

    const variantClasses = {
      default: "bg-white dark:bg-gray-900",
      ghost: cn(
        "bg-transparent border-transparent",
        "hover:border-gray-300 focus-visible:border-gray-300",
        "dark:hover:border-gray-700 dark:focus-visible:border-gray-700"
      ),
      filled: cn(
        "bg-gray-100 border-transparent hover:border-gray-300",
        "focus-visible:bg-white focus-visible:border-gray-300",
        "dark:bg-gray-800 dark:hover:border-gray-700",
        "dark:focus-visible:bg-gray-900 dark:focus-visible:border-gray-700"
      ),
    };

    const stateClasses = error
      ? "border-red-500 focus-visible:ring-red-500 dark:border-red-400 dark:focus-visible:ring-red-400"
      : success
      ? "border-green-500 focus-visible:ring-green-500 dark:border-green-400 dark:focus-visible:ring-green-400"
      : "";

    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={cn(
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
