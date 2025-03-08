"use client";

import { services_list_ecod } from "@/data/service_data";
import { services_ecod } from "@/data/service_data";
import { adPerformanceData } from "@/data/service_data";
import { allCategories } from "@/data/service_data";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

//Components imported using dynamic
const ServiceCard = dynamic(() => import("../components/serviceCard"));
const CategorySelector = dynamic(() =>
  import("../components/Reusable/CategorySelector")
);
const SearchComponent = dynamic(() => import("../components/Reusable/search"));
const BackAndForward = dynamic(() =>
  import("../components/Reusable/back-forw")
);
const PaginationComponent = dynamic(() =>
  import("../components/Reusable/pagination")
);

const getGrowthTrend = (current, previous) => {
  if (!previous) return "📊 No Previous Data";
  const diff = current - previous;
  const percentage = ((diff / previous) * 100).toFixed(2);
  return diff > 0 ? `📈 +${percentage}%` : `📉 ${percentage}%`;
};

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
  ContentTrend:
    index > 0
      ? getGrowthTrend(
          data.ContentMarketing,
          adPerformanceData[index - 1].ContentMarketing
        )
      : "📊 No Data",
  EmailTrend:
    index > 0
      ? getGrowthTrend(
          data.EmailMarketing,
          adPerformanceData[index - 1].EmailMarketing
        )
      : "📊 No Data",
  WebDevTrend:
    index > 0
      ? getGrowthTrend(
          data.WebDevelopment,
          adPerformanceData[index - 1].WebDevelopment
        )
      : "📊 No Data",
  SocialTrend:
    index > 0
      ? getGrowthTrend(
          data.SocialMedia,
          adPerformanceData[index - 1].SocialMedia
        )
      : "📊 No Data",
  EcomTrend:
    index > 0
      ? getGrowthTrend(
          data.EcomSolutions,
          adPerformanceData[index - 1].EcomSolutions
        )
      : "📊 No Data",
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

  if (isLoading || !category) return <p>Loading...</p>;

  const categoryBlogs = services_list_ecod[category] || [];
  const filteredBlogs = categoryBlogs.filter((blog) =>
    blog.label.toLowerCase().includes(searchTerm.toLowerCase())
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

  // Filter categories based on the selected category
  const selectedCategories = allCategories.filter(
    (cat) => cat.category === category
  );

  return (
    <>
      <Head>
        {/* Page Title */}
        <title>{`ECOD Services - ${
          services_ecod.find((s) => s.slug === category)?.name || "Category"
        }`}</title>

        {/* Meta Description */}
        <meta
          name="description"
          content={`Explore the services on ${
            services_ecod.find((s) => s.slug === category)?.name ||
            "various topics"
          } at ECOD.`}
        />

        {/* Open Graph Meta Tags (for social media) */}
        <meta
          property="og:title"
          content={`ECOD Services - ${
            services_ecod.find((s) => s.slug === category)?.name || "Category"
          }`}
        />
        <meta
          property="og:description"
          content={`Explore the services on ${
            services_ecod.find((s) => s.slug === category)?.name ||
            "various topics"
          } at ECOD.`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://ecod-blog.vercel.app/services/${category}`}
        />
        <meta
          property="og:image"
          content={`https://ecod-blog.vercel.app/images/${
            services_ecod.find((s) => s.slug === category)?.slug || "default"
          }-og-image.jpg`}
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`ECOD Services - ${
            services_ecod.find((s) => s.slug === category)?.name || "Category"
          }`}
        />
        <meta
          name="twitter:description"
          content={`Explore the services on ${
            services_ecod.find((s) => s.slug === category)?.name ||
            "various topics"
          } at ECOD.`}
        />
        <meta
          name="twitter:image"
          content={`https://ecod-blog.vercel.app/images/${
            services_ecod.find((s) => s.slug === category)?.slug || "default"
          }-twitter-image.jpg`}
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href={`https://ecod-blog.vercel.app/services/${category}`}
        />

        {/* Schema Markup (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `ECOD Services - ${
              services_ecod.find((s) => s.slug === category)?.name || "Category"
            }`,
            description: `Explore the services on ${
              services_ecod.find((s) => s.slug === category)?.name ||
              "various topics"
            } at ECOD.`,
            url: `https://ecod-blog.vercel.app/services/${category}`,
            image: `https://ecod-blog.vercel.app/images/${
              services_ecod.find((s) => s.slug === category)?.slug || "default"
            }-og-image.jpg`,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://ecod-blog.vercel.app/services/${category}`,
            },
            publisher: {
              "@type": "Organization",
              name: "ECOD",
              logo: {
                "@type": "ImageObject",
                url: "https://ecod-blog.vercel.app/images/logo.png",
              },
            },
          })}
        </script>
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-6 py-12 bg-gray-50 dark:bg-gray-900"
      >
        <BackAndForward back="/services" forward="/contact" />
        <hr className="my-4 border-gray-300 dark:border-gray-600" />
        <CategorySelector page="/services" services={services_ecod} />
        <hr className="my-4 border-gray-300 dark:border-gray-600" />
        <h1 className="text-2xl md:text-4xl font-extrabold text-center my-8">
          {services_ecod.find((s) => s.slug === category)?.label || "Services"}
        </h1>
        <SearchComponent filterSearch={handleSearch} searchValue={searchTerm} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedBlogs.length ? (
            selectedBlogs.map((blog) => (
              <ServiceCard key={blog.href} service={blog} />
            ))
          ) : (
            <p className="text-center text-gray-500">No blogs found.</p>
          )}
        </div>

        {totalPages > 1 && (
          <PaginationComponent
            prev={() => handlePageChange(-1)}
            next={() => handlePageChange(1)}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}

        <div className="mt-16 max-w-6xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-semibold my-5">
            📊 Business Growth Trends In 2024
          </h3>
          {selectedCategories.map((cat) => (
            <div key={cat.key} className="mb-16">
              <h4 className="text-lg font-semibold mb-4">
                {cat.name} Performance
              </h4>
              <ResponsiveContainer width="100%" height={250}>
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
                  />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>

              <ResponsiveContainer width="100%" height={250} className="mt-8">
                <BarChart data={enhancedAdPerformanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey={cat.key} fill={cat.color} />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>

              {/* Attractive Content for Each Category */}
              <div className="mt-8 text-left bg-white p-6 rounded-xl shadow-md">
                {cat.key === "MetaAds" && (
                  <>
                    <h4 className="text-xl font-semibold text-blue-600 mb-4">
                      Why Meta Ads Are Essential for Your Business
                    </h4>
                    <p className="text-gray-700">
                      Meta Ads (formerly Facebook Ads) are a powerful tool for
                      reaching a highly targeted audience. With over{" "}
                      <strong>2.9 billion active users</strong>, Meta platforms
                      like Facebook and Instagram allow businesses to:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      <li>
                        Reach specific demographics based on age, location,
                        interests, and behavior.
                      </li>
                      <li>
                        Drive engagement through visually appealing ads and
                        stories.
                      </li>
                      <li>Increase conversions with retargeting strategies.</li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                      In 2024, businesses leveraging Meta Ads have seen an
                      average growth of <strong>25% in ROI</strong>.
                    </p>
                  </>
                )}

                {cat.key === "GoogleAds" && (
                  <>
                    <h4 className="text-xl font-semibold text-orange-600 mb-4">
                      Maximize Your Reach with Google Ads
                    </h4>
                    <p className="text-gray-700">
                      Google Ads is the go-to platform for businesses looking to
                      capture high-intent customers. With{" "}
                      <strong>over 5.6 billion searches per day</strong>, Google
                      Ads helps you:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      <li>
                        Appear at the top of search results for relevant
                        keywords.
                      </li>
                      <li>
                        Target users actively searching for your products or
                        services.
                      </li>
                      <li>
                        Track performance with detailed analytics and insights.
                      </li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                      Businesses using Google Ads in 2024 have reported a{" "}
                      <strong>30% increase in website traffic</strong> and a{" "}
                      <strong>20% boost in sales</strong>.
                    </p>
                  </>
                )}

                {cat.key === "SEO" && (
                  <>
                    <h4 className="text-xl font-semibold text-green-600 mb-4">
                      Unlock Long-Term Growth with SEO
                    </h4>
                    <p className="text-gray-700">
                      Search Engine Optimization (SEO) is the backbone of
                      sustainable online growth. By optimizing your website, you
                      can:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      <li>
                        Rank higher on search engines like Google, Bing, and
                        Yahoo.
                      </li>
                      <li>Attract organic traffic without paying for ads.</li>
                      <li>Build trust and authority with your audience.</li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                      In 2024, businesses investing in SEO have experienced a{" "}
                      <strong>40% increase in organic traffic</strong> and a{" "}
                      <strong>15% rise in conversions</strong>.
                    </p>
                  </>
                )}

                {cat.key === "ContentMarketing" && (
                  <>
                    <h4 className="text-xl font-semibold text-purple-600 mb-4">
                      Drive Engagement with Content Marketing
                    </h4>
                    <p className="text-gray-700">
                      Content Marketing is all about creating valuable, relevant
                      content to attract and engage your audience. Benefits
                      include:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      <li>
                        Establishing your brand as an industry thought leader.
                      </li>
                      <li>
                        Generating leads through blogs, videos, and
                        infographics.
                      </li>
                      <li>Improving SEO rankings with high-quality content.</li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                      Businesses focusing on content marketing in 2024 have seen
                      a <strong>35% increase in customer engagement</strong>.
                    </p>
                  </>
                )}

                {cat.key === "EmailMarketing" && (
                  <>
                    <h4 className="text-xl font-semibold text-red-600 mb-4">
                      Boost Conversions with Email Marketing
                    </h4>
                    <p className="text-gray-700">
                      Email Marketing remains one of the most effective ways to
                      nurture leads and drive sales. Key advantages include:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      <li>Personalized communication with your audience.</li>
                      <li>High ROI with minimal investment.</li>
                      <li>Automated campaigns for better efficiency.</li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                      In 2024, businesses using email marketing have achieved a{" "}
                      <strong>50% higher open rate</strong> and a{" "}
                      <strong>25% increase in click-through rates</strong>.
                    </p>
                  </>
                )}

                {cat.key === "WebDevelopment" && (
                  <>
                    <h4 className="text-xl font-semibold text-blue-600 mb-4">
                      Build a Strong Online Presence with Web Development
                    </h4>
                    <p className="text-gray-700">
                      A well-designed website is the foundation of your online
                      presence. Benefits of professional web development
                      include:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      <li>Improved user experience and navigation.</li>
                      <li>Faster loading times and better performance.</li>
                      <li>Mobile-friendly designs for wider reach.</li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                      Businesses with optimized websites in 2024 have seen a{" "}
                      <strong>30% increase in user retention</strong>.
                    </p>
                  </>
                )}

                {cat.key === "SocialMedia" && (
                  <>
                    <h4 className="text-xl font-semibold text-yellow-600 mb-4">
                      Grow Your Brand with Social Media Marketing
                    </h4>
                    <p className="text-gray-700">
                      Social Media Marketing helps you connect with your
                      audience on platforms like Instagram, Facebook, and
                      LinkedIn. Key benefits include:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      <li>Increased brand awareness and visibility.</li>
                      <li>Direct engagement with your audience.</li>
                      <li>
                        Higher conversion rates through targeted campaigns.
                      </li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                      Businesses leveraging social media in 2024 have
                      experienced a{" "}
                      <strong>40% increase in brand engagement</strong>.
                    </p>
                  </>
                )}

                {cat.key === "EcomSolutions" && (
                  <>
                    <h4 className="text-xl font-semibold text-indigo-600 mb-4">
                      Scale Your Business with E-commerce Solutions
                    </h4>
                    <p className="text-gray-700">
                      E-commerce solutions like Shopify and WooCommerce help
                      businesses streamline their online stores. Benefits
                      include:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      <li>Seamless integration with payment gateways.</li>
                      <li>Customizable store designs for better branding.</li>
                      <li>
                        Advanced analytics to track sales and performance.
                      </li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                      Businesses using e-commerce solutions in 2024 have
                      reported a <strong>35% increase in online sales</strong>.
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default CategoryServices;
