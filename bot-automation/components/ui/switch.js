"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef(({ className, thumbIcon, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Light mode
      "data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300",
      // Dark mode
      "dark:data-[state=checked]:bg-blue-500 dark:data-[state=unchecked]:bg-gray-900",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        `pointer-events-none block h-5 w-5 rounded-full ${
          thumbIcon
            ? "bg-white/70 dark:bg-gray-100/70 flex items-center justify-center"
            : "bg-white dark:bg-gray-100"
        }  shadow-lg ring-0 transition-transform`,

        "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        "transition-all duration-200 ease-in-out"
      )}
    >
      {thumbIcon && thumbIcon}
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
));

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
