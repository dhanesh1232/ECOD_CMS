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
  ResponsiveContainer,
} from "recharts";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import RotatingText from "../Reusable/rotating-text";
import {
  ArrowUpRight,
  Rocket,
  BarChart2,
  Search,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const Buttons = dynamic(() => import("../Reusable/buttons"));

const getGrowthTrend = (current, previous) => {
  if (!previous)
    return { text: "No Previous Data", icon: "📊", positive: null };
  const diff = current - previous;
  const percentage = ((diff / previous) * 100).toFixed(2);
  return {
    text: `${Math.abs(percentage)}%`,
    icon: diff > 0 ? "📈" : "📉",
    positive: diff > 0,
  };
};

const enhancedAdPerformanceData = adPerformanceData.map((data, index) => ({
  ...data,
  MetaTrend:
    index > 0
      ? getGrowthTrend(data.MetaAds, adPerformanceData[index - 1].MetaAds)
      : null,
  GoogleTrend:
    index > 0
      ? getGrowthTrend(data.GoogleAds, adPerformanceData[index - 1].GoogleAds)
      : null,
  SEOTrend:
    index > 0
      ? getGrowthTrend(data.SEO, adPerformanceData[index - 1].SEO)
      : null,
}));

const OurServices = () => {
  return (
    <section className="w-full py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium mb-4"
          >
            <Rocket className="w-4 h-4 mr-2" />
            Premium Solutions
          </motion.div>

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
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Cutting-edge digital solutions tailored to drive your business
            growth and maximize online potential.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="relative">
          {/* Single row horizontal scroll container */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px" }}
            style={{
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* IE 10+ */,
            }}
            className="flex overflow-x-auto pb-6 -mx-4 px-4" // Hide scrollbar for cleaner look
          >
            <style jsx>{`
              .container::-webkit-scrollbar {
                display: none; /* Chrome, Safari, Opera*/
              }
            `}</style>
            {/* Add negative margin and padding to allow cards to peek from sides */}
            <div className="flex space-x-6 pr-4">
              {eco_services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        delay: index * 0.05,
                      },
                    },
                  }}
                  className="flex-shrink-0 w-72" // Fixed width for consistent cards
                >
                  <Link href={service.href} className="h-full block">
                    <div className="relative h-full bg-white dark:bg-gray-800/70 shadow-lg rounded-2xl p-6 flex flex-col border border-gray-100 dark:border-gray-700/50 group hover:border-transparent transition-all duration-300 overflow-hidden hover:shadow-xl hover:-translate-y-1">
                      {/* Gradient overlay (visible on hover) */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-0`}
                      />

                      {/* Icon with dual-tone background */}
                      <div className="relative z-10 mb-6 w-14 h-14 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl">{service.icon}</span>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex-1">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white/90 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                          {service.label}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300/80 text-sm leading-relaxed mb-6">
                          {service.description}
                        </p>
                      </div>

                      {/* CTA Button with improved dark mode */}
                      <div className="relative z-10 mt-auto">
                        <span
                          className={`inline-flex items-center px-4 py-2 text-xs font-semibold rounded-full bg-gradient-to-r ${service.color} text-white shadow-sm group-hover:shadow-md transition-all duration-300`}
                        >
                          {service.cta}
                          <svg
                            className="ml-2 -mr-1 w-3 h-3 group-hover:translate-x-1 transition-transform duration-200"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>

                      {/* Subtle hover shine effect */}
                      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 left-0 w-1/2 h-full transform -skew-x-12 bg-gradient-to-r from-white/5 via-white/20 to-white/5 animate-shine" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Analytics Section */}
        <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <BarChart2 className="text-blue-600 dark:text-blue-400" />
                Performance Analytics
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Data-driven insights to optimize your digital strategy
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>2024 Trends</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300 text-sm">
                <Search className="w-4 h-4" />
                <span>Real-time Data</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Meta & Google Ads Performance */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-700/30 p-5 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-6">
                <h4 className="sm:text-base md:text-lg text-sm flex flex-wrap font-semibold text-gray-900 dark:text-white">
                  Paid Advertising Performance
                </h4>
                <div className="flex gap-1 sm:gap-2">
                  <span className="py-1 px-2 text-xs rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200">
                    Meta Ads
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200">
                    Google Ads
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={enhancedAdPerformanceData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(156, 163, 175, 0.3)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    axisLine={{ stroke: "rgba(156, 163, 175, 0.3)" }}
                  />
                  <YAxis
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    axisLine={{ stroke: "rgba(156, 163, 175, 0.3)" }}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const metaTrend = enhancedAdPerformanceData.find(
                          (d) => d.name === label
                        )?.MetaTrend;
                        const googleTrend = enhancedAdPerformanceData.find(
                          (d) => d.name === label
                        )?.GoogleTrend;

                        return (
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {label}
                            </p>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1">
                                  <div className="w-3 h-3 rounded-full bg-blue-600" />
                                  <span className="text-sm">Meta Ads</span>
                                </span>
                                <span className="font-medium">
                                  {payload[0].value}
                                  {metaTrend && (
                                    <span
                                      className={`ml-2 text-xs ${metaTrend.positive ? "text-green-500" : "text-red-500"}`}
                                    >
                                      {metaTrend.icon} {metaTrend.text}
                                    </span>
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1">
                                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                                  <span className="text-sm">Google Ads</span>
                                </span>
                                <span className="font-medium">
                                  {payload[1].value}
                                  {googleTrend && (
                                    <span
                                      className={`ml-2 text-xs ${googleTrend.positive ? "text-green-500" : "text-red-500"}`}
                                    >
                                      {googleTrend.icon} {googleTrend.text}
                                    </span>
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="MetaAds"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2, fill: "#3b82f6" }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="GoogleAds"
                    stroke="#f97316"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2, fill: "#f97316" }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* SEO Growth */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-700/30 p-5 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Organic Growth Metrics
                </h4>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200">
                  SEO Performance
                </span>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={enhancedAdPerformanceData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(156, 163, 175, 0.3)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    axisLine={{ stroke: "rgba(156, 163, 175, 0.3)" }}
                  />
                  <YAxis
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    axisLine={{ stroke: "rgba(156, 163, 175, 0.3)" }}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const seoTrend = enhancedAdPerformanceData.find(
                          (d) => d.name === label
                        )?.SEOTrend;

                        return (
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {label}
                            </p>
                            <div className="mt-2">
                              <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1">
                                  <div className="w-3 h-3 rounded-full bg-green-500" />
                                  <span className="text-sm">SEO Growth</span>
                                </span>
                                <span className="font-medium">
                                  {payload[0].value}
                                  {seoTrend && (
                                    <span
                                      className={`ml-2 text-xs ${seoTrend.positive ? "text-green-500" : "text-red-500"}`}
                                    >
                                      {seoTrend.icon} {seoTrend.text}
                                    </span>
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="SEO" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Transform Your Digital Presence?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Our team of experts is ready to help you achieve exceptional
              results with tailored solutions.
            </p>
            <Buttons
              first_label="Explore All Services"
              first_nav="/services"
              icon={<ArrowUpRight className="w-5 h-5" />}
              first_styles="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurServices;
