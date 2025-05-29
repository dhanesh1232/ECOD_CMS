"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import PieChart from "@/components/pie_chart";
import BarChart from "@/components/bar_chart";
import { PLANS, PricingUtils } from "@/data/pricing.plan";

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeTab, setActiveTab] = useState("features");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [currency, setCurrency] = useState("INR");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get all plans from the configuration
  const pricingTiers = Object.values(PLANS).map((plan) => ({
    ...plan,
    monthlyPrice: plan.prices.monthly / 100, // Convert paise to rupees
    yearlyPrice: plan.prices.yearly / 100, // Convert paise to rupees
    cta:
      plan.id === "free"
        ? "Get Started"
        : plan.id === "enterprise"
        ? "Contact Sales"
        : `Start ${plan.metadata.trialDays}-day Trial`,
    icon: getPlanIcon(plan.id),
    features: { ...plan.features, list: getPlanFeaturesList(plan) },
    yearlySavings: PricingUtils.getYearlySavings(plan.id),
  }));

  // Sample data for charts
  const userGrowthData = {
    labels: pricingTiers.filter((p) => p.id !== "free").map((p) => p.name),
    datasets: [
      {
        label: "Average User Growth (6 months)",
        data: [15, 42, 28].slice(0, pricingTiers.length - 1), // Adjust based on number of paid plans
        backgroundColor: ["#6366F1", "#8B5CF6", "#A78BFA"].slice(
          0,
          pricingTiers.length - 1
        ),
      },
    ],
  };

  const featureAdoptionData = {
    labels: pricingTiers
      .filter((p) => p.id !== "free")
      .map((p) => `${p.name} Features`),
    datasets: [
      {
        data: [85, 65, 35].slice(0, pricingTiers.length - 1),
        backgroundColor: ["#EC4899", "#F43F5E", "#F59E0B"].slice(
          0,
          pricingTiers.length - 1
        ),
      },
    ],
  };

  function getPlanIcon(planId) {
    const icons = {
      free: (
        <svg
          className="w-10 h-10 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      starter: (
        <svg
          className="w-10 h-10 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      pro: (
        <svg
          className="w-10 h-10 text-purple-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
      enterprise: (
        <svg
          className="w-10 h-10 text-indigo-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    };
    return icons[planId] || icons.free;
  }

  function getPlanFeaturesList(plan) {
    const baseFeatures = [
      `${
        plan.limits.chatbots === Infinity ? "Unlimited" : plan.limits.chatbots
      } chatbots`,
      `${
        plan.limits.messages === Infinity
          ? "Unlimited"
          : plan.limits.messages.toLocaleString()
      } messages/mo`,
      `${
        plan.limits.members === Infinity ? "Unlimited" : plan.limits.members
      } team members`,
      `${
        plan.limits.storage === Infinity ? "Unlimited" : plan.limits.storage
      }GB storage`,
      plan.features.analyticsDashboard
        ? "Advanced analytics"
        : "Basic analytics",
      plan.features.prioritySupport ? "24/7 Priority support" : "Email support",
    ];

    const premiumFeatures = [
      plan.features.apiAccess && "API access",
      plan.features.webhooks && "Webhooks",
      plan.features.sso && "Single Sign-On (SSO)",
      plan.features.whiteLabel && "White labeling",
      plan.features.customFlows && "Custom workflows",
      plan.features.aiFeatures && "AI features",
      plan.features.adCopyGeneration && "AI Ad Copy Generation",
      plan.features.smartTargeting && "Smart Targeting",
    ].filter(Boolean);

    return [...baseFeatures, ...premiumFeatures];
  }

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly");
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -5 },
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO at TechCorp",
      quote:
        "The Pro plan gave our team everything we needed to scale efficiently. The ROI was evident within weeks.",
      avatar: "/avatars/sarah.jpg",
    },
    {
      name: "Michael Chen",
      role: "Product Lead at StartupX",
      quote:
        "Switching to the Enterprise plan saved us 40% compared to our previous solution while getting more features.",
      avatar: "/avatars/michael.jpg",
    },
    {
      name: "Emma Rodriguez",
      role: "Marketing Director",
      quote:
        "Perfect balance of price and features. The Starter plan was exactly what our small team needed to get started.",
      avatar: "/avatars/emma.jpg",
    },
  ];

  const formatPrice = (price) => {
    if (!isMounted) return "...";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
      <Head>
        <title>Pricing | Your SaaS Product</title>
        <meta
          name="description"
          content="Choose the perfect plan for your needs"
        />
      </Head>

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
          >
            Pricing built for teams of all sizes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
          >
            {`Choose the plan that's right for you. Start with a free trial, no credit card required.`}
            <br /> Over{" "}
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              15,000 businesses
            </span>{" "}
            trust our platform.
          </motion.p>

          {/* Billing Toggle */}
          <div className="mb-12 my-6 flex items-center justify-center gap-2">
            <div className="flex items-center justify-center relative">
              <span className="mr-4 font-medium">Billed monthly</span>
              <button
                onClick={toggleBillingCycle}
                className={`relative w-14 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 ${
                  billingCycle === "yearly"
                    ? "bg-purple-600"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                    billingCycle === "yearly" ? "translate-x-6" : ""
                  }`}
                />
              </button>
              <span className="ml-4 font-medium">Billed yearly</span>

              {billingCycle === "yearly" && (
                <motion.div
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-6 right-0"
                >
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                    Save up to 20%
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={cardVariants}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative rounded-xl p-8 border-2 transition-all duration-300 ${
                tier.metadata.popular
                  ? "border-purple-500 dark:border-purple-400 bg-white dark:bg-gray-800 shadow-lg"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              } ${hoveredCard === index ? "shadow-xl" : "shadow-md"}`}
            >
              {tier.metadata.popular && (
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full"
                >
                  Most Popular
                </motion.div>
              )}
              {tier.metadata.recommended && (
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full"
                >
                  Recommended
                </motion.div>
              )}
              <div className="flex items-center mb-4">
                <div className="mr-4">{tier.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold">{tier.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {tier.description}
                  </p>
                </div>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold">
                  {formatPrice(
                    billingCycle === "monthly"
                      ? tier.monthlyPrice
                      : tier.yearlyPrice / 12
                  )}
                </span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
                {billingCycle === "yearly" && tier.yearlySavings > 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {`Billed annually at ${formatPrice(
                      tier.yearlyPrice
                    )} (save ${tier.yearlySavings}%)`}
                  </p>
                )}
                {tier.id === "free" && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Forever free
                  </p>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.list.map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-300 ${
                  tier.metadata.popular
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                    : tier.id === "free"
                    ? "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {tier.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison Tabs */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-8">
            Detailed Feature Comparison
          </h3>

          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm">
              <motion.button
                onClick={() => setActiveTab("features")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 text-sm font-medium rounded-l-lg ${
                  activeTab === "features"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Core Features
              </motion.button>
              <motion.button
                onClick={() => setActiveTab("limits")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === "limits"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Usage Limits
              </motion.button>
              <motion.button
                onClick={() => setActiveTab("support")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 text-sm font-medium rounded-r-lg ${
                  activeTab === "support"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Support Options
              </motion.button>
            </div>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-x-auto"
          >
            <table className="w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-4 text-left">Feature</th>
                  {pricingTiers.map((tier) => (
                    <th key={tier.id} className="px-6 py-4 text-center">
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {activeTab === "features" && (
                  <>
                    <tr>
                      <td className="px-6 py-4">Channels</td>
                      {pricingTiers.map((tier) => (
                        <td key={tier.id} className="px-6 py-4 text-center">
                          {tier.features.channels.join(", ")}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4">API Access</td>
                      {pricingTiers.map((tier) => (
                        <td key={tier.id} className="px-6 py-4 text-center">
                          {tier.features.apiAccess ? (
                            <svg
                              className="w-5 h-5 mx-auto text-green-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-5 h-5 mx-auto text-red-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Custom Branding</td>
                      {pricingTiers.map((tier) => (
                        <td key={tier.id} className="px-6 py-4 text-center">
                          {tier.features.customBranding ? "✓" : "✗"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4">White Label</td>
                      {pricingTiers.map((tier) => (
                        <td key={tier.id} className="px-6 py-4 text-center">
                          {tier.features.whiteLabel ? "✓" : "✗"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4">AI Features</td>
                      {pricingTiers.map((tier) => (
                        <td key={tier.id} className="px-6 py-4 text-center">
                          {tier.features.aiFeatures ? "✓" : "✗"}
                        </td>
                      ))}
                    </tr>
                  </>
                )}
                {activeTab === "limits" && (
                  <>
                    <tr>
                      <td className="px-6 py-4">Chatbots</td>
                      {pricingTiers.map((tier) => (
                        <td key={tier.id} className="px-6 py-4 text-center">
                          {tier.limits.chatbots === Infinity
                            ? "Unlimited"
                            : tier.limits.chatbots}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Messages/month</td>
                      {pricingTiers.map((tier) => (
                        <td key={tier.id} className="px-6 py-4 text-center">
                          {tier.limits.messages === Infinity
                            ? "Unlimited"
                            : tier.limits.messages.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Storage</td>
                      {pricingTiers.map((tier) => (
                        <td key={tier.id} className="px-6 py-4 text-center">
                          {tier.limits.storage === Infinity
                            ? "Unlimited"
                            : `${tier.limits.storage}GB`}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Team Members</td>
                      {pricingTiers.map((tier) => (
                        <td key={tier.id} className="px-6 py-4 text-center">
                          {tier.limits.members === Infinity
                            ? "Unlimited"
                            : tier.limits.members}
                        </td>
                      ))}
                    </tr>
                  </>
                )}
                {activeTab === "support" && (
                  <>
                    <tr>
                      <td className="px-6 py-4">Email Support</td>
                      {pricingTiers.map((tier) => (
                        <td key={tier.id} className="px-6 py-4 text-center">
                          {tier.id === "free" ? "Community" : "✓"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Priority Support</td>
                      {pricingTiers.map((tier) => (
                        <td key={tier.id} className="px-6 py-4 text-center">
                          {tier.features.prioritySupport ? "✓" : "✗"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Dedicated Account Manager</td>
                      {pricingTiers.map((tier) => (
                        <td key={tier.id} className="px-6 py-4 text-center">
                          {tier.id === "enterprise" ? "✓" : "✗"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Trial Period</td>
                      {pricingTiers.map((tier) => (
                        <td key={tier.id} className="px-6 py-4 text-center">
                          {tier.metadata.trialDays
                            ? `${tier.metadata.trialDays} days`
                            : "None"}
                        </td>
                      ))}
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </motion.div>
        </div>

        {/* Data Visualization Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">
            See How Our Plans Compare
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
            >
              <h4 className="text-xl font-semibold mb-4">
                User Growth by Plan
              </h4>
              <div className="h-64">
                <BarChart data={userGrowthData} />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm">
                Pro plan users experience 2.8x more growth compared to Starter
                in the first 6 months.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
            >
              <h4 className="text-xl font-semibold mb-4">
                Feature Adoption Rate
              </h4>
              <div className="h-64">
                <PieChart data={featureAdoptionData} />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm">
                Higher-tier plans show increased utilization of advanced
                features.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-8 text-white"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h4 className="text-2xl font-bold mb-4">
                Still not sure which plan is right for you?
              </h4>
              <p className="mb-6 opacity-90">
                Our team can analyze your needs and recommend the perfect
                solution. Get a personalized consultation at no cost.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold shadow-lg"
              >
                Get Personalized Recommendation
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">
            What Our Customers Say
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mr-4">
                    <Image
                      width={100}
                      height={100}
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-semibold">{testimonial.name}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">
                  {`"${testimonial.quote}"`}
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h3>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Can I switch plans later?",
                answer:
                  "Yes, you can upgrade or downgrade your plan at any time. Your billing will be prorated based on your usage.",
              },
              {
                question: "Do you offer discounts for non-profits?",
                answer:
                  "We offer special pricing for registered non-profit organizations. Please contact our sales team with proof of your non-profit status.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans.",
              },
              {
                question: "Is there a minimum contract period?",
                answer:
                  "No, all plans are month-to-month with no long-term commitment. Yearly plans offer discounts but can be canceled with prorated refunds.",
              },
              {
                question: "How does the free trial work?",
                answer:
                  "Your free trial gives you full access to all plan features. No credit card is required to start, and you can cancel anytime during the trial.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left font-medium flex justify-between items-center"
                >
                  <span>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                  >
                    <svg
                      className="w-5 h-5 text-purple-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-3xl font-bold mb-6">Ready to get started?</h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using our platform to
            streamline their workflows.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg font-semibold shadow-lg"
            >
              Start Your Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 border border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400 rounded-lg font-medium hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              Schedule a Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;
