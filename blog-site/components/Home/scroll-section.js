"use client";

import { useEffect, useRef } from "react";
import {
  FaRobot,
  FaBullhorn,
  FaCogs,
  FaRocket,
  FaSitemap,
  FaSearch,
  FaChartPie,
  FaLightbulb,
  FaPencilAlt,
  FaTags,
  FaHandshake,
  FaTachometerAlt,
  FaRetweet,
  FaAd,
  FaUserFriends,
  FaPaintBrush,
  FaStar,
  FaBolt,
} from "react-icons/fa";

const defaultWords = [
  "Innovation",
  "Automation",
  "Marketing",
  "Funnels",
  "SEO",
  "Analytics",
  "Growth",
  "Strategy",
  "Leads",
  "Conversions",
  "Engagement",
  "Branding",
  "Optimization",
  "Content",
  "Retention",
  "Campaigns",
  "Influence",
  "Creativity",
  "Inspiration",
  "Momentum",
];

// Word → Icon map with specific colors
const wordIconMap = {
  Innovation: <FaLightbulb className="text-yellow-300" />,
  Automation: <FaRobot className="text-teal-400" />,
  Marketing: <FaBullhorn className="text-pink-500" />,
  Funnels: <FaSitemap className="text-indigo-400" />,
  SEO: <FaSearch className="text-blue-400" />,
  Analytics: <FaChartPie className="text-purple-400" />,
  Growth: <FaRocket className="text-red-400" />,
  Strategy: <FaCogs className="text-gray-400" />,
  Leads: <FaUserFriends className="text-green-400" />,
  Conversions: <FaTachometerAlt className="text-amber-400" />,
  Engagement: <FaHandshake className="text-cyan-400" />,
  Branding: <FaTags className="text-fuchsia-400" />,
  Optimization: <FaCogs className="text-emerald-400" />,
  Content: <FaPencilAlt className="text-sky-400" />,
  Retention: <FaRetweet className="text-violet-400" />,
  Campaigns: <FaAd className="text-rose-400" />,
  Influence: <FaStar className="text-yellow-400" />,
  Creativity: <FaPaintBrush className="text-indigo-300" />,
  Inspiration: <FaLightbulb className="text-amber-200" />,
  Momentum: <FaBolt className="text-blue-300" />,
};

// Word to gradient mapping using opposite colors
const wordGradientMap = {
  // Yellow icon → Purple bg
  Innovation: "from-purple-500/90 to-violet-500/90",
  // Teal icon → Red-orange bg
  Automation: "from-rose-500/90 to-orange-500/90",
  // Pink icon → Green bg
  Marketing: "from-emerald-500/90 to-green-500/90",
  // Indigo icon → Amber bg
  Funnels: "from-amber-500/90 to-yellow-500/90",
  // Blue icon → Orange bg
  SEO: "from-orange-500/90 to-amber-500/90",
  // Purple icon → Yellow bg
  Analytics: "from-yellow-500/90 to-amber-500/90",
  // Red icon → Cyan bg
  Growth: "from-cyan-500/90 to-sky-500/90",
  // Gray icon → Blue bg
  Strategy: "from-blue-500/90 to-indigo-500/90",
  // Green icon → Magenta bg
  Leads: "from-fuchsia-500/90 to-pink-500/90",
  // Amber icon → Indigo bg
  Conversions: "from-indigo-500/90 to-blue-500/90",
  // Cyan icon → Red bg
  Engagement: "from-red-500/90 to-rose-500/90",
  // Fuchsia icon → Green bg
  Branding: "from-green-500/90 to-emerald-500/90",
  // Emerald icon → Pink bg
  Optimization: "from-pink-500/90 to-rose-500/90",
  // Sky icon → Orange bg
  Content: "from-orange-500/90 to-amber-500/90",
  // Violet icon → Lime bg
  Retention: "from-lime-500/90 to-green-500/90",
  // Rose icon → Teal bg
  Campaigns: "from-teal-500/90 to-cyan-500/90",
  // Yellow icon → Purple bg
  Influence: "from-purple-500/90 to-violet-500/90",
  // Indigo icon → Yellow bg
  Creativity: "from-yellow-500/90 to-amber-500/90",
  // Amber icon → Indigo bg
  Inspiration: "from-indigo-500/90 to-blue-500/90",
  // Blue icon → Orange bg
  Momentum: "from-orange-500/90 to-amber-500/90",
};

