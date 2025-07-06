import { ArrowRight, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export const CallToActionSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-md p-8 sm:p-16 text-center overflow-hidden relative"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-white"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center justify-center mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
          <Rocket className="h-5 w-5 text-white mr-2" />
          <span className="text-sm font-medium text-white">
            New Feature Launch
          </span>
        </div>

        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Ready to transform your business?
        </h3>

        <p className="text-lg text-indigo-100 mb-10 max-w-2xl mx-auto">
          Join thousands of businesses growing with our platform. Start your
          free trial today — no credit card required.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white text-indigo-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold transition-all flex items-center justify-center shadow-lg hover:shadow-xl"
          >
            Start <ArrowRight className="ml-3 h-5 w-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-transparent border-2 border-white/50 text-white hover:bg-white/10 hover:border-white px-8 py-4 rounded-xl font-semibold transition-all backdrop-blur-sm"
          >
            Schedule a Demo
          </motion.button>
        </div>

        <p className="mt-6 text-sm text-white/80">
          Get started in minutes. Cancel anytime.
        </p>
      </div>
    </motion.section>
  );
};
