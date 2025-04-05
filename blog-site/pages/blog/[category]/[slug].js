"use client";

import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { allBlogs } from "../../../data/blog_data";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiShare2,
  FiBookmark,
  FiClock,
  FiCalendar,
  FiUser,
  FiChevronRight,
  FiMail,
} from "react-icons/fi";
import { format } from "date-fns";
import {
  FaChartLine,
  FaLink,
  FaSearch,
  FaTools,
  FaPalette,
} from "react-icons/fa";
import { RiArticleLine } from "react-icons/ri";

const BlogPost = () => {
  const router = useRouter();
  const { slug, category } = router.query;
  const [blog, setBlog] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Check for bookmarks in localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const bookmarks = JSON.parse(
        localStorage.getItem("blogBookmarks") || "{}"
      );
      setIsBookmarked(bookmarks[slug] || false);
    }
  }, [slug]);

  useEffect(() => {
    if (category && slug) {
      console.log(category, slug);
      const foundBlog = allBlogs[category]?.find(
        (post) => post.slug.replace("/", "") === slug
      );
      setBlog(foundBlog);
    }
  }, [category, slug]);

  useEffect(() => {
    const handleScroll = () => {
      if (blog?.sections) {
        const scrollPosition = window.scrollY + 100;

        for (const section of blog.sections) {
          const element = document.getElementById(section.id);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;

            if (
              scrollPosition >= offsetTop &&
              scrollPosition < offsetTop + offsetHeight
            ) {
              setActiveSection(section.id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [blog]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: blog.title,
          text: blog.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const toggleBookmark = () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);

    if (typeof window !== "undefined") {
      const bookmarks = JSON.parse(
        localStorage.getItem("blogBookmarks") || "{}"
      );
      if (newBookmarkState) {
        bookmarks[slug] = true;
      } else {
        delete bookmarks[slug];
      }
      localStorage.setItem("blogBookmarks", JSON.stringify(bookmarks));
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "graphic-logo-design":
        return <FaPalette className="mr-1" />;
      case "shopify-theme-development":
        return <FaTools className="mr-1" />;
      case "content-marketing":
        return <RiArticleLine className="mr-1" />;
      case "email-marketing":
        return <FiMail className="mr-1" />;
      default:
        return <FaSearch className="mr-1" />;
    }
  };

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-gray-600 text-xl">No blog post found.</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{blog.title} | ECOD</title>
        <meta name="description" content={blog.description} />
        <meta name="keywords" content={blog.metaKeywords.join(", ")} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={blog.date} />
        <meta property="article:modified_time" content={blog.updatedDate} />
        <meta property="article:author" content={blog.author.name} />
        <meta property="article:section" content={blog.category} />
        {blog.imageSrc && <meta property="og:image" content={blog.imageSrc} />}
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-gray-50 dark:bg-gray-900"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              aria-label="Go back"
            >
              <FiArrowLeft className="mr-2" />
              Back
            </button>
            <div className="flex space-x-4">
              <div className="relative">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Share"
                >
                  <FiShare2 className="text-gray-600 dark:text-gray-300" />
                </button>
                {isCopied && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full right-0 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg"
                  >
                    Link copied!
                  </motion.div>
                )}
              </div>
              <button
                onClick={toggleBookmark}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                <FiBookmark
                  className={`${isBookmarked ? "text-primary-500 fill-primary-500" : "text-gray-600 dark:text-gray-300"}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
          {/* Table of Contents - Desktop */}
          {blog.sections && blog.sections.length > 0 && (
            <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24 h-fit">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <FaLink className="mr-2 text-primary-500" />
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {blog.sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${activeSection === section.id ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          <main className="flex-1">
            <motion.article
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sm:p-8 border border-gray-200 dark:border-gray-700"
            >
              {/* Featured Badge */}
              {blog.featured && (
                <div className="mb-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Featured Post
                </div>
              )}

              {/* Post Meta */}
              <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-6 gap-4">
                <span className="flex items-center">
                  <FiUser className="mr-1.5" />
                  {blog.author.name}
                </span>
                <span className="flex items-center">
                  <FiCalendar className="mr-1.5" />
                  {format(new Date(blog.date), "MMMM d, yyyy")}
                  {blog.updatedDate && (
                    <span className="ml-1 text-xs">
                      (Updated:{" "}
                      {format(new Date(blog.updatedDate), "MMM d, yyyy")})
                    </span>
                  )}
                </span>
                <span className="flex items-center">
                  <FiClock className="mr-1.5" />
                  {blog.readTime} read
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs capitalize flex items-center">
                  {getCategoryIcon(blog.category)}
                  {blog.category.replace(/-/g, " ")}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                {blog.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {blog.description}
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-10 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
              >
                {blog.imageSrc ? (
                  <img
                    src={blog.imageSrc}
                    alt={blog.title}
                    className="w-full h-auto max-h-96 object-cover"
                    loading="eager"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextElementSibling.style.display = "flex";
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                    <span className="text-5xl font-bold text-gray-500 dark:text-gray-400">
                      {blog.title.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                {/* Error fallback - hidden by default */}
                <div className="hidden items-center justify-center w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                  <span className="text-5xl font-bold text-gray-500 dark:text-gray-400">
                    {blog.title.charAt(0).toUpperCase()}
                  </span>
                </div>
              </motion.div>

              {/* Table of Contents - Mobile */}
              {blog.sections && blog.sections.length > 0 && (
                <div className="lg:hidden bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-8 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-lg mb-4 flex items-center">
                    <FaLink className="mr-2 text-primary-500" />
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {blog.sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${activeSection === section.id ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </nav>
                </div>
              )}

              {/* Blog Sections */}
              {blog.sections?.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="mb-12 scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <span className="mr-2 text-primary-500">{index + 1}.</span>
                    {section.title}
                  </h2>

                  {/* Content */}
                  <div
                    className="prose dark:prose-invert max-w-none mb-6"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />

                  {/* Stats */}
                  {section.stats && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-6 border border-blue-200 dark:border-blue-800">
                      <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
                        <FaChartLine className="mr-2" />
                        Key Statistics
                      </h3>
                      <ul className="space-y-3">
                        {section.stats.map((stat, i) => (
                          <li key={i} className="flex items-start">
                            <span className="flex-shrink-0 mt-1 mr-3 text-blue-600 dark:text-blue-400">
                              ✓
                            </span>
                            <span>{stat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Details List */}
                  {section.details && (
                    <ul className="space-y-3 mb-6">
                      {section.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <span className="flex-shrink-0 mt-1 mr-3 text-primary-500">
                            <FiChevronRight />
                          </span>
                          <span dangerouslySetInnerHTML={{ __html: detail }} />
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Table */}
                  {section.table && (
                    <div className="overflow-x-auto mb-6">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            {section.table.headers.map((header, i) => (
                              <th
                                key={i}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {section.table.rows.map((row, i) => (
                            <tr key={i}>
                              {row.map((cell, j) => (
                                <td
                                  key={j}
                                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300"
                                  dangerouslySetInnerHTML={{ __html: cell }}
                                />
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Image */}
                  {section.image && (
                    <div className="my-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                      <img
                        src={section.image}
                        alt={section.title}
                        className="w-full h-auto"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Call to Action */}
                  {section.callToAction && (
                    <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800">
                      <div
                        className="prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: section.callToAction,
                        }}
                      />
                    </div>
                  )}
                </section>
              ))}

              {/* Author Bio */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="mt-12 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden flex items-center justify-center">
                    {blog.author.avatar ? (
                      <img
                        src={blog.author.avatar}
                        alt={blog.author.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-bold text-gray-500 dark:text-gray-300">
                        {blog.author.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {blog.author.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {blog.author.bio}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        onClick={() =>
                          router.push(`/blog?category=${blog.category}`)
                        }
                        className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md text-sm font-medium transition-colors"
                      >
                        View all posts
                      </button>
                      <button className="px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium transition-colors">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* FAQs */}
              {blog.faqs && blog.faqs.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {blog.faqs.map((faq, i) => (
                      <div
                        key={i}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                      >
                        <button
                          className="flex items-center justify-between w-full p-4 cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => toggleFAQ(i)}
                        >
                          <h3 className="font-medium text-left">
                            {faq.question}
                          </h3>
                          <motion.svg
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{ rotate: openIndex === i ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </motion.svg>
                        </button>

                        <AnimatePresence>
                          {openIndex === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                                transition: {
                                  height: { duration: 0.4, ease: "easeInOut" },
                                  opacity: { duration: 0.3, ease: "easeInOut" },
                                },
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                                transition: {
                                  height: { duration: 0.3, ease: "easeInOut" },
                                  opacity: { duration: 0.2, ease: "easeInOut" },
                                },
                              }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 bg-white dark:bg-gray-900">
                                <p className="text-gray-700 dark:text-gray-300">
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.article>
          </main>
        </div>

        {/* Related Posts */}
        {blog.relatedPosts && blog.relatedPosts.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-2">
                More {blog.category.replace(/-/g, " ")} Guides You Might Like
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Continue your learning journey with these related articles
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {blog.relatedPosts.map((post, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                >
                  <a href={post.slug} className="block">
                    {post.imageSrc ? (
                      <img
                        src={post.imageSrc}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <FaSearch className="text-3xl text-gray-400" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-200 line-clamp-2">
                        {post.description || "Learn more about this topic"}
                      </p>
                      <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>Read more</span>
                        <FiChevronRight className="ml-1" />
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </motion.div>
    </>
  );
};

export default BlogPost;
