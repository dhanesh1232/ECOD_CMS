"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { services_list_ecod } from "@/data/services_list";
import { services_ecod } from "@/data/service_ecod";

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

const CategoryServices = () => {
  const router = useRouter();
  const postsPerPage = 6;
  const { category } = router.query; // Destructure category from router.query
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Add a loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if router.query is populated
    if (router.isReady) {
      setIsLoading(false);
    }
  }, [router.isReady]);

  // If router.query is not yet available, show a loading state
  if (isLoading || !category) {
    return <p>Loading...</p>;
  }

  const categoryBlogs = services_list_ecod[category] || [];
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
          {services_ecod.find((s) => s.slug === category)?.name || "Category"}
        </title>
        <meta
          name="description"
          content={`Explore the latest blog posts on ${
            services_ecod.find((s) => s.slug === category)?.name
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
        <BackAndForward back="/services" forward="/contact" />
        <hr className="my-4 border-gray-300 dark:border-gray-600" />

        <div className="my-6 w-full">
          <CategorySelector page="/services" services={services_ecod} />
        </div>

        <hr className="my-4 border-gray-300 dark:border-gray-600" />

        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-200 text-center mb-8 transition-colors duration-300">
          {services_ecod.find((s) => s.slug === category)?.name || "Blogs"}
        </h1>

        <SearchComponent filterSearch={handleSearch} searchValue={searchTerm} />

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

export default CategoryServices;
