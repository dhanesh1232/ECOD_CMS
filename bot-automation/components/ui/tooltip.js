"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipArrow = React.forwardRef(({ className, ...props }, ref) => (
  <TooltipPrimitive.Arrow
    ref={ref}
    className={cn("fill-gray-900 dark:fill-gray-200", className)}
    {...props}
  />
));
TooltipArrow.displayName = TooltipArrow.displayName;

const TooltipContent = React.forwardRef(
  (
    {
      className,
      sideOffset = 4,
      arrow = false,
      arrowClassName,
      animation = "fade",
      duration = 200,
      ...props
    },
    ref
  ) => {
    const animations = {
      fade: "fade-in-0 fade-out-0",
      slide: "slide-in-from-bottom-2 slide-out-to-bottom-2",
      zoom: "zoom-in-95 zoom-out-95",
      bounce:
        "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
    };

    return (
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-[9999] overflow-hidden rounded-md bg-gray-900 dark:bg-gray-200 px-3 py-1.5 text-xs text-gray-50 dark:text-gray-900 shadow-md",
          animations[animation],
          className
        )}
        style={{ "--duration": `${duration}ms` }}
        {...props}
      >
        {props.children}
        {arrow && <TooltipArrow className={arrowClassName} />}
      </TooltipPrimitive.Content>
    );
  }
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipArrow,
};
