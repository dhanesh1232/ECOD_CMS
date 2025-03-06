"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <section className="w-full py-20 px-8 bg-gradient-to-r from-indigo-800 to-blue-600 text-white text-center relative overflow-hidden">
      {/* Animated Glow Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-white/10 to-transparent opacity-20 pointer-events-none"></div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-2xl md:text-4xl font-extrabold leading-tight"
      >
        Ready to Elevate Your Business? 🚀
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="mt-4 text-base md:text-lg text-gray-200"
      >
        Let’s create a high-performing digital presence for your brand.
      </motion.p>

      {/* Call to Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        className="mt-8"
      >
        <Link
          href="/contact"
          className="inline-block px-8 py-4 bg-white text-indigo-700 font-bold rounded-lg text-lg shadow-md hover:bg-gray-100 transition transform hover:scale-105 hover:shadow-lg"
        >
          Get Started
        </Link>
      </motion.div>

      {/* Subtle Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white/5 opacity-10 pointer-events-none"></div>
    </section>
  );
};

export default CallToAction;
