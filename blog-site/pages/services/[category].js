"use client";

import { services_list_ecod } from "@/data/service_data";
import { services_ecod } from "@/data/service_data";
import { adPerformanceData } from "@/data/service_data";
import { allCategories } from "@/data/service_data";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
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

// Components
const ServiceCard = dynamic(() => import("../components/serviceCard"));
const CategorySelector = dynamic(
  () => import("../components/Reusable/CategorySelector")
);
const SearchComponent = dynamic(() => import("../components/Reusable/search"));
const BackAndForward = dynamic(
  () => import("../components/Reusable/back-forw")
);

const getGrowthTrend = (current, previous) => {
  if (!previous)
    return { text: "No Previous Data", icon: "📊", positive: null };
  const diff = current - previous;
  const percentage = ((diff / previous) * 100).toFixed(2);
  return {
    text: `${Math.abs(percentage)}%`,
    icon: diff > 0 ? "📈" : "📉",
    positive: diff > 0,
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
        <meta
          property="og:title"
          content={`ECOD Services - ${currentService?.name || "Category"}`}
        />
        <meta
          property="og:description"
          content={`Explore ${currentService?.name || "our"} services at ECOD.`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://ecod-blog.vercel.app/services/${category}`}
        />
        <meta
          property="og:image"
          content={`https://ecod-blog.vercel.app/images/${currentService?.slug || "default"}-og-image.jpg`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="canonical"
          href={`https://ecod-blog.vercel.app/services/${category}`}
        />
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-white dark:bg-gray-900 transition-colors duration-200"
      >
        <BackAndForward back="/services" forward="/contact" />
        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        <div className="mb-10">
          <CategorySelector page="/services" services={services_ecod} />
          <SearchComponent
            filterSearch={handleSearch}
            searchValue={searchTerm}
          />

          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-center my-8 text-gray-900 dark:text-white"
          >
            {currentService?.label || "Services"}
          </motion.h1>
        </div>

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

        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
            Performance Insights
          </h3>

          {selectedCategories.map((cat) => (
            <div key={cat.key} className="mb-16">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl mb-8">
                <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {cat.name} Trends
                </h4>

                <div className="space-y-8">
                  <div className="h-64">
                    <h5 className="text-lg font-medium mb-2">Line Chart</h5>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={enhancedAdPerformanceData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Line
                          type="monotone"
                          dataKey={cat.key}
                          stroke={cat.color}
                          strokeWidth={2}
                          name={cat.name}
                        />
                        <Legend />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="h-64 mt-8">
                    <h5 className="text-lg font-medium mb-2">Bar Chart</h5>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={enhancedAdPerformanceData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar
                          dataKey={cat.key}
                          fill={cat.color}
                          name={cat.name}
                        />
                        <Legend />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {enhancedAdPerformanceData.slice(-3).map((data, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm"
                    >
                      <h5 className="font-medium text-gray-900 dark:text-white">
                        {data.name}
                      </h5>
                      <p
                        className="text-2xl font-bold mt-2"
                        style={{ color: cat.color }}
                      >
                        {data[cat.key]}
                      </p>
                      {data.trends[cat.key] && (
                        <div className="mt-2 flex items-center">
                          <span className="mr-2">
                            {data.trends[cat.key].icon}
                          </span>
                          <span
                            className={
                              data.trends[cat.key].positive
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }
                          >
                            {data.trends[cat.key].text}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h4
                  className="text-xl font-semibold mb-4"
                  style={{ color: cat.color }}
                >
                  Why {cat.name} Matters
                </h4>
                <div className="prose dark:prose-invert max-w-none">
                  {cat.key === "MetaAds" && (
                    <>
                      <p>
                        Meta Ads (formerly Facebook Ads) are a powerful tool for
                        reaching a highly targeted audience. With over{" "}
                        <strong>2.9 billion active users</strong>, Meta
                        platforms allow businesses to:
                      </p>
                      <ul>
                        <li>
                          Reach specific demographics based on detailed
                          targeting
                        </li>
                        <li>Drive engagement through visually appealing ads</li>
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
                        <li>Appear in search results for relevant keywords</li>
                        <li>Display ads on relevant websites</li>
                        <li>Show product listings to interested shoppers</li>
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
                        <li>Increase qualified traffic to your website</li>
                        <li>Build credibility and trust with your audience</li>
                        <li>Deliver long-term, sustainable results</li>
                      </ul>
                    </>
                  )}
                  {cat.key === "ContentMarketing" && (
                    <>
                      <p>
                        Content Marketing attracts and retains customers by
                        creating valuable content. Benefits include:
                      </p>
                      <ul>
                        <li>
                          Establishing your brand as an industry authority
                        </li>
                        <li>Generating leads through valuable resources</li>
                        <li>Supporting SEO efforts with quality content</li>
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
                        <li>Maintain relationships with existing customers</li>
                        <li>Drive repeat business with targeted offers</li>
                      </ul>
                    </>
                  )}
                  {cat.key === "WebDevelopment" && (
                    <>
                      <p>
                        Professional Web Development creates a strong foundation
                        for your online presence. A well-built website can:
                      </p>
                      <ul>
                        <li>Provide an excellent user experience</li>
                        <li>Convert visitors into customers</li>
                        <li>Showcase your products and services effectively</li>
                      </ul>
                    </>
                  )}
                  {cat.key === "SocialMedia" && (
                    <>
                      <p>
                        Social Media Marketing helps you connect with your
                        audience where they spend their time. It allows you to:
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
                        E-commerce Solutions optimize your online store for
                        maximum sales. They help you:
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
      </motion.div>
    </>
  );
};

export default CategoryServices;
