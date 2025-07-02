"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Infinity as InfinityIcon,
} from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PLANS } from "@/data/pricing.plan";

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [hoveredPlan, setHoveredPlan] = useState(null);

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

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Start for free, upgrade as you grow. No hidden fees.
        </p>

        <div className="flex justify-center mt-6">
          <div className="inline-flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-md ${
                billingCycle === "monthly"
                  ? "bg-white dark:bg-gray-800 shadow-sm"
                  : ""
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-2 rounded-md ${
                billingCycle === "yearly"
                  ? "bg-white dark:bg-gray-800 shadow-sm"
                  : ""
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <div className="md:hidden relative px-4">
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

      {/* Plan Comparison Table */}
      <div className="mt-16">
        <h3 className="text-xl font-semibold mb-6 text-center">
          Compare Plan Features
        </h3>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow-sm rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider sticky left-0 bg-gray-50 dark:bg-gray-700 z-10">
                      Feature
                    </th>
                    {Object.values(PLANS).map((plan) => (
                      <th
                        key={plan.id}
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider min-w-[200px]"
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    { name: "Chatbots", key: "chatbots" },
                    { name: "Monthly Messages", key: "messages" },
                    { name: "Conversations", key: "conversations" },
                    { name: "Integrations", key: "integrations" },
                    { name: "Storage (GB)", key: "storage" },
                    { name: "Team Members", key: "members" },
                  ].map((feature) => (
                    <tr key={feature.key}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 sticky left-0 bg-white dark:bg-gray-800 z-10">
                        {feature.name}
                      </td>
                      {Object.values(PLANS).map((plan) => (
                        <td
                          key={`${plan.id}-${feature.key}`}
                          className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-300"
                        >
                          {renderPlanLimit(
                            plan.limits[billingCycle][feature.key]
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors flex items-center justify-center mx-auto">
          See full feature comparison{" "}
          <ChevronRight className="ml-1" size={16} />
        </button>
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
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setHoveredPlan(plan.id)}
      onHoverEnd={() => setHoveredPlan(null)}
      className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border ${
        plan.metadata.popular
          ? "border-2 border-indigo-500 relative"
          : "border-gray-100 dark:border-gray-700"
      } transition-all duration-200 ${
        hoveredPlan === plan.id ? "shadow-lg" : ""
      } h-full flex flex-col`}
    >
      {plan.metadata.popular && (
        <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-2xl">
          POPULAR
        </div>
      )}
      {plan.metadata.recommended && (
        <div className="absolute top-0 left-0 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-br-lg rounded-tl-2xl">
          RECOMMENDED
        </div>
      )}

      <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
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
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">Chatbots:</span>
          <span>{renderPlanLimit(plan.limits[billingCycle].chatbots)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">Messages:</span>
          <span>{renderPlanLimit(plan.limits[billingCycle].messages)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">
            Conversations:
          </span>
          <span>
            {renderPlanLimit(plan.limits[billingCycle].conversations)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">
            Integrations:
          </span>
          <span>{renderPlanLimit(plan.limits[billingCycle].integrations)}</span>
        </div>
      </div>

      <div className="mt-auto">
        <button
          className={`w-full py-3 rounded-lg transition-colors ${
            plan.metadata.popular || plan.metadata.recommended
              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
              : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
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
    </motion.div>
  );
};

export default PricingSection;
