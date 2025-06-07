"use client";

import { ChatBotAI } from "@/public/Images/svg_ecod";

const Logo = ({ hide = false, size = "md" }) => {
  const classSize = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl",
  };
  return (
    <div className="flex items-center">
      {!hide && (
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-blue-500">
          <ChatBotAI />
        </div>
      )}
      <span
        className={`ml-3 font-bold ${classSize[size]} text-gray-800 dark:text-white relative`}
      >
        ECODrIx
      </span>
    </div>
  );
};

export default Logo;
