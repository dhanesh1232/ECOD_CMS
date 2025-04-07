"use client";

import { useState, useEffect } from "react";
import { pieData, radarData } from "../../../data/shopify";
import { shopify_services_data } from "../../../data/service_data";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Buttons from "../Reusable/buttons";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const COLORS = ["#3b82f6", "#10b981", "#f97316", "#8b5cf6"];

const ShopifySection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // State for animated numbers
  const [animatedValues, setAnimatedValues] = useState({
    storesBuilt: 0,
    conversionIncrease: 0,
    loading: true,
  });

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues({
        storesBuilt: 247,
        conversionIncrease: 63,
        loading: false,
      });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Animate numbers
  useEffect(() => {
    if (inView && !animatedValues.loading) {
      const duration = 2000;
      const start = Date.now();

      const animate = () => {
        const now = Date.now();
        const progress = Math.min(1, (now - start) / duration);

        setAnimatedValues((prev) => ({
          ...prev,
          storesBuilt: Math.floor(progress * 247),
          conversionIncrease: Math.floor(progress * 63),
        }));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [inView, animatedValues.loading]);

  const handleContactModel = () => {
    const clickData = {
      timestamp: new Date().toISOString(),
      modelOpen: true,
    };
    // Save the individual click
    localStorage.setItem(`contactModelClick`, JSON.stringify(clickData));
  };
  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={ref}
        className="w-full py-20 px-6 md:px-12 bg-gradient-to-br from-blue-50/50 via-white/50 to-blue-50/50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm text-center transition-colors relative overflow-hidden"
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 0.1, y: 0 } : {}}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute rounded-full bg-blue-400/20 dark:bg-blue-500/20"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Performance Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {[
              {
                value: `${animatedValues.storesBuilt}+`,
                label: "Stores Built",
              },
              {
                value: `${animatedValues.conversionIncrease}%`,
                label: "Avg. Conversion Increase",
              },
              { value: "4.9/5", label: "Client Satisfaction" },
              { value: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/30 dark:border-gray-700/30 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="mt-2 text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Enhanced Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto relative"
          >
            <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-blue-500/10 blur-xl -z-10"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-purple-500/10 blur-xl -z-10"></div>

            <motion.span
              className="inline-block mb-4 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200/30 dark:border-blue-700/30 shadow-inner"
              whileHover={{ scale: 1.05 }}
            >
              Shopify Excellence
            </motion.span>

            <motion.h2
              className="text-4xl md:text-6xl font-extrabold mb-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Transform Your E-Commerce
              </span>
              <motion.span
                className="inline-block ml-3"
                animate={inView ? { rotate: [0, 15, -15, 0] } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                🚀
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-xl text-gray-700/90 dark:text-gray-300/90 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              We build{" "}
              <span className="font-bold text-blue-600 dark:text-blue-400">
                high-converting
              </span>{" "}
              Shopify stores with
              <span className="font-bold text-purple-600 dark:text-purple-400">
                {" "}
                cutting-edge tech
              </span>{" "}
              and
              <span className="font-bold text-green-600 dark:text-green-400">
                {" "}
                proven strategies
              </span>
              .
            </motion.p>
          </motion.div>

          {/* Enhanced Services Grid */}
          <motion.div
            className="mt-16 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {shopify_services_data.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative"
              >
                <Link href={service.link} passHref>
                  <div className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-xl bg-white/90 dark:bg-gray-700/80 backdrop-blur-sm shadow-inner group-hover:shadow-sm transition-all">
                      {service.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {service.description}
                    </p>

                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                      Learn more
                      <svg
                        className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Data Visualization */}
          <motion.div
            className="max-w-6xl mx-auto mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Traffic Sources Analysis
              </h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => (
                        <text fill="#374151" fontSize={12} fontWeight={500}>
                          {`${name} ${(percent * 100).toFixed(0)}%`}
                        </text>
                      )}
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.fill || COLORS[index % COLORS.length]}
                          stroke="#fff"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ payload }) => (
                        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl p-4 border border-gray-200/30 dark:border-gray-700/30">
                          {payload?.map((entry, index) => (
                            <div
                              key={`tooltip-${index}`}
                              className="mb-2 last:mb-0"
                            >
                              <div className="flex items-center">
                                <div
                                  className="w-3 h-3 rounded-full mr-2"
                                  style={{ backgroundColor: entry.color }}
                                />
                                <span className="font-semibold">
                                  {entry.name}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 mt-1 text-sm">
                                <span className="text-gray-500">Value:</span>
                                <span className="font-medium">
                                  {entry.value}
                                </span>
                                <span className="text-gray-500">Share:</span>
                                <span className="font-medium">
                                  {((entry.payload.percent || 0) * 100).toFixed(
                                    1
                                  )}
                                  %
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Marketing Performance
              </h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid
                      gridType="circle"
                      stroke="rgba(156, 163, 175, 0.2)"
                    />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 150]}
                      stroke="rgba(156, 163, 175, 0.1)"
                    />
                    <Radar
                      name="Current"
                      dataKey="current"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Target"
                      dataKey="target"
                      stroke="#10b981"
                      fill="transparent"
                      strokeWidth={1.5}
                      strokeDasharray="3 3"
                    />
                    <Tooltip
                      content={({ payload }) => (
                        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl p-4 border border-gray-200/30 dark:border-gray-700/30">
                          {payload?.map((entry, index) => (
                            <div
                              key={`radar-tooltip-${index}`}
                              className="mb-2 last:mb-0"
                            >
                              <div className="flex items-center">
                                <div
                                  className="w-3 h-3 rounded-full mr-2"
                                  style={{ backgroundColor: entry.color }}
                                />
                                <span className="font-semibold">
                                  {entry.name}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 mt-1 text-sm">
                                <span className="text-gray-500">Metric:</span>
                                <span className="font-medium">
                                  {entry.payload.subject}
                                </span>
                                <span className="text-gray-500">Score:</span>
                                <span className="font-medium">
                                  {entry.value}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                    <Legend
                      wrapperStyle={{ paddingTop: 20 }}
                      formatter={(value) => (
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {value}
                        </span>
                      )}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* Enhanced CTA */}
          <motion.div
            className="mt-24"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="relative max-w-2xl mx-auto bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-800/60 dark:to-gray-900/60 backdrop-blur-lg rounded-3xl p-8 sm:p-10 border border-gray-200/30 dark:border-gray-700/30 shadow-xl overflow-hidden">
              <div className="absolute inset-0 rounded-3xl shadow-[inset_0_4px_12px_0_rgba(0,0,0,0.05)] dark:shadow-[inset_0_4px_12px_0_rgba(0,0,0,0.2)] pointer-events-none"></div>

              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Ready to Transform Your Store?
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Get a free consultation with our Shopify experts today.
                </p>
                <Buttons
                  buttonActionOne={handleContactModel}
                  first_label="Schedule Consultation"
                  icon={"calendar"}
                  first_styles="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default ShopifySection;
