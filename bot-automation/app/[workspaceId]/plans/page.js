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
import { PLANS } from "@/config/pricing.config";
import { billingService } from "@/lib/client/billing";
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
  Settings,
  BarChart2,
  Shield,
  CreditCard,
  Globe,
  Mail,
  Calendar,
  FileText,
  LayoutTemplate,
  Filter,
  Target,
  PieChart,
  Cpu,
  Code,
  Lock,
  Server,
  BookOpen,
  Headphones,
  Award,
  List,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";

const iconMap = {
  whatsapp: (
    <FaWhatsapp className="text-green-600 text-xl hover:text-green-700 transition-colors" />
  ),
  instagram: (
    <FaInstagram className="text-pink-600 text-xl hover:text-pink-700 transition-colors" />
  ),
  facebook: (
    <FaFacebook className="text-blue-600 text-xl hover:text-blue-700 transition-colors" />
  ),
  telegram: (
    <FaTelegram className="text-blue-500 text-xl hover:text-blue-600 transition-colors" />
  ),
  web: (
    <Earth className="text-xl text-blue-500 hover:text-blue-600 transition-colors" />
  ),
  sms: (
    <MessageSquare className="text-xl hover:text-gray-600 text-blue-700 transition-colors" />
  ),
  voice: (
    <Mic className="text-xl text-purple-600 hover:text-red-700 transition-colors" />
  ),
};
const featureIcons = {
  // Core Features
  channels: <Globe className="h-5 w-5" />,
  fileAttachments: <FileText className="h-5 w-5" />,
  analyticsDashboard: <BarChart2 className="h-5 w-5" />,
  customBranding: <Award className="h-5 w-5" />,
  prioritySupport: <Headphones className="h-5 w-5" />,
  whiteLabel: <Shield className="h-5 w-5" />,
  apiAccess: <Code className="h-5 w-5" />,
  webhooks: <GitMerge className="h-5 w-5" />,
  sso: <Lock className="h-5 w-5" />,
  aiFeatures: <Cpu className="h-5 w-5" />,
  customFlows: <Settings className="h-5 w-5" />,
  autoScheduling: <Calendar className="h-5 w-5" />,
  advancedReporting: <PieChart className="h-5 w-5" />,

  // Chatbot Automation
  visualFlowBuilder: <GitMerge className="h-5 w-5" />,
  aiResponseTuning: <Cpu className="h-5 w-5" />,
  chatbotTemplates: <LayoutTemplate className="h-5 w-5" />,

  // Ads Automation
  adCopyGeneration: <FileText className="h-5 w-5" />,
  smartTargeting: <Target className="h-5 w-5" />,
  budgetSuggestions: <CreditCard className="h-5 w-5" />,
  autoPublishing: <Zap className="h-5 w-5" />,
  audienceSegmentation: <Filter className="h-5 w-5" />,

  // Drip Campaigns
  emailSequences: <Mail className="h-5 w-5" />,
  behavioralTriggers: <Zap className="h-5 w-5" />,
  aBTesting: <BarChart2 className="h-5 w-5" />,

  // Landing Page Builder
  dragDropEditor: <Settings className="h-5 w-5" />,
  pageTemplates: <LayoutTemplate className="h-5 w-5" />,
  formBuilders: <FileText className="h-5 w-5" />,
  popupCreators: <MessageSquare className="h-5 w-5" />,
  seoTools: <Globe className="h-5 w-5" />,

  // Growth Features
  teamCollaboration: <Users className="h-5 w-5" />,
  customAiModels: <Cpu className="h-5 w-5" />,
  advancedSegmentation: <Filter className="h-5 w-5" />,
  dynamicContent: <Zap className="h-5 w-5" />,
  webinarIntegration: <Users className="h-5 w-5" />,
  membershipSites: <Users className="h-5 w-5" />,
  paymentGateways: <CreditCard className="h-5 w-5" />,

  // Enterprise Features
  dedicatedInstance: <Server className="h-5 w-5" />,
  sla99_9: <BadgeCheck className="h-5 w-5" />,
  enterpriseSso: <Lock className="h-5 w-5" />,
  customDataCenter: <Server className="h-5 w-5" />,
  aiModelHosting: <Cpu className="h-5 w-5" />,
  auditLogs: <BookOpen className="h-5 w-5" />,
  dataResidency: <Globe className="h-5 w-5" />,
  hipaaCompliance: <Shield className="h-5 w-5" />,
  accountManager: <Users className="h-5 w-5" />,
  developerSupport: <Code className="h-5 w-5" />,
  trainingSessions: <BookOpen className="h-5 w-5" />,
};

