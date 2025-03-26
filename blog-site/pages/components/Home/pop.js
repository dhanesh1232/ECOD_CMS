"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { growth_traffic_data as trafficData } from "@/data/service_data";
import { X } from "lucide-react";

const Popup = ({ selectedBenefit, onClose }) => {
  if (!selectedBenefit) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Glass Popup */}
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 20 }}
        className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 dark:border-gray-700/30 max-w-lg w-full mx-4 overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full bg-white/20 dark:bg-gray-700/50 hover:bg-white/30 dark:hover:bg-gray-600/50 transition-colors backdrop-blur-sm"
        >
          <X className="w-5 h-5 text-gray-800 dark:text-gray-200" />
        </button>

        {/* Inner shadow */}
        <div className="absolute inset-0 rounded-xl shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.2)] pointer-events-none"></div>

        <div className="p-6 sm:p-8 flex flex-col items-center">
          {/* Icon with glass background */}
          <div className="w-16 h-16 mb-4 rounded-full bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 flex items-center justify-center shadow-inner">
            {React.cloneElement(selectedBenefit.icon, {
              className: "w-8 h-8 text-indigo-600 dark:text-indigo-400",
            })}
          </div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white/90 text-center">
            {selectedBenefit.title}
          </h3>
          <p className="mt-2 text-gray-600/90 dark:text-gray-300/90 text-center">
            {selectedBenefit.description}
          </p>

          {/* Glass Graph Container */}
          <div className="mt-6 w-full h-48 bg-white/80 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg p-4 border border-white/30 dark:border-gray-600/30 shadow-inner">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData[selectedBenefit.title]}>
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(156, 163, 175, 0.3)" }}
                />
                <YAxis
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(156, 163, 175, 0.3)" }}
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
                />
                <Bar
                  dataKey="value"
                  fill="#4F46E5"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="mt-6 text-sm text-gray-500/90 dark:text-gray-400/90 text-center flex items-center gap-2">
            <span className="text-indigo-500 dark:text-indigo-400">🚀</span>
            {selectedBenefit.title} growth is trending upwards! Take advantage
            today!
          </p>

          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 backdrop-blur-sm"
          >
            Got it!
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Popup;
