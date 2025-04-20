"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { blog_services } from "@/data/blog_data";
import { allBlogs } from "@/data/blog_data";
import { PaginationControls } from "@/hooks/pagination-control";

// Dynamic imports with loading states
const CategorySelector = dynamic(
  () => import("@/components/Reusable/CategorySelector"),
  {
    loading: () => (
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
    ),
  }
);
const BlogCard = dynamic(() => import("@/components/BlogCard"), {
  loading: () => (
    <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
  ),
});
const SearchComponent = dynamic(() => import("@/components/Reusable/search"), {
  loading: () => (
    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
  ),
});
const BackAndForward = dynamic(
  () => import("@/components/Reusable/back-forw"),
  {
    loading: () => (
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
    ),
  }
);

const POSTS_PER_PAGE = 6;

const CategoryBlogs = () => {
  const router = useRouter();
  const { category } = router.query;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when category or search term changes
  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category, searchTerm]);

  // Memoize filtered blogs to avoid unnecessary recalculations
  const { filteredBlogs, totalPages, selectedBlogs } = useMemo(() => {
    const categoryBlogs = allBlogs?.[category] ?? [];
    const filtered = categoryBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blog.tags &&
          blog.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ))
    );

    const total = Math.ceil(filtered.length / POSTS_PER_PAGE);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const selected = filtered.slice(startIndex, startIndex + POSTS_PER_PAGE);

    return {
      filteredBlogs: filtered,
      totalPages: total,
      selectedBlogs: selected,
    };
  }, [category, searchTerm, currentPage]);

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentCategory = blog_services.find((s) => s.slug === category);

  if (!category) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>ECOD Blog - {currentCategory?.name || "Category"}</title>
        <meta
          name="description"
          content={`Explore the latest blog posts on ${
            currentCategory?.name || "various topics"
          } at ECOD Blog.`}
        />
        <meta
          property="og:title"
          content={`ECOD Blog - ${currentCategory?.name || "Category"}`}
        />
        <meta
          property="og:description"
          content={`Explore the latest blog posts on ${
            currentCategory?.name || "various topics"
          } at ECOD Blog.`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://ecod-blog.vercel.app/${category}`}
        />
        <meta
          property="og:image"
          content={`https://ecod-blog.vercel.app/images/${
            currentCategory?.slug || "default"
          }-og-image.jpg`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`ECOD Blog - ${currentCategory?.name || "Category"}`}
        />
        <meta
          name="twitter:description"
          content={`Explore the latest blog posts on ${
            currentCategory?.name || "various topics"
          } at ECOD Blog.`}
        />
        <meta
          name="twitter:image"
          content={`https://ecod-blog.vercel.app/images/${
            currentCategory?.slug || "default"
          }-twitter-image.jpg`}
        />
        <link
          rel="canonical"
          href={`https://ecod-blog.vercel.app/${category}`}
        />
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen"
      >
        <BackAndForward back="/blogs" forward="/contact" />
        <hr className="my-4 border-gray-300 dark:border-gray-600" />

        <div className="my-6 w-full">
          <CategorySelector page="/blogs" services={blog_services} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-200 mb-4">
            {currentCategory?.name || "Blogs"}
          </h1>
          {currentCategory?.description && (
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {currentCategory.description}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <SearchComponent
            filterSearch={handleSearch}
            searchValue={searchTerm}
            placeholder={`Search in ${currentCategory?.name || "blogs"}...`}
          />
        </motion.div>

        {filteredBlogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence initial={false}>
                {selectedBlogs.map((blog) => (
                  <motion.div
                    key={blog.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <BlogCard blog={blog} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-12"
              >
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
              No blogs found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm
                ? `No results for "${searchTerm}" in this category`
                : "No blogs available in this category yet"}
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Search
            </button>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default CategoryBlogs;
