"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  LayoutDashboard,
  ArrowUp,
  ArrowDown,
  Activity,
  ChevronDown,
  MoreHorizontal,
  Clock,
  MessageSquare,
  UserPlus,
  Zap,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const conversationData = [
  { day: "Mon", count: 120 },
  { day: "Tue", count: 190 },
  { day: "Wed", count: 150 },
  { day: "Thu", count: 210 },
  { day: "Fri", count: 180 },
  { day: "Sat", count: 90 },
  { day: "Sun", count: 60 },
];

const channelData = [
  { name: "WhatsApp", value: 35 },
  { name: "Facebook", value: 25 },
  { name: "Web Chat", value: 20 },
  { name: "Instagram", value: 15 },
  { name: "Email", value: 5 },
];

const activityData = [
  {
    id: 1,
    icon: <MessageSquare size={16} className="text-blue-600" />,
    title: "New message campaign",
    description: "Sent to 1,245 users",
    time: "2 min ago",
  },
  {
    id: 2,
    icon: <UserPlus size={16} className="text-green-600" />,
    title: "New users onboarded",
    description: "23 new signups today",
    time: "1 hour ago",
  },
  {
    id: 3,
    icon: <Zap size={16} className="text-purple-600" />,
    title: "Automation triggered",
    description: "Welcome flow started for 15 users",
    time: "3 hours ago",
  },
  {
    id: 4,
    icon: <Clock size={16} className="text-yellow-600" />,
    title: "Scheduled campaign",
    description: "Feedback request queued for tomorrow",
    time: "5 hours ago",
  },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "unauthenticated") {
    return null;
  }

  const stats = [
    {
      title: "Total Conversations",
      value: "1,245",
      trend: "up",
      change: "12%",
      icon: <MessageSquare size={20} className="text-blue-600" />,
    },
    {
      title: "Active Bots",
      value: "8",
      trend: "steady",
      icon: <Zap size={20} className="text-purple-600" />,
    },
    {
      title: "Automation Runs",
      value: "3,456",
      trend: "up",
      change: "5%",
      icon: <Activity size={20} className="text-green-600" />,
    },
    {
      title: "Satisfaction Rate",
      value: "89%",
      trend: "down",
      change: "3%",
      icon: <UserPlus size={20} className="text-yellow-600" />,
    },
  ];

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <LayoutDashboard className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Dashboard Overview
            </h1>
          </div>
          <div className="flex items-center">
            <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
              <Clock className="w-4 h-4 text-gray-400 dark:text-gray-300 mr-2" />
              <span className="text-gray-700 dark:text-gray-200 mr-2">
                Last 7 days
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {stat.title}
                  </h3>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    {stat.value}
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                  {stat.icon}
                </div>
              </div>
              {stat.trend && (
                <div
                  className={`mt-3 flex items-center text-sm ${
                    stat.trend === "up"
                      ? "text-green-600 dark:text-green-400"
                      : stat.trend === "down"
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {stat.trend === "up" && <ArrowUp className="w-4 h-4 mr-1" />}
                  {stat.trend === "down" && (
                    <ArrowDown className="w-4 h-4 mr-1" />
                  )}
                  {stat.change && (
                    <>
                      <span>{stat.change}</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1 text-xs">
                        vs last period
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Conversation Activity */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-medium text-gray-800 dark:text-white">
                Conversation Activity
              </h2>
              <div className="flex items-center">
                <select className="text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-gray-700 dark:text-gray-200">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
                <button className="ml-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={conversationData}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#eee"
                    strokeOpacity={0.2}
                  />
                  <XAxis
                    dataKey="day"
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
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorCount)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Channel Distribution */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-medium text-gray-800 dark:text-white">
                Channel Distribution
              </h2>
              <div className="flex items-center">
                <select className="text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-gray-700 dark:text-gray-200">
                  <option>By volume</option>
                  <option>By resolution rate</option>
                </select>
                <button className="ml-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelData}>
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
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-medium text-gray-800 dark:text-white">
              Recent Activity
            </h2>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {activityData.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.description}
                  </p>
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap ml-4">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
