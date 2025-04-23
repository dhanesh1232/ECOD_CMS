"use client";
import { useState } from "react";

export default function Tooltip({ content, children }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-block"
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-10 w-64 p-2 mt-1 text-sm text-gray-700 bg-white border border-gray-200 rounded-md shadow-lg">
          {content}
        </div>
      )}
    </div>
  );
}
