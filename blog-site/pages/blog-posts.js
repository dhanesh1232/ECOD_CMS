"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import Link from "next/link";
import { MoveLeft, MoveRight, Search } from "lucide-react";
import { useRouter } from "next/router";
const CategorySelector = dynamic(() => import("./components/CategorySelector"));
import { blogs } from "@/Data/all-posts";
import BlogCard from "./components/BlogCard";

const BlogPosts = () => {
  const router = useRouter();
  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const selectedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + postsPerPage
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-700 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white transition"
        >
          <MoveLeft size={20} />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        <button
          type="button"
          className="px-6 py-2 border border-green-500 text-green-500 font-medium rounded-lg shadow-md hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-105"
          onClick={() => router.push("/blogs/digital-marketing")}
        >
          Blogs
        </button>
      </div>

      <hr className="my-4 border-gray-300 dark:border-gray-700" />

      {/* Page Title */}
      <h1 className="text-2xl dark:text-gray-50 md:text-4xl font-extrabold text-center mb-8">
        Our Latest Blog Posts
      </h1>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 outline-none rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-900 dark:text-white transition-colors duration-300"
          />
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {selectedBlogs.length > 0 ? (
          selectedBlogs.map((blog) => <BlogCard key={blog.slug} blog={blog} />)
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 col-span-3">
            No matching blog posts found.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="w-full flex justify-center items-center mt-8 space-x-6 sm:space-x-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentPage === 1
                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-500"
            }`}
          >
            <MoveLeft className="w-4 h-4" /> Prev
          </button>

          <span className="px-4 py-2 text-sm font-semibold dark:text-gray-200 text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentPage === totalPages
                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-500"
            }`}
          >
            Next <MoveRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bottom Navigation - Service Blogs */}
      <div className="mt-16 border-t border-gray-300 dark:border-gray-700 pt-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Our All Service Blogs
        </h2>
        <CategorySelector />
      </div>
    </div>
  );
};

export default BlogPosts;
