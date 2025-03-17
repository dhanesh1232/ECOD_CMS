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
const service_icon = {
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
    title = "No Title",
    description = "No Description",
    color = "text-gray-500",
  } = service;
  const IconComponent = service_icon[icon] || FaTools; // Default to FaTools if icon is invalid

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="text-center">
        <div className="flex justify-center">
          <IconComponent className={`text-4xl ${color}`} />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
