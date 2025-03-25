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
  ResponsiveContainer,
} from "recharts";

import { data } from "@/data/service_data";
const Buttons = dynamic(() => import("../Reusable/buttons"));

const DigitalMarketing = () => {
  return (
    <section className="w-full py-20 px-4 sm:px-8 bg-gradient-to-r from-blue-50 to-white text-center dark:to-gray-700 dark:from-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-extrabold dark:text-gray-100 text-gray-900"
        >
          🚀 Digital Marketing & Branding
        </motion.h2>

        {/* Section Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg dark:text-slate-100 text-slate-700"
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
          className="mt-2 text-gray-600 dark:text-slate-50"
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
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
              {[
                { key: "SEO", color: "#6366f1" },
                { key: "PPC", color: "#8b5cf6" },
                { key: "SMM", color: "#f97316" },
              ].map(({ key, color }) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={color}
                  strokeWidth={2}
                  dot={{ r: 4, fill: color }}
                />
              ))}
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
          <h3 className="text-xl font-semibold dark:text-slate-100 text-gray-900">
            Understanding Digital Marketing Tools
          </h3>
          {[
            {
              title: "SEO (Search Engine Optimization)",
              color: "text-blue-600",
              description:
                "Improves website visibility on search engines like Google by optimizing content, keywords, and backlinks.",
            },
            {
              title: "PPC (Pay-Per-Click Advertising)",
              color: "text-purple-600",
              description:
                "A paid advertising model where businesses pay per click on their ad, effective for quick traffic and conversions.",
            },
            {
              title: "Social Media Marketing (SMM)",
              color: "text-orange-600",
              description:
                "Engages audiences through platforms like Facebook, Instagram, and LinkedIn for brand awareness and sales growth.",
            },
          ].map(({ title, color, description }) => (
            <p key={title} className="mt-2 text-gray-700 dark:text-slate-50">
              <strong className={color}>{title}</strong>: {description}
            </p>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Buttons
            first_nav="/services/digital-marketing"
            first_label="Get Started"
            second_label="Contact Us"
            second_nav="/contact"
            icon={true}
            first_styles="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-500 hover:scale-105 transition-transform duration-300"
            second_styles="px-8 py-3 border-2 border-blue-600 text-blue-600 text-lg font-semibold rounded-lg hover:bg-blue-600 hover:text-white hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalMarketing;
