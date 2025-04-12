import React from "react";
import {
  FaCheck,
  FaShieldAlt,
  FaRegHandshake,
  FaWhatsapp,
  FaChartLine,
  FaRobot,
  FaUsers,
  FaGlobe,
} from "react-icons/fa";

const AutoScroll = () => {
  const tickerItems = [
    {
      icon: <FaCheck className="text-green-400" />,
      text: "100% WhatsApp API Compliant",
    },
    {
      icon: <FaShieldAlt className="text-green-400" />,
      text: "GDPR & Data Protection",
    },
    {
      icon: <FaRegHandshake className="text-green-400" />,
      text: "Trusted by 10,000+ Businesses",
    },
    {
      icon: <FaWhatsapp className="text-green-400" />,
      text: "Official WhatsApp Business Partner",
    },
    {
      icon: <FaChartLine className="text-green-400" />,
      text: "95% Message Delivery Rate",
    },
    {
      icon: <FaRobot className="text-green-400" />,
      text: "AI-Powered Automation",
    },
    {
      icon: <FaUsers className="text-green-400" />,
      text: "24/7 Customer Support",
    },
    {
      icon: <FaGlobe className="text-green-400" />,
      text: "Global Infrastructure",
    },
  ];

  return (
    <section className="bg-gray-900 text-white py-3 overflow-hidden w-full">
      <div className="relative w-full">
        {/* Double the items for seamless looping */}
        <div className="flex whitespace-nowrap animate-marquee">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div
              key={index}
              className="inline-flex items-center mx-8 text-sm md:text-base"
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
