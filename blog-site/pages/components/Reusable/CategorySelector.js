import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const CategorySelector = ({
  page,
  services,
  isLoading = false,
  className = "",
  activeClass = "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
  inactiveClass = "bg-white text-gray-700 hover:text-gray-900",
  darkActiveClass = "dark:from-blue-600 dark:to-blue-700",
  darkInactiveClass = "dark:bg-gray-800 dark:text-gray-300 dark:hover:text-white",
  skeletonCount = 5,
}) => {
  const router = useRouter();
  const { category } = router.query;

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.15 },
    },
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
  };

  if (isLoading) {
    return (
      <div className={`w-full flex justify-center ${className}`}>
        <div className="animate-pulse flex gap-2 md:gap-3">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="h-9 w-20 md:w-24 rounded-full bg-gray-200 dark:bg-gray-700"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <div
        className={`w-full text-center py-4 text-gray-500 dark:text-gray-400 ${className}`}
      >
        No categories available
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        <AnimatePresence initial={false}>
          {services.map((service) => {
            const isActive = category === service.slug;
            return (
              <motion.button
                key={service.slug}
                onClick={() => router.push(`${page}/${service.slug}`)}
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover="hover"
                whileTap="tap"
                className={`px-4 md:px-5 py-2 rounded-full transition-all duration-200 text-sm md:text-base font-medium border
                  ${
                    isActive
                      ? `${activeClass} ${darkActiveClass} shadow-md`
                      : `${inactiveClass} ${darkInactiveClass} border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/70`
                  }`}
                aria-current={isActive ? "page" : undefined}
              >
                {service.label}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-full -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

CategorySelector.propTypes = {
  page: PropTypes.string.isRequired,
  services: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  activeClass: PropTypes.string,
  inactiveClass: PropTypes.string,
  darkActiveClass: PropTypes.string,
  darkInactiveClass: PropTypes.string,
  skeletonCount: PropTypes.number,
};

CategorySelector.defaultProps = {
  isLoading: false,
  className: "",
  activeClass: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
  inactiveClass: "bg-white text-gray-700 hover:text-gray-900",
  darkActiveClass: "dark:from-blue-600 dark:to-blue-700",
  darkInactiveClass:
    "dark:bg-gray-800 dark:text-gray-300 dark:hover:text-white",
  skeletonCount: 5,
};

export default CategorySelector;
