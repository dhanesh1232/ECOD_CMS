"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaRegClock,
  FaStar,
  FaChevronRight,
} from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";

const HeroSection = () => {
  const stats = [
    { value: "1,000+", label: "Businesses Automated" },
    { value: "93%", label: "Message Delivery Rate" },
    { value: "24/7", label: "Customer Support" },
  ];

  const platforms = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="text-green-500 dark:text-green-400" />,
      color:
        "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200",
    },
    {
      name: "Facebook",
      icon: <FaFacebook className="text-blue-500 dark:text-blue-400" />,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="text-pink-500 dark:text-pink-400" />,
      color: "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white dark:from-gray-900 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Platform Badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8"
            >
              {platforms.map((platform, i) => (
                <div
                  key={i}
                  className={`inline-flex items-center px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 ${platform.color}`}
                >
                  <div className="p-1 rounded-full bg-white/80 dark:bg-gray-800/80">
                    {platform.icon}
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {platform.name} Business Solution
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl"
            >
              Transform Your{" "}
              <span className="text-green-600 dark:text-green-400">
                Social Media
              </span>{" "}
              Customer Experience
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-5 max-w-2xl mx-auto lg:mx-0 text-xl text-gray-600 dark:text-gray-300"
            >
              Enterprise-grade automation platform with official WhatsApp,
              Facebook, and Instagram integrations. No coding required.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 grid grid-cols-3 gap-4 max-w-md"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
              >
                Start Free 14-Day Trial
                <FaChevronRight className="ml-2 h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 font-bold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <FaRegClock className="text-green-600 dark:text-green-400" />
                Book Live Demo
              </motion.button>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-12 flex items-center justify-center lg:justify-start"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Image
                    height={100}
                    width={100}
                    key={i}
                    src={`https://randomuser.me/api/portraits/${
                      i % 2 === 0 ? "men" : "women"
                    }/${i + 20}.jpg`}
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
                    alt="User"
                  />
                ))}
              </div>
              <div className="ml-6 md:ml-4 text-left">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Rated <span className="font-bold">4.7/5</span> by 200+
                  businesses
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero image/video placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 lg:mt-0 relative"
          >
            <div className="relative aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800">
              {/* Placeholder for hero image/video */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <FaWhatsapp className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold">
                    Multi-Platform Automation
                  </h3>
                  <p className="mt-2 opacity-90">See it in action</p>
                </div>
              </div>
            </div>

            {/* Floating features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-4 md:-bottom-6 -left-6 ml-2 bg-white dark:bg-gray-800 p-3 md:p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <IoMdCheckmarkCircle className="text-green-500 dark:text-green-400 mr-2" />
                <span className="text-sm font-medium dark:text-white">
                  No-code setup
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute -top-4 md:-top-6 -right-6 mr-2 bg-white dark:bg-gray-800 p-3 md:p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <IoMdCheckmarkCircle className="text-green-500 dark:text-green-400 mr-2" />
                <span className="text-sm font-medium dark:text-white">
                  Official APIs
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
