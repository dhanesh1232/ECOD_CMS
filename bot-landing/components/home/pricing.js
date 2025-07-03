"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Infinity as InfinityIcon,
  Check,
  X,
  Zap,
  ArrowRight,
  Star,
  BadgeCheck,
  Shield,
  Users,
  BarChart2,
  Globe,
  Code,
  MessageSquare,
  FileText,
  Settings,
  CreditCard,
  Lock,
} from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PLANS } from "@/data/pricing.plan";

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [activeTab, setActiveTab] = useState("core");
  const [expandedFeature, setExpandedFeature] = useState(null);
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
      return <InfinityIcon className="inline" size={18} />;
    if (typeof value === "number") return value.toLocaleString();
    return value;
  };

  const scrollToTable = () => {
    tableRef.current?.scrollIntoView({ behavior: "smooth" });
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

  const featureCategories = [
    {
      id: "core",
      name: "Core Features",
      icon: <Zap className="w-4 h-4" />,
    },
    {
      id: "automation",
      name: "Automation",
      icon: <Settings className="w-4 h-4" />,
    },
    {
      id: "growth",
      name: "Growth Tools",
      icon: <BarChart2 className="w-4 h-4" />,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      icon: <Shield className="w-4 h-4" />,
    },
  ];

  const featureGroups = {
    core: [
      { name: "Chatbots", key: "chatbots" },
      { name: "Monthly Messages", key: "messages" },
      { name: "Conversations", key: "conversations" },
      { name: "Integrations", key: "integrations" },
      { name: "Storage (GB)", key: "storage" },
      { name: "Team Members", key: "members" },
    ],
    automation: [
      { name: "Automation Rules", key: "automationRules" },
      { name: "Drip Campaigns", key: "dripCampaigns" },
      { name: "Landing Pages", key: "landingPages" },
      { name: "Ad Campaigns", key: "adCampaigns" },
      { name: "AI Model Training", key: "aiModelTraining" },
      { name: "API Calls", key: "apiCalls" },
    ],
    growth: [
      { name: "Ad Credits", key: "adCredits" },
      { name: "Visual Flow Builder", key: "visualFlowBuilder" },
      { name: "Multilingual Support", key: "multilingualSupport" },
      { name: "Custom Branding", key: "customBranding" },
      { name: "Team Collaboration", key: "teamCollaboration" },
      { name: "Payment Gateways", key: "paymentGateways" },
    ],
    enterprise: [
      { name: "White Label", key: "whiteLabel" },
      { name: "Priority Support", key: "prioritySupport" },
      { name: "SSO", key: "sso" },
      { name: "Dedicated Instance", key: "dedicatedInstance" },
      { name: "SLA 99.9%", key: "sla99_9" },
      { name: "HIPAA Compliance", key: "hipaaCompliance" },
    ],
  };

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
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Start for free, upgrade as you grow. No hidden fees. Cancel anytime.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mt-8"
        >
          <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 shadow-inner">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-300"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === "yearly"
                  ? "bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-300"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              Yearly Billing (Save 20%)
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6"
        >
          <button
            onClick={scrollToTable}
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors text-sm font-medium"
          >
            Compare all features <ChevronRight className="ml-1" size={16} />
          </button>
        </motion.div>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {Object.values(PLANS).map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            billingCycle={billingCycle}
            hoveredPlan={hoveredPlan}
            setHoveredPlan={setHoveredPlan}
            formatPrice={formatPrice}
            renderPlanLimit={renderPlanLimit}
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
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Feature Comparison Section */}
      <div className="mt-16" ref={tableRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold mb-2">
            Detailed Feature Comparison
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See how our plans stack up across all features and capabilities
          </p>
        </motion.div>

        <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 pt-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          <div className="flex overflow-x-auto scrollbar-hide">
            {featureCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center px-4 py-2 mr-2 rounded-lg transition-colors ${
                  activeTab === category.id
                    ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow-sm rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider sticky left-0 bg-gray-50 dark:bg-gray-800 z-10">
                      Feature
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
                  {featureGroups[activeTab].map((feature) => {
                    const isExpanded = expandedFeature === feature.key;
                    return (
                      <motion.tr
                        key={feature.key}
                        initial={false}
                        animate={{
                          backgroundColor: isExpanded
                            ? "rgba(99, 102, 241, 0.05)"
                            : "rgba(255, 255, 255, 0)",
                        }}
                        className={`${
                          isExpanded
                            ? "bg-indigo-50/50 dark:bg-indigo-900/10"
                            : ""
                        }`}
                      >
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 sticky left-0 ${
                            isExpanded
                              ? "bg-indigo-50/50 dark:bg-indigo-900/10"
                              : "bg-white dark:bg-gray-900"
                          } z-10 cursor-pointer`}
                          onClick={() =>
                            setExpandedFeature(isExpanded ? null : feature.key)
                          }
                        >
                          <div className="flex items-center">
                            {feature.name}
                            <ChevronRight
                              className={`ml-1 h-4 w-4 transition-transform ${
                                isExpanded ? "rotate-90" : ""
                              }`}
                            />
                          </div>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-2 text-xs text-gray-500 dark:text-gray-400"
                            >
                              {getFeatureDescription(feature.key)}
                            </motion.div>
                          )}
                        </td>
                        {Object.values(PLANS).map((plan) => {
                          const value =
                            feature.key in plan.limits[billingCycle]
                              ? plan.limits[billingCycle][feature.key]
                              : plan.features[
                                  Object.keys(plan.features).find((category) =>
                                    Object.keys(
                                      plan.features[category]
                                    ).includes(feature.key)
                                  )
                                ]?.[feature.key];

                          return (
                            <td
                              key={`${plan.id}-${feature.key}`}
                              className={`px-6 py-4 whitespace-nowrap text-sm text-center ${
                                plan.metadata.popular
                                  ? "bg-indigo-50/50 dark:bg-indigo-900/10"
                                  : ""
                              }`}
                            >
                              {typeof value === "boolean" ? (
                                value ? (
                                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                                ) : (
                                  <X className="h-5 w-5 text-red-500 mx-auto" />
                                )
                              ) : (
                                <span className="font-medium">
                                  {renderPlanLimit(value)}
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-24 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-5 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() =>
                  setExpandedFeature(
                    expandedFeature === `faq-${index}` ? null : `faq-${index}`
                  )
                }
              >
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {faq.question}
                </span>
                <ChevronRight
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    expandedFeature === `faq-${index}` ? "rotate-90" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {expandedFeature === `faq-${index}` && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-5 pb-4 text-gray-600 dark:text-gray-300"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Plan Card Component
const PlanCard = ({
  plan,
  billingCycle,
  hoveredPlan,
  setHoveredPlan,
  formatPrice,
  renderPlanLimit,
}) => {
  const isPopular = plan.metadata.popular;
  const isRecommended = plan.metadata.recommended;

  return (
    <motion.div
      whileHover={{ y: -8 }}
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
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wider">
          Key Features
        </h4>
        <ul className="space-y-3">
          {getKeyFeatures(plan).map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5 mr-2" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

// Helper functions
const getKeyFeatures = (plan) => {
  const features = [];

  // Add limits
  if (plan.limits.monthly.chatbots === "Infinity") {
    features.push("Unlimited chatbots");
  } else if (plan.limits.monthly.chatbots > 1) {
    features.push(`Up to ${plan.limits.monthly.chatbots} chatbots`);
  }

  if (plan.limits.monthly.messages === "Infinity") {
    features.push("Unlimited messages");
  } else if (plan.limits.monthly.messages > 1000) {
    features.push(
      `${plan.limits.monthly.messages.toLocaleString()}+ messages/mo`
    );
  }

  if (plan.limits.monthly.storage > 1) {
    features.push(`${plan.limits.monthly.storage}GB storage`);
  }

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

  return features.slice(0, 5); // Show top 5 features
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
  };

  return descriptions[featureKey] || "Feature details";
};

const faqs = [
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Your billing will be prorated based on your usage.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "All paid plans come with a 14-day free trial. No credit card required to start. The free plan is available indefinitely.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual plans.",
  },
  {
    question: "How does the yearly billing discount work?",
    answer:
      "Yearly plans offer a 20% discount compared to monthly billing. You're billed once per year instead of monthly.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely. You can cancel your subscription at any time. For yearly plans, we'll refund the unused portion.",
  },
];

export default PricingSection;
