import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, Check, Award } from "lucide-react";

const Buttons = dynamic(() => import("./Reusable/buttons"), {
  loading: () => (
    <div className="flex gap-4">
      <div className="px-8 py-3 rounded-lg bg-indigo-600/20 animate-pulse" />
      <div className="px-8 py-3 rounded-lg border-2 border-green-500/20 animate-pulse" />
    </div>
  ),
});

const LowerContent = () => {
  const trustBadges = [
    {
      icon: <Check className="w-6 h-6 text-green-500" />,
      text: "100% Satisfaction",
      delay: 0.2,
    },
    {
      icon: <Award className="w-6 h-6 text-yellow-500" />,
      text: "Certified Experts",
      delay: 0.3,
    },
    {
      icon: <Rocket className="w-6 h-6 text-blue-500" />,
      text: "Fast Delivery",
      delay: 0.4,
    },
  ];
  return (
    <div className="w-full mt-6 p-8 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-100 dark:to-gray-200 rounded-t-3xl shadow-2xl text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
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
        className="mt-10 flex flex-wrap justify-center gap-6 md:gap-10"
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
            className="flex items-center gap-3 px-4 py-2 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-full"
          >
            {badge.icon}
            <span className="text-white dark:text-gray-900 font-medium">
              {badge.text}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Call-to-Action Buttons */}
      <motion.div
        className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Buttons
          first_label={"Explore Services"}
          second_label={"Contact Us"}
          first_nav="/services"
          second_nav="/contact"
          first_styles="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          second_styles="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-green-500 text-green-600 dark:text-green-500 dark:border-green-500 font-semibold rounded-lg hover:bg-green-600 hover:text-white dark:hover:bg-green-500 dark:hover:text-white hover:scale-[1.02] transition-all duration-300"
          icon={"right-arrow"}
        />
      </motion.div>
    </div>
  );
};

export default LowerContent;
