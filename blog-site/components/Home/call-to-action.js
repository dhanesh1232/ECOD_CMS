"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import { Rocket, ArrowRight, Clock, RefreshCw, Activity } from "lucide-react";
import { enhancedBenefits, generateTrafficData } from "@/data/service_data";
import { usePathname, useRouter } from "next/navigation";

const Buttons = dynamic(() => import("@/components/Reusable/buttons"));
const Popup = dynamic(() => import("./pop"));

// Custom components
const MetricBadge = ({ value, positive, className = "" }) => (
  <span
    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${className} ${
      positive
        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
    }`}
  >
    {positive ? "↑" : "↓"} {value}%
  </span>
);

const GlassCard = ({ children, className = "" }) => (
  <div
    className={`backdrop-blur-lg bg-white/30 dark:bg-gray-800/50 rounded-xl p-6 shadow-lg border border-white/20 ${className}`}
  >
    {children}
  </div>
);

const GrowYourBusiness = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [trafficData, setTrafficData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMetric, setActiveMetric] = useState("traffic");

  // Load and refresh data
  useEffect(() => {
    const loadData = () => {
      setIsLoading(true);
      const data = generateTrafficData();
      setTrafficData(data);
      setLastUpdated(new Date().toISOString());
      setIsLoading(false);
    };

    loadData();
    const interval = setInterval(loadData, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedBenefit) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  });

  const handleContactModel = () => {
    router.push(`${pathname}?modal=contact-bid`, { scroll: false });
  };

  // Enhanced Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const currentIndex = trafficData.findIndex((item) => item.name === label);
      const previousData =
        currentIndex > 0 ? trafficData[currentIndex - 1] : null;

      const trafficChange = previousData
        ? (
            ((data.traffic - previousData.traffic) / previousData.traffic) *
            100
          ).toFixed(1)
        : null;
      const revenueChange = previousData
        ? (
            ((data.revenue - previousData.revenue) / previousData.revenue) *
            100
          ).toFixed(1)
        : null;

      return (
        <GlassCard className="p-4 !bg-white/95 dark:!bg-gray-800/95">
          <div className="font-semibold text-gray-900 dark:text-white mb-3">
            {label} Performance
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Traffic:
                </span>
                <span className="font-medium text-indigo-600 dark:text-indigo-400">
                  {data.traffic.toLocaleString()}
                </span>
              </div>
              {trafficChange && (
                <MetricBadge
                  value={Math.abs(trafficChange)}
                  positive={trafficChange > 0}
                  className="mt-1"
                />
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Revenue:
                </span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  ${data.revenue.toLocaleString()}
                </span>
              </div>
              {revenueChange && (
                <MetricBadge
                  value={Math.abs(revenueChange)}
                  positive={revenueChange > 0}
                  className="mt-1"
                />
              )}
            </div>

            {data.conversionRate && (
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Conversion:
                  </span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {(data.conversionRate * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            )}

            {data.isCurrent && (
              <div className="col-span-2 text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Updated: {new Date(data.lastUpdated).toLocaleTimeString()}
              </div>
            )}
          </div>
        </GlassCard>
      );
    }
    return null;
  };

  return (
    <>
      <section className="w-full py-24 px-4 sm:px-8 bg-gradient-to-br from-blue-800/90 via-indigo-800/90 to-purple-900/90 dark:from-blue-900/90 dark:via-indigo-900/90 dark:to-purple-900/90 backdrop-blur-sm relative overflow-hidden">
        {/* Animated background elements */}
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
            whileInView={{ opacity: 1, scale: 1 }}
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

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
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
              className="mt-6 text-base md:text-xl text-blue-100/90 max-w-3xl mx-auto backdrop-blur-sm"
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
                <h3 className="text-xl md:text-2xl font-bold text-white/90 mb-2">
                  Business Growth Metrics
                </h3>
                <div className="flex items-center space-x-3">
                  <p className="text-blue-200/90 text-base sm:text-lg md:text-xl">
                    Real-time performance tracking
                  </p>
                  {isLoading && (
                    <RefreshCw className="w-4 h-4 text-blue-300 animate-spin" />
                  )}
                  {lastUpdated && (
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-blue-200/80">
                      <Clock className="inline w-3 h-3 mr-1" />
                      {new Date(lastUpdated).toLocaleTimeString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-3 mt-4 md:mt-0">
                <button
                  onClick={() => setActiveMetric("traffic")}
                  className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border transition-all ${
                    activeMetric === "traffic"
                      ? "bg-indigo-600/30 text-indigo-100/90 border-white/20"
                      : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
                  }`}
                >
                  Traffic
                </button>
                <button
                  onClick={() => setActiveMetric("revenue")}
                  className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border transition-all ${
                    activeMetric === "revenue"
                      ? "bg-emerald-600/30 text-emerald-100/90 border-white/20"
                      : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
                  }`}
                >
                  Revenue
                </button>
                <span className="px-3 py-1 rounded-full bg-blue-600/30 text-blue-100/90 text-sm font-medium backdrop-blur-sm border border-white/10">
                  <Activity className="inline w-3 h-3 mr-1" />
                  Live
                </span>
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData}>
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#CBD5E1" }}
                    axisLine={{ stroke: "rgba(203, 213, 225, 0.2)" }}
                  />
                  <YAxis
                    tick={{ fill: "#CBD5E1" }}
                    axisLine={{ stroke: "rgba(203, 213, 225, 0.2)" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: "20px" }}
                    formatter={(value) => (
                      <span className="text-gray-300">{value}</span>
                    )}
                  />
                  <ReferenceLine
                    y={10000}
                    stroke="rgba(203, 213, 225, 0.3)"
                    strokeDasharray="3 3"
                    label={{
                      value: "Target",
                      position: "insideTopLeft",
                      fill: "#CBD5E1",
                      fontSize: 12,
                    }}
                  />
                  {activeMetric === "traffic" ? (
                    <Bar
                      dataKey="traffic"
                      name="Website Traffic"
                      radius={[6, 6, 0, 0]}
                      animationDuration={1500}
                    >
                      {trafficData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.isCurrent ? "#818cf8" : "#6366F1"}
                          stroke={entry.isCurrent ? "#a5b4fc" : "#818cf8"}
                          strokeWidth={entry.isCurrent ? 2 : 1}
                        />
                      ))}
                    </Bar>
                  ) : (
                    <Bar
                      dataKey="revenue"
                      name="Revenue Growth"
                      radius={[6, 6, 0, 0]}
                      animationDuration={1500}
                    >
                      {trafficData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.isCurrent ? "#34d399" : "#10B981"}
                          stroke={entry.isCurrent ? "#6ee7b7" : "#34d399"}
                          strokeWidth={entry.isCurrent ? 2 : 1}
                        />
                      ))}
                    </Bar>
                  )}
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
                whileHover={{ y: -5 }}
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
                <div className="relative bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-xl p-6 h-full border border-white/20 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/50 to-indigo-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  <div className="absolute inset-0 rounded-xl shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] pointer-events-none"></div>

                  <motion.span
                    className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100"
                    initial={{ x: -100, skewX: -15 }}
                    whileHover={{ x: 300, skewX: -15 }}
                    transition={{ duration: 0.8 }}
                  />

                  <div className="relative z-10 h-full flex flex-col items-center text-center">
                    <div className="w-14 h-14 mb-5 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm border border-white/20">
                      {React.cloneElement(item.icon, {
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
                      <span className="text-sm font-medium">{item.stats}</span>
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
              <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-indigo-500/20 blur-xl"></div>
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
      <AnimatePresence>
        {selectedBenefit && (
          <Popup
            selectedBenefit={selectedBenefit}
            onClose={() => setSelectedBenefit(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default GrowYourBusiness;
