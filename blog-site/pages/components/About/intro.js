"use client";
import { motion } from "framer-motion";
const Intro = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900">About Us</h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        We provide a full suite of services to help businesses establish and
        grow their online presence, from Shopify store development to digital
        marketing and branding.
      </p>
    </motion.div>
  );
};

export default Intro;
