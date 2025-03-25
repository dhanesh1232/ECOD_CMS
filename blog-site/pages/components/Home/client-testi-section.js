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
import Carousel from "./Client-Section/slide";

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
    <section className="w-full py-20 px-6 sm:px-8 bg-gradient-to-l from-gray-50 to-white text-center relative dark:from-gray-900 dark:to-gray-700">
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-slate-100"
      >
        🌟 What Our Clients Say
      </motion.h2>
      <motion.p
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.2 }}
        className="mt-4 text-base md:text-lg text-gray-700 dark:text-slate-100"
      >
        Hear from businesses that trust our expertise.
      </motion.p>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.4 }}
        style={{
          height: "350px",
        }}
        className="my-12 max-w-5xl flex items-center justify-center mx-auto relative p-5"
      >
        <Carousel
          baseWidth={500}
          autoplay={true}
          autoplayDelay={3000}
          pauseOnHover={true}
          loop={true}
          round={false}
        />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.6 }}
        className="mt-12 max-w-4xl mx-auto"
      >
        <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-100">
          Why Businesses Trust Us
        </h3>
        <p className="mt-4 text-gray-700 dark:text-slate-100">
          We deliver results-driven strategies tailored to your business goals.
          Our clients love us for our transparency, expertise, and commitment to
          their success.
        </p>
        <p className="mt-6 text-gray-700 italic dark:text-slate-100">
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
