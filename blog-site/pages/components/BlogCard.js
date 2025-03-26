"use client";

import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

const BlogCard = ({ blog }) => {
  if (!blog || !blog.category) {
    return null;
  }

  // Generate a consistent color based on blog title for placeholder
  const getPlaceholderColor = (title) => {
    const colors = [
      "bg-green-100",
      "bg-blue-100",
      "bg-purple-100",
      "bg-amber-100",
      "bg-pink-100",
      "bg-indigo-100",
    ];
    const index = title.length % colors.length;
    return colors[index];
  };

  return (
    <Link
      href={`/blog/${blog.category}${blog.slug}`}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-lg dark:hover:shadow-gray-700/50 group"
      aria-label={`Read more about ${blog.title}`}
    >
      {/* Image or Placeholder */}
      <div className="relative w-full h-48 overflow-hidden">
        {blog.image ? (
          <Image
            src={blog.image}
            alt={blog.title}
            width={400}
            height={200}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            priority={false}
            loading="lazy"
          />
        ) : (
          <div
            className={`w-full h-full ${getPlaceholderColor(blog.title)} flex items-center justify-center`}
          >
            <span className="text-4xl font-bold text-gray-700 opacity-30">
              {blog.title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center mb-2">
          {blog.category && (
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              {blog.category}
            </span>
          )}
          {blog.date && (
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              {new Date(blog.date).toLocaleDateString()}
            </span>
          )}
        </div>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {blog.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
          {blog.description}
        </p>
        <div className="text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors">
          Read more →
        </div>
      </div>
    </Link>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.shape({
    category: PropTypes.string,
    slug: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
};

export default BlogCard;
