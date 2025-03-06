"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { testimonials } from "@/Data/testi";
const Testimonials = () => {
  return (
    <section className="w-full py-20 px-8 bg-gradient-to-b from-gray-50 to-white text-center relative">
      <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900">
        🌟 What Our Clients Say
      </h2>
      <p className="mt-4 text-base md:text-lg text-gray-700">
        Hear from businesses that trust our expertise.
      </p>

      <div className="mt-12 max-w-5xl mx-auto relative">
        {/* Left Arrow */}
        <button className="swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-gray-800 p-3 transition">
          <ChevronLeft size={20} />
        </button>

        {/* Right Arrow */}
        <button className="swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-gray-80 p-3 transition">
          <ChevronRight size={20} />
        </button>

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
              <div className="p-6 bg-white rounded-lg shadow-lg text-center border border-gray-200 transition hover:shadow-xl">
                {!testimonial.image ? (
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

                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  {testimonial.name}
                </h3>
                <p className="text-gray-600">{testimonial.role}</p>
                <p className="mt-4 text-gray-700 italic">
                  {`"${testimonial.quote}"`}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination */}
        <div className="custom-pagination mt-8 flex justify-center"></div>
      </div>
    </section>
  );
};

export default Testimonials;
