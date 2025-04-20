"use client";

import { useEffect, useRef } from "react";
import {
  FaRobot,
  FaBullhorn,
  FaCogs,
  FaChartLine,
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

// Word → Icon map
const wordIconMap = {
  Innovation: <FaLightbulb />,
  Automation: <FaRobot />,
  Marketing: <FaBullhorn />,
  Funnels: <FaSitemap />,
  SEO: <FaSearch />,
  Analytics: <FaChartPie />,
  Growth: <FaRocket />,
  Strategy: <FaCogs />,
  Leads: <FaUserFriends />,
  Conversions: <FaTachometerAlt />,
  Engagement: <FaHandshake />,
  Branding: <FaTags />,
  Optimization: <FaCogs />,
  Content: <FaPencilAlt />,
  Retention: <FaRetweet />,
  Campaigns: <FaAd />,
  Influence: <FaStar />,
  Creativity: <FaPaintBrush />,
  Inspiration: <FaLightbulb />,
  Momentum: <FaBolt />,
};

export default function AutoScrollTags({
  words = defaultWords,
  speed = "fast", // 'slow' | 'medium' | 'fast'
  colorScheme = "cool",
  pauseOnHover = true,
}) {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const animationRef = useRef(null);

  const duplicatedWords = [...words, ...words];

  const speedMap = {
    slow: 60,
    medium: 40,
    fast: 20,
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
      className="bg-gray-100 dark:bg-gray-950 py-3 overflow-hidden w-full border-b border-gray-300 dark:border-gray-700"
      ref={containerRef}
    >
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
              className={`inline-flex items-center text-white mx-4 md:mx-6 text-sm md:text-base px-4 py-2 rounded-full font-medium bg-gradient-to-r ${getGradientClasses(
                colorScheme
              )}`}
            >
              <span className="mr-2">{wordIconMap[word]}</span>
              <span>{word}</span>
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
      return "from-blue-400 to-purple-500 dark:from-cyan-400 dark:to-indigo-600";
    case "neutral":
      return "from-gray-600 to-gray-800 dark:from-gray-300 dark:to-gray-100";
    default:
      return "from-amber-400 to-orange-400 dark:from-purple-600 dark:to-indigo-600";
  }
}
