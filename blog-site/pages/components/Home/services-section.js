"use client";

import { adPerformanceData, eco_services } from "@/data/service_data";
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import RotatingText from "../Reusable/rotating-text";

const ServiceCard = dynamic(() => import("../serviceCard"));
const Buttons = dynamic(() => import("../Reusable/buttons"));

const getGrowthTrend = (current, previous) => {
  if (!previous) return "📊 No Previous Data";
  const diff = current - previous;
  const percentage = ((diff / previous) * 100).toFixed(2);
  return diff > 0 ? `📈 +${percentage}%` : `📉 ${percentage}%`;
};

const enhancedAdPerformanceData = adPerformanceData.map((data, index) => ({
  ...data,
  MetaTrend:
    index > 0
      ? getGrowthTrend(data.MetaAds, adPerformanceData[index - 1].MetaAds)
      : "📊 No Data",
  GoogleTrend:
    index > 0
      ? getGrowthTrend(data.GoogleAds, adPerformanceData[index - 1].GoogleAds)
      : "📊 No Data",
  SEOTrend:
    index > 0
      ? getGrowthTrend(data.SEO, adPerformanceData[index - 1].SEO)
      : "📊 No Data",
}));

const OurServices = () => {
  return (
    <section className="w-full py-20 px-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-500 dark:to-gray-700">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="trnsition transform duration-150 ease-in-out text-xl sm:text-2xl flex items-center justify-center flex-wrap md:text-3xl font-bold"
        >
          <span className="inline text-black dark:text-white">
            Our Premium Services
          </span>
          <RotatingText
            texts={[
              "Web Development",
              "Shopify Management",
              "Meta Ads",
              "Google Ads",
            ]}
            mainClassName="ml-2 text-lg md:text-xl px-2 flex items-center px-auto dark:bg-blue-400 bg-cyan-300 dark:text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
          className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-50 max-w-3xl mx-auto"
        >
          Elevate your business with cutting-edge digital solutions designed for
          success.
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.2 }}
        viewport={{ once: false }} // Reset animation on scroll
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10"
      >
        {eco_services.slice(0, 4).map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }} // Reset animation on scroll
          >
            <ServiceCard service={service} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: false }} // Reset animation on scroll
        className="mt-16 max-w-6xl mx-auto"
      >
        <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-gray-100">
          📊 Business Growth Trends In 2024
        </h3>
        <p className="text-center text-gray-600 mb-6 dark:text-gray-50">
          Explore business growth insights powered by online presence.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Meta Ads & Google Ads Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: false }} // Reset animation on scroll
            className="bg-white dark:bg-gray-100 p-5 rounded-xl shadow-md border border-gray-200"
          >
            <h4 className="mb-4 bg-gradient-to-r md:text-2xl text-lg to-[#F97316] from-[#1D4ED8] bg-clip-text text-transparent font-bold">
              Meta Ads & Google Ads Performance
            </h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={enhancedAdPerformanceData}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis stroke="#8884d8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    color: "#fff",
                    borderRadius: "8px",
                  }}
                />
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <Line
                  type="monotone"
                  dataKey="MetaAds"
                  stroke="#1D4ED8"
                  strokeWidth={2}
                  name="Meta Ads"
                  animationDuration={1000} // Line animation duration
                  animationEasing="ease-in-out" // Smooth animation
                />
                <Line
                  type="monotone"
                  dataKey="GoogleAds"
                  stroke="#F97316"
                  strokeWidth={2}
                  name="Google Ads"
                  animationDuration={1000} // Line animation duration
                  animationEasing="ease-in-out" // Smooth animation
                />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* SEO Growth Over Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: false }} // Reset animation on scroll
            className="bg-white dark:bg-gray-100 p-5 rounded-xl shadow-md border border-gray-200"
          >
            <h4 className="bg-gradient-to-r from-[#10B981] to-[#e2e8f0] bg-clip-text text-transparent md:text-2xl text-lg font-bold mb-4">
              SEO Growth Over Time
            </h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={enhancedAdPerformanceData}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis stroke="#8884d8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    color: "#fff",
                    borderRadius: "8px",
                  }}
                />
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <Bar
                  dataKey="SEO"
                  fill="#10B981"
                  name="SEO Growth"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000} // Bar animation duration
                  animationEasing="ease-in-out" // Smooth animation
                />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: false }} // Reset animation on scroll
        className="mt-10 text-center"
      >
        <Buttons
          first_label="Explore More Services"
          first_nav="/services"
          first_styles="inline-flex items-center gap-4 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-200 dark:to-purple-200 dark:text-gray-800 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </motion.div>
    </section>
  );
};

export default OurServices;
