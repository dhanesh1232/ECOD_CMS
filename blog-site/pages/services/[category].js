"use client";

import {
  services_list_ecod,
  allCategories,
  services_ecod,
  adPerformanceData,
} from "@/data/service_data";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  Info,
  BarChart2,
  LineChart,
  Zap,
} from "lucide-react";
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
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
import LowerContent from "@/components/lower-content";

// Components
const ServiceCard = dynamic(() => import("@/components/serviceCard"));
const CategorySelector = dynamic(
  () => import("@/components/Reusable/CategorySelector")
);
const SearchComponent = dynamic(() => import("@/components/Reusable/search"));
const BackAndForward = dynamic(() => import("@/components/Reusable/back-forw"));

// Custom components
const MetricCard = ({ title, value, change, icon, color }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <p className="text-2xl font-bold mt-1 dark:text-white">{value}</p>
      </div>
      <div className={`p-2 rounded-lg ${color} bg-opacity-20`}>{icon}</div>
    </div>
    {change && (
      <div
        className={`mt-2 text-sm ${change.positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
      >
        {change.positive ? "↑" : "↓"} {change.value}% vs last period
      </div>
    )}
  </div>
);

const ServiceAnalyticsCard = ({ service }) => {
  const performanceData = enhancedAdPerformanceData.slice(-6); // Last 6 months data
  const currentData = performanceData[performanceData.length - 1];
  const previousData = performanceData[performanceData.length - 2];

  const getChange = (key) => {
    if (!previousData) return null;
    const change =
      ((currentData[key] - previousData[key]) / previousData[key]) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      positive: change > 0,
    };
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold dark:text-white">
            {service.label}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Last 6 months
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Impressions"
            value={currentData[service.key]?.toLocaleString() || "N/A"}
            change={getChange(service.key)}
            icon={<BarChart2 className="w-5 h-5 text-blue-500" />}
            color="bg-blue-100 dark:bg-blue-900/30"
          />
          <MetricCard
            title="Engagement"
            value={`${(Math.random() * 20 + 5).toFixed(1)}%`}
            icon={<LineChart className="w-5 h-5 text-purple-500" />}
            color="bg-purple-100 dark:bg-purple-900/30"
          />
          <MetricCard
            title="Conversions"
            value={`${(Math.random() * 15 + 3).toFixed(1)}%`}
            icon={<TrendingUp className="w-5 h-5 text-green-500" />}
            color="bg-green-100 dark:bg-green-900/30"
          />
          <MetricCard
            title="ROI"
            value={`${(Math.random() * 5 + 1).toFixed(1)}x`}
            icon={<Zap className="w-5 h-5 text-yellow-500" />}
            color="bg-yellow-100 dark:bg-yellow-900/30"
          />
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient
                  id={`color${service.key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={service.color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={service.color}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey={service.key}
                stroke={service.color}
                fillOpacity={1}
                fill={`url(#color${service.key})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700/30 px-6 py-4 border-t border-gray-100 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Performance Breakdown
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Top Channels
            </p>
            <div className="h-40 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Organic", value: 35 },
                      { name: "Paid", value: 25 },
                      { name: "Direct", value: 20 },
                      { name: "Social", value: 20 },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#3B82F6" />
                    <Cell fill="#10B981" />
                    <Cell fill="#F59E0B" />
                    <Cell fill="#8B5CF6" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Engagement Metrics
            </p>
            <div className="h-40 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={[
                    { subject: "CTR", A: 65, fullMark: 100 },
                    { subject: "Time", A: 72, fullMark: 100 },
                    { subject: "Shares", A: 58, fullMark: 100 },
                    { subject: "Clicks", A: 81, fullMark: 100 },
                    { subject: "Views", A: 76, fullMark: 100 },
                  ]}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Performance"
                    dataKey="A"
                    stroke={service.color}
                    fill={service.color}
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Recent Activity
            </p>
            <div className="space-y-3 mt-2">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
                <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Campaign optimized (+12%)
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  New content published
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                </div>
                <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  CTR dropped (-5%)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getGrowthTrend = (current, previous) => {
  if (!previous)
    return { text: "No Previous Data", icon: "📊", positive: null };
  const diff = current - previous;
  const percentage = ((diff / previous) * 100).toFixed(2);
  return {
    text: `${Math.abs(percentage)}%`,
    icon: diff > 0 ? "📈" : "📉",
    positive: diff > 0,
    value: percentage,
  };
};

const enhancedAdPerformanceData = adPerformanceData.map((data, index) => ({
  ...data,
  trends: {
    MetaAds:
      index > 0
        ? getGrowthTrend(data.MetaAds, adPerformanceData[index - 1].MetaAds)
        : null,
    GoogleAds:
      index > 0
        ? getGrowthTrend(data.GoogleAds, adPerformanceData[index - 1].GoogleAds)
        : null,
    SEO:
      index > 0
        ? getGrowthTrend(data.SEO, adPerformanceData[index - 1].SEO)
        : null,
    ContentMarketing:
      index > 0
        ? getGrowthTrend(
            data.ContentMarketing,
            adPerformanceData[index - 1].ContentMarketing
          )
        : null,
    EmailMarketing:
      index > 0
        ? getGrowthTrend(
            data.EmailMarketing,
            adPerformanceData[index - 1].EmailMarketing
          )
        : null,
    WebDevelopment:
      index > 0
        ? getGrowthTrend(
            data.WebDevelopment,
            adPerformanceData[index - 1].WebDevelopment
          )
        : null,
    SocialMedia:
      index > 0
        ? getGrowthTrend(
            data.SocialMedia,
            adPerformanceData[index - 1].SocialMedia
          )
        : null,
    EcomSolutions:
      index > 0
        ? getGrowthTrend(
            data.EcomSolutions,
            adPerformanceData[index - 1].EcomSolutions
          )
        : null,
  },
}));

const CategoryServices = () => {
  const router = useRouter();
  const postsPerPage = 6;
  const { category } = router.query;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  useEffect(() => {
    if (router.isReady) setIsLoading(false);
  }, [router.isReady]);

  const categoryBlogs = useMemo(
    () => services_list_ecod[category] || [],
    [category]
  );
  const filteredBlogs = useMemo(
    () =>
      categoryBlogs.filter((blog) =>
        blog.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [categoryBlogs, searchTerm]
  );

  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const selectedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + postsPerPage
  );

  const handleSearch = (query) => {
    setSearchTerm(query);
    setCurrentPage(1);
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prev) =>
      Math.max(1, Math.min(prev + direction, totalPages))
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedCategories = useMemo(
    () => allCategories.filter((cat) => cat.category === category),
    [category]
  );

  const currentService = useMemo(
    () => services_ecod.find((s) => s.slug === category),
    [category]
  );

  if (isLoading || !category) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`ECOD Services - ${currentService?.name || "Category"}`}</title>
        <meta
          name="description"
          content={`Explore ${currentService?.name || "our"} services at ECOD.`}
        />
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`${category === "web-development" ? "w-full" : "max-w-7xl"} mx-auto px-4 sm:px-6 py-8 bg-white dark:bg-gray-900 transition-colors duration-200`}
      >
        <BackAndForward
          back="/services"
          forward="/contact"
          className="border-none outline-none focus:ring-0 hover:text-gray-500"
        />

        <div
          className={`mt-2 ${category === "web-development" ? "flex justify-between flex-col md:flex-row space-x-2" : ""}`}
        >
          <div
            className={`relative ${category === "web-development" ? "flex flex-col md:w-[30%] lg:w-1/5 mb-2 " : "mt-2"}`}
          >
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`${category !== "web-development" ? "text-2xl md:text-3xl" : "text-2xl md:text-xl xl:text-2xl"}  font-bold text-center my-1 text-gray-900 dark:text-white`}
            >
              {currentService?.label || "Services"}
            </motion.h1>
            <div
              className={`flex ${category === "web-development" ? "items-center flex-col w-full" : "items-center sm:flex-row flex-col"}`}
            >
              <SearchComponent
                filterSearch={handleSearch}
                searchValue={searchTerm}
              />
              <CategorySelector page="/services" services={services_ecod} />
            </div>
          </div>

          <div
            className={`w-full ${category === "web-development" ? "md:w-3/5 lg:w-4/5" : "w-full"}`}
          >
            {selectedBlogs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedBlogs.map((blog) => (
                    <ServiceCard key={blog.href} service={blog} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center mt-10">
                    <nav className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(-1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
                        Page {currentPage} of {totalPages}
                      </span>

                      <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="mx-auto w-20 h-20 text-gray-400 dark:text-gray-500 mb-6">
                  <Search className="w-full h-full" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
                  No results found for {`"${searchTerm}"`}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-3">
                  Try different keywords or check your spelling
                </p>
              </div>
            )}

            {/* Service Analytics Section */}
            <div className="mt-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
                Service Performance Analytics
              </h3>

              <div className="space-y-8">
                {selectedCategories.map((cat) => (
                  <div key={cat.key} className="space-y-6">
                    <ServiceAnalyticsCard service={cat} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                        <h4 className="text-lg font-semibold mb-4 dark:text-white">
                          Monthly Trends
                        </h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsLineChart
                              data={enhancedAdPerformanceData.slice(-12)}
                            >
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <CartesianGrid
                                strokeDasharray="3 3"
                                opacity={0.1}
                              />
                              <Line
                                type="monotone"
                                dataKey={cat.key}
                                stroke={cat.color}
                                strokeWidth={2}
                                name={cat.name}
                              />
                            </RechartsLineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                        <h4 className="text-lg font-semibold mb-4 dark:text-white">
                          Channel Comparison
                        </h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart
                              data={enhancedAdPerformanceData.slice(-6)}
                            >
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <CartesianGrid
                                strokeDasharray="3 3"
                                opacity={0.1}
                              />
                              <Bar
                                dataKey={cat.key}
                                fill={cat.color}
                                name={cat.name}
                                radius={[4, 4, 0, 0]}
                              />
                            </RechartsBarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                      <h4
                        className="text-lg font-semibold mb-4 dark:text-white"
                        style={{ color: cat.color }}
                      >
                        About {cat.name}
                      </h4>
                      <div className="prose dark:prose-invert max-w-none">
                        {cat.key === "MetaAds" && (
                          <>
                            <p>
                              Meta Ads (formerly Facebook Ads) are a powerful
                              tool for reaching a highly targeted audience. With
                              over <strong>2.9 billion active users</strong>,
                              Meta platforms allow businesses to:
                            </p>
                            <ul>
                              <li>
                                Reach specific demographics based on detailed
                                targeting
                              </li>
                              <li>
                                Drive engagement through visually appealing ads
                              </li>
                              <li>
                                Increase conversions with retargeting strategies
                              </li>
                            </ul>
                          </>
                        )}
                        {cat.key === "GoogleAds" && (
                          <>
                            <p>
                              {`Google Ads helps you reach customers when they're
                          actively searching for products or services like yours.
                          With Google's vast network, you can:`}
                            </p>
                            <ul>
                              <li>
                                Appear in search results for relevant keywords
                              </li>
                              <li>Display ads on relevant websites</li>
                              <li>
                                Show product listings to interested shoppers
                              </li>
                            </ul>
                          </>
                        )}
                        {cat.key === "SEO" && (
                          <>
                            <p>
                              {`Search Engine Optimization improves your website's
                          visibility in organic search results. Effective SEO can:`}
                            </p>
                            <ul>
                              <li>
                                Increase qualified traffic to your website
                              </li>
                              <li>
                                Build credibility and trust with your audience
                              </li>
                              <li>Deliver long-term, sustainable results</li>
                            </ul>
                          </>
                        )}
                        {cat.key === "ContentMarketing" && (
                          <>
                            <p>
                              Content Marketing attracts and retains customers
                              by creating valuable content. Benefits include:
                            </p>
                            <ul>
                              <li>
                                Establishing your brand as an industry authority
                              </li>
                              <li>
                                Generating leads through valuable resources
                              </li>
                              <li>
                                Supporting SEO efforts with quality content
                              </li>
                            </ul>
                          </>
                        )}
                        {cat.key === "EmailMarketing" && (
                          <>
                            <p>
                              {`Email Marketing delivers personalized messages directly
                          to your audience's inbox. It enables you to:`}
                            </p>
                            <ul>
                              <li>Nurture leads through the sales funnel</li>
                              <li>
                                Maintain relationships with existing customers
                              </li>
                              <li>
                                Drive repeat business with targeted offers
                              </li>
                            </ul>
                          </>
                        )}
                        {cat.key === "WebDevelopment" && (
                          <>
                            <p>
                              Professional Web Development creates a strong
                              foundation for your online presence. A well-built
                              website can:
                            </p>
                            <ul>
                              <li>Provide an excellent user experience</li>
                              <li>Convert visitors into customers</li>
                              <li>
                                Showcase your products and services effectively
                              </li>
                            </ul>
                          </>
                        )}
                        {cat.key === "SocialMedia" && (
                          <>
                            <p>
                              Social Media Marketing helps you connect with your
                              audience where they spend their time. It allows
                              you to:
                            </p>
                            <ul>
                              <li>Build brand awareness and loyalty</li>
                              <li>Engage directly with customers</li>
                              <li>Drive traffic to your website</li>
                            </ul>
                          </>
                        )}
                        {cat.key === "EcomSolutions" && (
                          <>
                            <p>
                              E-commerce Solutions optimize your online store
                              for maximum sales. They help you:
                            </p>
                            <ul>
                              <li>Streamline the checkout process</li>
                              <li>Manage inventory and orders efficiently</li>
                              <li>Provide a seamless shopping experience</li>
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <LowerContent />
    </>
  );
};

export default CategoryServices;
