"use client";
const { FaRobot } = require("react-icons/fa");

const Logo = ({ hide = false, size = "md" }) => {
  const classSize = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
    xl: "text-8xl",
  };
  return (
    <div className="flex items-center">
      {!hide && (
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-blue-500">
          <FaRobot className="text-white text-lg" />
        </div>
      )}
      <span
        className={`ml-3 font-bold ${classSize.size} text-gray-800 dark:text-white relative`}
      >
        ECOD
        <span className="text-xs absolute -top-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full">
          Ify
        </span>
      </span>
    </div>
  );
};

export default Logo;
