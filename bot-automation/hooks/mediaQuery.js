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

export const useSettingsExpand = () => {
  const [inRange, SetInRange] = useState(false);
  useEffect(() => {
    const checkRange = () => {
      const width = window.innerWidth;
      SetInRange(width >= 768 && width <= 950);
    };
    checkRange(); // check on mount
    window.addEventListener("resize", checkRange);
    return () => window.removeEventListener("resize", checkRange);
  });
  return inRange;
};
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}
