"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";
import { blog_services } from "../../data/service_blogs";
import { allBlogs } from "../../data/blogs-all";

const CategorySelector = dynamic(() =>
  import("../components/Reusable/CategorySelector")
);
const BlogCard = dynamic(() => import("../components/BlogCard"));
const SearchComponent = dynamic(() => import("../components/Reusable/search"));
const BackAndForward = dynamic(() =>
  import("../components/Reusable/back-forw")
);
const PaginationComponent = dynamic(() =>
  import("../components/Reusable/pagination")
);

const CategoryBlogs = () => {
  const router = useRouter();
  const postsPerPage = 6;
  const { category } = router.query;
  const categoryBlogs = allBlogs[category] || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBlogs = categoryBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const selectedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + postsPerPage
  );

  const handleSearch = (query) => {
    setSearchTerm(query);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Head>
        <title>
          ECOD Blog -{" "}
          {blog_services.find((s) => s.slug === category)?.name || "Category"}
        </title>
        <meta
          name="description"
          content={`Explore the latest blog posts on ${
            blog_services.find((s) => s.slug === category)?.name
          } at ECOD Blog.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ecod-blog.vercel.app" />
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-6 py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      >
        <BackAndForward back="/blog-posts" forward="/contact" />

        <hr className="my-4 border-gray-300 dark:border-gray-600" />

        <div className="my-6 w-full">
          <CategorySelector page="/blogs" services={blog_services} />
        </div>

        <hr className="my-4 border-gray-300 dark:border-gray-600" />

        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-200 text-center mb-8 transition-colors duration-300">
          {blog_services.find((s) => s.slug === category)?.name || "Blogs"}
        </h1>
        {/* Search Bar */}
        <SearchComponent filterSearch={handleSearch} searchValue={searchTerm} />
        {/* Blog List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedBlogs.length > 0 ? (
            selectedBlogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No blogs found.
            </p>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <PaginationComponent
            prev={handlePrevPage}
            next={handleNextPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}
      </motion.div>
    </>
  );
};

export default CategoryBlogs;
