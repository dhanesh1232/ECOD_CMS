"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Infinity as InfinityIcon,
  Check,
  X,
  Zap,
  BarChart2,
  HelpCircle,
  Globe,
} from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PLANS } from "@/data/pricing.plan";
import { Icons } from "../icons";
import { Button } from "../ui/button";

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [activeTab, setActiveTab] = useState("limits");
  const [expandedPlan, setExpandedPlan] = useState(null);
  const tableRef = useRef(null);

  const formatPrice = (price) => {
    if (price === 0) return "Free";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderPlanLimit = (value) => {
    if (value === "Infinity")
      return (
        <span className="flex items-center justify-center">
          <InfinityIcon className="inline" size={18} />
        </span>
      );
    if (typeof value === "number") return value.toLocaleString();
    if (typeof value === "boolean")
      return value ? (
        <Check className="text-green-500" />
      ) : (
        <X className="text-red-500" />
      );
    return value;
  };

  // React-slick settings
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1.2,
    slidesToScroll: 1,
    swipeToSlide: true,
    touchThreshold: 10,
    arrows: false,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    appendDots: (dots) => (
      <div className="mt-4">
        <ul className="flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
    ),
  };

  const planTabs = [
    {
      id: "limits",
      name: "Plan Limits",
      icon: <BarChart2 className="w-4 h-4" />,
    },
    {
      id: "features",
      name: "All Features",
      icon: <Zap className="w-4 h-4" />,
    },
  ];

  const limitCategories = [
    { name: "Chatbots", key: "chatbots" },
    { name: "Messages", key: "messages" },
    { name: "Conversations", key: "conversations" },
    { name: "Storage (GB)", key: "storage" },
    { name: "Team Members", key: "members" },
    { name: "Integrations", key: "integrations" },
    { name: "Automation Rules", key: "automationRules" },
    { name: "Drip Campaigns", key: "dripCampaigns" },
    { name: "Landing Pages", key: "landingPages" },
    { name: "Ad Campaigns", key: "adCampaigns" },
    { name: "AI Training", key: "aiModelTraining" },
    { name: "API Calls", key: "apiCalls" },
    { name: "Ad Credits", key: "adCredits" },
  ];

  // Get all feature keys from all plans
  const getAllFeatureKeys = () => {
    const allKeys = new Set();
    Object.values(PLANS).forEach((plan) => {
      Object.keys(plan.features).forEach((category) => {
        Object.keys(plan.features[category]).forEach((feature) => {
          allKeys.add(`${category}.${feature}`);
        });
      });
    });
    return Array.from(allKeys);
  };

  const allFeatureKeys = getAllFeatureKeys();

  return (
    <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 px-3 py-1 rounded-full text-sm font-medium mb-4">
            Pricing Plans
          </span>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Select the plan that matches your business needs. All plans include
            our powerful chatbot platform with different levels of features and
            support.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mt-8"
        >
          <div className="inline-flex bg-gray-100 dark:bg-gray-900 rounded-lg p-1 shadow-inner">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-300"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === "yearly"
                  ? "bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-300"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </motion.div>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
        {Object.values(PLANS).map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            billingCycle={billingCycle}
            hoveredPlan={hoveredPlan}
            setHoveredPlan={setHoveredPlan}
            formatPrice={formatPrice}
            renderPlanLimit={renderPlanLimit}
            isExpanded={expandedPlan === plan.id}
            onExpand={() =>
              setExpandedPlan(expandedPlan === plan.id ? null : plan.id)
            }
          />
        ))}
      </div>

      {/* Mobile Carousel View */}
      <div className="md:hidden relative mb-16">
        <Slider {...sliderSettings}>
          {Object.values(PLANS).map((plan) => (
            <div key={plan.id} className="px-2 outline-none">
              <PlanCard
                plan={plan}
                billingCycle={billingCycle}
                hoveredPlan={hoveredPlan}
                setHoveredPlan={setHoveredPlan}
                formatPrice={formatPrice}
                renderPlanLimit={renderPlanLimit}
                isExpanded={expandedPlan === plan.id}
                onExpand={() =>
                  setExpandedPlan(expandedPlan === plan.id ? null : plan.id)
                }
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Detailed Comparison Section */}
      <div className="mt-16" ref={tableRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold mb-2">Plan Comparison</h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Detailed comparison of all features across our plans
          </p>
        </motion.div>

        <div className="sticky top-0 z-20 bg-white dark:bg-gray-800 pt-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          <div className="flex overflow-x-auto scrollbar-hide">
            {planTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 mr-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-transparent">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow-sm rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider sticky left-0 bg-gray-50 dark:bg-gray-800 z-10">
                      {activeTab === "limits" ? "Plan Limits" : "Features"}
                    </th>
                    {Object.values(PLANS).map((plan) => (
                      <th
                        key={plan.id}
                        className={`px-6 py-4 text-center text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[180px] ${
                          plan.metadata.popular
                            ? "bg-indigo-50 dark:bg-indigo-900/30"
                            : ""
                        }`}
                      >
                        {plan.name}
                        {plan.metadata.popular && (
                          <span className="block text-xs mt-1 text-indigo-600 dark:text-indigo-300">
                            Most Popular
                          </span>
                        )}
                        {plan.metadata.recommended && (
                          <span className="block text-xs mt-1 text-green-600 dark:text-green-300">
                            Recommended
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {activeTab === "limits"
                    ? limitCategories.map((category) => (
                        <tr key={category.key}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 sticky left-0 bg-white dark:bg-gray-900 z-10">
                            {category.name}
                          </td>
                          {Object.values(PLANS).map((plan) => (
                            <td
                              key={`${plan.id}-${category.key}`}
                              className={`px-6 py-4 whitespace-nowrap text-sm text-center ${
                                plan.metadata.popular
                                  ? "bg-indigo-50/50 dark:bg-indigo-900/10"
                                  : ""
                              }`}
                            >
                              {renderPlanLimit(
                                plan.limits[billingCycle][category.key]
                              )}
                            </td>
                          ))}
                        </tr>
                      ))
                    : allFeatureKeys.map((featureKey) => {
                        const [category, feature] = featureKey.split(".");
                        const featureName = feature
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase());
                        return (
                          <tr key={featureKey}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 sticky left-0 bg-white dark:bg-gray-900 z-10">
                              <div className="flex items-center">
                                {featureName}
                                <button
                                  onClick={() => {
                                    const featureDesc =
                                      getFeatureDescription(feature);
                                    if (featureDesc) {
                                      alert(featureDesc);
                                    }
                                  }}
                                  className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                  <HelpCircle className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                            {Object.values(PLANS).map((plan) => {
                              return (
                                <td
                                  key={`${plan.id}-${featureKey}`}
                                  className={`px-6 py-4 whitespace-nowrap text-sm text-center ${
                                    plan.metadata.popular
                                      ? "bg-indigo-50/50 dark:bg-indigo-900/10"
                                      : ""
                                  }`}
                                >
                                  <span className="flex items-center justify-center">
                                    {feature === "channels" ? (
                                      <RenderChannelIcons
                                        channels={
                                          plan.features[category]?.[feature]
                                        }
                                        className="justify-center"
                                      />
                                    ) : (
                                      renderPlanLimit(
                                        plan.features[category]?.[feature]
                                      )
                                    )}
                                  </span>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4"
          >
            Frequently Asked Questions
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Find answers to common questions about our plans and features
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                className={`w-full px-6 py-5 text-left flex justify-between items-center transition-colors ${
                  expandedPlan === `faq-${index}`
                    ? "bg-indigo-50 dark:bg-indigo-900/20"
                    : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                onClick={() =>
                  setExpandedPlan(
                    expandedPlan === `faq-${index}` ? null : `faq-${index}`
                  )
                }
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 mr-4 mt-0.5">
                    <span className="text-sm font-medium">{index + 1}</span>
                  </div>
                  <div className="text-left">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {faq.question}
                    </h4>
                  </div>
                </div>
                <ChevronRight
                  className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                    expandedPlan === `faq-${index}` ? "rotate-90" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {expandedPlan === `faq-${index}` && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      transition: {
                        opacity: { duration: 0.3 },
                        height: {
                          duration: 0.4,
                          ease: [0.04, 0.62, 0.23, 0.98],
                        },
                      },
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      transition: {
                        opacity: { duration: 0.2 },
                        height: {
                          duration: 0.3,
                          ease: [0.04, 0.62, 0.23, 0.98],
                        },
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800">
                      <div className="pl-10 border-l-2 border-indigo-200 dark:border-indigo-800">
                        <p className="text-sm sm:text-base">{faq.answer}</p>
                        {faq.additionalInfo && (
                          <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-xs sm:text-sm italic">
                              {faq.additionalInfo}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Still have questions?
          </p>
          <Button variant="primary" size="md">
            Contact Support
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced Plan Card Component with Channel Display
const PlanCard = ({
  plan,
  billingCycle,
  hoveredPlan,
  setHoveredPlan,
  formatPrice,
  renderPlanLimit,
  isExpanded,
  onExpand,
}) => {
  const isPopular = plan.metadata.popular;
  const isRecommended = plan.metadata.recommended;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setHoveredPlan(plan.id)}
      onHoverEnd={() => setHoveredPlan(null)}
      className={`relative h-full flex flex-col rounded-xl overflow-hidden border ${
        isPopular
          ? "border-2 border-indigo-500 shadow-lg"
          : "border-gray-200 dark:border-gray-700"
      } transition-all duration-200 ${
        hoveredPlan === plan.id ? "shadow-xl" : "shadow-md"
      }`}
    >
      {(isPopular || isRecommended) && (
        <div
          className={`absolute top-0 right-0 px-4 py-1 text-xs font-bold ${
            isPopular ? "bg-indigo-600 text-white" : "bg-green-600 text-white"
          } rounded-bl-lg`}
        >
          {isPopular ? "POPULAR" : "RECOMMENDED"}
        </div>
      )}

      <div
        className={`p-6 ${
          isPopular
            ? "bg-indigo-50 dark:bg-indigo-900/20"
            : "bg-white dark:bg-gray-800"
        }`}
      >
        <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {plan.description}
        </p>

        <div className="mb-6">
          <span className="text-4xl font-bold">
            {formatPrice(plan.prices[billingCycle])}
          </span>
          <span className="text-gray-600 dark:text-gray-300">
            {plan.prices[billingCycle] > 0
              ? billingCycle === "yearly"
                ? "/year"
                : "/month"
              : ""}
          </span>
          {billingCycle === "yearly" && plan.prices[billingCycle] > 0 && (
            <div className="text-sm text-green-600 dark:text-green-400 mt-1">
              Save{" "}
              {Math.round(
                (1 - plan.prices.yearly / (plan.prices.monthly * 12)) * 100
              )}
              %
            </div>
          )}
        </div>

        <button
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            isPopular || isRecommended
              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
              : "bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white"
          }`}
        >
          {plan.id === "free" ? "Get Started Free" : "Choose Plan"}
        </button>

        {plan.id !== "free" && (
          <p className="text-xs text-center mt-3 text-gray-500 dark:text-gray-400">
            {plan.metadata.trialDays
              ? `${plan.metadata.trialDays}-day free trial`
              : "No credit card required"}
          </p>
        )}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800 flex-1">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
            Key Features
          </h4>
          <button
            onClick={onExpand}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        </div>

        <ul className="space-y-3">
          {getKeyFeatures(plan, isExpanded).map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5 mr-2" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* Channels Section */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Supported Channels
          </h4>
          <RenderChannelIcons
            className="justify-start"
            channels={plan.features.chatbotAutomation.channels}
          />
        </div>
      </div>
      {isExpanded && (
        <div className="absolute w-full -bottom-2 z-50 flex items-center justify-center">
          <button
            type="button"
            onClick={onExpand}
            className=" pt-1 pb-1.5 px-3 bg-gray-400 dark:bg-gray-600 rounded-t-lg border z-20"
          >
            <Icons.cheveronUp className="h-4 w-4" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

// Helper functions
const getKeyFeatures = (plan, showAll = false) => {
  const features = [];

  // Add limits
  if (plan.limits.monthly.chatbots === "Infinity") {
    features.push("Unlimited chatbots");
  } else {
    features.push(
      `${plan.limits.monthly.chatbots} chatbot${
        plan.limits.monthly.chatbots !== 1 ? "s" : ""
      }`
    );
  }

  if (plan.limits.monthly.messages === "Infinity") {
    features.push("Unlimited messages/month");
  } else {
    features.push(
      `${plan.limits.monthly.messages.toLocaleString()} messages/month`
    );
  }

  if (plan.limits.monthly.storage > 0) {
    features.push(`${plan.limits.monthly.storage}GB storage`);
  }

  features.push(
    `${plan.limits.monthly.integrations} integration${
      plan.limits.monthly.integrations !== 1 ? "s" : ""
    }`
  );

  // Add notable features
  if (plan.features.chatbotAutomation.visualFlowBuilder) {
    features.push("Visual flow builder");
  }

  if (plan.features.adsAutomation.enabled) {
    features.push("AI-powered ads");
  }

  if (plan.features.growthFeatures.teamCollaboration) {
    features.push("Team collaboration");
  }

  if (plan.features.enterpriseFeatures.whiteLabel) {
    features.push("White labeling");
  }

  // Show more features if expanded
  if (showAll) {
    if (plan.limits.monthly.conversations > 0) {
      features.push(
        `${plan.limits.monthly.conversations.toLocaleString()} conversations`
      );
    }

    if (plan.limits.monthly.automationRules > 0) {
      features.push(`${plan.limits.monthly.automationRules} automation rules`);
    }

    if (plan.limits.monthly.landingPages > 0) {
      features.push(`${plan.limits.monthly.landingPages} landing pages`);
    }

    if (plan.features.chatbotAutomation.multilingualSupport) {
      features.push("Multilingual support");
    }

    if (plan.features.growthFeatures.paymentGateways) {
      features.push("Payment gateways");
    }
  }

  return features.slice(0, showAll ? 20 : 5);
};

const getFeatureDescription = (featureKey) => {
  const descriptions = {
    chatbots: "Number of individual chatbots you can create",
    messages: "Total messages processed per month",
    conversations: "Active user conversations stored",
    integrations: "Third-party service connections",
    storage: "File storage for media and documents",
    members: "Team members with access",
    automationRules: "Automated workflow rules",
    dripCampaigns: "Sequential messaging campaigns",
    landingPages: "Custom landing pages",
    adCampaigns: "Active advertising campaigns",
    aiModelTraining: "Custom AI model training sessions",
    apiCalls: "API requests per month",
    adCredits: "Advertising credits included",
    visualFlowBuilder: "Drag-and-drop conversation designer",
    multilingualSupport: "Number of supported languages",
    customBranding: "Remove our branding from widgets",
    teamCollaboration: "Multiple team members with roles",
    paymentGateways: "Integrated payment processors",
    whiteLabel: "Fully branded experience",
    prioritySupport: "24-hour response guarantee",
    sso: "Single sign-on integration",
    dedicatedInstance: "Private cloud deployment",
    sla99_9: "99.9% uptime guarantee",
    hipaaCompliance: "Healthcare data compliance",
    channels: "Supported communication channels",
    templates: "Pre-built chatbot templates",
    fileAttachments: "Support for file attachments",
    customFlows: "Custom conversation flows",
    adCopyGeneration: "AI-generated ad copy",
    targeting: "Advanced audience targeting",
    budgetManagement: "Automated budget management",
    autoPublishing: "Automated ad publishing",
    audienceSegmentation: "Audience segmentation",
    credits: "Included ad credits",
    keywordResearch: "SEO keyword research",
    longTailKeywords: "Long-tail keyword suggestions",
    dailyUpdates: "Daily SEO updates",
    dragDropEditor: "Drag-and-drop landing page editor",
    formBuilders: "Form builders",
    popups: "Popup builders",
    leadScoring: "Lead scoring system",
    visitorTracking: "Visitor behavior tracking",
    crmSync: "CRM integration",
    emailSequences: "Email sequences",
    behavioralTriggers: "Behavioral triggers",
    abTesting: "A/B testing",
    responseTuning: "AI response tuning",
    modelTraining: "Custom model training",
    customModels: "Custom AI models",
    analyticsDashboard: "Advanced analytics dashboard",
    dynamicContent: "Dynamic content personalization",
    webinarIntegration: "Webinar integration",
    membershipSites: "Membership site integration",
    apiAccess: "API access",
    webhooks: "Webhook support",
    customDataCenter: "Custom data center location",
    auditLogs: "Activity audit logs",
    dataResidency: "Data residency options",
    accountManager: "Dedicated account manager",
    developerSupport: "Developer support",
    trainingSessions: "Training sessions",
  };

  return descriptions[featureKey] || "Feature details";
};

const faqs = [
  {
    question: "What's included in the Free plan?",
    answer:
      "The Free plan includes: 1 chatbot, 1,000 messages/month, 300 conversations, 0.5GB storage, 1 integration, and basic chatbot functionality. Perfect for testing and small projects.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Your billing will be prorated based on your usage.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer:
      "Yes, all paid plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    question: "How does the yearly billing discount work?",
    answer:
      "Yearly plans offer a 20% discount compared to monthly billing. You're billed once per year instead of monthly.",
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer:
      "For most limits, you'll be notified and given options to upgrade. Some services may be temporarily limited until you upgrade or the next billing cycle begins.",
  },
  {
    question: "Do you offer discounts for non-profits or startups?",
    answer:
      "Yes, we offer special pricing for registered non-profits and early-stage startups. Contact our sales team for details.",
  },
];
const RenderChannelIcons = ({ className, channels }) => {
  return (
    <div className={`flex flex-wrap ${className} gap-2 mt-2`}>
      {channels.map((channel) => {
        const Icon = Icons[channel] || Globe;
        return (
          <div
            key={channel}
            className="flex items-center justify-center p-1.5 md:p-2 bg-gray-100 dark:bg-gray-700 rounded-full"
            title={channel.charAt(0).toUpperCase() + channel.slice(1)}
          >
            <Icon className="w-4 h-4" />
          </div>
        );
      })}
    </div>
  );
};

export default PricingSection;
