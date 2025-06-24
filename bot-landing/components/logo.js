"use client";

import { ChatBotAI } from "@/public/svg";

const Logo = ({
  hide = false,
  size = "md",
  className = "",
  iconClassName = "",
  textClassName = "",
  textShow = true,
}) => {
  const classSize = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl",
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
            className={`${size === "sm" ? "w-3 h-3" : "w-6 h-6"}`}
            size={size}
          />
        </div>
      )}
      {textShow && (
        <div className={`ml-3 ${textClassName}`}>
          <span
            className={`font-bold ${classSize[size]} text-gray-800 dark:text-white space-y-0 gap-0 p-0 m-0 relative flex flex-col items-start`}
          >
            ECODrIx
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
