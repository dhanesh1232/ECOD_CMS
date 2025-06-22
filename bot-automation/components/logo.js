"use client";

import { ChatBotAI } from "@/public/Images/svg_ecod";

const Logo = ({
  hide = false,
  size = "md",
  isShown = false,
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
            className={`${size === "sm" ? "w-3 h-3" : "w-5 h-5"}`}
            size={size}
          />
        </div>
      )}
      {textShow && (
        <div className={`ml-3 ${textClassName}`}>
          <span
            className={`font-bold ${classSize[size]} text-gray-800 dark:text-white space-y-0 gap-0 relative flex flex-col items-start`}
          >
            ECODrIx
            {isShown && (
              <span className="text-gray-500 dark:text-gray-400 text-[10px] font-semibold -mt-2">
                Premium Dashboard
              </span>
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
