"use client";
import dynamic from "next/dynamic";
import React from "react";
import { useState } from "react";
import { benefits_data as benefits } from "../../../data/service_data";
import { data_traffic as data } from "../../../data/service_data";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Rocket,
  ArrowRight,
  Zap,
  TrendingUp,
  Globe,
  Users,
} from "lucide-react";
const Buttons = dynamic(() => import("../Reusable/buttons"));
const Popup = dynamic(() => import("./pop"));

const GrowYourBusiness = () => {
  const [selectedBenefit, setSelectedBenefit] = useState(null);

  // Enhanced benefits data with icons
  const enhancedBenefits = benefits.map((item, i) => ({
    ...item,
    icon: [
      <Zap key="zap" />,
      <TrendingUp key="trend" />,
      <Globe key="globe" />,
      <Users key="users" />,
    ][i],
  }));

  const handleContactModel = () => {
    const clickData = {
      timestamp: new Date().toISOString(),
      modelOpen: true,
    };

    // Save the individual click
    localStorage.setItem(`contactModelClick`, JSON.stringify(clickData));
    window.location.reload();
  };

  return (
    <>
      <section className="w-full py-24 px-4 sm:px-8 bg-gradient-to-br from-blue-800/90 via-indigo-800/90 to-purple-900/90 dark:from-blue-900/90 dark:via-indigo-900/90 dark:to-purple-900/90 backdrop-blur-sm relative overflow-hidden">
        {/* Background Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-10 mix-blend-overlay pointer-events-none"
        />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
          className="absolute -top-1/4 -right-1/4 w-full h-full bg-radial-gradient from-blue-400/20 to-transparent pointer-events-none"
        />

        {/* Content Container */}
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-center mb-16"
          >
            <motion.span
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-sm font-medium mb-6 border border-white/20 shadow-inner"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, ease: "easeInOut", duration: 0.3 }}
            >
              <Rocket className="w-4 h-4 mr-2" /> Digital Transformation
            </motion.span>

            <h2 className="text-4xl sm:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Accelerate Your Business Growth
              <motion.span
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{
                  type: "spring",
                  ease: "easeInOut",
                  duration: 0.3,
                }}
                className="inline-block ml-3"
              >
                🚀
              </motion.span>
            </h2>

            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeInOut" }}
              className="mt-6 text-xl text-blue-100/90 max-w-3xl mx-auto backdrop-blur-sm"
            >
              From stunning digital experiences to data-driven marketing, we
              craft solutions that attract, engage, and convert your audience.
            </motion.p>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeInOut" }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 mb-16 relative overflow-hidden"
          >
            {/* Inner shadow */}
            <div className="absolute inset-0 rounded-2xl shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.1)] pointer-events-none"></div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white/90 mb-2">
                  Business Growth Metrics
                </h3>
                <p className="text-blue-200/90">
                  Measurable results from our client campaigns
                </p>
              </div>
              <div className="flex space-x-3 mt-4 md:mt-0">
                <span className="px-3 py-1 rounded-full bg-blue-600/30 text-blue-100/90 text-sm font-medium backdrop-blur-sm border border-white/10">
                  Traffic
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-600/30 text-emerald-100/90 text-sm font-medium backdrop-blur-sm border border-white/10">
                  Revenue
                </span>
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#CBD5E1" }}
                    axisLine={{ stroke: "rgba(203, 213, 225, 0.2)" }}
                  />
                  <YAxis
                    tick={{ fill: "#CBD5E1" }}
                    axisLine={{ stroke: "rgba(203, 213, 225, 0.2)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(4px)",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      borderRadius: "8px",
                      color: "#111827",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    }}
                    itemStyle={{ color: "#111827" }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: "20px" }}
                    formatter={(value) => (
                      <span className="text-gray-300">{value}</span>
                    )}
                  />
                  <Bar
                    dataKey="traffic"
                    fill="#6366F1"
                    radius={[6, 6, 0, 0]}
                    animationDuration={1500}
                    name="Website Traffic"
                  />
                  <Bar
                    dataKey="revenue"
                    fill="#10B981"
                    radius={[6, 6, 0, 0]}
                    animationDuration={1500}
                    name="Revenue Growth"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeInOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {enhancedBenefits.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: "spring",
                  ease: "easeInOut",
                  duration: 0.3,
                  stiffness: 300,
                }}
                className="group relative overflow-hidden cursor-pointer"
                onClick={() => setSelectedBenefit(item)}
              >
                {/* Glass card with gradient overlay */}
                <div className="relative bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-xl p-6 h-full border border-white/20 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/50 to-indigo-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                  {/* Inner shadow */}
                  <div className="absolute inset-0 rounded-xl shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] pointer-events-none"></div>

                  {/* Shine effect on hover */}
                  <motion.span
                    className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100"
                    initial={{ x: -100, skewX: -15 }}
                    whileHover={{ x: 300, skewX: -15 }}
                    transition={{ duration: 0.8 }}
                  />

                  <div className="relative z-10 h-full flex flex-col items-center text-center">
                    <div className="w-14 h-14 mb-5 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm border border-white/20">
                      {item.icon &&
                        React.cloneElement(item.icon, {
                          className: "w-6 h-6 text-white",
                        })}
                    </div>
                    <h3 className="text-xl font-bold text-white/90 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-blue-100/90 text-sm mb-4 group-hover:text-blue-50 transition-colors">
                      {item.description}
                    </p>
                    <div className="mt-auto flex items-center text-blue-200/90 group-hover:text-white transition-colors">
                      <span className="text-sm font-medium">Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
            className="text-center"
          >
            <div className="relative max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 sm:p-10 border border-white/20 shadow-lg overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-indigo-500/20 blur-xl"></div>

              {/* Inner shadow */}
              <div className="absolute inset-0 rounded-2xl shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.1)] pointer-events-none"></div>

              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-white/90 mb-4">
                  Ready to Transform Your Business?
                </h3>
                <p className="text-blue-200/90 mb-8">
                  {`Let's discuss how we can help you achieve your digital goals.`}
                </p>
                <Buttons
                  first_label="Get Started"
                  buttonActionOne={handleContactModel}
                  first_styles="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/90 hover:bg-white text-blue-800 hover:text-blue-900 font-bold rounded-lg hover:scale-105 transition-transform shadow-lg backdrop-blur-sm"
                  icon={<Rocket className="w-5 h-5" />}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Popup Modal */}
      <Popup
        selectedBenefit={selectedBenefit}
        onClose={() => setSelectedBenefit(null)}
      />
    </>
  );
};

export default GrowYourBusiness;