const limitIcons = {
  chatbots: <MessageCircle className="h-5 w-5" />,
  messages: <MessageSquare className="h-5 w-5" />,
  members: <Users className="h-5 w-5" />,
  storage: <HardDrive className="h-5 w-5" />,
  conversations: <MessageCircle className="h-5 w-5" />,
  integrations: <GitMerge className="h-5 w-5" />,
  automationRules: <Zap className="h-5 w-5" />,
  dripCampaigns: <Mail className="h-5 w-5" />,
  adCredits: <CreditCard className="h-5 w-5" />,
  exports: <FileText className="h-5 w-5" />,
  landingPages: <LayoutTemplate className="h-5 w-5" />,
  adCampaigns: <Target className="h-5 w-5" />,
  teamRoles: <Users className="h-5 w-5" />,
  aiModelTraining: <Cpu className="h-5 w-5" />,
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
  const toastRef = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      toastRef.current = false;
    }, 10000);
  });

  useEffect(() => {
    const fetchuserCredentials = async () => {
      try {
        const profile = await billingService.getSubscription(workspaceId);
        if (profile.status && !profile.ok) {
          const value = await profile.json();
          if (!toastRef.current) {
            showToast({ description: value.message, variant: "warning" });
            toastRef.current = true;
          }
        }
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
            description: err.message || "Failed to fetch user credentials",
            variant: "destructive",
          });
          toastRef.current = true;
        }
      }
    };
    fetchuserCredentials();
  }, [showToast, workspaceId]);

  const getPlanPrice = (planId) => {
    const plan = PLANS[planId];
    if (!plan || !plan.prices) return null;
    const rawPrice = plan.prices[billingPeriod];
    return {
      raw: rawPrice,
      localized: rawPrice,
      currency,
      period: billingPeriod,
    };
  };

  const formatFeatureValue = (val) => {
    if (Array.isArray(val)) {
      return val
        .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
        .join(", ");
    }
    if (val === Infinity) return "Unlimited";
    if (typeof val === "boolean") return val ? "Included" : "Not included";
    if (typeof val === "string")
      return val.replace(/\b\w/g, (c) => c.toUpperCase());
    return val;
  };

  const handlePlanSelection = async (planId) => {
    if (!PLANS[planId].prices) return;

    const obj = {
      plan_name: encryptData(planId),
      em: encryptData(userCred.email),
      pn: encryptData(userCred.phone),
    };
    const params = new URLSearchParams(obj).toString();
    router.replace(`/${workspaceId}/plans/checkout?${params}`);
  };

  const PlanCard = ({ planId, plan }) => {
    const priceInfo = getPlanPrice(planId);
    const isCurrentPlan = subscription?.plan === planId;

    return (
      <Card
        className={`hover:shadow-lg transition-shadow relative overflow-hidden ${
          isCurrentPlan ? "ring-2 ring-primary" : ""
        } ${plan.metadata.popular ? "border-2 border-yellow-400" : ""}`}
      >
        {plan.metadata.popular && (
          <div className="absolute top-4 right-4 bg-primary/10 text-primary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-2">
            <StarsIcon className="h-4 w-4 text-yellow-500" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-yellow-500 font-bold to-pink-500">
              Popular
            </span>
          </div>
        )}

        {plan.metadata.recommended && (
          <div className="absolute top-0.5 right-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
            <BadgeCheck size="small" className="h-4 w-4 text-blue-500" />
            <span className="font-bold text-sm">Recommended</span>
          </div>
        )}

        <CardHeader className="pb-0">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold">{plan.name}</h3>
            {isCurrentPlan && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Current Plan
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {plan.description}
          </p>

          {priceInfo ? (
            <div className="space-y-0 mt-3">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">
                  ₹
                  {priceInfo.localized.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                </span>
                <span className="text-muted-foreground text-xs">
                  /{billingPeriod}
                </span>
              </div>
              {billingPeriod === "yearly" && (
                <p className="text-xs text-green-600 mt-1">
                  Save 20% compared to monthly
                </p>
              )}
            </div>
          ) : (
            plan.name.toLowerCase() !== "free" && (
              <div className="text-base m-0 p-0 font-bold text-muted-foreground">
                Contact for Pricing
              </div>
            )
          )}
        </CardHeader>

        <CardContent className="space-y-4 pt-6">
          <Button
            variant={isCurrentPlan ? "secondary" : "outline"}
            className="w-full"
            disabled={isCurrentPlan || planId.toLowerCase() === "free"}
            onClick={() => handlePlanSelection(planId)}
          >
            {isCurrentPlan ? (
              "Manage Plan"
            ) : (
              <>
                View Details <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-muted-foreground">
              Key Features:
            </h4>
            {Object.entries(plan.limits).map(([key, value]) => (
              <div key={key} className="flex items-start gap-3">
                <span className="text-primary">
                  {limitIcons[key] || <Zap className="h-5 w-5" />}
                </span>
                <div>
                  <p className="font-medium text-sm md:text-base">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^\w/, (c) => c.toUpperCase())}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {formatFeatureValue(value)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full gap-2 text-lg font-semibold transition-all hover:shadow-md"
            size="lg"
            variant={
              planId.toLowerCase() === "enterprise"
                ? "premium"
                : planId.toLowerCase() === "free"
                ? "outline"
                : "default"
            }
            onClick={() => handlePlanSelection(planId)}
            disabled={isCurrentPlan}
          >
            {isCurrentPlan ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle className="text-green-600" />
                Current Plan
              </span>
            ) : plan.metadata.trialDays > 0 ? (
              <span className="flex items-center justify-center gap-2 text-sm">
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
    );
  };

  const renderComparisonTable = () => (
    <div className="mt-12 border rounded-xl overflow-hidden shadow-sm">
      <div className="p-6 bg-muted/50 border-b">
        <h3 className="text-2xl font-bold">Plan Comparison</h3>
        <p className="text-muted-foreground mt-2">
          Feature breakdown across all plans ({currency})
        </p>
      </div>
      <Tabs className="p-4 w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger
            value="features"
            isActive={activeTab === "features"}
            onClick={() => setActiveTab("features")}
          >
            Features
          </TabsTrigger>
          <TabsTrigger
            value="limits"
            isActive={activeTab === "limits"}
            onClick={() => setActiveTab("limits")}
          >
            Limits
          </TabsTrigger>
        </TabsList>

        {activeTab === "features" && (
          <TabsContent key="features">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4 pl-6 min-w-[170px] sticky left-0 bg-background z-20 backdrop-blur-sm">
                      Features
                    </th>
                    {Object.entries(PLANS).map(([planId, plan]) => (
                      <th
                        key={planId}
                        className={`p-4 text-center md:text-base text-sm ${
                          subscription?.plan === planId
                            ? "bg-primary/10"
                            : "bg-background"
                        } sticky top-0 z-10 backdrop-blur-sm`}
                      >
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-sm">{plan.name}</span>
                          {subscription?.plan !== planId && plan.prices && (
                            <span className="text-xs text-muted-foreground mt-1">
                              {getPlanPrice(planId).localized}/{billingPeriod}
                            </span>
                          )}
                          {subscription?.plan === planId && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full mt-1">
                              Current
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(PLANS.pro.features).map((featureKey) => (
                    <tr
                      key={featureKey}
                      className="border-b hover:bg-muted/50 transition-colors"
                    >
                      <td className="p-4 pl-6 font-medium text-sm md:text-base backdrop-blur-sm sticky left-0 bg-background z-10">
                        {featureKey
                          .replace(/([A-Z])/g, " $1")
                          .replace(/\b\w/g, (c) => c.toUpperCase())
                          .trim()}
                      </td>
                      {Object.entries(PLANS).map(([planId, plan]) => {
                        const value = plan.features[featureKey];
                        return (
                          <td key={planId} className="p-4 text-center">
                            {typeof value === "boolean" ? (
                              <span
                                className={`text-xl font-bold ${
                                  value ? "text-green-600" : "text-rose-600"
                                }`}
                              >
                                {value ? "✓" : "✕"}
                              </span>
                            ) : value === Infinity ? (
                              <div className="flex items-center justify-center gap-1">
                                <InfinityIcon className="h-5 w-5 text-primary" />
                                <span className="sr-only">Unlimited</span>
                              </div>
                            ) : Array.isArray(value) ? (
                              <div className="flex flex-wrap justify-center items-center gap-2">
                                {value.map((v, index) => (
                                  <span
                                    key={index}
                                    className="text-lg flex items-center gap-2"
                                    title={v}
                                  >
                                    {iconMap[v.toLowerCase()] || (
                                      <span>{v}</span>
                                    )}
                                  </span>
                                ))}
                              </div>
                            ) : typeof value === "string" &&
                              value.includes("GB") ? (
                              <span className="font-semibold text-primary">
                                {value}
                              </span>
                            ) : (
                              <span className="font-medium">
                                {formatFeatureValue(value)}
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
          </TabsContent>
        )}

        {activeTab === "limits" && (
          <TabsContent value="limits">
            <div className="relative">
              {/* Scroll indicator */}
              <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-background to-transparent pointer-events-none z-30" />
              <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-background to-transparent pointer-events-none z-30" />

              <div className="overflow-x-auto pb-2 -mx-4 px-4">
                <table className="w-full min-w-[600px]">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-3 pl-6 min-w-[200px] max-w-[200px] sticky left-0 bg-background z-20">
                        <div className="flex items-center gap-2">
                          <List className="h-4 w-4" />
                          <span>Limits</span>
                        </div>
                      </th>
                      {Object.entries(PLANS).map(([planId, plan]) => (
                        <th
                          key={planId}
                          className={`p-3 text-center min-w-[150px] max-w-[150px] ${
                            subscription?.plan === planId
                              ? "bg-primary/10"
                              : "bg-background"
                          } sticky top-0 z-10`}
                        >
                          <div className="flex flex-col items-center space-y-1">
                            <span className="font-bold text-sm">
                              {plan.name}
                            </span>
                            {subscription?.plan !== planId && plan.prices && (
                              <span className="text-xs text-muted-foreground">
                                ₹
                                {getPlanPrice(planId).localized.toLocaleString(
                                  "en-IN"
                                )}
                                /{billingPeriod}
                              </span>
                            )}
                            {subscription?.plan === planId && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(PLANS.pro.limits).map((limitKey) => (
                      <tr
                        key={limitKey}
                        className="border-b hover:bg-muted/50 transition-colors"
                      >
                        <td className="p-4 pl-6 font-medium text-sm md:text-base backdrop-blur-sm sticky left-0 bg-background z-10">
                          {limitIcons[limitKey] || <Zap className="h-4 w-4" />}
                          <span className="truncate">
                            {limitKey
                              .replace(/([A-Z])/g, " $1")
                              .replace(/\b\w/g, (c) => c.toUpperCase())
                              .trim()}
                          </span>
                        </td>
                        {Object.entries(PLANS).map(([planId, plan]) => {
                          const value = plan.limits[limitKey];
                          return (
                            <td
                              key={planId}
                              className="p-3 text-center min-w-[150px] max-w-[150px]"
                            >
                              {value === Infinity ? (
                                <div className="flex items-center justify-center gap-1">
                                  <InfinityIcon className="h-4 w-4 text-primary" />
                                </div>
                              ) : (
                                <span className="font-medium text-sm">
                                  {typeof value === "number"
                                    ? value.toLocaleString("en-IN")
                                    : formatFeatureValue(value)}
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
          </TabsContent>
        )}
      </Tabs>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 overflow-y-auto max-w-7xl scrollbar-transparent">
      <div className="space-y-8">
        <button
          type="button"
          aria-label="Back to Billing Settings"
          title="Back to Billing Settings"
          onClick={() =>
            router.push(`/${workspaceId}/settings/workspace/billing`)
          }
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <MoveLeft className="h-6 w-4" /> Back
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Choose Your Plan
            </h1>
            <p className="text-muted-foreground mt-2">
              Select the perfect plan for your business needs
            </p>
          </div>
          <TabsList className="grid w-full grid-cols-2 max-w-xs">
            <TabsTrigger
              isActive={billingPeriod === "monthly"}
              value="monthly"
              onClick={() => setBillingPeriod("monthly")}
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger
              value="yearly"
              isActive={billingPeriod === "yearly"}
              onClick={() => setBillingPeriod("yearly")}
            >
              Yearly (Save 20%)
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.entries(PLANS).map(([planId, plan]) => (
            <PlanCard key={planId} planId={planId} plan={plan} />
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Detailed Comparison</h3>
          {renderComparisonTable()}
        </div>
      </div>
    </div>
  );
}
