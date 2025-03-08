"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { testimonials } from "@/data/testi";

const Testimonials = () => {
  return (
    <section className="w-full py-20 px-8 bg-gradient-to-b from-gray-50 to-white text-center relative">
      {/* Heading with Motion Animation */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-2xl md:text-4xl font-extrabold text-gray-900"
      >
        🌟 What Our Clients Say
      </motion.h2>

      {/* Subtitle with Motion Animation */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="mt-4 text-base md:text-lg text-gray-700"
      >
        Hear from businesses that trust our expertise.
      </motion.p>

      {/* Swiper Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        className="mt-12 max-w-5xl mx-auto relative"
      >
        {/* Left Arrow */}
        <button className="swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-gray-800 p-3 transition hover:bg-gray-100 rounded-full">
          <ChevronLeft size={20} />
        </button>

        {/* Right Arrow */}
        <button className="swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-gray-800 p-3 transition hover:bg-gray-100 rounded-full">
          <ChevronRight size={20} />
        </button>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={{ delay: 3500 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                className="p-6 bg-white rounded-lg shadow-lg text-center border border-gray-200 transition hover:shadow-xl"
              >
                {/* Testimonial Image or Initial */}
                {testimonial.image ? (
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-blue-500"
                  />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-200 text-xl font-semibold mx-auto">
                    {testimonial.name.charAt(0)}
                  </div>
                )}

                {/* Testimonial Name and Role */}
                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  {testimonial.name}
                </h3>
                <p className="text-gray-600">{testimonial.role}</p>

                {/* Testimonial Quote */}
                <p className="mt-4 text-gray-700 italic">
                  {`"${testimonial.quote}"`}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Additional Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className="mt-12 max-w-4xl mx-auto"
      >
        <h3 className="text-xl font-semibold text-gray-800">
          Why Businesses Trust Us
        </h3>
        <p className="mt-4 text-gray-700">
          We deliver results-driven strategies tailored to your business goals.
          Our clients love us for our transparency, expertise, and commitment to
          their success.
        </p>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
        className="mt-8"
      >
        <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition transform hover:scale-105">
          Join Our Happy Clients
        </button>
      </motion.div>
    </section>
  );
};

export default Testimonials;
