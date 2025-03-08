"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Data for the line chart
const data = [
  { month: "Jun", SEO: 60, PPC: 70, SMM: 50 },
  { month: "Jul", SEO: 75, PPC: 85, SMM: 65 },
  { month: "Aug", SEO: 90, PPC: 100, SMM: 80 },
  { month: "Sep", SEO: 105, PPC: 120, SMM: 95 },
  { month: "Oct", SEO: 120, PPC: 140, SMM: 110 },
  { month: "Nov", SEO: 135, PPC: 160, SMM: 125 },
  { month: "Dec", SEO: 150, PPC: 180, SMM: 140 },
];

const DigitalMarketing = () => {
  return (
    <section className="w-full py-20 px-4 sm:px-8 bg-gradient-to-r from-blue-50 to-white text-center">
      <div className="max-w-4xl mx-auto">
        {/* Animated Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight"
        >
          🚀 Digital Marketing & Branding
        </motion.h2>

        {/* Animated Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-gray-700"
        >
          Amplify your online presence with{" "}
          <span className="font-semibold text-blue-600">SEO</span>,
          high-converting{" "}
          <span className="font-semibold text-purple-600">PPC campaigns</span>,
          and strategic{" "}
          <span className="font-semibold text-orange-600">
            social media marketing
          </span>
          .
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-2 text-gray-600"
        >
          Let’s take your brand to the next level with data-driven strategies.
        </motion.p>

        {/* Responsive Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 w-full h-64 sm:h-80"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#4a5568" />
              <YAxis stroke="#4a5568" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="SEO"
                stroke="#6366f1" // Indigo
                strokeWidth={2}
                dot={{ r: 4, fill: "#6366f1" }}
              />
              <Line
                type="monotone"
                dataKey="PPC"
                stroke="#8b5cf6" // Purple
                strokeWidth={2}
                dot={{ r: 4, fill: "#8b5cf6" }}
              />
              <Line
                type="monotone"
                dataKey="SMM"
                stroke="#f97316" // Orange
                strokeWidth={2}
                dot={{ r: 4, fill: "#f97316" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Explanation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-left max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-gray-900">
            Understanding Digital Marketing Tools
          </h3>
          <p className="mt-2 text-gray-700">
            <strong className="text-blue-600">
              SEO (Search Engine Optimization)
            </strong>
            : Improves website visibility on search engines like Google. It
            involves optimizing content, keywords, and backlinks to rank higher
            organically.
          </p>
          <p className="mt-2 text-gray-700">
            <strong className="text-purple-600">
              PPC (Pay-Per-Click Advertising)
            </strong>
            : A paid advertising model where businesses pay each time someone
            clicks on their ad. It’s effective for quick traffic and
            conversions.
          </p>
          <p className="mt-2 text-gray-700">
            <strong className="text-orange-600">
              Social Media Marketing (SMM)
            </strong>
            : Engages audiences through platforms like Facebook, Instagram, and
            LinkedIn. It helps in brand awareness, customer interaction, and
            sales growth.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Link
            href="/services/digital-marketing"
            className="px-8 py-3 bg-blue-600 text-white text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-500 hover:scale-105 transition-transform duration-300 flex items-center justify-center"
            aria-label="Get Started with Digital Marketing"
          >
            Get Started
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 border-2 border-blue-600 text-blue-600 text-base sm:text-lg font-semibold rounded-lg hover:bg-blue-600 hover:text-white hover:scale-105 transition-transform duration-300 flex items-center justify-center"
            aria-label="Contact Us for Digital Marketing"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalMarketing;
