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

const COLORS = ["#2563eb", "#10b981", "#f97316"];

const ShopifySection = () => {
  return (
    <section className="w-full py-20 px-6 md:px-12 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-center transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.span
            className="inline-block mb-4 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Shopify Excellence
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
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
          <p className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            We craft{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              high-performance
            </span>{" "}
            Shopify stores with
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              {" "}
              stunning designs
            </span>{" "}
            and
            <span className="font-semibold text-green-600 dark:text-green-400">
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
          className="mt-16 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <Palette className="w-8 h-8 text-blue-600" />,
              title: "Custom Themes",
              description:
                "Stand out with unique, visually stunning themes tailored to your brand.",
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: <ShoppingCart className="w-8 h-8 text-purple-600" />,
              title: "Store Setup",
              description:
                "From product uploads to payment gateways, we handle every detail of your Shopify store setup.",
              color: "from-purple-500 to-purple-600",
            },
            {
              icon: <Zap className="w-8 h-8 text-green-600" />,
              title: "One-Click Checkout",
              description:
                "Reduce cart abandonment and boost conversions with a seamless, one-click checkout experience.",
              color: "from-green-500 to-green-600",
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="group relative overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              <div className="relative bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 text-center h-full border border-gray-100 dark:border-gray-700 group-hover:border-transparent transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-blue-50 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-gray-600 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
                <div className="mt-6">
                  <span className="inline-block px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full transition-colors">
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
          className="max-w-6xl mx-auto mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8"
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
                      background: "rgba(17, 24, 39, 0.9)",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      color: "#fff",
                      padding: "12px",
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
                    stroke="rgba(156, 163, 175, 0.3)"
                  />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 150]}
                    stroke="rgba(156, 163, 175, 0.5)"
                  />
                  <Radar
                    name="2023"
                    dataKey="A"
                    stroke="#2563eb"
                    fill="#2563eb"
                    fillOpacity={0.4}
                    strokeWidth={2}
                  />
                  <Radar
                    name="2024"
                    dataKey="B"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.4}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(17, 24, 39, 0.9)",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      color: "#fff",
                      padding: "12px",
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
              className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 transition-all border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-900/50"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
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
          <div className="relative max-w-2xl mx-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-blue-500/10 blur-xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-purple-500/10 blur-xl"
            />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Ready to Elevate Your Shopify Store?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Our experts will help you build a high-converting e-commerce
                platform that stands out from the competition.
              </p>
              <Buttons
                first_nav="/services/shopify-theme-development"
                first_label="Get Started Now"
                icon={"rocket"}
                first_styles="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopifySection;
