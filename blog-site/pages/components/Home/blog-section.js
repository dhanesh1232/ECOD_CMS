"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
} from "lucide-react";

import { blogs } from "@/data/blog_data";
import { useRouter } from "next/router";

const fadeInUp = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.1,
      ease: [0.33, 1, 0.68, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const HomeBlog = () => {
  const router = useRouter();
  const swiperRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  if (!blogs || !Array.isArray(blogs) || blogs.length === 0) {
    return (
      <p className="text-gray-800 dark:text-gray-300">No blogs available.</p>
    );
  }

  return (
    <section className="w-full py-20 px-6 sm:px-8 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-center relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-100/50 blur-3xl dark:bg-blue-900/20"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-100/50 blur-3xl dark:bg-purple-900/20"></div>
      </div>

      {/* Section Header */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        className="max-w-4xl mx-auto mb-16 px-4"
      >
        <motion.span
          className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium mb-4 shadow-sm"
          whileHover={{ scale: 1.05 }}
        >
          Latest Insights
        </motion.span>
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Discover Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Blog
          </span>
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Expert articles to help you grow your business
        </motion.p>
      </motion.div>

      {/* Swiper Container */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.6 }}
        className="relative max-w-7xl mx-auto px-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Navigation Arrows */}
        <button
          onClick={() => swiperRef.current?.swiper.slidePrev()}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"} group`}
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={() => swiperRef.current?.swiper.slideNext()}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"} group`}
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl -rotate-1 -z-10"></div>

        <Swiper
          ref={swiperRef}
          modules={[Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
            el: ".blog-pagination",
            renderBullet: (index, className) => {
              return `<span class="${className} bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 w-3 h-3"></span>`;
            },
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.2,
              coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 1,
              },
            },
            768: {
              slidesPerView: 2,
              coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 1,
              },
            },
            1024: {
              slidesPerView: 3,
              coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 1,
              },
            },
          }}
          className="py-10 px-2"
        >
          {blogs.map((blog, index) => (
            <SwiperSlide key={index}>
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="h-full rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300"
              >
                {/* Blog Image */}
                <div className="relative h-48 w-full overflow-hidden group">
                  {blog.image === "" ? (
                    <div className="h-full bg-blue-400 text-white flex items-center justify-center text-3xl">
                      {blog.title.charAt(0)}
                    </div>
                  ) : (
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  {/* Category Tag */}
                  <div className="absolute dark:bg-white bg-black shadow-xl bottom-4 flex items-center justify-center rounded-3xl left-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold text-white dark:text-gray-900 rounded-full`}
                    >
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center mr-4">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-2">
                    {blog.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <button
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group"
                      onClick={() => {
                        router.push(`/blog/${blog.category}${blog.slug}`);
                      }}
                    >
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    <div className="flex -space-x-2">
                      {/* Author avatars would go here */}
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 border-2 border-white dark:border-gray-800"></div>
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 border-2 border-white dark:border-gray-800"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination */}
        <div className="blog-pagination mt-8 flex justify-center gap-2"></div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.8 }}
        className="mt-16"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Explore All Articles
          <ArrowRight className="w-5 h-5" />
        </motion.button>
        <p className="mt-6 text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
          <BookOpen className="w-5 h-5" />
          <span>{blogs.length}+ articles and growing</span>
        </p>
      </motion.div>
    </section>
  );
};

export default HomeBlog;
