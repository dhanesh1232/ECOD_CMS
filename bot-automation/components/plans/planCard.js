"use client";

import {
  BrainCircuit,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  LayoutTemplate,
  Megaphone,
  MessageSquare,
  Rocket,
  Search,
  Shield,
  Users,
  X,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { iconMap, limitIcons } from "@/data/icons";

export const PlanCard = ({
  plan,
  subscription,
  cycle,
  getPlanPrice,
  handlePlanSelection,
}) => {
  const priceInfo = getPlanPrice(plan);
  const isCurrentPlan = subscription?.plan.toLowerCase() === plan.id;
  const isEnterprise = plan.id.toLowerCase() === "enterprise";
  const isFree = plan.id.toLowerCase() === "free";
  const [expandedCategories, setExpandedCategories] = useState([]);

  const toggleCategory = (categoryTitle) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryTitle)
        ? prev.filter((title) => title !== categoryTitle)
        : [...prev, categoryTitle]
    );
  };

  // Helper function to render feature value
  const renderFeatureValue = (value) => {
    if (value === true) return <Check className="h-4 w-4 text-green-500" />;
    if (value === false) return <X className="h-4 w-4 text-gray-400" />;
    if (value === "Infinity") return "Unlimited";
    if (Array.isArray(value)) return value.join(", ");
    return value;
  };

  // Feature categories to display
  const featureCategories = [
    {
      title: "Chatbot Automation",
      icon: <MessageSquare className="h-5 w-5" />,
      features: plan.features.chatbotAutomation,
      keys: [
        "channels",
        "visualFlowBuilder",
        "multilingualSupport",
        "templates",
        "fileAttachments",
        "customFlows",
      ],
    },
    {
      title: "Ads Automation",
      icon: <Megaphone className="h-5 w-5" />,
      features: plan.features.adsAutomation,
      keys: [
        "enabled",
        "adCopyGeneration",
        "targeting",
        "budgetManagement",
        "autoPublishing",
        "audienceSegmentation",
        "credits",
      ],
    },
    {
      title: "SEO Tools",
      icon: <Search className="h-5 w-5" />,
      features: plan.features.seoTools,
      keys: ["enabled", "keywordResearch", "longTailKeywords", "dailyUpdates"],
    },
    {
      title: "Landing Builder",
      icon: <LayoutTemplate className="h-5 w-5" />,
      features: plan.features.landingBuilder,
      keys: [
        "enabled",
        "dragDropEditor",
        "templates",
        "formBuilders",
        "popups",
      ],
    },
    {
      title: "CRM & Drip Campaigns",
      icon: <Users className="h-5 w-5" />,
      features: plan.features.crmAndDripCampaigns,
      keys: [
        "enabled",
        "leadScoring",
        "visitorTracking",
        "crmSync",
        "emailSequences",
        "behavioralTriggers",
        "abTesting",
      ],
    },
    {
      title: "AI Agent",
      icon: <BrainCircuit className="h-5 w-5" />,
      features: plan.features.aiAgent,
      keys: ["responseTuning", "modelTraining", "customModels"],
    },
    {
      title: "Growth Features",
      icon: <Rocket className="h-5 w-5" />,
      features: plan.features.growthFeatures,
      keys: [
        "analyticsDashboard",
        "customBranding",
        "teamCollaboration",
        "dynamicContent",
        "webinarIntegration",
        "membershipSites",
        "paymentGateways",
      ],
    },
    {
      title: "Enterprise Features",
      icon: <Shield className="h-5 w-5" />,
      features: plan.features.enterpriseFeatures,
      keys: [
        "prioritySupport",
        "whiteLabel",
        "apiAccess",
        "webhooks",
        "sso",
        "dedicatedInstance",
        "sla99_9",
        "customDataCenter",
        "auditLogs",
        "dataResidency",
        "hipaaCompliance",
        "accountManager",
      ],
    },
  ];

  return (
    <div className="relative h-full">
      {plan.metadata?.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg z-10">
          MOST POPULAR
        </div>
      )}

      {plan.metadata?.recommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg z-10">
          RECOMMENDED
        </div>
      )}

      <Card
        className={`h-full flex flex-col transition-all duration-300 hover:shadow-xl dark:hover:shadow-lg dark:hover:shadow-gray-800/30 ${
          isCurrentPlan ? "ring-2 ring-primary/50 dark:ring-primary/30" : ""
        } ${
          plan.metadata?.popular
            ? "border-2 border-purple-500/20 dark:border-purple-500/30 bg-gradient-to-b from-purple-50/50 to-white dark:from-purple-900/10 dark:to-gray-900"
            : plan.metadata?.recommended
            ? "border-2 border-blue-500/20 dark:border-blue-500/30 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-900/10 dark:to-gray-900"
            : "border border-gray-200 dark:border-gray-700"
        }`}
      >
        <CardHeader className="pb-0">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {plan.name}
            </h3>
            {isCurrentPlan && (
              <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded-full">
                Current Plan
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {plan.description}
          </p>

          {priceInfo ? (
            <div className="space-y-0 mt-4">
              <div className="flex items-baseline gap-1">
                {isFree ? (
                  <span className="text-2xl text-gray-600 font-bold dark:text-gray-200">
                    Free Forever
                  </span>
                ) : (
                  <>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ₹{priceInfo.localized.toLocaleString("en-IN")}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      /{cycle}
                    </span>
                  </>
                )}
              </div>
              {cycle === "yearly" && plan.name.toLowerCase() !== "free" && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                  Save 20% compared to monthly
                </p>
              )}
            </div>
          ) : (
            !isFree && (
              <div className="text-lg font-bold text-gray-500 dark:text-gray-400 mt-4">
                Contact for Pricing
              </div>
            )
          )}
          <div className="my-1" />
          <Button
            onClick={() => handlePlanSelection(plan)}
            size="md"
            variant={
              plan.metadata.popular
                ? "ocean"
                : isEnterprise
                ? "premium"
                : isFree
                ? "ghost"
                : "outline"
            }
            className="flex items-center gap-1 my-1"
            disabled={isCurrentPlan}
          >
            {isCurrentPlan ? (
              <>
                <CheckCircle className="text-green-500 dark:text-green-400" />
                Current Plan
              </>
            ) : (
              <>
                {plan.name.toLowerCase() !== "enterprise" ? (
                  <>
                    Get Started <ChevronRight size={16} />{" "}
                  </>
                ) : (
                  "Contact Sales"
                )}
              </>
            )}
          </Button>
          <div className="my-1" />
        </CardHeader>

        <CardContent className="flex-1 pt-0">
          {/* Limits Section */}
          <div className="mb-8">
            <h4 className="font-semibold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Key Limits
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(plan.limits[cycle]).map(([key, value]) => (
                <div key={key} className="flex items-start gap-2">
                  <span className="mt-0.5">
                    {limitIcons[key] || (
                      <Zap className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    )}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^\w/, (c) => c.toUpperCase())}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {typeof value === "number" && value > 1000
                        ? `${(value / 1000).toFixed(0)}K+`
                        : value === "Infinity"
                        ? "Unlimited"
                        : value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Sections */}
          <div className="space-y-4">
            {featureCategories.map((category) => (
              <div
                key={category.title}
                className="border rounded-lg overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => toggleCategory(category.title)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-primary">{category.icon}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {category.title}
                    </span>
                  </div>
                  {expandedCategories.includes(category.title) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>

                {expandedCategories.includes(category.title) && (
                  <div className="p-4 pt-0 border-t dark:border-gray-700">
                    <div className="space-y-3 pl-2">
                      {category.keys.map((key) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^\w/, (c) => c.toUpperCase())}
                          </span>
                          <span className="text-sm font-medium flex items-center justify-center flex-wrap gap-3">
                            {Array.isArray(category.features[key])
                              ? category.features[key].map((each) => (
                                  <span key={each} className="h-3 w-3">
                                    {React.cloneElement(
                                      iconMap[each.toLowerCase()],
                                      {
                                        className:
                                          "h-3 w-3 text-gray-500 dark:text-gray-300",
                                      }
                                    )}
                                  </span>
                                ))
                              : renderFeatureValue(category.features[key])}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <Button
            className={`w-full text-sm gap-2 font-semibold transition-all hover:shadow-md ${
              plan.metadata?.popular ? "text-white" : ""
            }`}
            glass={true}
            size="lg"
            variant={
              isEnterprise
                ? "premium"
                : plan.metadata?.popular
                ? "ocean"
                : isFree
                ? "ghost"
                : "primary"
            }
            onClick={() => handlePlanSelection(plan)}
            disabled={isCurrentPlan}
          >
            {isCurrentPlan ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle className="text-green-500 dark:text-green-400" />
                Current Plan
              </span>
            ) : plan.metadata?.trialDays > 0 ? (
              <span className="flex text-sm items-center justify-center gap-2">
                <Rocket />
                Start {plan.metadata.trialDays}-Day Free Trial
              </span>
            ) : !isEnterprise ? (
              <span className="flex items-center justify-center gap-2">
                <Rocket />
                Get {plan.name}
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Contact Sales
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
