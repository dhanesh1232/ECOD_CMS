import { useRouter } from "next/router";

const CategorySelector = ({ page, services }) => {
  const router = useRouter();
  const category = router.query.category;

  return (
    <div className="w-full flex justify-center flex-wrap gap-3 mt-4">
      {services.map((service) => (
        <button
          key={service.slug}
          onClick={() => router.push(`${page}/${service.slug}`)}
          className={`px-4 py-2 rounded-lg transition ease-in-out duration-150 text-base md:text-lg font-medium 
            ${
              category === service.slug
                ? "bg-blue-500 text-white dark:bg-blue-400 dark:text-gray-900"
                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-green-600 hover:text-white"
            }`}
        >
          {service.label}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
