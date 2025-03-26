import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

const ServiceCard = ({ service }) => {
  if (!service || !service.href || !service.label) {
    console.error("Invalid service data:", service);
    return null;
  }

  // Generate consistent placeholder color based on service label
  const getPlaceholderColor = (label) => {
    const colors = [
      "bg-blue-100",
      "bg-green-100",
      "bg-purple-100",
      "bg-amber-100",
      "bg-pink-100",
      "bg-indigo-100",
    ];
    const index = label.length % colors.length;
    return colors[index];
  };

  // Build navigation link
  const nav_link = service.category
    ? `/service/${service.category}/${service.href}`
    : service.href;

  return (
    <Link
      href={nav_link}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-2xl"
      aria-label={`Learn more about ${service.label}`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 h-full flex flex-col">
        {/* Image container */}
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
              className={`w-full h-full ${getPlaceholderColor(service.label)} flex items-center justify-center`}
            >
              <span className="text-4xl font-bold text-gray-700 opacity-30">
                {service.label.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Content container */}
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex-grow">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
              {service.label}
            </h3>
            {service.icon && (
              <div className="text-blue-500 dark:text-blue-400 mb-2">
                {service.icon}
              </div>
            )}
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
              {service.description ||
                "Discover our professional services and solutions."}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-4">
            <div className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center space-x-1 group-hover:underline">
              <span>{service.cta || "Explore Service"}</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
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
  }).isRequired,
};

export default ServiceCard;
