import * as React from "react";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
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
      glass: {
        true: "backdrop-blur-md bg-opacity-20 border border-white/20 dark:border-gray-800/20 shadow-lg hover:bg-opacity-30",
      },
    },
    compoundVariants: [
      {
        glass: true,
        variant: [
          "default",
          "primary",
          "secondary",
          "success",
          "danger",
          "warning",
          "info",
          "light",
          "dark",
        ],
        className: "bg-opacity-20 hover:bg-opacity-30",
      },
      {
        glass: true,
        variant: [
          "outline",
          "outline-primary",
          "outline-success",
          "outline-danger",
          "outline-warning",
        ],
        className: "bg-opacity-10 hover:bg-opacity-20",
      },
      {
        glass: true,
        variant: ["ghost", "ghost-primary", "ghost-success"],
        className: "bg-opacity-5 hover:bg-opacity-10",
      },
      {
        variant: ["link", "ghost", "ghost-primary", "ghost-success"],
        className: "!focus:ring-0 !focus:ring-offset-0",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "md",
      glass: false,
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
      glass = false,
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
