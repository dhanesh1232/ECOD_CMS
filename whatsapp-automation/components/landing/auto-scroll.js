import React from "react";
import {
  FaCheck,
  FaShieldAlt,
  FaRegHandshake,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaChartLine,
  FaRobot,
  FaUsers,
  FaGlobe,
} from "react-icons/fa";

const AutoScroll = () => {
  const tickerItems = [
    {
      icon: <FaCheck className="text-green-400 dark:text-green-300" />,
      text: "100% WhatsApp API Compliant",
      platform: "whatsapp",
    },
    {
      icon: <FaShieldAlt className="text-green-400 dark:text-green-300" />,
      text: "GDPR & Data Protection",
    },
    {
      icon: <FaRegHandshake className="text-green-400 dark:text-green-300" />,
      text: "Trusted by 10,000+ Businesses",
    },
    {
      icon: <FaWhatsapp className="text-green-400 dark:text-green-300" />,
      text: "Official WhatsApp Business Partner",
      platform: "whatsapp",
    },
    {
      icon: <FaFacebook className="text-blue-400 dark:text-blue-300" />,
      text: "Facebook Messenger Integration",
      platform: "facebook",
    },
    {
      icon: <FaInstagram className="text-pink-400 dark:text-pink-300" />,
      text: "Instagram DM Automation",
      platform: "instagram",
    },
    {
      icon: <FaChartLine className="text-green-400 dark:text-green-300" />,
      text: "95% Message Delivery Rate",
    },
    {
      icon: <FaRobot className="text-green-400 dark:text-green-300" />,
      text: "AI-Powered Automation",
    },
    {
      icon: <FaUsers className="text-green-400 dark:text-green-300" />,
      text: "24/7 Customer Support",
    },
    {
      icon: <FaGlobe className="text-green-400 dark:text-green-300" />,
      text: "Global Infrastructure",
    },
  ];

  // Get platform-specific color
  const getPlatformColor = (platform) => {
    switch (platform) {
      case "whatsapp":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200";
      case "facebook":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200";
      case "instagram":
        return "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
    }
  };

  return (
    <section className="bg-gray-900 dark:bg-gray-950 text-white py-3 overflow-hidden w-full border-b border-gray-800 dark:border-gray-700">
      <div className="relative w-full">
        {/* Double the items for seamless looping */}
        <div className="flex whitespace-nowrap animate-marquee">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div
              key={index}
              className={`inline-flex items-center mx-6 md:mx-8 text-sm md:text-base px-3 py-1 rounded-full ${
                item.platform
                  ? getPlatformColor(item.platform)
                  : "bg-gray-800 dark:bg-gray-800/50"
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AutoScroll;
