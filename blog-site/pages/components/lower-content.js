import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, Check, Award } from "lucide-react";

const Buttons = dynamic(() => import("./Reusable/buttons"), {
  loading: () => (
    <div className="flex gap-4">
      <div className="px-8 py-3 rounded-lg bg-indigo-600/20 animate-pulse backdrop-blur-sm" />
      <div className="px-8 py-3 rounded-lg border-2 border-green-500/20 animate-pulse backdrop-blur-sm" />
    </div>
  ),
});

const LowerContent = () => {
  const trustBadges = [
    {
      icon: <Check className="w-6 h-6 text-green-400" />,
      text: "100% Satisfaction",
      delay: 0.2,
    },
    {
      icon: <Award className="w-6 h-6 text-yellow-400" />,
      text: "Certified Experts",
      delay: 0.3,
    },
    {
      icon: <Rocket className="w-6 h-6 text-blue-400" />,
      text: "Fast Delivery",
      delay: 0.4,
    },
  ];

  return (
    <div className="w-full mt-6 p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 dark:from-gray-100/80 dark:to-gray-200/80 rounded-t-3xl shadow-2xl text-center backdrop-blur-xl border-t border-gray-700/30 dark:border-gray-300/30 relative overflow-hidden">
      {/* Glass texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjYiPgo8cmVjdCB3aWR0aD0iNiIgaGVpZ2h0PSI2IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjAyIj48L3JlY3Q+Cjwvc3ZnPg==')] opacity-10"></div>

      {/* Gradient accents */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-500/10 blur-xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-purple-500/10 blur-xl pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-gray-900 mb-6">
          Discover Our Cutting-Edge Solutions
        </h2>
        <motion.p
          className="text-lg text-gray-300 dark:text-gray-700 leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          At{" "}
          <span className="font-semibold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            ECOD
          </span>
          , we specialize in innovative and eco-friendly digital solutions
          designed to transform your business.{" "}
          {`Let's create something impactful
          together.`}
        </motion.p>
      </motion.div>

      <motion.div
        className="mt-10 flex flex-wrap justify-center gap-6 md:gap-10 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {trustBadges.map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: badge.delay }}
            className="flex items-center gap-3 px-6 py-3 bg-white/10 dark:bg-gray-800/20 backdrop-blur-lg rounded-xl border border-white/10 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/30 transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            <div className="p-2 rounded-lg bg-white/20 dark:bg-gray-800/30 backdrop-blur-sm">
              {badge.icon}
            </div>
            <span className="text-white dark:text-gray-900 font-medium">
              {badge.text}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Call-to-Action Buttons */}
      <motion.div
        className="mt-12 flex flex-col sm:flex-row justify-center gap-4 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Buttons
          first_label={"Explore Services"}
          second_label={"Contact Us"}
          first_nav="/services"
          second_nav="/contact"
          first_styles="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 hover:from-indigo-500/90 hover:to-purple-500/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm border border-indigo-500/30 hover:border-indigo-400/50"
          second_styles="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-green-500/60 text-green-400 dark:text-green-500 dark:border-green-500/60 font-semibold rounded-lg hover:bg-green-600/90 hover:text-white dark:hover:bg-green-500/90 dark:hover:text-white hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm hover:shadow-green-500/20 hover:shadow-md"
          icon={"right-arrow"}
        />
      </motion.div>
    </div>
  );
};

export default LowerContent;
