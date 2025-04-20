import { ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const ServiceCard = ({ service }) => {
  if (!service || !service.href || !service.label) {
    console.error("Invalid service data:", service);
    return null;
  }

  // Generate consistent placeholder color based on service label
  const getPlaceholderColor = (label) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-purple-100 text-purple-800",
      "bg-amber-100 text-amber-800",
      "bg-pink-100 text-pink-800",
      "bg-indigo-100 text-indigo-800",
    ];
    const index = label.length % colors.length;
    return colors[index];
  };

  // Build navigation link
  const nav_link = service.category
    ? `/service/${service.category}/${service.href}`
    : service.href;
  console.log(service);
  return (
    <Link
      href={nav_link}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-2xl"
      aria-label={`Learn more about ${service.label}`}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 h-full flex flex-col"
        whileHover={{ scale: 1.02 }}
      >
        {/* Image container with badge */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          {service?.image_url ? (
            <Image
              src={service.image_url}
              alt={service.label}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={false}
              loading="lazy"
            />
          ) : (
            <div
              className={`w-full h-full ${getPlaceholderColor(service.label).split(" ")[0]} flex items-center justify-center`}
            >
              <span className="text-4xl font-bold opacity-30">
                {service.label.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {service.badge && (
            <div className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full bg-white dark:bg-gray-900 shadow-sm">
              <span
                className={`${getPlaceholderColor(service.label).split(" ")[1]}`}
              >
                {service.badge}
              </span>
            </div>
          )}
        </div>

        {/* Content container */}
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {service.label}
              </h3>
              {service.icon && <span className="text-2xl">{service.icon}</span>}
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">
              {service.description ||
                "Discover our professional services and solutions."}
            </p>

            {service.stats && (
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>{service.stats}</span>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
              <span>{service.cta || "Explore Service"}</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    category: PropTypes.string,
    image_url: PropTypes.string,
    description: PropTypes.string,
    cta: PropTypes.string,
    icon: PropTypes.node,
    badge: PropTypes.string,
    stats: PropTypes.string,
  }).isRequired,
};

export default ServiceCard;
