"use client";

import React from "react";

export function Progress({ value, className, variant = "default", ...props }) {
  const variantClasses = {
    default: "bg-blue-600",
    destructive: "bg-red-500",
  };

  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}
      {...props}
    >
      <div
        className={`h-full w-full flex-1 transition-all ${variantClasses[variant]}`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
}
