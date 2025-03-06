"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import Link from "next/link";
import { MoveLeft, MoveRight, Search } from "lucide-react";
import Image from "next/image";
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
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between relative">
        <Link
          href="/"
          className="text-gray-700 dark:text-gray-300 flex items-center gap-2 hover:text-gray-900 transition"
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

      <hr className="my-4" />
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-8">
        Our Latest Blog Posts
      </h1>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border outline-none rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
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
            className={`px-2 sm:px-4 py-2 text-white text-[10px] sm:text-base rounded-md ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-500"
            }`}
          >
            <MoveLeft className="inline-block w-3 sm:w-5 h-5" /> Prev
          </button>

          <span className="px-2 text-[10px] sm:text-base py-2 text-gray-800 dark:text-white font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-2 sm:px-4 py-2 gap-2 text-white rounded-md text-[10px] sm:text-base ${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-500"
            }`}
          >
            Next <MoveRight className="inline-block w-3 sm:w-5 h-5" />
          </button>
        </div>
      )}
      {/* Bottom Navigation - Service Blogs */}
      <div className="mt-16 border-t pt-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Our All Service Blogs
        </h2>
        <CategorySelector />
      </div>
    </div>
  );
};

export default BlogPosts;
