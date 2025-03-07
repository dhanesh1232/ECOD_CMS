"use client";

import { adPerformanceData } from "@/data/service_data";
import { eco_services } from "@/data/service_data";

import Link from "next/link";
import { MoveRight } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import dynamic from "next/dynamic";

const ServiceCard = dynamic(() => import("../serviceCard"));
import { motion } from "framer-motion";

// Function to calculate growth percentage
const getGrowthTrend = (current, previous) => {
  if (!previous) return "📊 No Previous Data";
  const diff = current - previous;
  const percentage = ((diff / previous) * 100).toFixed(2);
  return diff > 0 ? `📈 +${percentage}%` : `📉 ${percentage}%`;
};

// Enhance data with growth trends
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
  const displayedServices = eco_services.slice(0, 4);

  return (
    <section className="w-full py-20 px-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading with Motion Animation */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-2xl md:text-4xl font-extrabold text-gray-900"
        >
          🚀 Our Premium Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-4 text-base md:text-lg text-gray-700"
        >
          Empowering businesses with cutting-edge digital solutions tailored for
          success.
        </motion.p>
      </div>

      {/* Service Cards with Motion Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {displayedServices?.length > 0 ? (
          displayedServices.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))
        ) : (
          <p>Services Not Found 404</p>
        )}
      </motion.div>

      {/* Performance Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className="mt-16 max-w-6xl mx-auto"
      >
        <h3 className="text-xl font-semibold text-center text-gray-900">
          📊 Business Growth Trends In 2024
        </h3>
        <p className="text-center text-gray-600 mb-6">
          See how businesses have gained growth through online presence.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Line Chart - Ads Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="bg-white p-5 rounded-xl shadow-md border border-gray-200"
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
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
                />
                <Line
                  type="monotone"
                  dataKey="GoogleAds"
                  stroke="#F97316"
                  strokeWidth={2}
                  name="Google Ads"
                />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center p-4 bg-blue-50 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold text-gray-900">
                📈 Growth Insights
              </h4>
              <p className="text-lg text-gray-700 mt-2">
                Meta Ads:{" "}
                {
                  enhancedAdPerformanceData[
                    enhancedAdPerformanceData.length - 1
                  ].MetaTrend
                }{" "}
                | Google Ads:{" "}
                {
                  enhancedAdPerformanceData[
                    enhancedAdPerformanceData.length - 1
                  ].GoogleTrend
                }
              </p>
            </div>
          </motion.div>

          {/* Bar Chart - SEO Growth */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="bg-white p-5 rounded-xl shadow-md border border-gray-200"
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
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
                />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center p-4 bg-green-50 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold text-gray-900">
                📈 SEO Growth Insights
              </h4>
              <p className="text-lg text-gray-700 mt-2">
                SEO:{" "}
                {
                  enhancedAdPerformanceData[
                    enhancedAdPerformanceData.length - 1
                  ].SEOTrend
                }
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Benefits of Online Presence */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
        className="mt-10 max-w-4xl mx-auto text-center bg-white p-6 rounded-xl shadow-md border border-gray-200"
      >
        <h3 className="text-xl font-semibold text-gray-900">
          🌍 Why Does Online Presence Matter?
        </h3>
        <p className="text-gray-600 mt-4">
          A strong online presence helps businesses reach their target audience,
          boost brand visibility, and drive more conversions. Using tools like
          Meta Ads, Google Ads, and SEO, businesses can connect with potential
          customers, increase website traffic, and grow sales.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          <div className="p-4 bg-blue-50 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-blue-600">
              📢 Meta & Google Ads
            </h4>
            <p className="text-gray-700 text-sm mt-2">
              Paid ads deliver **instant visibility** and **quick lead
              generation**, ensuring your business appears at the top when
              customers search for relevant services.
            </p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-green-600">
              🔍 SEO Growth
            </h4>
            <p className="text-gray-700 text-sm mt-2">
              SEO drives **long-term brand authority** and delivers **consistent
              traffic** without the high costs of paid ads.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Explore More Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
        className="mt-10 text-center"
      >
        <Link
          href="/services"
          className="inline-flex items-center gap-4 justify-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:from-indigo-500 hover:to-purple-500 hover:scale-105 transition-transform duration-300"
        >
          <span>Explore More Services</span> <MoveRight />
        </Link>
      </motion.div>
    </section>
  );
};

export default OurServices;
