"use client";
// hooks/useMobileRange.js
import { useEffect, useState } from "react";

export const useMobileRange = () => {
  const [isInRange, setIsInRange] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkRange = () => {
      const width = window.innerWidth;
      setIsInRange(width >= 300 && width <= 500);
    };

    checkRange(); // check on mount
    window.addEventListener("resize", checkRange);
    return () => window.removeEventListener("resize", checkRange);
  }, []);

  return isInRange;
};
