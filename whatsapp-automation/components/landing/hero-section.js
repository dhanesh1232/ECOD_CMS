import { motion } from "framer-motion";
import Image from "next/image";
import { FaWhatsapp, FaRegClock, FaStar, FaChevronRight } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";

const HeroSection = () => {
  const stats = [
    { value: "1,000+", label: "Businesses Automated" },
    { value: "93%", label: "Delivery Rate" },
    { value: "24/7", label: "Customer Support" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-50 to-blue-50 opacity-50"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm mb-8 border border-gray-200"
            >
              <div className="p-1 bg-green-100 rounded-full">
                <FaWhatsapp className="h-4 w-4 text-green-600" />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-800">
                Official WhatsApp Business Solution Provider
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
            >
              Transform Your <span className="text-green-600">WhatsApp</span>{" "}
              Customer Experience
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-5 max-w-2xl mx-auto lg:mx-0 text-xl text-gray-600"
            >
              Enterprise-grade automation platform with official WhatsApp
              Business API integration. No coding required.
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
                  className="bg-white p-3 rounded-lg shadow-sm border border-gray-100"
                >
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
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
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
              >
                Start Free 14-Day Trial
                <FaChevronRight className="ml-2 h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-white text-gray-800 border border-gray-300 font-bold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <FaRegClock className="text-green-600" />
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
                    className="w-10 h-10 rounded-full border-2 border-white"
                    alt="User"
                  />
                ))}
              </div>
              <div className="ml-4 text-left">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Rated <span className="font-bold">4.6/5</span> by 200+
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
            <div className="relative aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              {/* Placeholder for hero image/video */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <FaWhatsapp className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold">
                    WhatsApp Automation Platform
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
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-200"
            >
              <div className="flex items-center">
                <IoMdCheckmarkCircle className="text-green-500 mr-2" />
                <span className="text-sm font-medium">No-code setup</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-200"
            >
              <div className="flex items-center">
                <IoMdCheckmarkCircle className="text-green-500 mr-2" />
                <span className="text-sm font-medium">Official API</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
