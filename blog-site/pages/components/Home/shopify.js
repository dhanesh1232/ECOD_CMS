"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { month: "Aug", sales: 0 },
  { month: "Sep", sales: 400 },
  { month: "Oct", sales: 600 },
  { month: "Nov", sales: 800 },
  { month: "Dec", sales: 1200 },
  { month: "Jan", sales: 1500 },
];

const conversionData = [
  { month: "Aug", rate: 0.0 },
  { month: "Sep", rate: 2.0 },
  { month: "Oct", rate: 2.4 },
  { month: "Nov", rate: 2.8 },
  { month: "Dec", rate: 3.7 },
  { month: "Jan", rate: 4.5 },
];

const ShopifySection = () => {
  return (
    <section className="w-full py-16 px-6 md:px-12 bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-center transition-colors">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          Elevate Your Shopify Store 🚀
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
      </div>

      <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sales Growth Chart */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 transition-colors">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Sales Growth
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#ddd"
                className="dark:stroke-gray-700"
              />
              <XAxis dataKey="month" className="dark:text-gray-300" />
              <YAxis className="dark:text-gray-300" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", color: "#fff" }}
                cursor={{ fill: "#374151" }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Rate Chart */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 transition-colors">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Conversion Rate
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={conversionData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#ddd"
                className="dark:stroke-gray-700"
              />
              <XAxis dataKey="month" className="dark:text-gray-300" />
              <YAxis className="dark:text-gray-300" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", color: "#fff" }}
                cursor={{ fill: "#374151" }}
              />
              <Bar dataKey="rate" fill="#10b981" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-gray-600 dark:text-gray-400">
          Unlock unique designs and optimized performance for higher sales.
        </p>
        <a
          href="/services/shopify-themes"
          className="mt-6 inline-block px-8 py-3 bg-blue-600 dark:bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-500 dark:hover:bg-blue-400 hover:scale-105 transition-transform duration-300"
        >
          Explore Solutions
        </a>
      </div>
    </section>
  );
};

export default ShopifySection;
