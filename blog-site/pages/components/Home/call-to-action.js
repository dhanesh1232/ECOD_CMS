"use client";
import dynamic from "next/dynamic";
import React from "react";
import { useState } from "react";
import { benefits_data as benefits } from "@/data/service_data";
import { data_traffic as data } from "@/data/service_data";
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

  return (
    <section className="w-full py-24 px-4 sm:px-8 bg-gradient-to-br from-blue-800 via-indigo-800 to-purple-900 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 text-white relative overflow-hidden">
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
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute -top-1/4 -right-1/4 w-full h-full bg-radial-gradient from-blue-400/20 to-transparent pointer-events-none"
      />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Rocket className="w-4 h-4 mr-2" /> Digital Transformation
          </motion.span>

          <h2 className="text-4xl sm:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            Accelerate Your Business Growth
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="inline-block ml-3"
            >
              🚀
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto"
          >
            From stunning digital experiences to data-driven marketing, we craft
            solutions that attract, engage, and convert your audience.
          </motion.p>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10 mb-16"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Business Growth Metrics
              </h3>
              <p className="text-blue-200">
                Measurable results from our client campaigns
              </p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <span className="px-3 py-1 rounded-full bg-blue-600/30 text-blue-100 text-sm font-medium">
                Traffic
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-600/30 text-emerald-100 text-sm font-medium">
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
                    background: "rgba(15, 23, 42, 0.95)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                    backdropFilter: "blur(4px)",
                  }}
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {enhancedBenefits.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group relative overflow-hidden"
              onClick={() => setSelectedBenefit(item)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/80 to-indigo-500/80 opacity-90 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-300" />
              <motion.span
                className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100"
                initial={{ x: -100, skewX: -15 }}
                whileHover={{ x: 300, skewX: -15 }}
                transition={{ duration: 0.8 }}
              />

              <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                <div className="w-14 h-14 mb-5 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  {item.icon &&
                    React.cloneElement(item.icon, {
                      className: "w-6 h-6 text-white",
                    })}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-blue-100 text-sm mb-4">{item.description}</p>
                <div className="mt-auto flex items-center text-blue-200 group-hover:text-white transition-colors">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="relative max-w-2xl mx-auto">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.4 }}
              transition={{ delay: 0.2 }}
              className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-white/10 blur-xl"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.4 }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-indigo-500/20 blur-xl"
            />

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-blue-200 mb-8">
                {`Let's discuss how we can help you achieve your digital goals.`}
              </p>
              <Buttons
                first_label="Get Started"
                first_nav="/contact"
                first_styles="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-800 hover:text-blue-900 font-bold rounded-lg hover:bg-gray-100 hover:scale-105 transition-transform shadow-lg"
                icon={<Rocket className="w-5 h-5" />}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Popup Modal */}
      <Popup
        selectedBenefit={selectedBenefit}
        onClose={() => setSelectedBenefit(null)}
      />
    </section>
  );
};

export default GrowYourBusiness;
