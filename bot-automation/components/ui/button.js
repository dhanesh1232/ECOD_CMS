import * as React from "react";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-gray-400 disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-offset-gray-900",
  {
    variants: {
      variant: {
        default:
          "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800",
        outline:
          "border border-gray-200 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800",
        subtle:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700",
        ghost:
          "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-100 data-[state=open]:bg-transparent",
        link: "bg-transparent text-gray-900 underline-offset-2 hover:underline dark:text-gray-100",
        premium:
          "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90",
      },
      size: {
        sm: "h-9 px-2 text-sm",
        md: "h-10 py-2 px-4",
        lg: "h-11 px-8 text-sm md:text-lg",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const Button = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      loadingText = "Processing...",
      icon: Icon,
      iconPosition = "left",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={twMerge(
          buttonVariants({ variant, size, className }),
          clsx({
            "flex-row-reverse": iconPosition === "right",
            "cursor-wait": isLoading,
          })
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {loadingText}
          </>
        ) : (
          <>
            {Icon && iconPosition === "left" && (
              <Icon className={clsx("h-4 w-4", { "mr-2": children })} />
            )}
            {children}
            {Icon && iconPosition === "right" && (
              <Icon className={clsx("h-4 w-4", { "ml-2": children })} />
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
