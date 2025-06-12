import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const Pagination = ({ className, ...props }) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1.5", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

const PaginationLink = ({ className, isActive, isDisabled, ...props }) => (
  <button
    aria-current={isActive ? "page" : undefined}
    disabled={isDisabled}
    className={cn(
      "flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      !isActive &&
        !isDisabled &&
        "hover:bg-accent hover:text-accent-foreground",
      isActive && "bg-primary text-primary-foreground shadow-sm",
      isDisabled && "pointer-events-none opacity-50",
      className
    )}
    {...props}
  />
);

const PaginationPrevious = ({ className, isDisabled, ...props }) => (
  <PaginationLink
    aria-label="Go to previous page"
    isDisabled={isDisabled}
    className={cn("gap-1 pl-2.5 w-24", isDisabled && "opacity-50", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span className="sr-only sm:not-sr-only">Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, isDisabled, ...props }) => (
  <PaginationLink
    aria-label="Go to next page"
    isDisabled={isDisabled}
    className={cn("gap-1 pr-2.5 w-24", isDisabled && "opacity-50", className)}
    {...props}
  >
    <span className="sr-only sm:not-sr-only">Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, ...props }) => (
  <span
    className={cn(
      "flex h-10 w-10 items-center justify-center",
      "text-muted-foreground",
      className
    )}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
