import { motion } from "framer-motion";
import { FaHeadset, FaLock, FaChartLine, FaShieldAlt } from "react-icons/fa";

const CallToAction = () => {
  return (
    <section className="relative bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 overflow-hidden transition-colors duration-300">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div className="absolute top-0 left-20 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl dark:bg-green-600"></div>
        <div className="absolute bottom-0 right-20 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl dark:bg-green-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-white"
        >
          <div className="inline-flex items-center bg-white/10 dark:bg-white/20 px-4 py-2 rounded-full mb-6">
            <FaChartLine className="h-5 w-5 text-green-200 dark:text-green-100" />
            <span className="ml-2 text-sm font-medium text-green-100 dark:text-green-50">
              Join 10,000+ Growing Businesses
            </span>
          </div>

          <h2 className="text-2xl font-extrabold sm:text-4xl lg:text-6xl leading-tight">
            Ready to Transform Your <br className="hidden sm:block" /> WhatsApp
            Communication?
          </h2>

          <p className="mt-6 text-base sm:text-lg leading-8 text-green-100 dark:text-green-50 max-w-3xl mx-auto">
            Automate customer conversations, boost sales, and reduce support
            costs with our trusted platform.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white text-green-700 hover:bg-gray-50 dark:hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Start Free 14-Day Trial
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-transparent text-white border-2 border-white hover:bg-white/10 dark:hover:bg-white/20 px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-3 transition-all duration-300"
            >
              <FaHeadset className="text-white h-5 w-5" />
              Book a Demo
            </motion.button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-green-100 dark:text-green-50 text-sm">
            <div className="flex items-center gap-2">
              <FaLock className="h-5 w-5 text-green-200 dark:text-green-100" />
              <span>End-to-end encryption</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-green-400 dark:bg-green-300"></div>
            <div className="flex items-center gap-2">
              <FaShieldAlt className="h-5 w-5 text-green-200 dark:text-green-100" />
              <span>GDPR compliant</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-green-400 dark:bg-green-300"></div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-green-200 dark:text-green-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>No credit card required</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
