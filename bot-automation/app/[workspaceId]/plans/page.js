"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast-provider";
import { AdminServices } from "@/lib/client/admin.service";
import { billingService } from "@/lib/client/billing";
import { SpinnerIcon } from "@/public/Images/svg_ecod";
import { encryptData } from "@/utils/encryption";
import {
  CheckCircle,
  ChevronRight,
  Earth,
  InfinityIcon,
  MessageSquare,
  Mic,
  MoveLeft,
  Rocket,
  StarsIcon,
  Zap,
  BadgeCheck,
  Users,
  HardDrive,
  MessageCircle,
  GitMerge,
  CreditCard,
  Globe,
  Mail,
  FileText,
  LayoutTemplate,
  Target,
  Cpu,
  Code,
  Server,
  Headphones,
  List,
  Check,
  X,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";

// Feature category icons with dark mode support
const categoryIcons = {
  chatbotAutomation: (
    <MessageCircle className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
  ),
  adsAutomation: (
    <Target className="h-5 w-5 text-rose-500 dark:text-rose-400" />
  ),
  seoTools: <Globe className="h-5 w-5 text-blue-500 dark:text-blue-400" />,
  landingBuilder: (
    <LayoutTemplate className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
  ),
  crmAndDripCampaigns: (
    <Mail className="h-5 w-5 text-amber-500 dark:text-amber-400" />
  ),
  aiAgent: <Cpu className="h-5 w-5 text-purple-500 dark:text-purple-400" />,
  growthFeatures: <Rocket className="h-5 w-5 text-sky-500 dark:text-sky-400" />,
  enterpriseFeatures: (
    <Server className="h-5 w-5 text-gray-500 dark:text-gray-400" />
  ),
};

// Channel icons mapping
const iconMap = {
  whatsapp: <FaWhatsapp className="text-[#25D366] text-xl" />,
  instagram: <FaInstagram className="text-[#E1306C] text-xl" />,
  facebook: <FaFacebook className="text-[#1877F2] text-xl" />,
  telegram: <FaTelegram className="text-[#0088CC] text-xl" />,
  web: <Earth className="text-xl text-[#4285F4]" />,
  sms: <MessageSquare className="text-xl text-[#34B7F1]" />,
  discord: <FaDiscord className="text-xl text-[#5865F2]" />,
  customsdk: <Code className="text-xl text-[#5865F2]" />,
  voice: <Mic className="text-xl text-[#9C27B0]" />,
};

// Limit icons mapping with dark mode support
const limitIcons = {
  chatbots: (
    <MessageCircle className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
  ),
  messages: (
    <MessageSquare className="h-5 w-5 text-blue-500 dark:text-blue-400" />
  ),
  members: <Users className="h-5 w-5 text-amber-500 dark:text-amber-400" />,
  storage: (
    <HardDrive className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
  ),
  conversations: (
    <MessageCircle className="h-5 w-5 text-purple-500 dark:text-purple-400" />
  ),
  integrations: (
    <GitMerge className="h-5 w-5 text-rose-500 dark:text-rose-400" />
  ),
  automationRules: (
    <Zap className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
  ),
  dripCampaigns: <Mail className="h-5 w-5 text-sky-500 dark:text-sky-400" />,
  adCredits: (
    <CreditCard className="h-5 w-5 text-green-500 dark:text-green-400" />
  ),
  exports: <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400" />,
  landingPages: (
    <LayoutTemplate className="h-5 w-5 text-teal-500 dark:text-teal-400" />
  ),
  adCampaigns: <Target className="h-5 w-5 text-red-500 dark:text-red-400" />,
  teamRoles: <Users className="h-5 w-5 text-pink-500 dark:text-pink-400" />,
  aiModelTraining: (
    <Cpu className="h-5 w-5 text-violet-500 dark:text-violet-400" />
  ),
  apiCalls: <Code className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
  dedicatedConcurrency: (
    <Server className="h-5 w-5 text-blue-500 dark:text-blue-400" />
  ),
};

export default function Page() {
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [currency] = useState("INR");
  const [activeTab, setActiveTab] = useState("features");
  const params = useParams();
  const workspaceId = params.workspaceId;
  const [subscription, setSubscription] = useState(null);
  const [userCred, setUserCred] = useState({});
  const showToast = useToast();
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const toastRef = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profile, planData] = await Promise.all([
          billingService.getSubscription(workspaceId),
          AdminServices.getPlans(),
        ]);

        if (!profile.ok && profile.status) {
          const error = await profile.json();
          throw new Error(error.message || "Failed to fetch user credentials");
        }

        setPlans(planData.plans);
        setUserCred({
          phone: profile?.data?.user?.phone,
          email: profile?.data?.user?.email,
          name: profile?.data?.user?.name,
        });
        setSubscription(profile?.data?.subscription);
      } catch (err) {
        if (!toastRef.current) {
          showToast({
            title: "Error",
            description: err.message || "Failed to fetch data",
            variant: "destructive",
          });
          toastRef.current = true;
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showToast, workspaceId]);

  const getPlanPrice = (plan) => {
    if (!plan?.prices) return null;
    const rawPrice = plan.prices[billingPeriod];
    return {
      raw: rawPrice,
      localized: rawPrice,
      currency,
      period: billingPeriod,
    };
  };

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

  const handlePlanSelection = async (plan) => {
    if (!plan.prices) return;

    const obj = {
      plan_name: encryptData(plan.id),
      em: encryptData(userCred.email),
      pn: encryptData(userCred.phone),
    };
    const params = new URLSearchParams(obj).toString();
    router.replace(`/${workspaceId}/plans/checkout?${params}`);
  };

  const PlanCard = ({ plan }) => {
    const priceInfo = getPlanPrice(plan);
    const isCurrentPlan = subscription?.plan === plan.id;
    const isEnterprise = plan.id.toLowerCase() === "enterprise";
    const isFree = plan.id.toLowerCase() === "free";

    return (
      <div className="relative h-full">
        {plan.metadata?.popular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg z-10">
            MOST POPULAR
          </div>
        )}

        <Card
          className={`h-full flex flex-col transition-all duration-300 hover:shadow-xl dark:hover:shadow-lg dark:hover:shadow-gray-800/30 ${
            isCurrentPlan ? "ring-2 ring-primary/50 dark:ring-primary/30" : ""
          } ${
            plan.metadata?.popular
              ? "border-2 border-purple-500/20 dark:border-purple-500/30 bg-gradient-to-b from-purple-50/50 to-white dark:from-purple-900/10 dark:to-gray-900"
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
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ₹{priceInfo.localized.toLocaleString("en-IN")}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    /{billingPeriod}
                  </span>
                </div>
                {billingPeriod === "yearly" && (
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
          </CardHeader>

          <CardContent className="flex-1 pt-6 space-y-4">
            <Button
              variant={
                isCurrentPlan
                  ? "secondary"
                  : isEnterprise
                  ? "premium"
                  : plan.metadata?.popular
                  ? "default"
                  : "outline"
              }
              className={`w-full transition-all ${
                plan.metadata?.popular ? "shadow-md hover:shadow-lg" : ""
              }`}
              disabled={isCurrentPlan || isFree}
              onClick={() => handlePlanSelection(plan)}
              size="lg"
            >
              {isCurrentPlan ? (
                "Current Plan"
              ) : (
                <>
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Key Features
              </h4>
              <div className="space-y-3">
                {Object.entries(plan.limits)
                  .slice(0, 5)
                  .map(([key, value]) => (
                    <div key={key} className="flex items-start gap-3">
                      <span className="mt-0.5">
                        {limitIcons[key] || (
                          <Zap className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        )}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^\w/, (c) => c.toUpperCase())}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatFeatureValue(value)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-0">
            <Button
              className={`w-full gap-2 font-semibold transition-all hover:shadow-md ${
                plan.metadata?.popular ? "text-white" : ""
              }`}
              size="lg"
              variant={
                isEnterprise
                  ? "premium"
                  : plan.metadata?.popular
                  ? "default"
                  : isFree
                  ? "outline"
                  : "default"
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
                <span className="flex items-center justify-center gap-2">
                  <Rocket />
                  Start {plan.metadata.trialDays}-Day Free Trial
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Rocket />
                  Get {plan.name}
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };

  const renderComparisonTable = () => {
    if (!plans.length) return null;

    return (
      <div className="mt-12 bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-b dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Plan Comparison
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Detailed feature breakdown across all plans
          </p>
        </div>

        <div className="p-4">
          <Tabs className="w-full">
            <TabsList className="grid grid-cols-2 w-full max-w-xs mx-auto bg-gray-100 dark:bg-gray-800">
              {["features", "limits"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  isActive={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className="capitalize data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            {activeTab === "features" && (
              <TabsContent value="features" className="mt-6">
                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="text-left p-4 pl-6 min-w-[200px] sticky left-0 bg-gray-50 dark:bg-gray-800 z-20 text-gray-500 dark:text-gray-400 font-medium">
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
                                    ₹{getPlanPrice(plan)?.localized}/
                                    {billingPeriod}
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
                                className="p-3 pl-6 font-semibold text-gray-700 dark:text-gray-300"
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
                            {Object.entries(features).map(([featureKey, _]) => (
                              <tr
                                key={featureKey}
                                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                              >
                                <td className="p-4 pl-8 font-medium text-gray-700 dark:text-gray-300 flex gap-2 items-center sticky left-0 bg-white dark:bg-gray-900">
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
                            ))}
                          </React.Fragment>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            )}

            {activeTab === "limits" && (
              <TabsContent value="limits" className="mt-6">
                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="text-left p-4 pl-6 min-w-[200px] sticky left-0 bg-gray-50 dark:bg-gray-800 z-20">
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
                                    ₹{getPlanPrice(plan)?.localized}/
                                    {billingPeriod}
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
                      {Object.keys(plans[0].limits).map((limitKey) => (
                        <tr
                          key={limitKey}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          <td className="p-4 pl-6 font-medium text-gray-700 dark:text-gray-300 flex gap-2 items-center sticky left-0 bg-white dark:bg-gray-900">
                            {limitIcons[limitKey] || (
                              <Zap className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                            )}
                            {limitKey
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^\w/, (c) => c.toUpperCase())}
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
                              {formatFeatureValue(plan.limits[limitKey])}
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
        </div>
      </div>
    );
  };

  if (loading || !plans.length) {
    return (
      <div className="flex w-full items-center justify-center h-[500px]">
        <SpinnerIcon />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 h-full overflow-y-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col gap-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2 w-fit text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <MoveLeft className="h-5 w-5" /> Back
          </Button>

          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="space-y-2">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                Find Your Perfect Plan
              </h1>
              <p className="text-base text-gray-500 dark:text-gray-400">
                Choose the right solution to grow your business
              </p>
            </div>

            <div className="flex items-center gap-4">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800 gap-1">
                {["monthly", "yearly"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className={`capitalize px-4 text-sm font-medium rounded-md`}
                    isActive={billingPeriod === tab}
                    onClick={() => setBillingPeriod(tab)}
                  >
                    {tab}{" "}
                    {tab === "yearly" && (
                      <span className="ml-0.5 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs px-1 py-0.5 rounded-full">
                        20% OFF
                      </span>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
              <Button
                variant="outline"
                onClick={() =>
                  router.push(`/${workspaceId}/settings/workspace/billing`)
                }
                className="hidden sm:flex items-center gap-2"
              >
                <CreditCard className="h-4 w-4" />
                Billing
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {renderComparisonTable()}

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 px-4 py-1 rounded-full text-sm font-medium mb-4">
              <HelpCircle className="h-4 w-4" />
              Need help choosing?
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Not sure which plan is right for you?
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Our experts can help you select the perfect plan based on your
              business needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button variant="outline" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat with sales
              </Button>
              <Button variant="default" className="gap-2">
                <Mail className="h-4 w-4" />
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
