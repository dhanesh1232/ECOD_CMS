"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { blogs } from "@/data/blog-posts";
import { MoveLeft, MoveRight } from "lucide-react";
import { blog_services } from "@/data/service_blogs";
import Head from "next/head";

const CategorySelector = dynamic(() =>
  import("./components/Reusable/CategorySelector")
);
const BlogCard = dynamic(() => import("./components/BlogCard"));
const BackAndForward = dynamic(() => import("./components/Reusable/back-forw"));
const SearchComponent = dynamic(() => import("./components/Reusable/search"));

const BlogPosts = () => {
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

  const handleSearch = (query) => {
    setSearchQuery(query);
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
        {/* Page Title */}
        <title>Blog Posts - Blog Site</title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Read our latest blog posts on various topics."
        />

        {/* Open Graph Meta Tags (for social media) */}
        <meta property="og:title" content="Blog Posts - Blog Site" />
        <meta
          property="og:description"
          content="Read our latest blog posts on various topics."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/blog-posts" />
        <meta
          property="og:image"
          content="https://yourwebsite.com/images/blog-posts-og-image.jpg"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog Posts - Blog Site" />
        <meta
          name="twitter:description"
          content="Read our latest blog posts on various topics."
        />
        <meta
          name="twitter:image"
          content="https://yourwebsite.com/images/blog-posts-twitter-image.jpg"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://yourwebsite.com/blog-posts" />

        {/* Schema Markup (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Blog Site",
            description: "Read our latest blog posts on various topics.",
            url: "https://yourwebsite.com/blog-posts",
            image: "https://yourwebsite.com/images/blog-posts-og-image.jpg",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://yourwebsite.com/blog-posts",
            },
            publisher: {
              "@type": "Organization",
              name: "Blog Site",
              logo: {
                "@type": "ImageObject",
                url: "https://yourwebsite.com/images/logo.png",
              },
            },
          })}
        </script>
      </Head>

      <div className="max-w-6xl mx-auto px-6 py-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
        <BackAndForward forward="/blogs" />

        <hr className="my-4 border-gray-300 dark:border-gray-600" />

        {/* Page Title */}
        <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-8">
          Our Latest Blog Posts
        </h1>

        {/* Search Input */}
        <SearchComponent
          filterSearch={handleSearch}
          searchValue={searchQuery}
        />

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedBlogs.length > 0 ? (
            selectedBlogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))
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
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 1
                  ? "bg-gray-300 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-500"
              }`}
            >
              <MoveLeft className="w-4 h-4" /> Prev
            </button>

            <span className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === totalPages
                  ? "bg-gray-300 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-500"
              }`}
            >
              Next <MoveRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bottom Navigation - Service Blogs */}
        <div className="mt-16 border-t border-gray-300 dark:border-gray-600 pt-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Our All Service Blogs
          </h2>
          <CategorySelector page="/blogs" services={blog_services} />
        </div>
      </div>
    </>
  );
};

export default BlogPosts;
