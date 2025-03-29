export const SEOSVG = ({
  height = 24,
  width = 24,
  color = "currentColor",
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    stroke={color}
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

export const SocialMediaSVG = ({
  height = 24,
  width = 24,
  color = "currentColor",
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    stroke={color}
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export const PPCAdsSVG = ({
  width = 24,
  height = 24,
  color = "currentColor",
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    stroke={color}
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const ContentMarketingSVG = ({
  width = 24,
  height = 24,
  color = "currentColor",
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    stroke={color}
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

export const TrustSVG = ({
  width = 50,
  height = 60,
  color = "currentColor",
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 60"
    width={width}
    height={height}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* E */}
    <path d="M10 10V50H50V40H20V30H40V20H20V10H10Z" fill={color} />
    {/* C */}
    <path
      d="M70 10V50H110V40H80V20H110V10H70Z"
      fill={color}
      fillOpacity="0.8"
    />
    {/* O */}
    <circle cx="145" cy="30" r="20" fill={color} fillOpacity="0.6" />
    <circle cx="145" cy="30" r="15" fill="white" />
    {/* D */}
    <path
      d="M170 10V50H200V40H180V20H200V10H170Z"
      fill={color}
      fillOpacity="0.4"
    />
  </svg>
);

export const CheckSVG = ({
  width = 24,
  height = 24,
  color = "currentColor",
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    stroke={color}
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12L13 20L21 12M5 4v20M5 16h20M5 20v2M5 6h20" />
  </svg>
);
export const StarRatingSVG = ({
  width = 24,
  height = 24,
  fill = "#CCCCCC",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="none"
    className="w-6 h-6 transition-colors duration-200"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
export const VerfiedSVG = ({
  width = 24,
  height = 24,
  color = "currentColor",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const CertifiedSVG = ({
  width = 24,
  height = 24,
  color = "currentColor",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2l1.9 4.6 5.1.4-3.9 3.3 1.2 5-4.3-2.5-4.3 2.5 1.2-5-3.9-3.3 5.1-.4L12 2z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const ECODTAG = ({}) => {
  <svg
    width="200"
    height="100"
    viewBox="0 0 200 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="100%" height="100%" fill="white" />

    <path d="M20,30 H50 V40 H30 V50 H50 V60 H20 Z" fill="#2D89EF" />

    <path
      d="M70,30 A15,15 0 0,1 85,45 A15,15 0 0,1 70,60 H55 V50 H70 A5,5 0 0,0 75,45 A5,5 0 0,0 70,40 H55 V30 H70 Z"
      fill="#2D89EF"
    />

    <circle
      cx="115"
      cy="45"
      r="15"
      fill="none"
      stroke="#2D89EF"
      stroke-width="6"
    />

    <path
      d="M140,30 H150 A15,15 0 0,1 165,45 A15,15 0 0,1 150,60 H140 Z"
      fill="none"
      stroke="#2D89EF"
      stroke-width="6"
    />
  </svg>;
};
