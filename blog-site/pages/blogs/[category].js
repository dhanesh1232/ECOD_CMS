"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
const CategorySelector = dynamic(() =>
  import("../components/CategorySelector")
);
import { MoveLeft, MoveRight, Search } from "lucide-react";
import Image from "next/image";
import { services } from "@/Data/service";
import { allBlogs } from "@/Data/blogs-all";
import Head from "next/head";
import BlogCard from "../components/BlogCard";

const CategoryBlogs = () => {
  const router = useRouter();
  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const { category } = router.query;
  const categoryBlogs = allBlogs[category] || [];
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = categoryBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const selectedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + postsPerPage
  );

  return (
    <>
      <Head>
        <title>
          ECOD Blog - {services.find((s) => s.slug === category)?.name}
        </title>
        <meta
          name="description"
          content={`Discover the latest blog posts about ${
            services.find((s) => s.slug === category)?.name
          } at ECOD Blog`}
        />
        <meta
          property="og:title"
          content="ECOD Blog - {services.find((s) => s.slug === category)?.name}"
        />
        <meta
          property="og:description"
          content={`Discover the latest blog posts about ${
            services.find((s) => s.slug === category)?.name
          } at ECOD Blog`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ecod-blog.vercel.app" />
      </Head>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-6 py-12"
      >
        <div className="flex items-center justify-between relative">
          <Link
            href="/blog-posts"
            className="text-gray-700 dark:text-gray-300 flex items-center gap-2 hover:text-gray-900 transition"
          >
            <MoveLeft size={20} />
            <span className="text-sm font-medium">Back to Latest</span>
          </Link>

          <button
            type="button"
            className="px-6 py-1 sm:py-2 border border-green-500 text-green-500 font-medium rounded-lg shadow-md hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-105"
            onClick={() => router.push("/contact")}
          >
            Contact
          </button>
        </div>
        <hr className="my-4" />
        <div className="my-6 w-full">
          <CategorySelector />
        </div>
        <hr className="my-4" />
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-8">
          {services.find((s) => s.slug === category)?.name || "Blogs"}
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full outline-none pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Blog List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedBlogs.length > 0 ? (
            selectedBlogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))
          ) : (
            <p className="text-center text-gray-500">No blogs found.</p>
          )}
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="w-full flex justify-center items-center mt-8 space-x-6 sm:space-x-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-2 sm:px-4 py-2 text-white text-[10px] sm:text-base  rounded-md ${
                currentPage === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-500 hover:scale-105"
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
                  : "bg-green-600 hover:bg-green-500 hover:scale-105"
              }`}
            >
              Next <MoveRight className="inline-block w-3 sm:w-5 h-5" />
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default CategoryBlogs;
