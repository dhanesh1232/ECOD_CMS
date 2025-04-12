import { motion } from "framer-motion";
import { FaCheck, FaWhatsapp, FaPlay } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

const DemoSection = () => {
  const [showVideo, setShowVideo] = useState(false);

  const features = [
    "No-code automation builder with drag-and-drop interface",
    "Official WhatsApp Business API integration",
    "Enterprise-grade security & GDPR compliance",
    "Real-time analytics with custom reporting",
    "AI-powered response suggestions",
    "Multi-agent team collaboration tools",
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 text-sm font-semibold text-green-600 bg-green-100 rounded-full mb-4">
              Product Demo
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 sm:text-5xl">
              See the Power of <span className="text-green-600">WhatsApp</span>{" "}
              Automation
            </h2>
            <p className="mt-4 text-base md:text-xl text-gray-600">
              Discover how businesses automate conversations to boost sales by
              35% and reduce support costs by 50%.
            </p>

            <ul className="mt-8 space-y-4">
              {features.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <FaCheck className="h-3 w-3 text-green-600" />
                    </div>
                  </div>
                  <span className="ml-3 text-gray-700">{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Watch Full Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-white text-gray-800 border border-gray-300 font-bold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"
              >
                <FaWhatsapp className="text-green-600" />
                Book a Live Demo
              </motion.button>
            </div>
          </motion.div>

          {/* Video placeholder */}
          <motion.div
            className="mt-12 lg:mt-0"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div
              className="relative aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl cursor-pointer transform hover:scale-[1.02] transition-transform duration-300"
              onClick={() => setShowVideo(true)}
            >
              {/* Thumbnail image would go here */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <div className="text-center p-8 text-white">
                  <div className="relative mx-auto mb-6">
                    <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                        <FaPlay className="h-6 w-6 text-green-600 ml-1" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold">
                    WhatsApp Automation Demo
                  </h3>
                  <p className="mt-2 opacity-90">Click to watch (2:34 min)</p>
                </div>
              </div>
            </div>

            {/* Stats bar */}
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              {[
                { value: "35%", label: "Sales Increase" },
                { value: "50%", label: "Cost Reduction" },
                { value: "24/7", label: "Availability" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-4 rounded-lg shadow-sm"
                >
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
              onClick={() => setShowVideo(false)}
            >
              <IoMdClose className="h-6 w-6" />
            </button>

            {/* Replace with actual video embed */}
            <div className="aspect-w-16 aspect-h-9 w-full bg-gray-800 flex items-center justify-center">
              <div className="text-center text-white">
                <FaPlay className="h-12 w-12 mx-auto mb-4" />
                <p className="text-xl">Video would play here</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default DemoSection;
