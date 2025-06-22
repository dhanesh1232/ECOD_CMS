"use client";

import { cn } from "@/lib/utils";
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
      "flex w-full items-center rounded-md border border-gray-300 bg-white ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:ring-offset-gray-900 dark:placeholder:text-gray-400 dark:focus-visible:ring-blue-500";

    const sizeClasses = {
      sm: "h-8 px-2.5 py-1.5 text-xs",
      md: "h-10 px-3 py-2 text-sm",
      lg: "h-12 px-4 py-3 text-base",
    };

    const variantClasses = {
      default: "bg-white dark:bg-gray-900",
      ghost:
        "bg-transparent border-transparent hover:border-gray-300 focus-visible:border-gray-300 dark:hover:border-gray-700 dark:focus-visible:border-gray-700",
      filled:
        "bg-gray-100 border-transparent hover:border-gray-300 focus-visible:bg-white focus-visible:border-gray-300 dark:bg-gray-800 dark:hover:border-gray-700 dark:focus-visible:bg-gray-900 dark:focus-visible:border-gray-700",
    };

    const stateClasses = error
      ? "border-red-500 focus-visible:ring-red-500 dark:border-red-400 dark:focus-visible:ring-red-400"
      : success
      ? "border-green-500 focus-visible:ring-green-500 dark:border-green-400 dark:focus-visible:ring-green-400"
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
          className={cn(
            baseClasses,
            sizeClasses[size],
            variantClasses[variant],
            stateClasses,
            iconClasses,
            className
          )}
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
