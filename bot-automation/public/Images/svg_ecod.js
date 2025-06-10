const CustomIcon = ({
  size = 20,
  primaryColor = "currentColor",
  secondaryColor = "currentColor",
  strokeWidth = 1.8,
  className = "",
  ...props
}) => {
  const { primaryColor: _, secondaryColor: __, ...svgProps } = props;
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: primaryColor,
    strokeWidth,
    className: `nav-icon ${className}`,
    ...svgProps,
  };
};

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
export const BotIcon = (props) => (
  <svg {...CustomIcon(props)}>
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="3" />
    <circle cx="8" cy="16" r="1" fill={props.secondaryColor} />
    <circle cx="16" cy="16" r="1" fill={props.secondaryColor} />
  </svg>
);
export const DashboardIcon = (props) => (
  <svg {...CustomIcon(props)}>
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z" />
  </svg>
);

export const AnalyticsIcon = (props) => (
  <svg {...CustomIcon(props)}>
    <path d="M4 18V6m4 12V10m4 8v-4m4 4V8m4 10V4" />
    {/* Add subtle data points for better visual */}
    <circle cx="4" cy="18" r="0.6" fill={props.secondaryColor} />
    <circle cx="8" cy="12" r="0.6" fill={props.secondaryColor} />
    <circle cx="12" cy="14" r="0.6" fill={props.secondaryColor} />
    <circle cx="16" cy="8" r="0.6" fill={props.secondaryColor} />
    <circle cx="20" cy="4" r="0.6" fill={props.secondaryColor} />
  </svg>
);

export const ConversationsIcon = (props) => (
  <svg {...CustomIcon(props)}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    {/* Add speech bubbles */}
    <path
      d="M8 10h8M8 14h5"
      stroke={`${props.secondaryColor}`}
      strokeWidth={`${props.strokeWidth * 0.8}`}
      strokeLinecap="round"
    />
  </svg>
);

export const TemplatesIcon = (props) => (
  <svg {...CustomIcon(props)}>
    <path d="M9 5H5v4h4V5zm6 0h-4v4h4V5zM9 15H5v4h4v-4zm6 0h-4v4h4v-4z" />
    <path d="M19 5h-2v4h2V5zm0 10h-2v4h2v-4zM9 3H5a2 2 0 0 0-2 2v4h4V5h4V3zm6 0h-4v2h4V3zm4 0h-2v2h2V3z" />
  </svg>
);

export const ContactsIcon = (props) => (
  <svg {...CustomIcon(props)}>
    <path d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5 5 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
  </svg>
);

export const SettingsIcon = (props) => (
  <svg {...CustomIcon(props)}>
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

export const HelpIcon = (props) => (
  <svg {...CustomIcon(props)}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" strokeLinecap="round" />
  </svg>
);
export const AdsAnalyticsIcon = (props) => (
  <svg {...CustomIcon(props)}>
    <path d="M3 3v18h18" />
    <path d="M18 17V9M12 17V5M6 17v-3" stroke={props.secondaryColor} />
    <circle cx="18" cy="17" r="1" fill={props.primaryColor} />
    <circle cx="12" cy="17" r="1" fill={props.primaryColor} />
    <circle cx="6" cy="17" r="1" fill={props.primaryColor} />
  </svg>
);
export const CreativeIcon = (props) => (
  <svg {...CustomIcon(props)}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 9h6v6H9z" fill={props.secondaryColor} />
    <path d="M9 3v6m6-6v6m-6 12v-6m6 6v-6" />
  </svg>
);
export const CampaignsIcon = (props) => (
  <svg {...CustomIcon(props)}>
    <path d="M3 6l9-4 9 4m-9-4v20m-7-8l7 4m0-4l7-4" />
    <circle cx="12" cy="10" r="1" fill={props.secondaryColor} />
  </svg>
);
export const AdsIcon = (props) => (
  <svg {...CustomIcon(props)}>
    <path d="M12 6v15m-7-3l7-9m7 9l-7-9m-5 9h14" />
    <circle cx="5" cy="18" r="1" fill={props.secondaryColor} />
    <circle cx="19" cy="18" r="1" fill={props.secondaryColor} />
  </svg>
);

// Icons (remain the same as in your original code)
export const ArrowLeftIcon = (props) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);

export const CheckCircleIcon = (props) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const XCircleIcon = (props) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const InformationCircleIcon = (props) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const StarIcon = (props) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

export const SpinnerIcon = ({
  color = "blue",
  size = "md",
  className = "",
  ...props
}) => {
  // Color variants
  const colorVariants = {
    blue: "text-blue-500",
    primary: "text-primary",
    secondary: "text-secondary",
    green: "text-green-500",
    red: "text-red-500",
    yellow: "text-yellow-500",
    purple: "text-purple-500",
    white: "text-white",
    black: "text-black",
    premium: "text-gradient-to-r from-yellow-400 via-amber-500 to-orange-500",
  };

  // Size variants
  const sizeVariants = {
    xs: "h-4 w-4",
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-10 w-10",
  };

  // Gradient handling for special colors
  const isGradient = color === "premium";

  return (
    <div className="relative inline-flex">
      <svg
        {...props}
        className={`${sizeVariants[size]} ${
          isGradient ? "" : colorVariants[color]
        } animate-spin ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>

      {/* Gradient overlay for premium spinner */}
      {isGradient && (
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 mask-spinner" />
      )}
    </div>
  );
};
export const VerifiedBadge = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={`w-4 h-4 ${className}`}
    fill="currentColor"
  >
    <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82 1.89 3.2L12 21.04l3.4 1.47 1.89-3.2 3.61-.82-.34-3.7L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" />
  </svg>
);
export const UserIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

export function MenuCouponIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Coupon base (ticket shape) */}
      <path d="M4 8V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
      <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
      <path d="M4 12h16" />

      {/* Perforation lines */}
      <circle cx={8.5} cy={12} r={0.5} fill="currentColor" />
      <circle cx={15.5} cy={12} r={0.5} fill="currentColor" />

      {/* Menu lines inside coupon */}
      <line x1={10} y1={8} x2={18} y2={8} />
      <line x1={10} y1={12} x2={14} y2={12} />
      <line x1={10} y1={16} x2={18} y2={16} />
    </svg>
  );
}
