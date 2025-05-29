export const ChatBotAI = ({
  size = 24,
  primaryColor = "currentColor",
  secondaryColor = "currentColor",
  strokeWidth = 1.8,
  className = "",
  style = {},
}) => {
  return (
    <svg
      className={`chatbot-ai-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      aria-label="Chatbot AI icon"
      role="img"
    >
      {/* Main bot head */}
      <path
        d="M9 2h6v2h3a2 2 0 0 1 2 2v9a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V6a2 2 0 0 1 2-2h3V2z"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Left eye */}
      <circle
        cx="9"
        cy="10"
        r="1"
        fill={secondaryColor}
        stroke={secondaryColor}
        strokeWidth={strokeWidth * 0.8}
      />

      {/* Right eye */}
      <circle
        cx="15"
        cy="10"
        r="1"
        fill={secondaryColor}
        stroke={secondaryColor}
        strokeWidth={strokeWidth * 0.8}
      />

      {/* Mouth */}
      <path
        d="M8 16h8"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};
