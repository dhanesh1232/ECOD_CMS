"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCheck,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaShieldAlt,
  FaChartLine,
  FaRobot,
  FaUsers,
  FaInfoCircle,
  FaRegLightbulb,
  FaDatabase,
  FaSyncAlt,
  FaUserCog,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
} from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { RiCustomerService2Fill } from "react-icons/ri";
import Tooltip from "./tooltip";

const Price = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [expandedPlan, setExpandedPlan] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const isAnnual = billingCycle === "annual";

  const pricingPlans = [
    {
      id: "starter",
      name: "Starter",
      monthlyPrice: 29,
      annualPrice: 23,
      description: "Ideal for solopreneurs and small businesses",
      features: [
        {
          text: "500 messages/month",
          tooltip: "Extra messages at $0.03 each",
          category: "messaging",
        },
        {
          text: "1 WhatsApp number + 1 FB/IG account",
          included: true,
          category: "accounts",
        },
        {
          text: "Basic auto-replies",
          included: true,
          category: "automation",
        },
        {
          text: "5 automation workflows",
          included: true,
          category: "automation",
        },
        {
          text: "48h email support",
          included: true,
          category: "support",
        },
        {
          text: "Basic analytics",
          included: true,
          category: "analytics",
        },
        {
          text: "Content scheduler",
          included: false,
          category: "content",
        },
        {
          text: "CRM integration",
          included: false,
          category: "integrations",
        },
      ],
      cta: "Start 14-Day Trial",
      mostPopular: false,
      bestFor: "Under 1k followers",
    },
    {
      id: "business",
      name: "Business",
      monthlyPrice: 79,
      annualPrice: 63,
      description: "For growing brands and digital agencies",
      features: [
        {
          text: "3,000 messages/month",
          tooltip: "Extra messages at $0.025 each",
          category: "messaging",
        },
        {
          text: "3 WhatsApp numbers + 5 FB/IG accounts",
          included: true,
          category: "accounts",
        },
        {
          text: "AI-powered replies",
          included: true,
          category: "automation",
        },
        {
          text: "Unlimited workflows",
          included: true,
          category: "automation",
        },
        {
          text: "24/5 chat support",
          included: true,
          category: "support",
        },
        {
          text: "Advanced analytics",
          included: true,
          category: "analytics",
        },
        {
          text: "Multi-platform scheduler",
          included: true,
          category: "content",
        },
        {
          text: "Zapier integration",
          included: true,
          category: "integrations",
        },
        {
          text: "Team collaboration",
          included: true,
          category: "collaboration",
        },
        {
          text: "Basic API access",
          included: true,
          category: "integrations",
        },
      ],
      cta: "Get Started",
      mostPopular: true,
      bestFor: "1k-50k followers",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      monthlyPrice: null,
      annualPrice: null,
      description: "For large brands and high-volume agencies",
      features: [
        {
          text: "15,000+ messages/month",
          tooltip: "Custom pricing based on volume",
          category: "messaging",
        },
        {
          text: "10+ WhatsApp numbers + Unlimited FB/IG",
          included: true,
          category: "accounts",
        },
        {
          text: "Custom AI chatbot",
          included: true,
          category: "automation",
        },
        {
          text: "Dedicated workflow engineer",
          included: true,
          category: "automation",
        },
        {
          text: "24/7 priority support",
          included: true,
          category: "support",
        },
        {
          text: "Custom analytics dashboard",
          included: true,
          category: "analytics",
        },
        {
          text: "Bulk content scheduling",
          included: true,
          category: "content",
        },
        {
          text: "Full API access",
          included: true,
          category: "integrations",
        },
        {
          text: "SOC 2 compliance",
          included: true,
          category: "security",
        },
        {
          text: "Dedicated account manager",
          included: true,
          category: "support",
        },
      ],
      cta: "Book Demo",
      mostPopular: false,
      bestFor: "50k+ followers",
    },
  ];

  const calculateSavings = (monthlyPrice, annualPrice) => {
    return monthlyPrice * 12 - annualPrice * 12;
  };

  const toggleExpand = (planId) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
  };

  const filteredPlans = pricingPlans.map((plan) => ({
    ...plan,
    features: plan.features.filter((feature) =>
      feature.text.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  const featureCategories = [
    { id: "messaging", name: "Messaging" },
    { id: "accounts", name: "Accounts" },
    { id: "automation", name: "Automation" },
    { id: "support", name: "Support" },
    { id: "analytics", name: "Analytics" },
    { id: "content", name: "Content" },
    { id: "integrations", name: "Integrations" },
    { id: "security", name: "Security" },
  ];

  return (
    <section id="pricing" className="bg-gray-900 py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-4"
          >
            Social Media Automation{" "}
            <span className="text-blue-400">Done Right</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Manage WhatsApp, Facebook, and Instagram from one powerful dashboard
            with AI-powered automation.
          </motion.p>
        </div>

        {/* Platform Showcase */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {[
            {
              icon: <FaWhatsapp className="text-4xl text-green-500" />,
              name: "WhatsApp",
              color: "green",
            },
            {
              icon: <FaFacebook className="text-4xl text-blue-500" />,
              name: "Facebook",
              color: "blue",
            },
            {
              icon: <FaInstagram className="text-4xl text-pink-500" />,
              name: "Instagram",
              color: "pink",
            },
          ].map((platform, i) => (
            <div
              key={i}
              className={`bg-gray-800 p-6 rounded-xl shadow-lg w-full sm:w-auto flex-1 min-w-[200px] border-t-4 border-${platform.color}-500`}
            >
              <div className="flex flex-col items-center">
                <div className="mb-4">{platform.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {platform.name}
                </h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li className="flex items-center">
                    <FaCheck className="mr-2 text-green-500" /> Auto-replies
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="mr-2 text-green-500" /> Message routing
                  </li>
                  <li className="flex items-center">
                    <FaCheck className="mr-2 text-green-500" /> Analytics
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Pricing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="relative inline-flex items-center bg-gray-800 rounded-full p-1 shadow-inner">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-3 text-sm font-medium rounded-full transition-all ${
                !isAnnual
                  ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-3 text-sm font-medium rounded-full transition-all ${
                isAnnual
                  ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Annual Billing (Save 20%)
            </button>
          </div>

          {isAnnual && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 bg-blue-900/50 text-blue-100 px-4 py-3 rounded-lg flex items-center border border-blue-800 backdrop-blur-sm"
            >
              <FaRegLightbulb className="mr-2 text-yellow-300" />
              <span className="text-sm">
                <span className="font-semibold">Pro Tip:</span> Save $
                {calculateSavings(29, 23)}-${calculateSavings(79, 63)} annually
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {filteredPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                plan.mostPopular
                  ? "ring-2 ring-blue-400 shadow-xl"
                  : "border border-gray-700 shadow-lg"
              }`}
            >
              {plan.mostPopular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs font-bold px-4 py-2 rounded-bl-lg shadow-md">
                  RECOMMENDED
                </div>
              )}

              <div
                className={`p-8 ${
                  plan.mostPopular ? "bg-gray-800" : "bg-gray-800"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3
                      className={`text-2xl font-bold ${
                        plan.mostPopular ? "text-white" : "text-white"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-gray-300">{plan.description}</p>
                    <div className="mt-2">
                      <span className="inline-block bg-gray-700 text-blue-300 text-xs px-2 py-1 rounded">
                        Best for: {plan.bestFor}
                      </span>
                    </div>
                  </div>
                  {plan.id === "enterprise" && (
                    <div className="bg-blue-900/30 text-blue-300 p-2 rounded-lg">
                      <RiCustomerService2Fill size={24} />
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  {plan.monthlyPrice ? (
                    <div className="flex items-end">
                      <span className="text-4xl font-extrabold text-white">
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="ml-2 text-lg font-medium text-gray-300">
                        /month
                      </span>
                      {isAnnual && (
                        <span className="ml-3 text-sm text-gray-400 line-through">
                          ${plan.monthlyPrice}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-white">
                      Custom Pricing
                    </div>
                  )}

                  {isAnnual && plan.monthlyPrice && (
                    <div className="mt-2 text-blue-300 text-sm flex items-center">
                      <FaSyncAlt className="mr-1" />
                      <span>Billed annually at ${plan.annualPrice * 12}</span>
                    </div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`mt-6 w-full py-3 px-6 rounded-lg font-bold transition-all ${
                    plan.mostPopular
                      ? "bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white shadow-lg"
                      : "bg-gray-700 hover:bg-gray-600 text-white"
                  }`}
                >
                  {plan.cta}
                </motion.button>

                <button
                  onClick={() => toggleExpand(plan.id)}
                  className="mt-4 w-full flex items-center justify-center text-sm text-blue-400 hover:text-blue-300"
                >
                  {expandedPlan === plan.id ? (
                    <>
                      <span>Show less</span>
                      <FaChevronUp className="ml-1" />
                    </>
                  ) : (
                    <>
                      <span>See all features</span>
                      <FaChevronDown className="ml-1" />
                    </>
                  )}
                </button>
              </div>

              {/* Features List */}
              <div
                className={`border-t border-gray-700 ${
                  expandedPlan === plan.id ? "max-h-[1000px]" : "max-h-0"
                } overflow-hidden transition-all duration-300`}
              >
                <div className="p-6 bg-gray-900">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {featureCategories.map((cat) => (
                      <button
                        key={cat.id}
                        className={`text-xs px-3 py-1 rounded-full ${
                          searchTerm === cat.id
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                        onClick={() => setSearchTerm(cat.id)}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  <ul className="space-y-3">
                    {plan.features.length > 0 ? (
                      plan.features.map((feature, i) => (
                        <li
                          key={i}
                          className={`flex items-start group ${
                            feature.included === false ? "opacity-50" : ""
                          }`}
                        >
                          {feature.included !== false ? (
                            <FaCheck className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5" />
                          ) : (
                            <span className="flex-shrink-0 h-5 w-5 text-gray-600 mt-0.5">
                              •
                            </span>
                          )}
                          <span className="ml-3 text-gray-300">
                            {feature.text}
                            {feature.tooltip && (
                              <Tooltip content={feature.tooltip}>
                                <FaInfoCircle className="ml-1.5 inline text-gray-500 group-hover:text-gray-400 transition-colors cursor-pointer" />
                              </Tooltip>
                            )}
                          </span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-400 text-center py-4">
                        No features match your search
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-700 mb-20"
        >
          <div className="grid md:grid-cols-2">
            <div className="p-10">
              <h3 className="text-2xl font-bold text-white mb-4">
                Enterprise-Grade Social Automation
              </h3>
              <p className="text-gray-300 mb-6">
                Custom solutions for agencies and brands with complex
                requirements.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  {
                    icon: <FaShieldAlt className="text-blue-400" />,
                    text: "SOC 2 Compliance",
                  },
                  {
                    icon: <FaUsers className="text-blue-400" />,
                    text: "Dedicated Team",
                  },
                  {
                    icon: <FaDatabase className="text-blue-400" />,
                    text: "Custom Infrastructure",
                  },
                  {
                    icon: <FaChartLine className="text-blue-400" />,
                    text: "Volume Discounts",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <div className="mr-3 text-xl">{item.icon}</div>
                    <span className="text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold flex items-center shadow-md"
              >
                <IoMdSend className="mr-2" />
                Request Custom Proposal
              </motion.button>
            </div>
            <div className="bg-gray-900 p-10 flex items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="flex -space-x-2">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <FaWhatsapp />
                    </div>
                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      <FaFacebook />
                    </div>
                    <div className="h-10 w-10 rounded-full bg-pink-500 flex items-center justify-center text-white">
                      <FaInstagram />
                    </div>
                  </div>
                  <span className="ml-4 text-white font-medium">
                    Unified Social Inbox
                  </span>
                </div>

                <ul className="space-y-4">
                  {[
                    "Multi-team collaboration",
                    "AI-powered sentiment analysis",
                    "Custom reporting dashboards",
                    "Automated compliance checks",
                    "White-label client portals",
                    "API-first architecture",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <FaCheck className="text-blue-400 text-xs" />
                      </div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Transform Your Social Media Management?
          </h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join 5,000+ businesses automating their social media communications.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-lg flex items-center justify-center"
            >
              <FaRobot className="mr-2" />
              Start Free Trial
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 px-8 py-4 rounded-lg text-lg font-bold flex items-center justify-center shadow-sm"
            >
              <RiCustomerService2Fill className="mr-2" />
              Live Demo
            </motion.button>
          </div>

          <p className="mt-6 text-gray-400 text-sm">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Price;
