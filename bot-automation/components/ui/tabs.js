import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Tabs = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col w-full", className)} {...props} />
));
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef(({ className, children, ...props }, ref) => {
  const tabs = React.Children.toArray(children);
  const activeTabIndex = tabs.findIndex((tab) => tab.props.isActive);

  return (
    <div
      ref={ref}
      className={cn(
        "relative grid grid-cols-2 w-full max-w-xs bg-muted p-1 rounded-lg",
        className
      )}
      {...props}
    >
      <motion.div
        layout
        className="absolute h-full rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        style={{ width: "50%" }} // or `100% / tabs.length`
        initial={false}
        animate={{ x: `${activeTabIndex * 100}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      {tabs.map((child, index) =>
        React.cloneElement(child, {
          key: index,
        })
      )}
    </div>
  );
});

TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(
  ({ isActive, className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "relative z-10 inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-lg px-4 py-1 text-sm font-medium transition-colors duration-200 ease-in-out ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className,
        isActive ? "text-white" : "hover:text-foreground/80"
      )}
      {...props}
    >
      {children}
    </button>
  )
);
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.2 }}
    className={cn(
      "mt-4 w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
