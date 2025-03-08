"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { blogs } from "@/data/blog_data";
import BlogCard from "../BlogCard";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const HomeBlog = () => {
  const router = useRouter();
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!blogs || !Array.isArray(blogs) || blogs.length === 0) {
    return (
      <p className="text-gray-800 dark:text-gray-300">No blogs available.</p>
    );
  }

  return (
    <section className="w-full py-16 px-8 bg-gradient-to-b from-blue-200 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-center relative transition-colors duration-300">
      {/* Section Title with Motion Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          📝 Latest Blog Posts
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300">
          Stay updated with our latest insights and trends.
        </p>
      </motion.div>

      {/* Swiper Container with Motion Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="relative w-full mt-10"
      >
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          loop={false}
          slidesPerView={1}
          initialSlide={Math.floor(blogs.length / 2)}
          spaceBetween={30}
          centeredSlides={true}
          effect="coverflow"
          coverflowEffect={{
            rotate: 1,
            stretch: 15,
            depth: 100,
            modifier: 2,
            slideShadows: true,
          }}
          breakpoints={{
            500: { slidesPerView: 2, spaceBetween: 30 },
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 3, spaceBetween: 50 },
          }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{
            el: ".custom-pagination .blog-pagination",
            clickable: true,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="mySwiper"
        >
          {blogs.map((blog, index) => (
            <SwiperSlide
              key={index}
              className={`shadow-xl bg-white dark:bg-gray-800 rounded-xl transition-all transform ${
                index === activeIndex
                  ? "scale-100 pointer-events-auto"
                  : "scale-90 opacity-50 pointer-events-none"
              }`}
            >
              <BlogCard blog={blog} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Call-to-Action Buttons with Motion Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className="w-full mt-10 flex justify-center space-x-4"
      >
        <button
          onClick={() => router.push("/blog-posts")}
          className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:from-green-500 hover:to-teal-500 hover:scale-105 transition-transform duration-300"
        >
          Latest
        </button>
        <button
          onClick={() => router.push("/blogs/shopify")}
          className="px-8 py-3 border border-green-600 text-green-600 dark:text-green-400 dark:border-green-400 text-lg font-semibold rounded-lg hover:bg-green-600 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 hover:scale-105 transition-transform duration-300"
        >
          Explore
        </button>
      </motion.div>
    </section>
  );
};

export default HomeBlog;
