import * as React from "react";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef(
  ({ className, value = 0, indicatorClass, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-500 ",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full w-full flex-1 bg-primary transition-all ",
          indicatorClass
        )}
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </div>
  )
);

Progress.displayName = "Progress";

export { Progress };
