"use client";

import { pieData, radarData } from "@/data/shopify";
import { motion } from "framer-motion";
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
import { Rocket, Palette, ShoppingCart, Zap } from "lucide-react";

const COLORS = ["#3b82f6", "#10b981", "#f97316", "#8b5cf6"];

const ShopifySection = () => {
  return (
    <section className="w-full py-20 px-6 md:px-12 bg-gradient-to-br from-blue-50/50 via-white/50 to-blue-50/50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm text-center transition-colors relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-400/10 dark:bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-purple-400/10 dark:bg-purple-500/10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.span
            className="inline-block mb-4 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200/30 dark:border-blue-700/30 shadow-inner"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Shopify Excellence
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white/90">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Transform Your E-Commerce Experience
            </span>
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="inline-block ml-2"
            >
              🚀
            </motion.span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-700/90 dark:text-gray-300/90 leading-relaxed backdrop-blur-sm">
            We craft{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400 bg-white/50 dark:bg-gray-800/50 px-1.5 py-0.5 rounded">
              high-performance
            </span>{" "}
            Shopify stores with
            <span className="font-semibold text-purple-600 dark:text-purple-400 bg-white/50 dark:bg-gray-800/50 px-1.5 py-0.5 rounded">
              {" "}
              stunning designs
            </span>{" "}
            and
            <span className="font-semibold text-green-600 dark:text-green-400 bg-white/50 dark:bg-gray-800/50 px-1.5 py-0.5 rounded">
              {" "}
              seamless functionality
            </span>{" "}
            that drive conversions.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-16 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            {
              icon: (
                <Palette className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              ),
              title: "Custom Themes",
              description:
                "Stand out with unique, visually stunning themes tailored to your brand.",
              color: "from-blue-500 to-blue-600",
              darkColor: "from-blue-400 to-blue-500",
            },
            {
              icon: (
                <ShoppingCart className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              ),
              title: "Store Setup",
              description:
                "From product uploads to payment gateways, we handle every detail of your Shopify store setup.",
              color: "from-purple-500 to-purple-600",
              darkColor: "from-purple-400 to-purple-500",
            },
            {
              icon: (
                <Zap className="w-8 h-8 text-green-600 dark:text-green-400" />
              ),
              title: "One-Click Checkout",
              description:
                "Reduce cart abandonment and boost conversions with a seamless, one-click checkout experience.",
              color: "from-green-500 to-green-600",
              darkColor: "from-green-400 to-green-500",
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="group relative"
            >
              {/* Glass card with inner shadow */}
              <div className="relative bg-white/70 dark:bg-gray-800/60 backdrop-blur-md rounded-xl p-8 text-center h-full border border-gray-200/50 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}
                ></div>

                {/* Inner shadow effect */}
                <div className="absolute inset-0 rounded-xl shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)] dark:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)] pointer-events-none"></div>

                {/* Icon container */}
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-white/80 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200/30 dark:border-gray-600/30 shadow-inner group-hover:bg-white/90 dark:group-hover:bg-gray-600/50 transition-colors">
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white/90 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                  {service.title}
                </h3>
                <p className="mt-4 text-gray-600/90 dark:text-gray-400/90">
                  {service.description}
                </p>
                <div className="mt-6">
                  <span className="inline-block px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm rounded-full border border-gray-200/30 dark:border-gray-600/30 shadow-inner hover:shadow-sm transition-all">
                    Learn more →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Data Visualization Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="max-w-6xl mx-auto mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {[
            {
              title: "Traffic Sources Analysis",
              component: (
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Percentage"]}
                    contentStyle={{
                      background: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(4px)",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      borderRadius: "8px",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                      color: "#111827",
                      padding: "12px",
                    }}
                    itemStyle={{
                      color: "#111827",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: "20px" }}
                    formatter={(value) => (
                      <span className="text-gray-700 dark:text-gray-300">
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              ),
            },
            {
              title: "Marketing Performance",
              component: (
                <RadarChart outerRadius={90} data={radarData}>
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
                    stroke="rgba(156, 163, 175, 0.2)"
                  />
                  <Radar
                    name="2023"
                    dataKey="A"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar
                    name="2024"
                    dataKey="B"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(4px)",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      borderRadius: "8px",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                      color: "#111827",
                      padding: "12px",
                    }}
                    itemStyle={{
                      color: "#111827",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: "20px" }}
                    formatter={(value) => (
                      <span className="text-gray-700 dark:text-gray-300">
                        {value}
                      </span>
                    )}
                  />
                </RadarChart>
              ),
            },
          ].map((chart, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-md rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all overflow-hidden"
            >
              {/* Inner shadow */}
              <div className="absolute inset-0 rounded-xl shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)] dark:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)] pointer-events-none"></div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white/90 mb-6">
                {chart.title}
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                {chart.component}
              </ResponsiveContainer>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="relative max-w-2xl mx-auto bg-white/70 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-8 sm:p-10 border border-gray-200/50 dark:border-gray-700/30 shadow-lg overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-400/10 dark:bg-blue-500/10 blur-2xl -z-10"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-purple-400/10 dark:bg-purple-500/10 blur-2xl -z-10"></div>

            {/* Inner shadow */}
            <div className="absolute inset-0 rounded-2xl shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.05)] dark:shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.2)] pointer-events-none"></div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white/90 mb-6">
                Ready to Elevate Your Shopify Store?
              </h3>
              <p className="text-lg text-gray-600/90 dark:text-gray-400/90 mb-8">
                Our experts will help you build a high-converting e-commerce
                platform that stands out from the competition.
              </p>
              <Buttons
                first_nav="/services/shopify-theme-development"
                first_label="Get Started Now"
                icon={"rocket"}
                first_styles="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopifySection;
