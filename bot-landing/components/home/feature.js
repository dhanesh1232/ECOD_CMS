"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart2,
  Mail,
  MessageSquare,
  Settings,
  Users,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: "AI Chatbots",
    desc: "24/7 automated conversations that feel human",
    highlight: "Natural language processing for human-like interactions",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Marketing Automation",
    desc: "Create workflows that convert visitors to customers",
    highlight: "Drag-and-drop campaign builder with smart triggers",
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    icon: <BarChart2 className="w-5 h-5" />,
    title: "Analytics Dashboard",
    desc: "Real-time insights into your customer interactions",
    highlight: "Customizable reports with predictive analytics",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "CRM Integration",
    desc: "Sync with your existing customer database",
    highlight: "Seamless connection with popular CRM platforms",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    title: "Email Sequences",
    desc: "Automated follow-ups that boost engagement",
    highlight: "AI-powered send time optimization",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: <Settings className="w-5 h-5" />,
    title: "Custom Workflows",
    desc: "Build automation tailored to your business",
    highlight: "Visual workflow editor with conditional logic",
    color: "from-violet-500 to-purple-500",
  },
];

export const FeatureSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative container mx-auto px-6 py-6 md:py-10 lg:py-14">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 -left-24 w-72 h-72 bg-indigo-100/30 dark:bg-indigo-900/10 rounded-full filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute -bottom-24 -right-20 w-72 h-72 bg-purple-100/30 dark:bg-purple-900/10 rounded-full filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
        >
          <Sparkles className="w-4 h-4" />
          Powerful Features
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-6xl font-bold mb-2 leading-tight tracking-tight"
        >
          Everything You Need to{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Grow Your Business
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-600 dark:text-gray-300 md:text-base text-sm lg:text-lg max-w-3xl mx-auto"
        >
          Automate conversations, manage customers, and scale your operations
          with our comprehensive platform.
        </motion.p>
      </div>

      {/* Feature Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative p-8 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
          >
            {/* Highlight hover glow */}
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
                    feature.color
                  }/10 dark:${feature.color.replace("to", "to-")}/5 z-0`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>

            <div className="relative z-10 h-full flex flex-col">
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}
              >
                <motion.div
                  animate={{
                    scale: hoveredIndex === index ? [1, 1.2, 1] : 1,
                    rotate: hoveredIndex === index ? [0, 5, -5, 0] : 0,
                  }}
                  transition={{ duration: 0.6 }}
                  className="text-white"
                >
                  {feature.icon}
                </motion.div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {feature.desc}
              </p>

              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      marginBottom: "1rem",
                    }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`text-sm bg-gradient-to-r ${feature.color} bg-clip-text text-transparent font-medium`}
                    >
                      {feature.highlight}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ x: 5 }}
                className={`mt-auto flex items-center text-sm font-medium bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
              >
                Learn more <ArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-24"
      >
        <button className="relative px-4 md:px-8 py-2 md:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all font-medium text-lg group overflow-hidden">
          <span className="relative z-10">Explore All Features</span>
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
        </button>
        <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
          Trusted by 10,000+ businesses worldwide
        </p>
      </motion.div>
    </section>
  );
};
