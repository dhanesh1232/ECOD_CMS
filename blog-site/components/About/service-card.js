import { motion } from "framer-motion";
import {
  FaShopify,
  FaTools,
  FaHeadset,
  FaChartLine,
  FaCode,
  FaBullhorn,
  FaGoogle,
  FaPaintBrush,
  FaSearch,
  FaReact,
} from "react-icons/fa";

// Icon mapping object
const serviceIcons = {
  shopify: FaShopify,
  react: FaReact,
  tools: FaTools,
  headset: FaHeadset,
  chartLine: FaChartLine,
  code: FaCode,
  bullhorn: FaBullhorn,
  google: FaGoogle,
  paintBrush: FaPaintBrush,
  search: FaSearch,
};

const ServiceCard = ({ service = {} }) => {
  const {
    icon = "tools",
    title = "Service Title",
    description = "Comprehensive service description goes here.",
    color = "text-blue-600",
    hoverColor = "text-blue-700",
    cta = "Learn More",
    features = [],
  } = service;

  const IconComponent = serviceIcons[icon] || FaTools;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{
        duration: 0.4,
        type: "spring",
      }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition-all duration-300 h-full flex flex-col border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800"
    >
      <div className="flex flex-col h-full">
        {/* Icon with animated background */}
        <div className="flex justify-center mb-4">
          <motion.div
            className={`p-4 rounded-full bg-gradient-to-br from-blue-50 to-white dark:from-gray-700 dark:to-gray-800 group-hover:from-blue-100 dark:group-hover:from-gray-600 transition-colors duration-300 ${color} group-hover:${hoverColor}`}
            whileHover={{ rotate: 15, scale: 1.1 }}
          >
            <IconComponent className="text-3xl" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>

          {/* Features list */}
          {features.length > 0 && (
            <ul className="mb-5 space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CTA Button */}
        <motion.div
          whileHover={{ x: 2 }}
          className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700"
        >
          <button className="text-blue-600 dark:text-blue-400 font-medium flex items-center group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
            {cta}
            <span className="ml-1 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
