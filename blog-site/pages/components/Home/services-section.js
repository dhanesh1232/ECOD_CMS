"use client";

import { adPerformanceData, eco_services } from "../../../data/service_data";
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
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

// Lazy load components
const Buttons = dynamic(() => import("../Reusable/buttons"), {
  loading: () => (
    <div className="h-12 w-40 bg-gray-200/50 rounded-lg animate-pulse" />
  ),
});

// Utility functions
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

// Memoize enhanced data
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

// Custom Tooltip Components
const ChartTooltip = ({ active, payload, label, data }) => {
  if (!active || !payload?.length) return null;

  const metaTrend = data.find((d) => d.name === label)?.MetaTrend;
  const googleTrend = data.find((d) => d.name === label)?.GoogleTrend;
  const seoTrend = data.find((d) => d.name === label)?.SEOTrend;

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 p-4 rounded-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
      <p className="font-semibold text-gray-900 dark:text-white/90">{label}</p>
      <div className="mt-2 space-y-2">
        {payload.map((item) => (
          <div key={item.dataKey} className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor:
                    item.color ||
                    (item.dataKey === "MetaAds"
                      ? "#3b82f6"
                      : item.dataKey === "GoogleAds"
                        ? "#f97316"
                        : "#10b981"),
                }}
              />
              <span className="text-sm capitalize">
                {item.dataKey.replace(/([A-Z])/g, " $1").trim()}
              </span>
            </span>
            <span className="font-medium">
              {item.value}
              {item.dataKey === "MetaAds" && metaTrend && (
                <TrendIndicator trend={metaTrend} />
              )}
              {item.dataKey === "GoogleAds" && googleTrend && (
                <TrendIndicator trend={googleTrend} />
              )}
              {item.dataKey === "SEO" && seoTrend && (
                <TrendIndicator trend={seoTrend} />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TrendIndicator = ({ trend }) => (
  <span
    className={`ml-2 text-xs ${trend.positive ? "text-green-500" : "text-red-500"}`}
  >
    {trend.icon} {trend.text}
  </span>
);

// Main Component
const OurServices = () => {
  // Intersection observers with thresholds
  const [headerRef, headerInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [servicesRef, servicesInView] = useInView({
    threshold: 0.05,
    triggerOnce: true,
  });
  const [analyticsRef, analyticsInView] = useInView({
    threshold: 0.05,
    triggerOnce: true,
  });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const serviceItem = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section className="w-full py-20 px-2 sm:px-6 bg-gradient-to-b from-gray-50/50 to-white/30 dark:from-gray-900/50 dark:to-gray-800/30 relative overflow-hidden">
      {/* Background elements - optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/20 to-transparent dark:from-blue-900/10 dark:to-transparent opacity-30" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-purple-200/20 dark:bg-purple-900/10 blur-3xl" />
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-blue-200/20 dark:bg-blue-900/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12" ref={headerRef}>
          <motion.div
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center px-2 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium mb-4 backdrop-blur-sm border border-blue-200/30 dark:border-blue-700/30 shadow-sm"
          >
            <Rocket className="w-4 h-4 mr-2" />
            Premium Solutions
          </motion.div>

          <motion.h2
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            <span className="inline-block">Our Premium </span>
            <motion.span
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="relative z-10">Services</span>
              <span className="absolute bottom-1 left-0 w-full h-2 bg-blue-500/60 dark:bg-blue-700 -z-0" />
            </motion.span>

            <div className="mt-4 flex justify-center">
              <RotatingText
                texts={[
                  "Web Development",
                  "Shopify Management",
                  "Meta Ads",
                  "Google Ads",
                ]}
                mainClassName="text-lg md:text-xl px-4 py-2 flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-800 dark:text-white overflow-hidden rounded-full border border-gray-200/50 dark:border-gray-700/30 shadow-sm"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </div>
          </motion.h2>

          <motion.p
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Cutting-edge digital solutions tailored to drive your business
            growth and maximize online potential.
          </motion.p>
        </div>

        {/* Services Grid - Horizontal Scroll */}
        <div className="relative mb-20" ref={servicesRef}>
          <motion.div
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="flex overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide"
          >
            <div className="flex space-x-6 px-2 md:px-4 py-2 -mx-2">
              {eco_services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={serviceItem}
                  className="flex-shrink-0 w-80 sm:w-96"
                >
                  <Link
                    href={service.href}
                    className="h-full block group"
                    passHref
                  >
                    <div className="relative h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 flex flex-col border border-gray-200/50 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
                      {/* Floating sparkles */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <Sparkles className="absolute top-10 left-10 w-5 h-5 text-yellow-400 animate-float-slow" />
                          <Sparkles className="absolute top-20 right-16 w-4 h-4 text-blue-400 animate-float-medium delay-300" />
                          <Sparkles className="absolute bottom-16 left-20 w-3 h-3 text-purple-400 animate-float-fast delay-500" />
                        </div>
                      </div>

                      {/* Badge */}
                      {service.badge && (
                        <div
                          className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${service.color.replace("from-", "bg-").replace(" to-", "/")} dark:text-white/90 text-black/90 backdrop-blur-sm border border-black dark:border-white/20 shadow-sm`}
                        >
                          {service.badge}
                        </div>
                      )}

                      {/* Icon with glass effect */}
                      <div className="relative z-10 mb-6 w-14 h-14 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm border border-gray-200/30 dark:border-gray-700/30">
                        <span className="text-2xl">{service.icon}</span>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white/90 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                            {service.label}
                          </h3>
                          <span className="text-lg opacity-70">
                            {service.emoji}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300/80 text-sm leading-relaxed mb-4">
                          {service.description}
                        </p>
                        {service.stats && (
                          <p className="text-xs font-medium mb-4 text-gray-500 dark:text-gray-400/80 flex items-center gap-1.5">
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {service.stats}
                          </p>
                        )}
                      </div>

                      {/* CTA Button */}
                      <div className="relative z-10 mt-auto">
                        <span
                          className={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r ${service.color} text-white/90 shadow-sm group-hover:shadow-md group-hover:brightness-110 transition-all duration-300 backdrop-blur-sm border border-white/20`}
                        >
                          {service.cta}
                          <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                        </span>
                      </div>

                      {/* Hover shine effect */}
                      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 left-0 w-1/2 h-full transform -skew-x-12 bg-gradient-to-r dark:from-white/10 dark:via-white/30 dark:to-white/10 from-gray-500/30 to-gray-200/80 via-blue-400/50 animate-shine" />
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
        <div
          className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl p-2 sm:p-8 shadow border border-gray-200/50 dark:border-gray-700/30 relative overflow-hidden mb-20"
          ref={analyticsRef}
        >
          {/* Glass texture */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjYiPgo8cmVjdCB3aWR0aD0iNiIgaGVpZ2h0PSI2IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjA1IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjwvcmVjdD4KPHBhdGggZD0iTTAgMEw2IDZaIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjEiIGZpbGw9Im5vbmUiPjwvcGF0aD4KPHBhdGggZD0iTTYgMEwwIDZaIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjEiIGZpbGw9Im5vbmUiPjwvcGF0aD4KPC9zdmc+')]" />

          {/* Gradient accents */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-400/10 dark:bg-blue-500/10 blur-xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-purple-400/10 dark:bg-purple-500/10 blur-xl pointer-events-none" />

          <motion.div
            initial="hidden"
            animate={analyticsInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 relative z-10"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white/90 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/50 shadow-sm">
                  <BarChart2 className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                </div>
                Performance Analytics
              </h3>
              <p className="text-gray-600 dark:text-gray-400/80 mt-2">
                Data-driven insights to optimize your digital strategy
              </p>
            </div>
            <div className="flex items-center gap-3">
              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-blue-600 dark:text-blue-300 text-sm shadow-sm"
              >
                <TrendingUp className="w-4 h-4" />
                <span>2024 Trends</span>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-green-600 dark:text-green-300 text-sm shadow-sm"
              >
                <Search className="w-4 h-4" />
                <span>Real-time Data</span>
              </motion.div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
            {/* Meta & Google Ads Performance */}
            <motion.div
              initial="hidden"
              animate={analyticsInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-lg p-5 rounded-xl border border-gray-200/50 dark:border-gray-700/30 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white/90">
                  Paid Advertising Performance
                </h4>
                <div className="flex gap-2">
                  <motion.span
                    variants={fadeInUp}
                    transition={{ delay: 0.2 }}
                    className="py-1 px-2 text-xs rounded-full bg-blue-100/80 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 backdrop-blur-sm border border-blue-200/30 dark:border-blue-700/30"
                  >
                    Meta Ads
                  </motion.span>
                  <motion.span
                    variants={fadeInUp}
                    transition={{ delay: 0.3 }}
                    className="px-2 py-1 text-xs rounded-full bg-orange-100/80 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 backdrop-blur-sm border border-orange-200/30 dark:border-orange-700/30"
                  >
                    Google Ads
                  </motion.span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={enhancedAdPerformanceData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(156, 163, 175, 0.2)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    axisLine={{ stroke: "rgba(156, 163, 175, 0.2)" }}
                  />
                  <YAxis
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    axisLine={{ stroke: "rgba(156, 163, 175, 0.2)" }}
                  />
                  <Tooltip
                    content={(props) => (
                      <ChartTooltip
                        {...props}
                        data={enhancedAdPerformanceData}
                      />
                    )}
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
              initial="hidden"
              animate={analyticsInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-lg p-5 rounded-xl border border-gray-200/50 dark:border-gray-700/30 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white/90">
                  Organic Growth Metrics
                </h4>
                <motion.span
                  variants={fadeInUp}
                  transition={{ delay: 0.3 }}
                  className="px-2 py-1 text-xs rounded-full bg-green-100/80 dark:bg-green-900/50 text-green-800 dark:text-green-200 backdrop-blur-sm border border-green-200/30 dark:border-green-700/30"
                >
                  SEO Performance
                </motion.span>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={enhancedAdPerformanceData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(156, 163, 175, 0.2)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    axisLine={{ stroke: "rgba(156, 163, 175, 0.2)" }}
                  />
                  <YAxis
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    axisLine={{ stroke: "rgba(156, 163, 175, 0.2)" }}
                  />
                  <Tooltip
                    content={(props) => (
                      <ChartTooltip
                        {...props}
                        data={enhancedAdPerformanceData}
                      />
                    )}
                  />
                  <Bar dataKey="SEO" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          ref={ctaRef}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="relative"
        >
          <div className="bg-gradient-to-r from-blue-50/70 to-purple-50/70 dark:from-gray-800/70 dark:to-gray-700/70 rounded-3xl p-8 sm:p-10 shadow border border-gray-200/50 dark:border-gray-700/30 backdrop-blur-xl relative overflow-hidden text-center flex flex-col items-center">
            {/* Decorative elements */}
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-400/10 dark:bg-blue-500/10 blur-xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-purple-400/10 dark:bg-purple-500/10 blur-xl pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjYiPgo8cmVjdCB3aWR0aD0iNiIgaGVpZ2h0PSI2IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjAyIj48L3JlY3Q+Cjwvc3ZnPg==')]" />

            <motion.h3
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white/90 mb-4 relative z-10"
            >
              Ready to Transform Your Digital Presence?
            </motion.h3>
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-lg text-center text-gray-600 dark:text-gray-300/80 max-w-2xl mx-auto mb-8 relative z-10"
            >
              Our team of experts is ready to help you achieve exceptional
              results with tailored solutions.
            </motion.p>
            <motion.div variants={fadeInUp} transition={{ delay: 0.3 }}>
              <Buttons
                first_label="Explore All Services"
                first_nav="/services"
                icon={"right-arrow"}
                first_styles="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 relative z-10"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(100%) skewX(-15deg);
          }
        }
        .animate-shine {
          animation: shine 1.5s infinite;
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-15px) translateX(-15px);
          }
        }
        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-10px) translateX(5px);
          }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default OurServices;
