"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Tooltip = ({
  children,
  content,
  placement = "top",
  delay = 300,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const placementClasses = {
    top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
    right: "left-full ml-2 top-1/2 transform -translate-y-1/2",
    left: "right-full mr-2 top-1/2 transform -translate-y-1/2",
    bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && content && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className={`absolute ${placementClasses[placement]} z-50`}
          >
            <div className="bg-gray-800 dark:bg-gray-700 text-white dark:text-gray-100 text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg">
              {content}
              <div
                className={`absolute w-2 h-2 bg-gray-800 dark:bg-gray-700 transform rotate-45 ${
                  placement === "top"
                    ? "bottom-[-2px] left-1/2 -translate-x-1/2"
                    : placement === "right"
                    ? "left-[-2px] top-1/2 -translate-y-1/2"
                    : placement === "left"
                    ? "right-[-2px] top-1/2 -translate-y-1/2"
                    : "top-[-2px] left-1/2 -translate-x-1/2"
                }`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
