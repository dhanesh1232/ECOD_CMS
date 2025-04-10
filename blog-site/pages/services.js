import { eco_services } from "../data/service_data";
import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import HeadSEO from "./components/Reusable/seo_head";
import {
  Rocket,
  Search,
  X,
  Sparkles,
  TrendingUp,
  BadgeCheck,
  ArrowRight,
  BarChart2,
  Zap,
  ShieldCheck,
  Globe,
  Smartphone,
  Mail,
  ShoppingCart,
  PenTool,
  Eye,
  ArrowUpRight,
  User,
} from "lucide-react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Simulated real-time data hook
const useRealtimeStats = () => {
  const [stats, setStats] = useState({
    totalProjects: 50,
    satisfactionRate: 93,
    averageRating: 4.7,
    activeClients: 4,
    services: [
      {
        label: "Web Development",
        satisfaction: 98,
        roi: 4.2,
        views: 1250,
        conversions: 420,
      },
      {
        label: "Google | Meta Ads",
        satisfaction: 95,
        roi: 3.8,
        views: 980,
        conversions: 310,
      },
      {
        label: "SEO Optimization",
        satisfaction: 97,
        roi: 5.1,
        views: 870,
        conversions: 290,
      },
      {
        label: "Social Media Marketing",
        satisfaction: 92,
        roi: 3.5,
        views: 760,
        conversions: 240,
      },
      {
        label: "Shopify Optimization",
        satisfaction: 96,
        roi: 4.7,
        views: 680,
        conversions: 210,
      },
      {
        label: "Content Marketing",
        satisfaction: 94,
        roi: 4.0,
        views: 590,
        conversions: 180,
      },
      {
        label: "Email Marketing",
        satisfaction: 91,
        roi: 4.5,
        views: 520,
        conversions: 160,
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => {
        // Randomly increment projects and clients
        const newProjects = prev.totalProjects + Math.floor(Math.random() * 2);
        const newClients = 4 + Math.floor(Math.random() * 2);

        // Random small fluctuations in satisfaction
        const newSatisfaction = 93 + Math.floor(Math.random() * 3);

        // Update service metrics with small random changes
        const newServices = prev.services.map((service) => {
          const viewIncrement = Math.floor(Math.random() * 10);
          const conversionRate = 0.3 + Math.random() * 0.1;

          return {
            ...service,
            satisfaction: Math.min(
              100,
              Math.max(
                90,
                service.satisfaction + (Math.random() > 0.5 ? 0.5 : -0.5)
              )
            ),
            roi: parseFloat(
              Math.max(
                3,
                Math.min(6, service.roi + (Math.random() > 0.5 ? 0.05 : -0.05))
              ).toFixed(1)
            ),
            views: service.views + viewIncrement,
            conversions: Math.floor(
              (service.views + viewIncrement) * conversionRate
            ),
          };
        });

        return {
          totalProjects: newProjects,
          satisfactionRate: newSatisfaction,
          averageRating: 4.3 + Math.random() * 0.3,
          activeClients: newClients,
          services: newServices,
        };
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return stats;
};

const ServiceCard = dynamic(() => import("./components/serviceCard"), {
  loading: () => (
    <div className="h-full bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    </div>
  ),
});

const BackAndForward = dynamic(() => import("./components/Reusable/back-forw"));

// Enhanced NoResults component with animation
const NoResults = ({ onClearSearch }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="text-center py-16"
  >
    <div className="max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="relative z-10">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
          <Search className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No matching services found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Try adjusting your search or filter to discover our wide range of
          digital solutions.
        </p>
        <button
          onClick={onClearSearch}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all hover:shadow-lg hover:scale-[1.02]"
        >
          <X className="w-5 h-5" /> Clear Filters
        </button>
      </div>
    </div>
  </motion.div>
);

const handleContactModel = () => {
  const clickData = {
    timestamp: new Date().toISOString(),
    modelOpen: true,
  };
  // Save the individual click
  localStorage.setItem(`contactModelClick`, JSON.stringify(clickData));
};
// Enhanced CallToAction with gradient animation
const CallToAction = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="mt-24"
  >
    <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient-x" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10 p-8 sm:p-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Ready to Transform Your Business?
            </h3>
            <p className="text-blue-100 max-w-md">
              Let our experts craft a custom solution tailored to your unique
              needs.
            </p>
          </div>
          <button
            onClick={handleContactModel}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 hover:text-blue-700 font-semibold rounded-lg hover:bg-gray-50 hover:scale-105 transition-all shadow-lg whitespace-nowrap"
          >
            <Rocket className="w-5 h-5" /> Get Started
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

// ServiceStats component with interactive charts
const ServiceStats = ({ stats }) => {
  // Chart data using real-time stats
  const servicePopularityData = {
    labels: stats.services.map((service) => service.label),
    datasets: [
      {
        label: "Client Satisfaction (%)",
        data: stats.services.map((service) => service.satisfaction),
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(168, 85, 247, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(236, 72, 153, 0.7)",
          "rgba(249, 115, 22, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(139, 92, 246, 0.7)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(168, 85, 247, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(139, 92, 246, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const roiComparisonData = {
    labels: stats.services.map((service) => service.label.split(" ")[0]),
    datasets: [
      {
        label: "Average ROI (x)",
        data: stats.services.map((service) => service.roi),
        backgroundColor: "rgba(99, 102, 241, 0.7)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 2,
      },
    ],
  };

  const serviceDistributionData = {
    labels: ["Development", "Marketing", "E-commerce", "Content"],
    datasets: [
      {
        data: [35, 30, 20, 15],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(236, 72, 153, 0.7)",
          "rgba(245, 158, 11, 0.7)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(245, 158, 11, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="my-16"
    >
      {/* Live data badge */}
      <div className="flex justify-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-sm font-medium"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          Live Data Updates
        </motion.div>
      </div>

      <div className="mb-12 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Our <span className="text-blue-600 dark:text-blue-400">Results</span>{" "}
          Speak for Themselves
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Data-driven approaches deliver measurable success for our clients
          across all services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <StatCard
          icon={<BadgeCheck className="w-5 h-5" />}
          value={`${stats.totalProjects}+`}
          label="Projects Completed"
          color="blue"
          trend="up"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          value={`${stats.satisfactionRate}%`}
          label="Client Satisfaction"
          color="green"
          trend={
            stats.satisfactionRate > 98
              ? "up"
              : stats.satisfactionRate < 98
                ? "down"
                : "neutral"
          }
        />
        <StatCard
          icon={<Sparkles className="w-5 h-5" />}
          value={`${stats.averageRating.toFixed(1)}/5`}
          label="Average Rating"
          color="purple"
          trend="neutral"
        />
        <StatCard
          icon={<User className="w-5 h-5" />}
          value={stats.activeClients}
          label="Active Clients"
          color="pink"
          trend="up"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Service Satisfaction
            </h4>
          </div>
          <div className="h-64">
            <Bar
              data={servicePopularityData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.dataset.label}: ${context.raw}%`;
                      },
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      callback: function (value) {
                        return value + "%";
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">
              ROI Comparison
            </h4>
          </div>
          <div className="h-64">
            <Bar
              data={roiComparisonData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.dataset.label}: ${context.raw}x`;
                      },
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function (value) {
                        return value + "x";
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 lg:col-span-1"
        >
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-5 h-5 text-green-600 dark:text-green-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Service Distribution
            </h4>
          </div>
          <div className="h-64">
            <Pie
              data={serviceDistributionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "right",
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.label}: ${context.raw}%`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 lg:col-span-2"
        >
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Why Choose Our Services?
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                  Global Expertise
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Strategies tailored for international markets and local
                  nuances.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
              <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                  Mobile-First
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All solutions optimized for the mobile experience.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                  Transparent Communication
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Regular updates and clear reporting on all projects.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
              <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                  Conversion Focused
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Every strategy designed to maximize your ROI.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ icon, value, label, color, trend }) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-600 dark:text-blue-400",
    },
    green: {
      bg: "bg-green-50 dark:bg-green-900/20",
      text: "text-green-600 dark:text-green-400",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      text: "text-purple-600 dark:text-purple-400",
    },
    pink: {
      bg: "bg-pink-50 dark:bg-pink-900/20",
      text: "text-pink-600 dark:text-pink-400",
    },
  };

  const trendIcons = {
    up: (
      <svg
        className="w-4 h-4 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    ),
    down: (
      <svg
        className="w-4 h-4 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    ),
    neutral: (
      <svg
        className="w-4 h-4 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 12h14"
        />
      </svg>
    ),
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div
          className={`p-3 rounded-full ${colorClasses[color].bg} ${colorClasses[color].text}`}
        >
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {value}
            </h4>
            {trend && trendIcons[trend]}
          </div>
          <p className="text-gray-600 dark:text-gray-400">{label}</p>
        </div>
      </div>
    </div>
  );
};

// Service Categories filter
const ServiceCategories = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    "All",
    "Development",
    "Marketing",
    "E-commerce",
    "Content",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// Service Search component
const ServiceSearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="max-w-2xl mx-auto mb-12 relative"
    >
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search services (e.g. 'SEO', 'Web Development')..."
          className="w-full px-5 py-4 pr-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      </div>
      {searchQuery && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSearchQuery("")}
          className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </motion.button>
      )}
    </motion.div>
  );
};

// Featured Services component
const FeaturedServices = ({ stats }) => {
  const featured = eco_services.filter((service) =>
    ["Web Development", "Google | Meta Ads", "SEO Optimization"].includes(
      service.label
    )
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mb-16"
    >
      <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Our{" "}
        <span className="text-purple-600 dark:text-purple-400">
          Most Popular
        </span>{" "}
        Services
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-75 blur group-hover:opacity-100 transition duration-200"></div>
            <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <ServiceCard service={service} stats={stats} />
              <div className="absolute bottom-4 right-4">
                <Link
                  href={service.href}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-110 transition-transform"
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default function ServicesGrid() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const stats = useRealtimeStats();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  const filteredServices = useMemo(() => {
    let result = eco_services;

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (service) =>
          service.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          service.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== "All") {
      result = result.filter((service) => {
        if (selectedCategory === "Development") {
          return ["Web Development", "Shopify Optimization"].includes(
            service.label
          );
        } else if (selectedCategory === "Marketing") {
          return [
            "Google | Meta Ads",
            "SEO Optimization",
            "Social Media Marketing",
            "Email Marketing",
          ].includes(service.label);
        } else if (selectedCategory === "E-commerce") {
          return ["Shopify Optimization"].includes(service.label);
        } else if (selectedCategory === "Content") {
          return ["Content Marketing"].includes(service.label);
        }
        return false;
      });
    }

    return result;
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <HeadSEO
        title="Digital Services - Web Development, SEO & Marketing | ECOD"
        description="Get expert digital services from ECOD! We specialize in web development, SEO, and digital marketing to grow your business. Contact us for tailored solutions."
        canonicalUrl="https://ecoddigital.com/services"
        ogImage="https://ecoddigital.com/images/services-og-image.jpg"
        twitterImage="https://ecoddigital.com/images/services-twitter-image.jpg"
        ogType="website"
        twitterCard="summary_large_image"
        noIndex={false}
        schemaData={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "ECOD Digital Services",
          description:
            "Get expert digital services from ECOD, including web development, SEO, and digital marketing. We help businesses scale with modern, results-driven strategies.",
          url: "https://ecoddigital.com",
          logo: "https://ecoddigital.com/images/logo.png",
          sameAs: [
            "https://www.facebook.com/ecoddigital",
            "https://www.linkedin.com/company/ecoddigital",
            "https://www.instagram.com/ecoddigital",
            "https://twitter.com/ecoddigital",
          ],
          serviceType: [
            "Web Development",
            "SEO Optimization",
            "Digital Marketing",
            "Ecommerce Solutions",
            "Shopify Development",
          ],
          address: {
            "@type": "PostalAddress",
            addressCountry: "Worldwide",
          },
          areaServed: {
            "@type": "GeoShape",
            addressCountry: ["US", "UK", "Canada", "Australia", "Worldwide"],
          },
          availableChannel: {
            "@type": "ServiceChannel",
            serviceUrl: "https://ecoddigital.com/contact",
            availableLanguage: ["English", "Spanish", "French"],
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "PriceSpecification",
              price: "Contact for pricing",
              priceCurrency: "USD",
              eligibleQuantity: {
                "@type": "QuantitativeValue",
                value: "Custom",
              },
            },
            availability: "https://schema.org/InStock",
            validFrom: "2024-01-01",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "120",
          },
          review: {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            author: { "@type": "Person", name: "Dhanesh" },
            reviewBody:
              "ECOD's digital services helped my business scale exponentially!",
          },
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 bg-background text-foreground">
        <BackAndForward forward="/services/web-development" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center my-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Premium
            </span>{" "}
            Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We provide cutting-edge digital solutions to help your business
            grow. Choose from our expertly crafted services.
          </p>
        </motion.div>

        <ServiceSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <ServiceCategories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <FeaturedServices stats={stats} />

        <ServiceStats stats={stats} />

        <AnimatePresence mode="wait">
          {filteredServices.length > 0 ? (
            <motion.div
              key="services-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <ServiceCard service={service} stats={stats} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <NoResults
              onClearSearch={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            />
          )}
        </AnimatePresence>

        <CallToAction />
      </div>
    </>
  );
}

// Add this to your data/service_data.js
const PieChart = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    <path d="M22 12A10 10 0 0 0 12 2v10z" />
  </svg>
);
