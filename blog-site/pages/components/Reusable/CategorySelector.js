import { useRouter } from "next/router";
import { motion } from "framer-motion";

const CategorySelector = ({ page, services }) => {
  const router = useRouter();
  const category = router.query.category;

  return (
    <div className="w-full">
      {services?.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {services.map((service) => (
            <motion.button
              key={service.slug}
              onClick={() => router.push(`${page}/${service.slug}`)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base font-medium border
                ${
                  category === service.slug
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white dark:from-blue-600 dark:to-blue-700 shadow-md"
                    : "bg-white text-gray-700 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-white border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/70"
                }`}
            >
              {service.label}
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="animate-pulse flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-9 w-20 rounded-full bg-gray-200 dark:bg-gray-700"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
