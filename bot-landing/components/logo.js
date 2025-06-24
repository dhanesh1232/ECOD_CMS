"use client";

import { ChatBotAI } from "@/public/svg";

const Logo = ({
  hide = false,
  size = "md",
  className = "",
  iconClassName = "",
  textClassName = "",
  textShow = true,
  gradientFrom = "from-green-500",
  gradientTo = "to-blue-500",
  iconColor = "text-white",
  textColor = "text-gray-800 dark:text-white",
  rounded = "rounded-lg",
  shadow = "shadow-sm",
  animation = "hover:scale-100 transition-transform duration-300",
}) => {
  const classSize = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl",
    "2xl": "text-3xl",
  };

  const iconSize = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-12 h-12",
    "2xl": "w-14 h-14",
  };

  const iconInnerSize = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6",
    "2xl": "w-7 h-7",
  };

  return (
    <div className={`flex items-center gap-3 ${className} ${animation}`}>
      {!hide && (
        <div
          className={`flex items-center justify-center ${rounded} ${shadow} bg-gradient-to-r ${gradientFrom} ${gradientTo} 
          ${iconSize[size]} ${iconClassName}`}
        >
          <ChatBotAI
            className={`${iconColor} ${iconInnerSize[size]}`}
            size={size}
          />
        </div>
      )}
      {textShow && (
        <div className={`${textClassName}`}>
          <span
            className={`font-bold ${classSize[size]} ${textColor} tracking-tight leading-none`}
          >
            ECODrIx
            <span className="block text-xs font-normal text-gray-500 dark:text-gray-400 -mt-0.5">
              AI Solutions
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
