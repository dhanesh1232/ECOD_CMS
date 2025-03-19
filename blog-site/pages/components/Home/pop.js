"use client";

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

const Popup = ({ selectedBenefit, onClose }) => {
  if (!selectedBenefit) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-200 hover:text-white text-2xl"
        >
          &times;
        </button>

        <div className="flex flex-col items-center">
          {selectedBenefit.icon}
          <h3 className="text-xl font-semibold">{selectedBenefit.title}</h3>
          <p className="text-sm text-gray-300 text-center">
            {selectedBenefit.description}
          </p>

          {/* Dynamic Graph for Selected Benefit */}
          <div className="mt-4 w-full h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData[selectedBenefit.title]}>
                <XAxis dataKey="month" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip contentStyle={{ background: "#333", color: "#fff" }} />
                <Bar
                  dataKey="value"
                  fill="#4F46E5"
                  radius={[4, 4, 0, 0]}
                  animationDuration={2000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="mt-4 text-gray-400 text-sm text-center">
            🚀 {selectedBenefit.title} growth is trending upwards! Take
            advantage today!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Popup;
