import Link from "next/link";

import { useRouter } from "next/router";
import { services } from "@/Data/service";

const CategorySelector = () => {
  const router = useRouter();
  console.log(router.query.category);
  const category = router.query.category;
  return (
    <div className="w-full flex justify-center flex-wrap gap-3 mt-4">
      {services.map((service) => (
        <button
          key={service.slug}
          onClick={() => {
            router.push(`/blogs/${service.slug}`);
          }}
          className={`${
            category === service.slug
              ? "bg-blue-500 text-white"
              : "hover:bg-green-600 hover:text-white"
          } px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition ease-in-out duration-150`}
        >
          {service.name}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
