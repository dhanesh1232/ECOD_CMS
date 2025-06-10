"use client";

import { useToast } from "@/components/ui/toast-provider";
import { AdminServices } from "@/lib/client/admin.service";
import { useCallback, useEffect, useState } from "react";
import { PLANS } from "@/utils/config.plans";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PlusCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { encryptData } from "@/utils/encryption";

export default function PlanManagementPage() {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useToast();
  const router = useRouter();

  const fetchPlans = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await AdminServices.getPlans();
      if (res.status && !res.ok) {
        const data = await res.json();
        showToast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
      } else {
        // Merge with default plans configuration
        const mergedPlans = Object.values(PLANS).map((defaultPlan) => {
          const serverPlan = res.plans?.find((p) => p.id === defaultPlan.id);
          return serverPlan ? { ...defaultPlan, ...serverPlan } : defaultPlan;
        });
        setPlans(mergedPlans);
      }
    } catch (err) {
      showToast({
        title: "Error",
        description: "Failed to fetch plans",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const formatPrice = (price) => {
    return price === Infinity
      ? "Unlimited"
      : new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(price);
  };

  const handleCreate = () => {
    router.push("/admin/plans/new");
  };

  const handlePlanClick = (plan) => {
    router.push(`/admin/plans/${plan._id}?id=${encryptData(plan.id)}`);
  };

  const getFeatureCategories = (features) => {
    return {
      "Core Features": [
        "channels",
        "fileAttachments",
        "analyticsDashboard",
        "customBranding",
        "prioritySupport",
        "whiteLabel",
        "apiAccess",
        "webhooks",
        "sso",
        "aiFeatures",
        "customFlows",
        "autoScheduling",
        "advancedReporting",
      ],
      "Chatbot Automation": [
        "visualFlowBuilder",
        "aiResponseTuning",
        "chatbotTemplates",
      ],
      "Ads Automation": [
        "adCopyGeneration",
        "smartTargeting",
        "budgetSuggestions",
        "autoPublishing",
        "audienceSegmentation",
      ],
      "Drip Campaigns": ["emailSequences", "behavioralTriggers", "aBTesting"],
      "Landing Page Builder": [
        "dragDropEditor",
        "pageTemplates",
        "formBuilders",
        "popupCreators",
        "seoTools",
      ],
      "Growth Features": [
        "teamCollaboration",
        "customAiModels",
        "advancedSegmentation",
        "dynamicContent",
        "webinarIntegration",
        "membershipSites",
        "paymentGateways",
      ],
      "Enterprise Features": [
        "dedicatedInstance",
        "sla99_9",
        "enterpriseSso",
        "customDataCenter",
        "aiModelHosting",
        "auditLogs",
        "dataResidency",
        "hipaaCompliance",
        "accountManager",
        "developerSupport",
        "trainingSessions",
      ],
    };
  };

  const getPlanBadges = (plan) => {
    const badges = [];
    if (plan.metadata.popular)
      badges.push({ text: "Popular", variant: "secondary" });
    if (plan.metadata.recommended)
      badges.push({
        text: "Recommended",
        variant: "default",
        className: "bg-green-500 hover:bg-green-600",
      });
    if (plan.id === "free")
      badges.push({ text: "Free Forever", variant: "outline" });
    if (plan.metadata.trialDays > 0)
      badges.push({
        text: `${plan.metadata.trialDays}-day Trial`,
        variant: "outline",
      });
    if (plan.id === "enterprise")
      badges.push({
        text: "Custom Solutions",
        variant: "default",
        className: "bg-purple-500 hover:bg-purple-600",
      });

    return badges;
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }
  return (
    <div className="w-full mx-auto px-4 py-8 scrollbar-transparent overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Plan Management</h1>
          <p className="text-muted-foreground">
            Create and manage subscription plans for your platform
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Create
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const featureCategories = getFeatureCategories(plan.features);
          const enabledFeaturesCount = Object.values(plan.features).filter(
            Boolean
          ).length;
          const totalFeaturesCount = Object.values(plan.features).length;

          return (
            <Card
              key={plan.id}
              className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col"
              onClick={() => handlePlanClick(plan)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {plan.name}
                    </CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </div>
                  {plan.id === "enterprise" && (
                    <span className="text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full">
                      CUSTOM
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {getPlanBadges(plan).map((badge, index) => (
                    <Badge
                      key={index}
                      variant={badge.variant}
                      className={badge.className || ""}
                    >
                      {badge.text}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="flex-grow">
                <div className="mb-4">
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-bold">
                      {formatPrice(plan.prices.monthly)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      /month
                    </span>
                  </div>
                  {plan.prices.yearly > 0 && (
                    <div className="text-sm text-muted-foreground mt-1">
                      <span>{formatPrice(plan.prices.yearly)}</span>
                      <span className="ml-1">
                        yearly (
                        {Math.round(
                          (1 -
                            plan.prices.yearly / (plan.prices.monthly * 12)) *
                            100
                        )}
                        % off)
                      </span>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Key Limits:</h4>
                    <ul className="text-sm space-y-2">
                      {Object.entries(plan.limits)
                        .filter(
                          ([key]) =>
                            !["apiCalls", "dedicatedConcurrency"].includes(key)
                        )
                        .slice(0, 5)
                        .map(([key, value]) => (
                          <li
                            key={key}
                            className="flex justify-between items-center"
                          >
                            <div className="flex items-center gap-1">
                              <span className="capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}:
                              </span>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="h-3 w-3 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  {`${key
                                    .replace(/([A-Z])/g, " $1")
                                    .trim()} limit for this plan`}
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <span className="font-medium">
                              {value === Infinity ? "Unlimited" : value}
                              {key === "storage" && " GB"}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Features:</h4>
                    <div className="flex items-center justify-between text-sm">
                      <span>
                        {enabledFeaturesCount} of {totalFeaturesCount} features
                        enabled
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {Math.round(
                          (enabledFeaturesCount / totalFeaturesCount) * 100
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{
                          width: `${
                            (enabledFeaturesCount / totalFeaturesCount) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between items-center pt-4 border-t">
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

const SkeletonLoader = (count = 4) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="h-full flex flex-col">
            <CardHeader className="pb-2 space-y-2">
              <div className="flex justify-between items-start gap-2">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <div className="flex gap-2 mt-2">
                <Skeleton className="h-5 w-14 rounded-full" />
                <Skeleton className="h-5 w-10 rounded-full" />
              </div>
            </CardHeader>

            <CardContent className="flex-grow space-y-4">
              <div>
                <Skeleton className="h-6 w-24 mb-2" />
                <Skeleton className="h-4 w-36" />
              </div>

              <div className="space-y-2 mt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              <div className="space-y-2 mt-4">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            </CardContent>

            <CardFooter className="pt-4 border-t">
              <Skeleton className="h-8 w-full rounded-md" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
