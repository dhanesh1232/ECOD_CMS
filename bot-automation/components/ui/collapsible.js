"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "@/lib/utils"; // Ensure you have this utility or define `cn` yourself

export const Collapsible = CollapsiblePrimitive.Root;

export const CollapsibleTrigger = React.forwardRef(
  ({ className, ...props }, ref) => (
    <CollapsiblePrimitive.CollapsibleTrigger
      ref={ref}
      className={cn("cursor-pointer", className)}
      {...props}
    />
  )
);
CollapsibleTrigger.displayName =
  CollapsiblePrimitive.CollapsibleTrigger.displayName;

export const CollapsibleContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <CollapsiblePrimitive.CollapsibleContent
      ref={ref}
      className={cn(
        "overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
        className
      )}
      {...props}
    />
  )
);
CollapsibleContent.displayName =
  CollapsiblePrimitive.CollapsibleContent.displayName;