export default function AutoScrollTags({
  words = defaultWords,
  speed = "medium",
  colorScheme = "icon-based",
  pauseOnHover = true,
}) {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const animationRef = useRef(null);

  const duplicatedWords = [...words, ...words];

  const speedMap = {
    extreamslow: 60,
    slow: 50,
    extreammedium: 40,
    medium: 30,
    fast: 20,
    extreamfast: 10,
  };

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    if (!container || !scroller) return;

    const totalWidth = scroller.scrollWidth / 2;
    let currentPosition = 0;

    const animate = () => {
      currentPosition -= 0.5;
      if (currentPosition <= -totalWidth) {
        currentPosition = 0;
      }
      scroller.style.transform = `translateX(${currentPosition}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <section
      className="relative bg-gradient-to-b from-gray-50/80 to-gray-100/50 dark:from-gray-900/90 dark:to-gray-950/80 py-6 overflow-hidden w-full border-t border-b border-gray-200/30 dark:border-gray-800/30 backdrop-blur-lg"
      ref={containerRef}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent opacity-20 pointer-events-none"></div>
      <div
        className="relative w-full"
        style={{
          "--animation-duration": `${speedMap[speed]}s`,
        }}
      >
        <div
          ref={scrollerRef}
          className={`flex whitespace-nowrap will-change-transform animate-marquee ${
            pauseOnHover ? "hover:animate-none" : ""
          }`}
        >
          {duplicatedWords.map((word, index) => (
            <div
              key={`${word}-${index}`}
              className="inline-flex items-center mx-4 md:mx-6 group perspective-1000"
            >
              <div className="relative transition-all duration-500 group-hover:rotate-x-12 group-hover:-translate-y-2 transform-style-preserve-3d">
                <div
                  className={`inline-flex items-center text-white text-sm md:text-base px-4 py-2 rounded-[20px] font-medium bg-gradient-to-r ${
                    colorScheme === "icon-based"
                      ? wordGradientMap[word]
                      : getGradientClasses(colorScheme)
                  } backdrop-blur-md bg-opacity-90 border border-white/30 shadow-lg hover:shadow-xl transition-all`}
                  style={{
                    transform: "translateZ(20px)",
                    textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                  }}
                >
                  <span className="mr-2 transform translate-z-10 drop-shadow-lg">
                    {wordIconMap[word]}
                  </span>
                  <span className="transform translate-z-10 font-semibold">
                    {word}
                  </span>
                </div>
                <div
                  className="absolute inset-0 rounded-[20px] bg-black/30 backdrop-blur-md -z-10 transition-all duration-500 group-hover:opacity-80"
                  style={{
                    transform: "rotateX(75deg) translateZ(-15px)",
                    filter: "blur(8px)",
                    bottom: "-8px",
                    opacity: 0.7,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function getGradientClasses(colorScheme) {
  switch (colorScheme) {
    case "cool":
      return "from-blue-500/90 to-purple-500/90 dark:from-cyan-500/90 dark:to-indigo-600/90";
    case "neutral":
      return "from-gray-600/90 to-gray-800/90 dark:from-gray-300/90 dark:to-gray-100/90";
    case "warm":
      return "from-amber-500/90 to-orange-500/90 dark:from-purple-600/90 dark:to-indigo-600/90";
    default:
      return "from-blue-500/90 to-purple-500/90 dark:from-cyan-500/90 dark:to-indigo-600/90";
  }
}
