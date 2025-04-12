import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCheck,
  FaWhatsapp,
  FaShieldAlt,
  FaChartLine,
  FaRobot,
  FaUsers,
  FaInfoCircle,
  FaRegLightbulb,
  FaDatabase,
  FaSyncAlt,
  FaUserCog,
} from "react-icons/fa";
import Tooltip from "./tooltip"; // You'll need to create this component

const Price = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [isAnnual, setIsAnnual] = useState(false);

  useEffect(() => {
    // This effect ensures the UI updates when billingCycle changes
    setIsAnnual(billingCycle === "annual");
  }, [billingCycle]);

  const pricingPlans = [
    {
      name: "Starter",
      monthlyPrice: 19,
      annualPrice: 15, // 20% off
      description: "For small businesses getting started with automation",
      features: [
        { text: "500 messages/month", tooltip: "Extra messages at $0.02 each" },
        { text: "1 WhatsApp number", included: true },
        { text: "Basic auto-responses", included: true },
        { text: "5 automation workflows", included: true },
        { text: "Email support (48h response)", included: true },
        { text: "Basic analytics dashboard", included: true },
        { text: "Business hours support", included: true },
        { text: "Message templates", included: false },
        { text: "CRM integration", included: false },
        { text: "API access", included: false },
      ],
      cta: "Start Free Trial",
      mostPopular: false,
    },
    {
      name: "Business",
      monthlyPrice: 49,
      annualPrice: 39, // 20% off
      description: "For growing teams needing advanced features",
      features: [
        {
          text: "2,000 messages/month",
          tooltip: "Extra messages at $0.015 each",
        },
        { text: "3 WhatsApp numbers", included: true },
        { text: "Advanced workflows", included: true },
        { text: "Unlimited automation rules", included: true },
        { text: "Priority email support (24h response)", included: true },
        { text: "Advanced analytics", included: true },
        { text: "CRM integrations", included: true },
        { text: "24/5 chat support", included: true },
        { text: "Team collaboration tools", included: true },
        { text: "Message templates", included: true },
        { text: "Basic API access", included: true },
        { text: "Webhook integrations", included: false },
      ],
      cta: "Most Popular",
      mostPopular: true,
    },
    {
      name: "Enterprise",
      monthlyPrice: null,
      annualPrice: null,
      description: "For large businesses with high-volume needs",
      features: [
        {
          text: "10,000+ messages/month",
          tooltip: "Volume discounts available",
        },
        { text: "10+ WhatsApp numbers", included: true },
        { text: "AI-powered responses", included: true },
        { text: "Custom workflow development", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "24/7 phone support", included: true },
        { text: "SLA guarantees", included: true },
        { text: "Onboarding specialist", included: true },
        { text: "Custom reporting", included: true },
        { text: "Full API access", included: true },
        { text: "Webhook integrations", included: true },
        { text: "White-label options", included: true },
      ],
      cta: "Contact Sales",
      mostPopular: false,
    },
  ];

  const calculateSavings = (monthlyPrice, annualPrice) => {
    return monthlyPrice * 12 - annualPrice * 12;
  };

  return (
    <section id="pricing" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl font-extrabold text-gray-900 sm:text-5xl"
          >
            Transparent Pricing That Scales With You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Start free for 14 days. No credit card required. Cancel anytime.
          </motion.p>
        </div>

        {/* Enhanced Pricing Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-col items-center"
        >
          <div className="inline-flex bg-white p-1 rounded-lg shadow-sm">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-3 text-sm font-medium rounded-md ${
                billingCycle === "monthly"
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-3 text-sm font-medium rounded-md ${
                billingCycle === "annual"
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
          {isAnnual && (
            <div className="mt-4 bg-green-50 text-green-800 px-4 py-2 rounded-lg flex items-center">
              <FaRegLightbulb className="mr-2" />
              <span>
                You save $
                {calculateSavings(
                  pricingPlans[0].monthlyPrice,
                  pricingPlans[0].annualPrice
                )}
                -$
                {calculateSavings(
                  pricingPlans[1].monthlyPrice,
                  pricingPlans[1].annualPrice
                )}{" "}
                per year with annual billing!
              </span>
            </div>
          )}
        </motion.div>

        {/* Enhanced Pricing Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                plan.mostPopular
                  ? "ring-2 ring-green-500 transform scale-[1.02]"
                  : "border border-gray-200"
              }`}
            >
              {plan.mostPopular && (
                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}

              <div
                className={`px-6 py-8 ${
                  plan.mostPopular ? "bg-green-50" : "bg-white"
                }`}
              >
                <h3 className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </h3>
                <p className="mt-2 text-gray-600">{plan.description}</p>

                <div className="mt-6 flex items-baseline">
                  {plan.monthlyPrice ? (
                    <>
                      <span className="text-4xl font-extrabold text-gray-900">
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="ml-1 text-lg font-medium text-gray-600">
                        /month
                      </span>
                      {isAnnual && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${plan.monthlyPrice}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-xl sm:text-2xl md:text-4xl font-extrabold text-gray-900">
                      Custom Pricing
                    </span>
                  )}
                </div>

                {isAnnual && plan.monthlyPrice && (
                  <div className="mt-2 text-green-600 text-sm font-medium">
                    <FaSyncAlt className="inline mr-1" />
                    Billed annually at ${plan.annualPrice * 12}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`mt-8 w-full py-3 px-6 rounded-lg font-bold ${
                    plan.mostPopular
                      ? "bg-green-600 hover:bg-green-700 text-white shadow-md"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </div>

              {/* Enhanced What's Included Section */}
              <div className="border-t border-gray-200 px-6 py-6 bg-white">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    What's included
                  </h4>
                  <div className="text-xs text-gray-500">
                    {plan.features.filter((f) => f.included !== false).length}{" "}
                    of {plan.features.length} features
                  </div>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className={`flex items-start group ${
                        feature.included === false ? "opacity-50" : ""
                      }`}
                    >
                      {feature.included !== false ? (
                        <FaCheck className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <span className="flex-shrink-0 h-5 w-5 text-gray-300 mt-0.5">
                          •
                        </span>
                      )}
                      <span className="ml-3 text-gray-700">
                        {feature.text}
                        {feature.tooltip && (
                          <Tooltip content={feature.tooltip}>
                            <FaInfoCircle className="ml-1.5 inline text-gray-400 group-hover:text-gray-600 transition-colors cursor-pointer" />
                          </Tooltip>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-20 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
              Detailed Feature Comparison
            </h3>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-4 text-left font-semibold text-gray-900">
                      Feature
                    </th>
                    {pricingPlans.map((plan, i) => (
                      <th
                        key={i}
                        className="pb-4 text-sm md:text-base text-center font-semibold text-gray-900"
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    "WhatsApp Numbers",
                    "Monthly Messages",
                    "Automation Workflows",
                    "CRM Integration",
                    "API Access",
                    "Support Response Time",
                    "Analytics Dashboard",
                    "Team Collaboration",
                    "Custom Reporting",
                    "Dedicated Account Manager",
                  ].map((feature, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-gray-100">
                      <td className="py-4 text-sm text-gray-700">{feature}</td>
                      {pricingPlans.map((plan, colIndex) => {
                        // This is simplified - you'd want to map features to actual plan features
                        const hasFeature =
                          (feature === "WhatsApp Numbers" &&
                            (plan.name === "Starter"
                              ? 1
                              : plan.name === "Business"
                              ? 3
                              : "10+")) ||
                          (feature === "Monthly Messages" &&
                            (plan.name === "Starter"
                              ? "500"
                              : plan.name === "Business"
                              ? "2,000"
                              : "10,000+")) ||
                          // Add other feature mappings...
                          false;

                        return (
                          <td key={colIndex} className="py-4 text-center">
                            {typeof hasFeature === "boolean" ? (
                              hasFeature ? (
                                <FaCheck className="mx-auto text-green-500" />
                              ) : (
                                <span className="text-gray-300">—</span>
                              )
                            ) : (
                              <span className="text-sm font-medium">
                                {hasFeature}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Enhanced Enterprise Features */}
        <div className="mt-20 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-900">
                Enterprise Solutions
              </h3>
              <p className="mt-4 text-gray-600">
                Custom solutions for large organizations with complex
                requirements.
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  {
                    text: "Dedicated infrastructure",
                    icon: <FaDatabase className="mr-2 text-green-500" />,
                  },
                  {
                    text: "Custom SLAs with 99.9% uptime",
                    icon: <FaShieldAlt className="mr-2 text-green-500" />,
                  },
                  {
                    text: "Volume discounts for high message volumes",
                    icon: <FaChartLine className="mr-2 text-green-500" />,
                  },
                  {
                    text: "White-label options for branding",
                    icon: <FaRobot className="mr-2 text-green-500" />,
                  },
                  {
                    text: "Compliance consulting (GDPR, HIPAA)",
                    icon: <FaUserCog className="mr-2 text-green-500" />,
                  },
                  {
                    text: "On-site training sessions",
                    icon: <FaUsers className="mr-2 text-green-500" />,
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    {item.icon}
                    <span className="text-gray-700">{item.text}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold shadow-md"
              >
                Request Enterprise Demo
              </motion.button>
            </div>
            <div className="bg-gray-50 p-8 md:p-12 flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                  <FaWhatsapp className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="mt-6 text-lg font-medium text-gray-900">
                  WhatsApp Business API Solutions
                </h4>
                <p className="mt-2 text-gray-600">
                  As an official WhatsApp Business Solution Provider, we offer:
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 text-left">
                  <li className="flex items-start">
                    <FaCheck className="flex-shrink-0 h-4 w-4 text-green-500 mt-0.5 mr-2" />
                    <span>Direct API onboarding</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="flex-shrink-0 h-4 w-4 text-green-500 mt-0.5 mr-2" />
                    <span>Higher messaging limits</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="flex-shrink-0 h-4 w-4 text-green-500 mt-0.5 mr-2" />
                    <span>Green tick verification assistance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900">
            Need help choosing a plan?
          </h3>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our experts will analyze your business needs and recommend the
            perfect solution.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-bold shadow-md"
            >
              Chat with Sales
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-8 py-3 rounded-lg text-lg font-bold flex items-center justify-center gap-2 shadow-sm"
            >
              <FaWhatsapp className="text-green-600" />
              WhatsApp Support
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Price;
