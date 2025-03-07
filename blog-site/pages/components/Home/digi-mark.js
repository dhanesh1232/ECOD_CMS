"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const DigitalMarketing = () => {
  return (
    <section className="w-full py-20 px-4 sm:px-8 bg-gradient-to-r from-blue-50 to-white text-center">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight"
        >
          🚀 Digital Marketing & Branding
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-gray-700"
        >
          Amplify your online presence with{" "}
          <span className="font-semibold text-blue-600">SEO</span>,
          high-converting{" "}
          <span className="font-semibold text-blue-600">PPC campaigns</span>,
          and strategic{" "}
          <span className="font-semibold text-blue-600">
            social media marketing
          </span>
          .
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-2 text-gray-600"
        >
          Let’s take your brand to the next level with data-driven strategies.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Link
            href="/services/digital-marketing"
            className="px-8 py-3 bg-blue-600 text-white text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-500 hover:scale-105 transition-transform duration-300 flex items-center justify-center"
            aria-label="Get Started with Digital Marketing"
          >
            Get Started
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 border-2 border-blue-600 text-blue-600 text-base sm:text-lg font-semibold rounded-lg hover:bg-blue-600 hover:text-white hover:scale-105 transition-transform duration-300 flex items-center justify-center"
            aria-label="Contact Us for Digital Marketing"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalMarketing;
