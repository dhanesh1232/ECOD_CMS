"use client";

import React, { useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";

const CustomPhoneInputField = React.forwardRef(
  ({ ...inputProps }, inputRef) => (
    <input
      {...inputProps}
      ref={inputRef}
      className={cn(
        "w-full py-2 px-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none",
        inputProps.size === "sm" && "py-1.5 text-xs",
        inputProps.size === "lg" && "py-3 text-base"
      )}
    />
  )
);

CustomPhoneInputField.displayName = "CustomPhoneInputField";

export const StyledPhoneInput = React.forwardRef(
  (
    {
      className,
      value,
      onChange,
      size = "md", // 'sm', 'md', 'lg'
      variant = "default", // 'default', 'ghost', 'filled'
      error,
      success,
      icon,
      iconPosition = "left", // 'left' or 'right'
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "flex w-full items-center rounded-md border ring-offset-background transition-colors focus-within:outline-none disabled:cursor-not-allowed disabled:opacity-50";

    const sizeClasses = {
      sm: "h-8 px-2.5 text-xs",
      md: "h-10 px-3 text-sm",
      lg: "h-12 px-4 text-base",
    };

    const variantClasses = {
      default:
        "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
      ghost:
        "bg-transparent border-transparent focus-within:bg-white dark:focus-within:bg-gray-900 focus-within:border-input",
      filled:
        "bg-gray-100 dark:bg-gray-800 border-transparent focus-within:bg-white dark:focus-within:bg-gray-900 focus-within:border-input",
    };

    const stateClasses = error
      ? "border-red-500 dark:border-red-400 focus-within:ring-red-500"
      : success
      ? "border-green-500 dark:border-green-400 focus-within:ring-green-500"
      : "";

    const iconPadding = icon ? (iconPosition === "left" ? "pl-9" : "pr-9") : "";

    useEffect(() => {
      const root = document.querySelector(".PhoneInput");
      if (!root) return;

      root
        ?.querySelector(".PhoneInputCountry")
        ?.classList.add(
          "pl-3",
          "pr-2",
          "border-r",
          "border-gray-300",
          "dark:border-gray-700"
        );

      root
        ?.querySelector(".PhoneInputCountrySelect")
        ?.classList.add(
          "text-gray-800",
          "dark:text-white",
          "bg-white",
          "dark:bg-gray-900",
          "border-none",
          "pr-6",
          "py-2",
          "cursor-pointer",
          "focus:outline-none",
          "focus:ring-0"
        );

      root
        ?.querySelector(".PhoneInputCountryIcon")
        ?.classList.add(
          "w-6",
          "h-4",
          "rounded-sm",
          "object-cover",
          "shadow-sm",
          "dark:shadow-none"
        );

      root
        ?.querySelector(".PhoneInputCountrySelectArrow")
        ?.classList.add(
          "text-gray-500",
          "dark:text-gray-400",
          "ml-1",
          "transition-transform"
        );
    }, [value]);

    return (
      <div className="relative w-full">
        {icon && iconPosition === "left" && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            {icon}
          </div>
        )}
        <PhoneInput
          ref={ref}
          international
          defaultCountry="IN"
          value={value}
          onChange={onChange}
          {...props}
          className={cn(
            "PhoneInput",
            baseClasses,
            sizeClasses[size],
            variantClasses[variant],
            stateClasses,
            iconPadding,
            className
          )}
          inputComponent={CustomPhoneInputField}
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

StyledPhoneInput.displayName = "StyledPhoneInput";
