"use client";

import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "@/hooks/mediaQuery";
import { useRef, useState } from "react";
import { Icons } from "../icons";
import Link from "next/link";

const featureIcons = {
  automation: <Icons.automation className="w-5 h-5" />,
  marketing: <Icons.marketing className="w-5 h-5" />,
  integration: <Icons.link className="w-5 h-5" />,
  ai: <Icons.ai className="w-5 h-5" />,
  chatbots: <Icons.chatbots className="w-5 h-5" />,
};

export const BlogSection = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const blogPosts = [
    {
      title: "Maximizing Chatbot ROI Across All Business Sizes",
      excerpt:
        "How businesses from startups to enterprises leverage our platform's tiered features for maximum impact.",
      category: "Chatbots",
      date: "June 5, 2023",
      readTime: "5 min",
      planRelevance: ["starter", "pro", "growth", "enterprise"],
    },
    {
      title: "Advanced Automation: Scaling Beyond Basic Flows",
      excerpt:
        "Unlock Pro plan features to create complex workflows that handle 10,000+ monthly conversations.",
      category: "Automation",
      date: "May 22, 2023",
      readTime: "7 min",
      planRelevance: ["pro", "growth", "enterprise"],
    },
    {
      title: "Enterprise-Grade Chatbot Security & Compliance",
      excerpt:
        "How our Enterprise plan meets HIPAA requirements with dedicated instances and data residency controls.",
      category: "Integration",
      date: "May 10, 2023",
      readTime: "9 min",
      planRelevance: ["enterprise"],
    },
    {
      title: "From Free to Growth: Scaling Your Chatbot Strategy",
      excerpt:
        "When and how to upgrade through our plan tiers as your business needs evolve.",
      category: "Marketing",
      date: "April 28, 2023",
      readTime: "6 min",
      planRelevance: ["free", "starter", "pro", "growth"],
    },
    {
      title: "AI Model Training: Growth Plan Deep Dive",
      excerpt:
        "How to leverage custom AI model training available in Growth and Enterprise plans.",
      category: "AI",
      date: "April 15, 2023",
      readTime: "8 min",
      planRelevance: ["growth", "enterprise"],
    },
    {
      title: "Starter Plan Success: Small Business Case Studies",
      excerpt:
        "How solopreneurs maximize the Starter plan's 3 chatbots and 3,000 monthly messages.",
      category: "Chatbots",
      date: "March 30, 2023",
      readTime: "5 min",
      planRelevance: ["starter"],
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const goToSlide = (index) => {
    sliderRef.current.slickGoTo(index);
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Platform Insights & Best Practices
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl">
            {`Learn how to maximize each plan's features from basic automation to
            enterprise-scale deployments.`}
          </p>
        </div>
        <motion.button
          whileHover={{ x: 4 }}
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium "
        >
          <Link
            href="/blogs"
            className="inline-flex items-center transition-colors group"
          >
            Explore all
            <Icons.chevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.button>
      </div>

      {isDesktop ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(0, 3).map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <div className="h-48 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center">
                <div className="text-6xl opacity-80 group-hover:opacity-100 transition-opacity">
                  {featureIcons[post.category.toLowerCase()] || (
                    <Icons.chatbots className="w-16 h-16" />
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200">
                    {featureIcons[post.category.toLowerCase()] || (
                      <Icons.chatbots className="w-3 h-3" />
                    )}
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {post.readTime} read
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm truncate text-gray-500 dark:text-gray-400">
                    {post.date}
                  </span>
                </div>
                <div className="border-t my-2 border-gray-200 dark:border-gray-700" />
                <div className="flex w-full flex-wrap justify-start gap-2">
                  {post.planRelevance.map((plan) => (
                    <span
                      key={plan}
                      className={`text-xs px-2 capitalize font-semibold py-1.5 rounded-xl ${
                        plan === "enterprise"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200"
                          : plan === "growth"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                          : plan === "pro"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                          : plan === "starter"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {plan}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="blog-slider relative">
          <Slider ref={sliderRef} {...sliderSettings}>
            {blogPosts.slice(0, 3).map((post, index) => (
              <div key={index} className="px-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group relative h-full overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
                >
                  <div className="h-48 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center">
                    <div className="text-6xl opacity-80 group-hover:opacity-100 transition-opacity">
                      {featureIcons[post.category.toLowerCase()] || (
                        <Icons.chatbots className="w-16 h-16" />
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200">
                        {featureIcons[post.category.toLowerCase()] || (
                          <Icons.chatbots className="w-3 h-3" />
                        )}
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {post.readTime} read
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {post.excerpt.slice(0, 50) + `...`}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-sm truncate text-gray-500 dark:text-gray-400">
                        {post.date}
                      </span>
                    </div>
                    <div className="border-t my-2 border-gray-200 dark:border-gray-700" />
                    <div className="flex w-full flex-wrap justify-start gap-2">
                      {post.planRelevance.map((plan) => (
                        <span
                          key={plan}
                          className={`text-xs px-2 capitalize font-semibold py-1.5 rounded-xl ${
                            plan === "enterprise"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200"
                              : plan === "growth"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                              : plan === "pro"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                              : plan === "starter"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                          }`}
                        >
                          {plan}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                </motion.div>
              </div>
            ))}
          </Slider>
          <div className="flex justify-center mt-10 space-x-2">
            {blogPosts.slice(0, 3).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  currentSlide % blogPosts.length === index
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 w-6 md:w-8"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          {/* Custom Arrows */}
          <button
            onClick={() => sliderRef.current.slickPrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 md:-ml-8 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10 group"
            aria-label="Previous testimonial"
          >
            <Icons.chevronLeft className="h-6 w-6 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-800 dark:group-hover:text-indigo-300 transition-colors" />
          </button>
          <button
            onClick={() => sliderRef.current.slickNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-6 md:-mr-8 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10 group"
            aria-label="Next testimonial"
          >
            <Icons.chevronRight className="h-6 w-6 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-800 dark:group-hover:text-indigo-300 transition-colors" />
          </button>
        </div>
      )}
    </section>
  );
};
