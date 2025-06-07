import * as React from "react";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 focus:ring-gray-400 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 focus:ring-red-500 dark:focus:ring-red-500 dark:focus:ring-offset-gray-900",
        outline:
          "border border-gray-200 bg-transparent hover:bg-gray-100 dark:text-gray-100 dark:border-gray-50 dark:hover:bg-gray-800 focus:ring-gray-400 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900",
        subtle:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 focus:ring-gray-400 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900",
        ghost:
          "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-100 data-[state=open]:bg-transparent focus:ring-gray-400 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900",
        link: "bg-transparent text-gray-900 underline-offset-2 hover:underline dark:text-gray-100 focus:ring-gray-400 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900",
        premium:
          "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 focus:ring-blue-400 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900",
      },
      size: {
        xs: "h-7 px-2 text-xs",
        sm: "h-8 px-3 text-sm",
        md: "h-9 px-4 text-base",
        lg: "h-10 px-6 text-lg",
        icon: "h-9 w-9 p-0",
        iconSm: "h-7 w-7 p-0",
      },
      fullWidth: {
        true: "w-full",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    compoundVariants: [
      {
        variant: ["link", "ghost"],
        className: "!focus:ring-0 !focus:ring-offset-0",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "md",
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
      asChild = false,
      loader,
      fullWidth,
      rounded,
      ...props
    },
    ref
  ) => {
    const renderContent = () => {
      if (isLoading) {
        return (
          <>
            {loader || (
              <Loader2
                className={clsx("animate-spin", {
                  "mr-2 h-4 w-4": !!loadingText || !!children,
                  "h-4 w-4": !loadingText && !children,
                })}
              />
            )}
            {loadingText || children}
          </>
        );
      }

      return (
        <>
          {Icon && iconPosition === "left" && (
            <Icon
              className={clsx({
                "mr-2 h-4 w-4": !!children,
                "h-4 w-4": !children,
              })}
            />
          )}
          {children}
          {Icon && iconPosition === "right" && (
            <Icon
              className={clsx({
                "ml-2 h-4 w-4": !!children,
                "h-4 w-4": !children,
              })}
            />
          )}
        </>
      );
    };

    if (asChild) {
      const child = React.Children.only(children);
      return React.cloneElement(child, {
        className: twMerge(
          buttonVariants({ variant, size, fullWidth, rounded, className }),
          clsx({
            "flex-row-reverse": iconPosition === "right",
            "cursor-wait": isLoading,
          }),
          child.props.className
        ),
        disabled: isLoading || props.disabled,
        "aria-busy": isLoading,
        ...props,
      });
    }

    return (
      <button
        className={twMerge(
          buttonVariants({ variant, size, fullWidth, rounded, className }),
          clsx({
            "flex-row-reverse": iconPosition === "right" && !isLoading,
            "cursor-wait": isLoading,
          })
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        aria-busy={isLoading}
        {...props}
      >
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
