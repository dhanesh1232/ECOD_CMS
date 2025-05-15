"use client";

import Image from "next/image";
import { cn } from "@/lib/utils"; // Utility for merging classNames

export function Avatar({ children, className = "", size = "md" }) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full border border-muted bg-background",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt = "User profile" }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width: 640px) 32px, 40px"
      priority
    />
  );
}

export function AvatarFallback({ children }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground text-xs sm:text-sm font-medium">
      {children}
    </div>
  );
}
