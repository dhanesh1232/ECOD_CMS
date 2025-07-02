import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border-none font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Solid variants
        default:
          "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900",
        primary:
          "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800",
        secondary:
          "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800",
        success:
          "bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800",
        warning:
          "bg-yellow-500 text-gray-900 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700",
        info: "bg-cyan-500 text-white hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700",
        light:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white",
        dark: "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700",

        // Gradient variants
        premium:
          "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90",
        ocean:
          "bg-gradient-to-r from-green-400 to-blue-500 text-white hover:opacity-90",
        sunset:
          "bg-gradient-to-r from-pink-500 to-yellow-500 text-white hover:opacity-90",
        fire: "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:opacity-90",
        forest:
          "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:opacity-90",

        // Outline variants
        outline:
          "border border-gray-200 bg-transparent hover:bg-gray-100 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800",
        "outline-primary":
          "border border-blue-500 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30",
        "outline-success":
          "border border-green-500 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30",
        "outline-danger":
          "border border-red-500 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30",
        "outline-warning":
          "border border-yellow-500 text-yellow-600 hover:bg-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-900/30",

        // Ghost variants
        ghost:
          "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-100",
        "ghost-primary":
          "text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30",
        "ghost-success":
          "text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-2.5 py-0.5",
        lg: "text-base px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const Badge = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
