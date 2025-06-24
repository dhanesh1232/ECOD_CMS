"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef(
  ({ className, isTheme, thumbIcon, ...props }, ref) => {
    return (
      <SwitchPrimitives.Root
        ref={ref}
        {...props}
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          isTheme
            ? "border border-gray-600 dark:border-gray-300"
            : "border-transparent",
          `bg-transparent dark:transparent ${
            !isTheme &&
            "data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500"
          }`,
          className
        )}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full shadow-md ring-0 transition-all duration-200 ease-in-out",
            "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
            thumbIcon
              ? "bg-transparent flex items-center justify-center"
              : "bg-white dark:bg-gray-100"
          )}
        >
          {thumbIcon && thumbIcon}
        </SwitchPrimitives.Thumb>
      </SwitchPrimitives.Root>
    );
  }
);

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
