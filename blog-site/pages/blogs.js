"use client";

import { blog_services, allBlogs } from "@/data/blog_data";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Search, BookOpen } from "lucide-react";
import { useRouter } from "next/router";
import HeadSEO from "@/components/Reusable/seo_head";
import { motion, AnimatePresence } from "framer-motion";
import { PaginationControls } from "@/hooks/pagination-control";
import { usePagination } from "@/hooks/use-pagination";

const CategorySelector = dynamic(
  () => import("@/components/Reusable/CategorySelector"),
  {
    loading: () => (
      <div className="h-12 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg animate-pulse" />
    ),
  }
);
const BlogCard = dynamic(() => import("@/components/BlogCard"), {
  loading: () => (
    <div className="h-80 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg animate-pulse" />
  ),
});
const BackAndForward = dynamic(() => import("@/components/Reusable/back-forw"));
const SearchComponent = dynamic(() => import("@/components/Reusable/search"));

const BlogPosts = () => {
  const router = useRouter();
  const postsPerPage = 6;
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setFewBlogs] = useState([]);
  useEffect(() => {
    const filteredBlogs = blog_services
      .flatMap((item) => {
        const blogPosts = allBlogs[item.slug];
        return blogPosts ? blogPosts.slice(0, 3) : [];
      })
      .filter((blog) => blog)
      .slice(0, 9);
    setFewBlogs(filteredBlogs);
  }, []);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const {
    currentPage,
    currentItems: selectedBlogs,
    totalPages,
    handlePageChange,
  } = usePagination(filteredBlogs, postsPerPage);

  const handleSearch = (query) => {
    setSearchQuery(query);
    handlePageChange(1);
  };

  return (
    <>
      <HeadSEO
        title="Blog - ECOD"
        description="Stay updated with the latest trends in web development, SEO, and digital marketing. Explore our blog for expert insights and tips."
        canonicalUrl="https://ecoddigital.com/blog"
        ogImage="https://ecoddigital.com/images/blog-og-image.jpg"
        twitterImage="https://ecoddigital.com/images/blog-twitter-image.jpg"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "ECOD Blog",
          description:
            "Stay updated with the latest trends in web development, SEO, and digital marketing.",
          url: "https://ecoddigital.com/blog",
          publisher: {
            "@type": "Organization",
            name: "ECOD",
            logo: "https://ecoddigital.com/images/logo.png",
          },
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <BackAndForward forward="/blogs" />

          <div className="text-center mt-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 text-sm font-medium mb-6"
            >
              <BookOpen className="w-4 h-4 mr-2" /> Latest Insights
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-6">
              Our Latest Blog Posts
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover expert insights on web development, SEO, and digital
              marketing strategies
            </p>
          </div>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <SearchComponent
            filterSearch={handleSearch}
            searchValue={searchQuery}
          />
        </motion.div>

        {/* Blog Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(postsPerPage)].map((_, index) => (
                <div
                  key={index}
                  className="h-80 bg-gray-200/50 dark:bg-gray-800/50 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <motion.div
              key={`page-${currentPage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {selectedBlogs.length > 0 ? (
                selectedBlogs.map((blog, index) => (
                  <motion.div
                    key={blog.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <BlogCard blog={blog} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 text-center py-16">
                  <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    No matching blog posts found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {`Try adjusting your search or filter to find what you're
                    looking for`}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* Service Blogs Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Explore Our Service-Specific Blogs
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Dive deeper into specific topics with our categorized blog posts
            </p>
          </div>

          <CategorySelector page="/blogs" services={blog_services} />
        </motion.div>
      </div>
    </>
  );
};

export default BlogPosts;
