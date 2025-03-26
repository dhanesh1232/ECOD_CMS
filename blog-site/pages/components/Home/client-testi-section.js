"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { testimonials } from "@/data/testi";
import dynamic from "next/dynamic";
import { Quote, Star } from "lucide-react";

const ClientPop = dynamic(() => import("./client-pop"));
const Buttons = dynamic(() => import("../Reusable/buttons"));

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

const Testimonials = () => {
  const [activePop, setActivePop] = useState(false);

  useEffect(() => {
    document.body.style.overflow = activePop ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [activePop]);

  return (
    <>
      <section className="w-full py-20 px-6 sm:px-8 bg-gradient-to-l from-gray-50/50 via-white/50 to-gray-50/50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm text-center relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl dark:bg-blue-900/20"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-100/30 blur-3xl dark:bg-purple-900/20"></div>
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          className="max-w-7xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-slate-100/90"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Client Testimonials
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg md:text-xl text-gray-600/90 dark:text-slate-300/90 max-w-3xl mx-auto backdrop-blur-sm"
          >
            Trusted by businesses worldwide. {`Here's what they say about us.`}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.4 }}
            className="my-16 relative"
          >
            {/* Glass background for swiper */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl -rotate-1 -z-10 backdrop-blur-sm"></div>

            <Swiper
              modules={[Pagination, Autoplay, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1}
              spaceBetween={30}
              pagination={{
                clickable: true,
                el: ".custom-pagination",
                renderBullet: (index, className) => {
                  return `<span class="${className} bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 w-3 h-3 backdrop-blur-sm"></span>`;
                },
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
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
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ delay: index * 0.1 }}
                    className="p-8 bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg text-left border border-gray-200/50 dark:border-gray-700/30 hover:shadow-xl transition-all duration-300 h-full flex flex-col group"
                  >
                    {/* Inner shadow */}
                    <div className="absolute inset-0 rounded-xl shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.05)] dark:shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.15)] pointer-events-none"></div>

                    <div className="flex items-center mb-6">
                      {testimonial.image ? (
                        <div className="relative w-16 h-16 rounded-full border-2 border-white/80 dark:border-gray-800/80 shadow-md overflow-hidden">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl font-semibold shadow-md">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div className="ml-4 text-left">
                        <h3 className="text-lg font-semibold text-gray-800/90 dark:text-white/90 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                          {testimonial.name}
                        </h3>
                        <p className="text-gray-600/90 dark:text-gray-300/90 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300/90 dark:text-gray-500/90"}`}
                        />
                      ))}
                    </div>

                    <div className="relative flex-1">
                      <Quote className="absolute -top-2 left-0 text-gray-200/50 dark:text-gray-700/50 w-8 h-8" />
                      <p className="mt-6 text-gray-700/90 dark:text-gray-300/90 pl-6">
                        {testimonial.quote}
                      </p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Pagination */}
            <div className="custom-pagination mt-8 flex justify-center gap-2 backdrop-blur-sm"></div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.6 }}
            className="mt-12 max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/30"
          >
            {/* Inner shadow */}
            <div className="absolute inset-0 rounded-xl shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.05)] dark:shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.15)] pointer-events-none"></div>

            <h3 className="text-2xl font-bold text-gray-800/90 dark:text-white/90 mb-6">
              Why Businesses Choose Us
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <svg
                      className="w-6 h-6 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                  ),
                  title: "Fast Results",
                  description:
                    "We deliver measurable impact quickly and efficiently.",
                  bg: "bg-blue-100/80 dark:bg-blue-900/50",
                },
                {
                  icon: (
                    <svg
                      className="w-6 h-6 text-purple-600 dark:text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                  ),
                  title: "Trusted Expertise",
                  description:
                    "Industry-leading professionals with proven track records.",
                  bg: "bg-purple-100/80 dark:bg-purple-900/50",
                },
                {
                  icon: (
                    <svg
                      className="w-6 h-6 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                      ></path>
                    </svg>
                  ),
                  title: "Tailored Solutions",
                  description:
                    "Custom strategies designed for your unique business needs.",
                  bg: "bg-green-100/80 dark:bg-green-900/50",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`${item.bg} p-4 rounded-lg backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30`}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto backdrop-blur-sm bg-white/50 dark:bg-gray-800/50">
                    {item.icon}
                  </div>
                  <h4 className="font-semibold text-gray-800/90 dark:text-white/90 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-600/90 dark:text-gray-300/90 text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <Buttons
              first_label="Share Your Experience"
              icon={true}
              buttonAction={() => setActivePop(true)}
              first_styles="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm hover:from-blue-500 hover:to-purple-500"
            />
            <p className="mt-4 text-gray-500/90 dark:text-gray-400/90 text-sm backdrop-blur-sm">
              We value your feedback to help us improve
            </p>
          </motion.div>
        </motion.div>
      </section>
      {activePop && <ClientPop closePop={() => setActivePop(false)} />}
    </>
  );
};

export default Testimonials;
