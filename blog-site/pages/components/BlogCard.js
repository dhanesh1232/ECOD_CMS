"use client";

const { default: Image } = require("next/image");
const { default: Link } = require("next/link");

const BlogCard = ({ blog }) => {
  if (!blog || !blog.category) {
    return null;
  }
  return (
    <Link
      href={`/blog/${blog.category}${blog.slug}`}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
    >
      {/* Image or Placeholder */}
      {blog.image ? (
        <Image
          src={blog.image}
          alt={blog.title}
          width={400}
          height={200}
          style={{ objectFit: "cover" }}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-green-200 flex items-center justify-center text-4xl font-bold text-gray-800">
          {blog.title.charAt(0)}
        </div>
      )}

      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {blog.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {blog.description}
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;
