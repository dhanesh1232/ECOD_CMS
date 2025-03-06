"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import { blogs } from "@/Data/all-posts";
import BlogCard from "../BlogCard";
import { useRouter } from "next/router";

const categories = [
  "shopify",
  "web-development",
  "digital-marketing",
  "google-meta-ads",
];

const HomeBlog = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  if (!blogs || !Array.isArray(blogs) || blogs.length === 0) {
    return <p>No blogs available.</p>;
  }

  return (
    <section className="w-full py-16 px-8 bg-gradient-to-b from-blue-50 to-gray-200 text-center relative">
      {/* Section Title */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
        📝 Latest Blog Posts
      </h2>
      <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
        Stay updated with our latest insights and trends.
      </p>

      {/* Swiper Container */}
      <div className="relative w-full mt-10">
        {/* Left Navigation Button */}
        {activeIndex !== 0 && (
          <button
            type="button"
            className="absolute top-1/2 -left-10 z-10 transform -translate-y-1/2 p-3 bg-white rounded-full shadow-md hover:scale-110 transition-all blog-prev"
          >
            <ChevronLeft size={32} className="text-gray-700" />
          </button>
        )}

        {/* Right Navigation Button */}
        {activeIndex !== blogs.length - 1 && (
          <button
            type="button"
            className="absolute top-1/2 -right-10 z-10 transform -translate-y-1/2 p-3 bg-white rounded-full shadow-md hover:scale-110 transition-all blog-next"
          >
            <ChevronRight size={32} className="text-gray-700" />
          </button>
        )}

        {/* Swiper Component */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          loop={false}
          slidesPerView={1}
          spaceBetween={20}
          centeredSlides={true}
          effect="coverflow"
          coverflowEffect={{
            rotate: 10,
            stretch: 80,
            depth: 150,
            modifier: 1.5,
            slideShadows: true,
          }}
          breakpoints={{
            500: { slidesPerView: 2, spaceBetween: 30 },
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 3, spaceBetween: 50 },
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation={{
            nextEl: ".blog-next",
            prevEl: ".blog-prev",
          }}
          pagination={{
            el: ".blog-pagination",
            clickable: true,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="mySwiper"
        >
          {blogs.map((blog, index) => (
            <SwiperSlide
              key={index}
              className={`shadow-xl bg-white rounded-lg transition-all transform ${
                index === activeIndex
                  ? "scale-100 pointer-events-auto"
                  : "scale-90 opacity-50 pointer-events-none"
              }`}
            >
              <BlogCard blog={blog} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination */}
        <div className="blog-pagination mt-4 flex justify-center space-x-2"></div>
      </div>

      {/* Call-to-Action Buttons */}
      <div className="w-full mt-10 flex justify-center space-x-4">
        <button
          onClick={() => router.push("/blog-posts")}
          className="px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-green-500 hover:scale-105 transition-transform duration-300"
        >
          Latest
        </button>
        <button
          onClick={() => router.push("/blogs/shopify")}
          className="px-8 py-3 border border-green-600 text-green-600 text-lg font-semibold rounded-lg hover:bg-green-600 hover:text-white hover:scale-105 transition-transform duration-300"
        >
          Explore
        </button>
      </div>
    </section>
  );
};

export default HomeBlog;
