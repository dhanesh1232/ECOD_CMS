"use client";

const ChatBotAi = () => {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M9 2h6v2h3a2 2 0 0 1 2 2v9a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V6a2 2 0 0 1 2-2h3V2z" />
      <circle cx="9" cy="10" r="1" />
      <circle cx="15" cy="10" r="1" />
      <path d="M8 16h8" strokeLinecap="round" />
    </svg>
  );
};
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
          <ChatBotAi />
        </div>
      )}
      <span
        className={`ml-3 font-bold ${classSize.size} text-gray-800 dark:text-white relative`}
      >
        ECOD
        <span className="text-xs absolute -top-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full">
          Rix
        </span>
      </span>
    </div>
  );
};

export default Logo;
