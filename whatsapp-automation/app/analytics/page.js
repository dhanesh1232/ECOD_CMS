"use client";
import {
  FiBarChart2,
  FiCalendar,
  FiDownload,
  FiChevronDown,
  FiStar,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", conversations: 400, resolved: 240 },
  { name: "Feb", conversations: 300, resolved: 139 },
  { name: "Mar", conversations: 200, resolved: 180 },
  { name: "Apr", conversations: 278, resolved: 200 },
  { name: "May", conversations: 189, resolved: 150 },
  { name: "Jun", conversations: 239, resolved: 210 },
  { name: "Jul", conversations: 349, resolved: 300 },
];

const channelData = [
  { name: "Facebook", value: 35 },
  { name: "WhatsApp", value: 25 },
  { name: "Web Chat", value: 20 },
  { name: "Instagram", value: 15 },
  { name: "Others", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function AnalyticsPage() {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <FiBarChart2 className="text-2xl text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Analytics Dashboard
            </h1>
          </div>

          {/* Date Range & Export */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2">
              <FiCalendar className="text-gray-400 dark:text-gray-300 mr-2" />
              <span className="text-gray-700 dark:text-gray-200 mr-2">
                Last 30 days
              </span>
              <FiChevronDown className="text-gray-500 dark:text-gray-400" />
            </div>
            <button className="flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg px-4 py-2 transition-colors">
              <FiDownload className="text-gray-700 dark:text-gray-300 mr-2" />
              <span className="text-gray-700 dark:text-gray-300">Export</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Conversations"
            value="1,245"
            change="+12%"
            positive
            icon={<FiBarChart2 className="text-blue-500" />}
          />
          <MetricCard
            title="Resolution Rate"
            value="89%"
            change="+2%"
            positive
            icon={<FiTrendingUp className="text-green-500" />}
          />
          <MetricCard
            title="Avg. Response Time"
            value="2m 14s"
            change="-15%"
            positive
            icon={<FiTrendingDown className="text-blue-500" />}
          />
          <MetricCard
            title="Satisfaction"
            value="4.2"
            change="-0.3"
            icon={<FiStar className="text-yellow-500" />}
          />
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard
            title="Conversation Volume"
            filterOptions={["By day", "By week", "By month"]}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#eee"
                  strokeOpacity={0.2}
                />
                <XAxis
                  dataKey="name"
                  stroke="#888"
                  tick={{ fill: "#6b7280" }}
                />
                <YAxis stroke="#888" tick={{ fill: "#6b7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "0.5rem",
                    borderColor: "#e5e7eb",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="conversations"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="resolved"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Response Times"
            filterOptions={["By channel", "By agent"]}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#eee"
                  strokeOpacity={0.2}
                />
                <XAxis
                  dataKey="name"
                  stroke="#888"
                  tick={{ fill: "#6b7280" }}
                />
                <YAxis stroke="#888" tick={{ fill: "#6b7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "0.5rem",
                    borderColor: "#e5e7eb",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="conversations"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Secondary Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ChartCard title="Channel Distribution">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
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
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "0.5rem",
                    borderColor: "#e5e7eb",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Conversation Types">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Support", value: 35 },
                    { name: "Sales", value: 25 },
                    { name: "Feedback", value: 20 },
                    { name: "Other", value: 20 },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
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
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "0.5rem",
                    borderColor: "#e5e7eb",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Satisfaction Ratings">
            <div className="flex flex-col items-center justify-center h-64">
              <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                4.2
              </div>
              <div className="text-gray-500 dark:text-gray-400 mb-4">
                out of 5 stars
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    className={`text-2xl mx-1 ${
                      star <= 4
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                84% positive feedback
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, positive, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </h3>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {value}
          </div>
        </div>
        <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700">{icon}</div>
      </div>
      <div
        className={`mt-3 flex items-center text-sm ${
          positive
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        }`}
      >
        {positive ? (
          <FiTrendingUp className="mr-1" />
        ) : (
          <FiTrendingDown className="mr-1" />
        )}
        <span>{change}</span>
        <span className="text-gray-500 dark:text-gray-400 ml-1">
          vs last period
        </span>
      </div>
    </div>
  );
}

function ChartCard({ title, children, filterOptions }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium text-gray-800 dark:text-white">{title}</h3>
        {filterOptions && (
          <select className="text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-gray-700 dark:text-gray-200">
            {filterOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        )}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
