"use client";
import dynamic from "next/dynamic";
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
  ResponsiveContainer,
} from "recharts";
const Buttons = dynamic(() => import("../Reusable/buttons"));
const Popup = dynamic(() => import("./pop"));

const GrowYourBusiness = () => {
  const [selectedBenefit, setSelectedBenefit] = useState(null);

  return (
    <section className="w-full py-20 px-4 sm:px-8 bg-gradient-to-r from-blue-800 to-indigo-900 text-white text-center relative overflow-hidden">
      {/* Animated Glow Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0 bg-gradient-radial from-white/10 to-transparent pointer-events-none"
      />

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight"
      >
        Grow Your Business with a Strong Online Presence 🌐
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="mt-4 text-base sm:text-lg text-gray-200 max-w-2xl mx-auto"
      >
        Boost your visibility, reach more customers, and increase revenue with
        our proven digital strategies.
      </motion.p>

      {/* Graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="mt-8 mx-auto w-full max-w-3xl h-64 sm:h-80"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip
              contentStyle={{
                background: "rgba(255, 255, 255, 0.9)",
                border: "none",
                borderRadius: "8px",
                color: "#1E3A8A",
              }}
            />
            <Bar
              dataKey="traffic"
              fill="#4F46E5"
              radius={[4, 4, 0, 0]}
              animationDuration={2000}
            />
            <Bar
              dataKey="revenue"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
              animationDuration={2000}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Key Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      >
        {benefits.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.6 + index * 0.1,
            }}
            className="p-6 bg-white/10 rounded-lg backdrop-blur-sm flex flex-col items-center hover:bg-white/20 transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedBenefit(item)}
          >
            {item.icon}
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-200 text-center">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
        className="mt-8"
      >
        <Buttons
          first_label={"Get Started"}
          first_nav={"/contact"}
          first_styles={
            "inline-block px-8 py-3 sm:px-10 sm:py-4 bg-white text-blue-800 font-bold rounded-lg text-lg shadow-md hover:bg-gray-100 transition transform hover:scale-105 hover:shadow-lg"
          }
        />
      </motion.div>

      {/* Subtle Background Pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-0 left-0 w-full h-full bg-grid-white/5 pointer-events-none"
      />

      {/* Popup */}
      <Popup
        selectedBenefit={selectedBenefit}
        onClose={() => setSelectedBenefit(null)}
      />
    </section>
  );
};

export default GrowYourBusiness;
