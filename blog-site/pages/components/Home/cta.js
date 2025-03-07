"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data for the graph
const data = [
  { name: "Jan", traffic: 5000, revenue: 10000 },
  { name: "Feb", traffic: 8000, revenue: 15000 },
  { name: "Mar", traffic: 12000, revenue: 25000 },
  { name: "Apr", traffic: 10000, revenue: 22000 },
  { name: "May", traffic: 15000, revenue: 35000 },
  { name: "Jun", traffic: 20000, revenue: 50000 },
];

// SVG Icons
const SEOSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 mb-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
    />
  </svg>
);

const SocialMediaSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 mb-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const PPCAdsSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 mb-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ContentMarketingSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 mb-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const GrowYourBusiness = () => {
  return (
    <section className="w-full py-20 px-4 sm:px-8 bg-gradient-to-r from-blue-800 to-indigo-900 text-white text-center relative overflow-hidden">
      {/* Animated Glow Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-white/10 to-transparent opacity-20 pointer-events-none"></div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight"
      >
        Grow Your Business with a Strong Online Presence 🌐
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="mt-4 text-base sm:text-lg text-gray-200 max-w-2xl mx-auto"
      >
        Boost your visibility, reach more customers, and increase revenue with
        our proven digital strategies.
      </motion.p>

      {/* Graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      >
        <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm flex flex-col items-center">
          <SEOSVG />
          <h3 className="text-lg font-semibold">SEO</h3>
          <p className="text-sm text-gray-200">
            Rank higher on search engines and drive organic traffic.
          </p>
        </div>
        <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm flex flex-col items-center">
          <SocialMediaSVG />
          <h3 className="text-lg font-semibold">Social Media</h3>
          <p className="text-sm text-gray-200">
            Engage your audience and build a loyal community.
          </p>
        </div>
        <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm flex flex-col items-center">
          <PPCAdsSVG />
          <h3 className="text-lg font-semibold">PPC Ads</h3>
          <p className="text-sm text-gray-200">
            Get instant results with targeted ad campaigns.
          </p>
        </div>
        <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm flex flex-col items-center">
          <ContentMarketingSVG />
          <h3 className="text-lg font-semibold">Content Marketing</h3>
          <p className="text-sm text-gray-200">
            Attract and convert customers with valuable content.
          </p>
        </div>
      </motion.div>

      {/* Call to Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
        className="mt-8"
      >
        <Link
          href="/contact"
          className="inline-block px-8 py-3 sm:px-10 sm:py-4 bg-white text-blue-800 font-bold rounded-lg text-lg shadow-md hover:bg-gray-100 transition transform hover:scale-105 hover:shadow-lg"
          aria-label="Get Started with Our Services"
        >
          Get Started
        </Link>
      </motion.div>

      {/* Subtle Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white/5 opacity-10 pointer-events-none"></div>
    </section>
  );
};

export default GrowYourBusiness;
