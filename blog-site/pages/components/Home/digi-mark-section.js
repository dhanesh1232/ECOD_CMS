"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { data } from "@/data/service_data";
import { Search, BarChart2, Share2, Rocket, ArrowRight } from "lucide-react";
const Buttons = dynamic(() => import("../Reusable/buttons"));

const DigitalMarketing = () => {
  const serviceData = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "SEO (Search Engine Optimization)",
      color: "from-blue-500 to-blue-600",
      description:
        "Improves website visibility on search engines like Google by optimizing content, keywords, and backlinks.",
      stats: "250%+ traffic growth",
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "PPC (Pay-Per-Click)",
      color: "from-purple-500 to-purple-600",
      description:
        "Paid advertising model where businesses pay per click, effective for quick traffic and conversions.",
      stats: "5-10x ROI common",
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Social Media Marketing",
      color: "from-orange-500 to-orange-600",
      description:
        "Engages audiences through platforms like Facebook and Instagram for brand awareness and sales growth.",
      stats: "3-5x engagement boost",
    },
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-8 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/50 dark:from-gray-900/50 dark:via-gray-800 dark:to-gray-900/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 text-sm font-medium mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Rocket className="w-4 h-4 mr-2" /> Digital Growth Solutions
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 leading-tight">
            Transform Your Digital Presence
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Amplify your brand with our{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              data-driven
            </span>{" "}
            marketing strategies that deliver{" "}
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              measurable results
            </span>{" "}
            and{" "}
            <span className="font-semibold text-orange-600 dark:text-orange-400">
              sustainable growth
            </span>
            .
          </motion.p>
        </motion.div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 mb-16"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Marketing Performance
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Last 12 months growth metrics
              </p>
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
              {["SEO", "PPC", "SMM"].map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor:
                      item === "SEO"
                        ? "rgba(99, 102, 241, 0.1)"
                        : item === "PPC"
                          ? "rgba(139, 92, 246, 0.1)"
                          : "rgba(249, 115, 22, 0.1)",
                    color:
                      item === "SEO"
                        ? "#6366f1"
                        : item === "PPC"
                          ? "#8b5cf6"
                          : "#f97316",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(156, 163, 175, 0.2)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(156, 163, 175, 0.2)" }}
                />
                <YAxis
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(156, 163, 175, 0.2)" }}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(17, 24, 39, 0.95)",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#fff" }}
                  labelStyle={{ color: "#fff", fontWeight: 600 }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  formatter={(value) => (
                    <span className="text-gray-700 dark:text-gray-300">
                      {value}
                    </span>
                  )}
                />
                <Line
                  type="monotone"
                  dataKey="SEO"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#6366f1" }}
                  activeDot={{
                    r: 6,
                    stroke: "#6366f1",
                    strokeWidth: 2,
                    fill: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="PPC"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#8b5cf6" }}
                  activeDot={{
                    r: 6,
                    stroke: "#8b5cf6",
                    strokeWidth: 2,
                    fill: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="SMM"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#f97316" }}
                  activeDot={{
                    r: 6,
                    stroke: "#f97316",
                    strokeWidth: 2,
                    fill: "#fff",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {serviceData.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group relative overflow-hidden shadow-2xl cursor-pointer"
            >
              <div
                className={`cursor-pointer absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`}
              />
              <div className="relative bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 h-full border border-gray-100 dark:border-gray-700 group-hover:shadow-xl transition-all">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${service.color} text-white mb-6`}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {service.description}
                </p>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    {service.stats}
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="relative max-w-3xl mx-auto px-8 py-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden">
            <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Ready to Accelerate Your Growth?
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Our digital marketing experts will craft a customized strategy
                to elevate your brand and drive real results.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Buttons
                  first_nav="/services/digital-marketing"
                  first_label="Get Started"
                  second_nav="/contact"
                  second_label="Book Consultation"
                  icon={true}
                  first_styles="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 hover:text-blue-700 font-semibold rounded-lg hover:bg-gray-50 hover:scale-105 transition-transform"
                  second_styles="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold rounded-lg hover:scale-105 transition-transform"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalMarketing;
