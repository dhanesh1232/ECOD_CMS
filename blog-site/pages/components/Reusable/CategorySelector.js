import { useRouter } from "next/router";
import PropTypes from "prop-types";

const CategorySelector = ({
  page,
  services,
  isLoading = false,
  className = "",
  selectClassName = "",
  darkModeClasses = "dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
}) => {
  const router = useRouter();
  const { category } = router.query;

  const handleChange = (e) => {
    router.push(`${page}/${e.target.value}`);
  };

  if (isLoading) {
    return (
      <div className={`w-full max-w-xl mx-auto ${className}`}>
        <div className="animate-pulse h-12 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <div
        className={`w-full max-w-xl mx-auto text-center py-4 text-gray-500 dark:text-gray-400 ${className}`}
      >
        No options available
      </div>
    );
  }

  return (
    <div className={`w-full max-w-xl mx-auto ${className}`}>
      <select
        onChange={handleChange}
        value={category || ""}
        className={`w-full h-12 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${darkModeClasses} ${selectClassName}`}
      >
        <option value="">Select a category</option>
        {services.map((option, ind) => (
          <option key={ind} value={option.slug}>
            {option.label}
          </option>
        ))}
      </select>
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
  selectClassName: PropTypes.string,
  darkModeClasses: PropTypes.string,
};

CategorySelector.defaultProps = {
  isLoading: false,
  className: "",
  selectClassName: "",
  darkModeClasses: "dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
};

export default CategorySelector;
