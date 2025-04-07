"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  X,
  Rocket,
  ArrowUpRight,
  Zap,
  TrendingUp,
  BarChart2,
  LineChart,
} from "lucide-react";

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

const Popup = ({ selectedBenefit, onClose }) => {
  if (!selectedBenefit) return null;

  // Sample data for different charts
  const performanceData = [
    { month: "Jan", value: 120 },
    { month: "Feb", value: 150 },
    { month: "Mar", value: 180 },
    { month: "Apr", value: 210 },
    { month: "May", value: 190 },
    { month: "Jun", value: 220 },
  ];

  const channelData = [
    { name: "Organic", value: 35 },
    { name: "Paid", value: 25 },
    { name: "Direct", value: 20 },
    { name: "Social", value: 20 },
  ];

  const engagementData = [
    { subject: "CTR", A: 65, fullMark: 100 },
    { subject: "Time", A: 72, fullMark: 100 },
    { subject: "Shares", A: 58, fullMark: 100 },
    { subject: "Clicks", A: 81, fullMark: 100 },
    { subject: "Views", A: 76, fullMark: 100 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Enhanced Glass Popup */}
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 20 }}
        className="relative h-4/5 overflow-y-auto scroll-smooth bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 max-w-4xl w-full mx-4 overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 dark:bg-gray-700/50 hover:bg-white/30 dark:hover:bg-gray-600/50 transition-colors backdrop-blur-sm z-10"
        >
          <X className="w-5 h-5 text-gray-800 dark:text-gray-200" />
        </button>

        {/* Inner shadow */}
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.2)] pointer-events-none"></div>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 flex items-center justify-center shadow-inner flex-shrink-0">
              {React.cloneElement(selectedBenefit.icon, {
                className: "w-10 h-10 text-indigo-600 dark:text-indigo-400",
              })}
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white/90">
                {selectedBenefit.title}
              </h3>
              <p className="mt-2 text-gray-600/90 dark:text-gray-300/90">
                {selectedBenefit.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 text-xs font-medium">
                  +24% MoM Growth
                </span>
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs font-medium">
                  High Engagement
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-medium">
                  <TrendingUp className="inline w-3 h-3 mr-1" />
                  Trending
                </span>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/80 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg p-4 border border-white/30 dark:border-gray-600/30">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Impressions
              </p>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                24.5K
              </p>
              <MetricBadge value="12.4" positive={true} />
            </div>
            <div className="bg-white/80 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg p-4 border border-white/30 dark:border-gray-600/30">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Engagement
              </p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                8.2%
              </p>
              <MetricBadge value="5.3" positive={true} />
            </div>
            <div className="bg-white/80 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg p-4 border border-white/30 dark:border-gray-600/30">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Conversions
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                3.7%
              </p>
              <MetricBadge value="2.1" positive={true} />
            </div>
            <div className="bg-white/80 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg p-4 border border-white/30 dark:border-gray-600/30">
              <p className="text-sm text-gray-500 dark:text-gray-400">ROI</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                4.2x
              </p>
              <MetricBadge value="18.6" positive={true} />
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Performance Trend */}
            <div className="bg-white/80 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg p-4 border border-white/30 dark:border-gray-600/30">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                Performance Trend
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient
                        id="colorValue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8884d8"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8884d8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Channel Distribution */}
            <div className="bg-white/80 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg p-4 border border-white/30 dark:border-gray-600/30">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <BarChart2 className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-400" />
                Channel Distribution
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {channelData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Engagement Metrics */}
            <div className="bg-white/80 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg p-4 border border-white/30 dark:border-gray-600/30">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <LineChart className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                Engagement Metrics
              </p>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    data={engagementData}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Performance"
                      dataKey="A"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg p-4 border border-white/30 dark:border-gray-600/30 md:col-span-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <Zap className="w-4 h-4 mr-2 text-yellow-600 dark:text-yellow-400" />
                Recent Activity
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      Campaign optimized
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Increased CTR by 12% through A/B testing
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      New content published
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Blog post driving 35% of new traffic
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      Audience expanded
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Added 3 new high-value customer segments
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 backdrop-blur-sm font-medium inline-flex items-center"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Get Started with {selectedBenefit.title}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Popup;
