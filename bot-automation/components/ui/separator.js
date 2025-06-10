import * as React from "react";
import { cn } from "@/lib/utils";

const Separator = React.forwardRef(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      thickness = "px", // 'px', '0.5', '1', '2'
      ...props
    },
    ref
  ) => {
    const thicknessClasses = {
      px: "h-px w-px",
      0.5: "h-0.5 w-0.5",
      1: "h-1 w-1",
      2: "h-2 w-2",
    };

    return (
      <div
        ref={ref}
        role={decorative ? "none" : "separator"}
        aria-orientation={orientation}
        className={cn(
          "shrink-0 bg-gray-200 dark:bg-gray-400",
          orientation === "horizontal"
            ? `w-full ${thicknessClasses[thickness].split(" ")[0]}`
            : `h-full ${thicknessClasses[thickness].split(" ")[1]}`,
          className
        )}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";

export { Separator };
