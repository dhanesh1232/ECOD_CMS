"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Check, ChevronDown, InfinityIcon, List, X, Zap } from "lucide-react";
import { categoryIcons, iconMap, limitIcons } from "@/data/icons";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";

export const ComparisonTable = ({
  plans,
  subscription,
  getPlanPrice,
  cycle,
}) => {
  const [activeTab, setActiveTab] = useState("features");
  const [showCompare, setShowCompare] = useState(false);
  if (!plans.length) return null;
  const formatFeatureValue = (val) => {
    if (Array.isArray(val))
      return val.map((v) => v.charAt(0).toUpperCase() + v.slice(1)).join(", ");
    if (val === "Infinity")
      return (
        <InfinityIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
      );
    if (typeof val === "boolean")
      return val ? (
        <span className="flex items-center justify-center">
          <Check className="h-5 w-5 text-green-500 dark:text-green-400" />
        </span>
      ) : (
        <span className="flex items-center justify-center">
          <X className="h-5 w-5 text-red-500 dark:text-red-400" />
        </span>
      );
    if (typeof val === "string")
      return val.replace(/\b\w/g, (c) => c.toUpperCase());
    return val;
  };
  return (
    <div className="mt-12 bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
      <div
        className={`p-4 md:p-6 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 ${
          showCompare && "border-b"
        } dark:border-gray-700`}
      >
        <div className="flex flex-col items-start">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Plan Comparison
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
            Detailed feature breakdown across all plans
          </p>
        </div>
        <Button
          variant="subtle"
          size="xs"
          onClick={() => setShowCompare(!showCompare)}
        >
          <ChevronDown
            className={`${showCompare ? "rotate-180" : ""}`}
            size={15}
          />
        </Button>
      </div>
      <AnimatePresence>
        {showCompare && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3 overflow-hidden"
          >
            <Tabs className="w-full">
              <div className="flex items-center w-full justify-center mt-2">
                <TabsList className="grid grid-cols-2 w-full max-w-xs mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg m-1">
                  {["features", "limits"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      isActive={activeTab === tab}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {activeTab === "features" && (
                <TabsContent value="features">
                  <div className="overflow-x-auto border border-gray-200 dark:border-gray-700">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="text-left p-2 md:p-4 pl-3 md:pl-6 min-w-[200px] sticky left-0 bg-gray-50 dark:bg-gray-800 z-20 text-gray-500 dark:text-gray-400 font-medium">
                            Features
                          </th>
                          {plans.map((plan) => (
                            <th
                              key={plan.id}
                              className={`p-4 text-center ${
                                subscription?.plan === plan.id
                                  ? "bg-primary/10 dark:bg-primary/20"
                                  : "bg-gray-50 dark:bg-gray-800"
                              } sticky top-0 z-10`}
                            >
                              <div className="flex flex-col items-center">
                                <span className="font-bold text-gray-900 dark:text-white">
                                  {plan.name}
                                </span>
                                {subscription?.plan !== plan.id &&
                                  plan.prices && (
                                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                      ₹{getPlanPrice(plan)?.localized}/{cycle}
                                    </span>
                                  )}
                                {subscription?.plan === plan.id && (
                                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-0.5 rounded-full mt-1">
                                    Current
                                  </span>
                                )}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {Object.entries(plans[0].features).map(
                          ([category, features]) => (
                            <React.Fragment key={`category-${category}`}>
                              <tr className="bg-gray-50 dark:bg-gray-800">
                                <td
                                  colSpan={plans.length + 1}
                                  className="p-2 md:p-4 pl-3 md:pl-6 font-semibold dark:bg-gray-900 bg-gray-200 text-gray-700 dark:text-gray-300"
                                >
                                  <div className="flex items-center gap-2">
                                    {categoryIcons[category] || (
                                      <Zap className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                    )}
                                    {category
                                      .replace(/([A-Z])/g, " $1")
                                      .replace(/^\w/, (c) => c.toUpperCase())}
                                  </div>
                                </td>
                              </tr>
                              {Object.entries(features).map(
                                ([featureKey, _]) => (
                                  <tr
                                    key={featureKey}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                  >
                                    <td className="p-2 md:p-4 pl-3 md:pl-6 font-medium text-gray-700 align-middle dark:text-gray-300  gap-2 whitespace-nowrap sticky left-0 bg-white dark:bg-gray-900">
                                      {featureKey
                                        .replace(/([A-Z])/g, " $1")
                                        .replace(/^\w/, (c) => c.toUpperCase())}
                                    </td>
                                    {plans.map((plan) => {
                                      const value =
                                        plan.features[category][featureKey];
                                      return (
                                        <td
                                          key={`${plan.id}-${featureKey}`}
                                          className={`p-4 text-center ${
                                            subscription?.plan === plan.id
                                              ? "bg-primary/5 dark:bg-primary/10"
                                              : "bg-white dark:bg-gray-900"
                                          }`}
                                        >
                                          {featureKey === "channels" &&
                                          Array.isArray(value) ? (
                                            <div className="w-full flex flex-wrap justify-center items-center gap-2">
                                              {value.map((each, ind) => {
                                                return (
                                                  <span
                                                    key={ind}
                                                    className="hover:scale-110 transition-transform"
                                                    title={each}
                                                  >
                                                    {iconMap[
                                                      each.toLowerCase()
                                                    ] || (
                                                      <Zap className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                                                    )}
                                                  </span>
                                                );
                                              })}
                                            </div>
                                          ) : (
                                            <span className="inline-flex items-center justify-center">
                                              {formatFeatureValue(value)}
                                            </span>
                                          )}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                )
                              )}
                            </React.Fragment>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              )}

              {activeTab === "limits" && (
                <TabsContent value="limits">
                  <div className="overflow-x-auto border border-gray-200 dark:border-gray-700">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="text-left p-2 md:p-4 pl-3 md:pl-6 min-w-[200px] sticky left-0 bg-gray-50 dark:bg-gray-800 z-20">
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium">
                              <List className="h-5 w-5" />
                              <span>Limits</span>
                            </div>
                          </th>
                          {plans.map((plan) => (
                            <th
                              key={plan.id}
                              className={`p-4 text-center ${
                                subscription?.plan === plan.id
                                  ? "bg-primary/10 dark:bg-primary/20"
                                  : "bg-gray-50 dark:bg-gray-800"
                              } sticky top-0 z-10`}
                            >
                              <div className="flex flex-col items-center">
                                <span className="font-bold text-gray-900 dark:text-white">
                                  {plan.name}
                                </span>
                                {subscription?.plan !== plan.id &&
                                  plan.prices && (
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      ₹{getPlanPrice(plan)?.localized}/{cycle}
                                    </span>
                                  )}
                                {subscription?.plan === plan.id && (
                                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-0.5 rounded-full">
                                    Current
                                  </span>
                                )}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {Object.keys(plans[0].limits[cycle]).map((limitKey) => (
                          <tr
                            key={limitKey}
                            className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                          >
                            <td className="p-2 md:p-4 pl-3 md:pl-6 font-semibold dark:bg-gray-900 bg-gray-200 text-gray-700 dark:text-gray-300">
                              <div className="flex items-center gap-2">
                                {limitIcons[limitKey] || (
                                  <Zap className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                )}
                                {limitKey
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^\w/, (c) => c.toUpperCase())}
                              </div>
                            </td>
                            {plans.map((plan) => (
                              <td
                                key={`${plan.id}-${limitKey}`}
                                className={`p-4 text-center ${
                                  subscription?.plan === plan.id
                                    ? "bg-primary/5 dark:bg-primary/10"
                                    : "bg-white dark:bg-gray-900"
                                }`}
                              >
                                <span className="inline-flex items-center justify-center">
                                  {formatFeatureValue(
                                    plan.limits[cycle][limitKey]
                                  )}
                                </span>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
