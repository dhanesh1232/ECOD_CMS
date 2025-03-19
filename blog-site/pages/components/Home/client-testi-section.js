"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { testimonials } from "@/data/testi";
import dynamic from "next/dynamic";

const ClientPop = dynamic(() => import("./client-pop"));
const Buttons = dynamic(() => import("../Reusable/buttons"));

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const Testimonials = () => {
  const [activePop, setActivePop] = useState(false);

  useEffect(() => {
    document.body.style.overflow = activePop ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [activePop]);

  return (
    <section className="w-full py-20 px-6 sm:px-8 bg-gradient-to-b from-gray-50 to-white text-center relative">
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        className="text-3xl md:text-4xl font-extrabold text-gray-900"
      >
        🌟 What Our Clients Say
      </motion.h2>
      <motion.p
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.2 }}
        className="mt-4 text-base md:text-lg text-gray-700"
      >
        Hear from businesses that trust our expertise.
      </motion.p>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.4 }}
        className="my-12 max-w-5xl mx-auto relative p-5"
      >
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          pagination={{
            clickable: true,
            el: ".custom-side-pagination",
            renderBullet: (index, className) => {
              return `<span class="${className} bg-blue-500 hover:bg-blue-600 transition-all duration-300"></span>`;
            },
          }}
          autoplay={{ delay: 3500 }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white rounded-lg shadow-lg text-center border border-gray-200 hover:shadow-xl transition z-50"
              >
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

                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  {testimonial.name}
                </h3>
                <p className="text-gray-600">{testimonial.role}</p>
                <p className="mt-4 text-gray-700 italic">{`"${testimonial.quote}"`}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Side Pagination Bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          className="custom-side-pagination absolute right-1/2 bottom-5 -translate-y-1/2 space-x-2 z-50 cursor-pointer"
        ></motion.div>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.6 }}
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
        <p className="mt-6 text-gray-700 italic">
          Dear client, we’d love to hear about your experience with our service
          and work. Your feedback helps us grow and serve you better!
        </p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <Buttons
          first_label="Join Our Happy Clients"
          icon={true}
          buttonAction={() => setActivePop(true)}
          first_styles="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-500 hover:scale-105 transition-transform duration-300"
        />
      </motion.div>

      {activePop && <ClientPop closePop={() => setActivePop(false)} />}
    </section>
  );
};

export default Testimonials;
