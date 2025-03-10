"use client";

import { pieData, radarData, salesData, conversionData } from "@/data/shopify";
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
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Buttons from "../Reusable/buttons";

const COLORS = ["#2563eb", "#10b981", "#f97316"];

const ShopifySection = () => {
  return (
    <section className="w-full py-16 px-6 md:px-12 bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-center transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Elevate Your Shopify Store
          </span>
          🚀
        </h2>
        <p className="mt-4 text-base md:text-lg text-gray-700 dark:text-gray-300">
          We specialize in{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            custom themes
          </span>
          , seamless{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            store setup
          </span>
          , and high-converting{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            one-click checkout
          </span>{" "}
          solutions.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="mt-12 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {[
          {
            title: "Custom Themes",
            description:
              "Stand out with unique, visually stunning themes tailored to your brand.",
          },
          {
            title: "Store Setup",
            description:
              "From product uploads to payment gateways, we handle every detail of your Shopify store setup.",
          },
          {
            title: "One-Click Checkout",
            description:
              "Reduce cart abandonment and boost conversions with a seamless, one-click checkout experience.",
          },
        ].map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 text-center transition-transform border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {service.title}
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        className="max-w-4xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {[
          {
            title: "Traffic Sources",
            component: (
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    color: "#fff",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </PieChart>
            ),
          },
          {
            title: "Marketing Performance",
            component: (
              <RadarChart outerRadius={90} data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar
                  name="2023"
                  dataKey="A"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.6}
                />
                <Radar
                  name="2024"
                  dataKey="B"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    color: "#fff",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </RadarChart>
            ),
          },
        ].map((chart, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 transition-colors border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {chart.title}
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              {chart.component}
            </ResponsiveContainer>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className="mt-8"
      >
        <p className="text-gray-600 dark:text-gray-400">
          Unlock unique designs and optimized performance for higher sales.
        </p>
        <Buttons
          first_nav="/services/shopify-theme-development"
          first_label="Explore Solutions"
          icon
          first_styles="mt-6 inline-flex gap-2 items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:from-blue-500 hover:to-purple-500 hover:scale-105 transition-transform duration-300"
        />
      </motion.div>
    </section>
  );
};

export default ShopifySection;
