"use client";

import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FiClock, FiCalendar, FiUser, FiArrowRight } from "react-icons/fi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useState } from "react";

const BlogCard = ({ blog, featured = false }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!blog || !blog.category) {
    return null;
  }

  // Toggle bookmark state
  const toggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    // Here you would typically update your state management or API
  };

  // Generate a consistent color based on blog title for placeholder
  const getPlaceholderColor = (title) => {
    const colors = [
      "bg-green-100 dark:bg-green-900/50",
      "bg-blue-100 dark:bg-blue-900/50",
      "bg-purple-100 dark:bg-purple-900/50",
      "bg-amber-100 dark:bg-amber-900/50",
      "bg-pink-100 dark:bg-pink-900/50",
      "bg-indigo-100 dark:bg-indigo-900/50",
    ];
    const index = title.length % colors.length;
    return colors[index];
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Format category
  const formatCategory = (category) => {
    return category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Link
        href={`/blog/${blog.category}${blog.slug}`}
        className={`block h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-700/30 group transition-all duration-300 ${featured ? "ring-2 ring-primary-500/30" : ""}`}
        aria-label={`Read more about ${blog.title}`}
      >
        {/* Image or Placeholder */}
        <div className="relative w-full h-48 overflow-hidden">
          {blog.imageSrc ? (
            <Image
              src={blog.imageSrc}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition duration-500"
              priority={featured}
              loading={featured ? "eager" : "lazy"}
            />
          ) : (
            <div
              className={`w-full h-full ${getPlaceholderColor(blog.title)} flex items-center justify-center`}
            >
              <span className="text-4xl font-bold text-gray-700 dark:text-gray-300 opacity-50">
                {blog.title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* Featured badge */}
          {blog.featured && (
            <div className="absolute top-3 right-3 shadow-xl bg-gray-800/80 dark:bg-white/80 bg-primary-500 dark:text-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full">
              Featured
            </div>
          )}

          {/* Bookmark button */}
          <button
            onClick={toggleBookmark}
            className="absolute top-3 left-3 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-sm"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            {isBookmarked ? (
              <FaBookmark className="text-primary-500" />
            ) : (
              <FaRegBookmark className="text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        <div className="p-5">
          {/* Category and date */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-medium bg-blue-600 text-white px-2.5 py-1 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400">
              {formatCategory(blog.category)}
            </span>
            <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <FiCalendar className="mr-1" size={12} />
              {formatDate(blog.date)}
            </span>
            {blog.readTime && (
              <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <FiClock className="mr-1" size={12} />
                {blog.readTime}
              </span>
            )}
          </div>

          {/* Title */}
          <h2
            className={`font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 ${featured ? "text-xl" : "text-lg"}`}
          >
            {blog.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {blog.description}
          </p>

          {/* Author (if available) */}
          {blog.author && (
            <div className="flex items-center mt-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 mr-2 flex items-center justify-center overflow-hidden">
                {blog.author.avatar ? (
                  <Image
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    width={24}
                    height={24}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-xs font-medium w-full h-full bg-pink-600 text-white flex items-center justify-center">
                    {blog.author.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <span>{blog.author.name}</span>
            </div>
          )}

          {/* Read more link */}
          <div className="mt-4 flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:text-primary-800 dark:group-hover:text-primary-300 transition-colors">
            Read more
            <FiArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.shape({
    category: PropTypes.string,
    slug: PropTypes.string,
    imageSrc: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    readTime: PropTypes.string,
    featured: PropTypes.bool,
    author: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }).isRequired,
  featured: PropTypes.bool,
};

export default BlogCard;
