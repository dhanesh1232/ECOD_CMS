"use client";

import { ChatBotAI } from "@/public/Images/svg_ecod";

const Logo = ({
  hide = false,
  size = "md",
  isShown = false,
  className = "",
  iconClassName = "",
  textClassName = "",
}) => {
  const classSize = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl",
  };

  const iconSize = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-12 h-12",
  };

  return (
    <div className={`flex items-center ${className}`}>
      {!hide && (
        <div
          className={`flex items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-blue-500 
          ${iconSize[size]} ${iconClassName}`}
        >
          <ChatBotAI
            className={`${size === "sm" ? "w-3 h-3" : "w-4 h-4"}`}
            size={size}
          />
        </div>
      )}
      <div className={`ml-3 ${textClassName}`}>
        <span
          className={`font-bold ${classSize[size]} text-gray-800 dark:text-white relative flex flex-col items-start`}
        >
          ECODrIx
          {isShown && (
            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium mt-0.5">
              Premium Dashboard
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default Logo;
