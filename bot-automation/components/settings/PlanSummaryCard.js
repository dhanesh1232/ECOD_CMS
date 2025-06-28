"use client";

import {
  Zap,
  Bot,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Loader,
  RotateCw,
  Wallet,
  ArrowUp,
  Users,
  Database,
  Plug,
  FileText,
  BarChart2,
  Shield,
  Cpu,
  Mail,
  Calendar,
  Globe,
  CreditCard,
  ChevronRight,
  Infinity as InfinityIcon,
  Sparkles,
  Target,
  Layers,
  Code,
  Server,
  Clock,
  Gift,
  TrendingUp,
  Globe2,
  Mailbox,
  Sliders,
  FileBarChart,
  ShieldCheck,
  Key,
  LifeBuoy,
  UserCheck,
  Settings,
  Award,
  Rocket,
  ChevronDown,
  PieChart,
  Gauge,
  Bell,
  BellOff,
  Pause,
  Play,
  FileSearch,
  History,
  Receipt,
  Tag,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { PLANS } from "@/config/pricing.config";
const GRACE_PERIOD_DAYS = 2;
const PlanSummaryCard = ({
  subscription,
  isProcessing,
  onUpgrade,
  onCancel,
  onReactivate,
  usageData = {},
}) => {
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("usage");

  const toggleCategory = (index) => {
    const newExpanded = [...expandedCategories];
    newExpanded[index] = !newExpanded[index];
    setExpandedCategories(newExpanded);
  };

  // Enhanced status handling with more detailed tooltips
  const getStatusBadge = () => {
    if (!subscription) return null;

    const statusMap = {
      active: {
        variant: "success",
        icon: <CheckCircle className="h-4 w-4" />,
        text: "Active",
        tooltip: "Your subscription is active and in good standing",
      },
      past_due: {
        variant: "warning",
        icon: <AlertTriangle className="h-4 w-4" />,
        text: "Payment Due",
        tooltip:
          subscription.plan !== "free" &&
          `Payment is past due. Service may be suspended if not paid by ${format(
            new Date(subscription.currentPeriod.end),
            "MMM d, yyyy"
          )}`,
      },
      grace_period: {
        variant: "info",
        icon: <RotateCw className="h-4 w-4 animate-spin" />,
        text: "Grace Period",
        tooltip: `You have ${GRACE_PERIOD_DAYS} days to complete payment before service is suspended`,
      },
      canceled: {
        variant: "destructive",
        icon: <XCircle className="h-4 w-4" />,
        text: "Canceled",
        tooltip: subscription.cancellation?.effectiveAt
          ? `Will cancel on ${format(
              new Date(subscription.cancellation.effectiveAt),
              "MMM d, yyyy"
            )}`
          : "Subscription has been canceled",
      },
      unpaid: {
        variant: "warning",
        icon: <Wallet className="h-4 w-4" />,
        text: "Unpaid",
        tooltip: "Payment is required to restore service",
      },
      trialing: {
        variant: "info",
        icon: <Loader className="h-4 w-4 animate-spin" />,
        text: "Trial Active",
        tooltip:
          subscription.status === "trialing" &&
          `Free trial ends on ${format(
            new Date(subscription.trial.end),
            "MMM d, yyyy"
          )}`,
      },
      pending: {
        variant: "secondary",
        icon: <Loader className="h-4 w-4 animate-spin" />,
        text: "Pending",
        tooltip: "Subscription is being processed",
      },
      paused: {
        variant: "secondary",
        icon: <Pause className="h-4 w-4" />,
        text: "Paused",
        tooltip: subscription.lifeCycle?.pause?.end
          ? `Paused until ${format(
              new Date(subscription.lifeCycle.pause.end),
              "MMM d, yyyy"
            )}`
          : "Subscription is currently paused",
      },
    };

    const statusConfig = statusMap[subscription.status] || {
      variant: "secondary",
      icon: null,
      text: subscription.status.replace(/_/g, " "),
      tooltip: `Current status: ${subscription.status.replace(/_/g, " ")}`,
    };

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant={statusConfig.variant} className="gap-2 capitalize">
            {statusConfig.icon}
            {statusConfig.text}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>{statusConfig.tooltip}</TooltipContent>
      </Tooltip>
    );
  };

  // Enhanced usage display with better tooltips and overage handling
  const renderUsageItem = (resource, used, limit, icon) => {
    const isUnlimited =
      limit === "Infinity" || limit === Infinity || limit > 1000000;
    const percentage = isUnlimited ? 0 : Math.min((used / limit) * 100, 100);
    const isOverLimit = !isUnlimited && used > limit;
    const isNearLimit = !isUnlimited && percentage > 80;

    // Get overage amount if available
    const overageAmount = subscription?.usageOverage?.[resource] || 0;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            {icon}
            <span className="capitalize">
              {resource.replace(/([A-Z])/g, " $1")}
            </span>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className={`text-xs ${
                  isOverLimit
                    ? "text-red-500"
                    : isNearLimit
                    ? "text-orange-500"
                    : "text-muted-foreground"
                }`}
              >
                {used.toLocaleString()}
                {isUnlimited ? (
                  <span className="ml-1 inline-flex items-center">
                    / <InfinityIcon className="h-3 w-3 ml-1" />
                  </span>
                ) : (
                  ` / ${limit.toLocaleString()}`
                )}
                {isOverLimit && (
                  <span className="ml-2 text-red-500">
                    (+{overageAmount.toLocaleString()} over)
                  </span>
                )}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              {isOverLimit ? (
                <p>
                  {`You're`} {overageAmount.toLocaleString()} over your limit.
                  {subscription?.plan !== "free" &&
                    " Additional charges may apply."}
                </p>
              ) : isNearLimit ? (
                <p>{`You're approaching your limit. Consider upgrading.`}</p>
              ) : (
                <p>
                  {isUnlimited
                    ? "No usage limits for this resource"
                    : `${(((limit - used) / limit) * 100).toFixed(
                        0
                      )}% of limit remaining`}
                </p>
              )}
            </TooltipContent>
          </Tooltip>
        </div>
        {!isUnlimited && (
          <Progress
            value={percentage}
            indicatorClass={
              isOverLimit
                ? "bg-red-500"
                : isNearLimit
                ? "bg-orange-500"
                : "bg-primary"
            }
          />
        )}
      </div>
    );
  };

  const getUsageItems = () => {
    if (!subscription) return [];

    const commonItems = [
      {
        resource: "chatbots",
        used: usageData.chatbotsCreated || subscription.usage.chatbots || 0,
        limit: subscription.limits.chatbots,
        icon: <Bot className="h-4 w-4" />,
      },
      {
        resource: "messages",
        used: usageData.messagesUsed || subscription.usage.messages || 0,
        limit: subscription.limits.messages,
        icon: <MessageSquare className="h-4 w-4" />,
      },
      {
        resource: "members",
        used: usageData.teamMembers || subscription.usage.members || 1,
        limit: subscription.limits.members,
        icon: <Users className="h-4 w-4" />,
      },
      {
        resource: "storage",
        used: usageData.storageUsed || subscription.usage.storage || 0,
        limit: subscription.limits.storage,
        icon: <Database className="h-4 w-4" />,
      },
      {
        resource: "apiCalls",
        used: usageData.apiCalls || subscription.usage.apiCalls || 0,
        limit: subscription.limits.apiCalls,
        icon: <Code className="h-4 w-4" />,
      },
    ];

    // Add plan-specific usage items
    const additionalItems = [];

    if (subscription.limits.integrations > 0) {
      additionalItems.push({
        resource: "integrations",
        used: usageData.integrations || 0,
        limit: subscription.limits.integrations,
        icon: <Plug className="h-4 w-4" />,
      });
    }

    if (subscription.limits.automationRules > 0) {
      additionalItems.push({
        resource: "automationRules",
        used: usageData.automationRules || 0,
        limit: subscription.limits.automationRules,
        icon: <Cpu className="h-4 w-4" />,
      });
    }

    if (subscription.limits.dripCampaigns > 0) {
      additionalItems.push({
        resource: "dripCampaigns",
        used: usageData.dripCampaigns || 0,
        limit: subscription.limits.dripCampaigns,
        icon: <Mail className="h-4 w-4" />,
      });
    }

    if (subscription.limits.adCampaigns > 0) {
      additionalItems.push({
        resource: "adCampaigns",
        used: usageData.adCampaigns || 0,
        limit: subscription.limits.adCampaigns,
        icon: <Target className="h-4 w-4" />,
      });
    }

    if (subscription.limits.adCredits > 0) {
      additionalItems.push({
        resource: "adCredits",
        used: usageData.adCreditsUsed || subscription.usage.adCredits || 0,
        limit: subscription.limits.adCredits,
        icon: <Sparkles className="h-4 w-4" />,
      });
    }

    return [...commonItems, ...additionalItems];
  };

  const getKeyFeatures = () => {
    if (!subscription) return [];

    const features = [];

    // Channels
    if (subscription.features.channels?.length > 0) {
      features.push({
        name: "Channels",
        value: `${subscription.features.channels.length} integrated`,
        icon: <Globe2 className="h-4 w-4" />,
        tooltip: subscription.features.channels.join(", "),
      });
    }

    // AI Features
    if (subscription.features.aiResponseTuning) {
      features.push({
        name: "AI Features",
        value: subscription.features.customModels ? "Custom Models" : "Enabled",
        icon: <Zap className="h-4 w-4" />,
      });
    }

    // Support level
    features.push({
      name: "Support",
      value: subscription.features.prioritySupport ? "Priority" : "Standard",
      icon: <LifeBuoy className="h-4 w-4" />,
      tooltip: subscription.features.prioritySupport
        ? "24/7 priority support with 1-hour response time"
        : "Business hours support with 24-hour response time",
    });

    // Automation
    if (subscription.limits.automationRules > 0) {
      features.push({
        name: "Automation",
        value:
          subscription.limits.automationRules === "Infinity"
            ? "Unlimited"
            : `${subscription.limits.automationRules} rules`,
        icon: <Sliders className="h-4 w-4" />,
      });
    }

    // CRM Features
    if (subscription.features.crmEnabled) {
      features.push({
        name: "CRM",
        value: subscription.features.leadScoring ? "Advanced" : "Basic",
        icon: <UserCheck className="h-4 w-4" />,
      });
    }

    // Ads Automation
    if (subscription.features.adsAutomation) {
      features.push({
        name: "Ads",
        value: subscription.features.autoPublishing
          ? "Full Automation"
          : "Basic",
        icon: <TrendingUp className="h-4 w-4" />,
      });
    }

    // Security
    if (subscription.features.sso || subscription.features.hipaaCompliance) {
      features.push({
        name: "Security",
        value: subscription.features.hipaaCompliance
          ? "Enterprise"
          : "Standard",
        icon: <ShieldCheck className="h-4 w-4" />,
      });
    }

    // Add custom pricing info if applicable
    if (subscription.customPricing?.isCustom) {
      features.push({
        name: "Pricing",
        value: "Custom",
        icon: <Tag className="h-4 w-4" />,
        tooltip: `Custom contract until ${format(
          new Date(subscription.customPricing.contractEnd),
          "MMM d, yyyy"
        )}`,
      });
    }

    return features.slice(0, 6); // Show top 6 features
  };

  const getFeatureCategories = () => {
    if (!subscription) return [];

    return [
      {
        name: "Chatbot Automation",
        icon: <Bot className="h-4 w-4" />,
        features: [
          {
            name: "Channels",
            value: subscription.features.channels?.join(", ") || "None",
            icon: <Globe2 className="h-4 w-4" />,
          },
          {
            name: "Multilingual Support",
            value:
              subscription.features.multilingualSupport === "Infinity"
                ? "Unlimited languages"
                : `${subscription.features.multilingualSupport} languages`,
            icon: <Globe className="h-4 w-4" />,
          },
          {
            name: "Visual Flow Builder",
            value: subscription.features.visualFlowBuilder
              ? "Enabled"
              : "Disabled",
            icon: <Layers className="h-4 w-4" />,
          },
          {
            name: "File Attachments",
            value: subscription.features.fileAttachments
              ? "Enabled"
              : "Disabled",
            icon: <FileText className="h-4 w-4" />,
          },
        ],
      },
      {
        name: "AI & Automation",
        icon: <Cpu className="h-4 w-4" />,
        features: [
          {
            name: "Response Tuning",
            value: subscription.features.aiResponseTuning
              ? "Enabled"
              : "Disabled",
            icon: <Settings className="h-4 w-4" />,
          },
          {
            name: "Custom AI Models",
            value: subscription.features.customModels ? "Enabled" : "Disabled",
            icon: <Server className="h-4 w-4" />,
          },
          {
            name: "Automation Rules",
            value:
              subscription.limits.automationRules === "Infinity"
                ? "Unlimited"
                : subscription.limits.automationRules,
            icon: <Sliders className="h-4 w-4" />,
          },
        ],
      },
      {
        name: "Marketing Tools",
        icon: <Target className="h-4 w-4" />,
        features: [
          {
            name: "Ads Automation",
            value: subscription.features.adsAutomation ? "Enabled" : "Disabled",
            icon: <TrendingUp className="h-4 w-4" />,
          },
          {
            name: "Ad Credits",
            value:
              subscription.limits.adCredits === Infinity
                ? "Unlimited"
                : subscription.limits.adCredits,
            icon: <Sparkles className="h-4 w-4" />,
          },
          {
            name: "Landing Pages",
            value:
              subscription.limits.landingPages === "Infinity"
                ? "Unlimited"
                : subscription.limits.landingPages,
            icon: <FileBarChart className="h-4 w-4" />,
          },
          {
            name: "Drip Campaigns",
            value:
              subscription.limits.dripCampaigns === "Infinity"
                ? "Unlimited"
                : subscription.limits.dripCampaigns,
            icon: <Mailbox className="h-4 w-4" />,
          },
        ],
      },
      {
        name: "Enterprise Features",
        icon: <Shield className="h-4 w-4" />,
        features: [
          {
            name: "API Access",
            value: subscription.features.apiAccess ? "Enabled" : "Disabled",
            icon: <Code className="h-4 w-4" />,
          },
          {
            name: "White Label",
            value: subscription.features.whiteLabel ? "Enabled" : "Disabled",
            icon: <Award className="h-4 w-4" />,
          },
          {
            name: "SSO",
            value: subscription.features.sso ? "Enabled" : "Disabled",
            icon: <Key className="h-4 w-4" />,
          },
          {
            name: "Dedicated Instance",
            value: subscription.features.dedicatedInstance
              ? "Enabled"
              : "Disabled",
            icon: <Server className="h-4 w-4" />,
          },
        ],
      },
    ];
  };

  const getTrialDaysRemaining = () => {
    if (!subscription?.trial?.end || subscription.status !== "trialing")
      return 0;
    const diff = new Date(subscription.trial.end) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getRenewalDate = () => {
    if (!subscription?.currentPeriod?.end) return null;
    return format(new Date(subscription.currentPeriod.end), "MMM d, yyyy");
  };

  const getMainAction = () => {
    if (!subscription) return null;

    if (subscription.status === "canceled") {
      return {
        label: "Reactivate Plan",
        icon: <Zap className="h-4 w-4" />,
        onClick: onReactivate,
        variant: "destructive",
        tooltip: "Reactivate your canceled subscription",
      };
    }

    if (subscription.status === "paused") {
      return {
        label: "Resume Plan",
        icon: <Play className="h-4 w-4" />,
        onClick: onReactivate,
        variant: "info",
        tooltip: "Resume your paused subscription",
      };
    }

    if (subscription.plan === "free") {
      return {
        label: "Upgrade Plan",
        icon: <ArrowUp className="h-4 w-4" />,
        onClick: onUpgrade,
        variant: "ocean",
        tooltip: "Upgrade to a paid plan for more features",
      };
    }

    return {
      label: "Change Plan",
      icon: <CreditCard className="h-4 w-4" />,
      onClick: onUpgrade,
      variant: "success",
      tooltip: "Change your current subscription plan",
    };
  };

  const getSecondaryActions = () => {
    if (!subscription) return [];

    const actions = [];

    if (subscription.plan !== "free" && subscription.status !== "canceled") {
      actions.push({
        label: subscription.status === "paused" ? "Cancel Plan" : "Pause Plan",
        icon:
          subscription.status === "paused" ? (
            <XCircle className="h-4 w-4" />
          ) : (
            <Pause className="h-4 w-4" />
          ),
        onClick: onCancel,
        variant: "outline",
        tooltip:
          subscription.status === "paused"
            ? "Cancel your subscription permanently"
            : "Temporarily pause your subscription",
      });
    }

    return actions;
  };

  const renderPlanPrice = () => {
    if (!subscription) return null;

    if (subscription.customPricing?.isCustom) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Custom Pricing</span>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Custom contract until{" "}
                {format(
                  new Date(subscription.customPricing.contractEnd),
                  "MMM d, yyyy"
                )}
              </p>
              {subscription.customPricing.specialTerms && (
                <p className="mt-1">
                  Terms: {subscription.customPricing.specialTerms}
                </p>
              )}
            </TooltipContent>
          </Tooltip>
        </div>
      );
    }

    if (subscription.plan === "free") {
      return (
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold">$0</span>
          <span className="text-sm text-muted-foreground">/forever</span>
        </div>
      );
    }

    const price =
      subscription.billingCycle === "yearly"
        ? PLANS[subscription.plan].prices.yearly
        : PLANS[subscription.plan].prices.monthly;

    return (
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold">
          ₹
          {price.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <span className="text-sm text-muted-foreground">
          /{subscription.billingCycle === "yearly" ? "year" : "month"}
        </span>
      </div>
    );
  };

  const renderAddOns = () => {
    if (!subscription?.addOns?.length) return null;

    return (
      <div className="space-y-3">
        <h4 className="text-sm font-medium flex items-center gap-2">
          <Tag className="h-4 w-4" />
          Active Add-ons
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {subscription.addOns.map((addOn, index) => (
            <div
              key={index}
              className="p-3 rounded-lg border flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{addOn.name}</p>
                <p className="text-sm text-muted-foreground">
                  {addOn.description}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  ${addOn.price}/{addOn.billingCycle}
                </p>
                {addOn.expiresAt && (
                  <p className="text-xs text-muted-foreground">
                    Expires {format(new Date(addOn.expiresAt), "MMM d, yyyy")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPromotion = () => {
    if (!subscription?.promotion?.code) return null;

    return (
      <div className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <Tag className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        <div>
          <p className="text-sm font-medium">
            Promotion Applied:{" "}
            {subscription.promotion.name || subscription.promotion.code}
          </p>
          <p className="text-xs text-muted-foreground">
            {subscription.promotion.type === "trial"
              ? `Extended trial until ${format(
                  new Date(subscription.promotion.expireAt),
                  "MMM d, yyyy"
                )}`
              : `${
                  subscription.promotion.type === "percent"
                    ? `${subscription.promotion.value}% off`
                    : `$${subscription.promotion.value} off`
                } until ${format(
                  new Date(subscription.promotion.expireAt),
                  "MMM d, yyyy"
                )}`}
          </p>
        </div>
      </div>
    );
  };

  const mainAction = getMainAction();
  const secondaryActions = getSecondaryActions();
  const featureCategories = getFeatureCategories();
  const usageItems = getUsageItems();

  if (!subscription) {
    return (
      <div className="rounded-lg border overflow-hidden bg-transparent">
        <div className="p-6 space-y-6">
          <Skeleton className="h-10 w-1/2" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border-b rounded-b-none overflow-hidden bg-transparent">
      {/* Plan header with status */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 border-b">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {PLANS[subscription.plan]?.name || subscription.plan}
                {subscription.metadata?.popular && (
                  <Badge variant="premium" className="px-2 py-1 text-xs">
                    <Rocket className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                {subscription.metadata?.recommended && (
                  <Badge variant="secondary" className="px-2 py-1 text-xs">
                    <Award className="h-3 w-3 mr-1" />
                    Recommended
                  </Badge>
                )}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {PLANS[subscription.plan]?.description ||
                "Premium subscription plan"}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {renderPlanPrice()}
            <div className="flex items-center gap-3">
              {getStatusBadge()}
              {subscription.billingCycle !== "lifetime" && (
                <Badge variant="outline" className="gap-2">
                  {subscription.billingCycle === "yearly" ? (
                    <>
                      <Calendar className="h-4 w-4" />
                      Billed Yearly
                    </>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4" />
                      Billed Monthly
                    </>
                  )}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications area */}
      <div className="space-y-1 border-b">
        {/* Trial notice */}
        {subscription.status === "trialing" && getTrialDaysRemaining() > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 px-6 py-3 flex items-center gap-3">
            <Gift className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm text-blue-600 dark:text-blue-400">
              {getTrialDaysRemaining()} days remaining in your free trial
            </span>
          </div>
        )}

        {/* Renewal notice */}
        {subscription.currentPeriod?.end &&
          subscription.status === "active" && (
            <div className="bg-green-50 dark:bg-green-900/20 px-6 py-3 flex items-center gap-3">
              <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm text-green-600 dark:text-green-400">
                Renews on {getRenewalDate()}
              </span>
            </div>
          )}

        {/* Payment due notice */}
        {subscription.status === "past_due" && (
          <div className="bg-orange-50 dark:bg-orange-900/20 px-6 py-3 flex items-center gap-3">
            <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <span className="text-sm text-orange-600 dark:text-orange-400">
              Payment required to maintain service
            </span>
          </div>
        )}

        {/* Paused notice */}
        {subscription.status === "paused" && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 px-6 py-3 flex items-center gap-3">
            <Pause className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-sm text-yellow-600 dark:text-yellow-400">
              Subscription paused
              {subscription.lifeCycle.pause?.end &&
                ` until ${format(
                  new Date(subscription.lifeCycle.pause.end),
                  "MMM d, yyyy"
                )}`}
            </span>
          </div>
        )}

        {/* Usage warnings */}
        {subscription.notifications?.usageWarning?.sent && (
          <div className="bg-purple-50 dark:bg-purple-900/20 px-6 py-3 flex items-center gap-3">
            <Bell className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm text-purple-600 dark:text-purple-400">
              {`You're approaching usage limits on some resources`}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-8">
        {/* Promotion notice */}
        {renderPromotion()}

        {/* Key features summary */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {getKeyFeatures().map((feature, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-default">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{feature.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {feature.value}
                    </p>
                  </div>
                </div>
              </TooltipTrigger>
              {feature.tooltip && (
                <TooltipContent side="bottom" className="max-w-[300px]">
                  {feature.tooltip}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </div>

        {/* Add-ons display */}
        {renderAddOns()}

        {/* Tabbed interface for usage and features */}
        <div className="space-y-6">
          <div className="border-b">
            <nav className="flex space-x-8">
              <button
                type="button"
                className={`pb-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "usage"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("usage")}
              >
                <div className="flex items-center gap-2">
                  <PieChart className="h-4 w-4" />
                  Usage
                </div>
              </button>
              <button
                type="button"
                className={`pb-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "features"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("features")}
              >
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Features
                </div>
              </button>
            </nav>
          </div>

          {activeTab === "usage" ? (
            <div className="space-y-6">
              {/* Usage statistics */}
              <div className="space-y-6">
                <div className="space-y-6">
                  {usageItems.map((item, index) => (
                    <div key={index}>
                      {renderUsageItem(
                        item.resource,
                        item.used,
                        item.limit,
                        item.icon
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Usage trends */}
              {subscription.usageTracking?.monthlyStats?.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Usage Trends
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg border flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Messages</p>
                          <p className="text-xs text-muted-foreground">
                            Last 30 days
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {subscription.usageTracking.monthlyStats[0].totalMessages.toLocaleString()}
                        </p>
                        <p
                          className={`text-xs ${
                            subscription.usageTracking.monthlyStats[0]
                              .totalMessages >
                            subscription.usageTracking.monthlyStats[1]
                              ?.totalMessages
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {Math.round(
                            ((subscription.usageTracking.monthlyStats[0]
                              .totalMessages -
                              (subscription.usageTracking.monthlyStats[1]
                                ?.totalMessages || 0)) /
                              (subscription.usageTracking.monthlyStats[1]
                                ?.totalMessages || 1)) *
                              100
                          )}
                          % vs previous
                        </p>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Code className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">API Calls</p>
                          <p className="text-xs text-muted-foreground">
                            Last 30 days
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {subscription.usageTracking.monthlyStats[0].totalApiCalls.toLocaleString()}
                        </p>
                        <p
                          className={`text-xs ${
                            subscription.usageTracking.monthlyStats[0]
                              .totalApiCalls >
                            subscription.usageTracking.monthlyStats[1]
                              ?.totalApiCalls
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {Math.round(
                            ((subscription.usageTracking.monthlyStats[0]
                              .totalApiCalls -
                              (subscription.usageTracking.monthlyStats[1]
                                ?.totalApiCalls || 0)) /
                              (subscription.usageTracking.monthlyStats[1]
                                ?.totalApiCalls || 1)) *
                              100
                          )}
                          % vs previous
                        </p>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Database className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Storage</p>
                          <p className="text-xs text-muted-foreground">
                            Current usage
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {(
                            subscription.usageTracking.monthlyStats[0]
                              .avgStorage /
                            1024 /
                            1024
                          ).toFixed(2)}{" "}
                          MB
                        </p>
                        <p
                          className={`text-xs ${
                            subscription.usageTracking.monthlyStats[0]
                              .avgStorage >
                            subscription.usageTracking.monthlyStats[1]
                              ?.avgStorage
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {Math.round(
                            ((subscription.usageTracking.monthlyStats[0]
                              .avgStorage -
                              (subscription.usageTracking.monthlyStats[1]
                                ?.avgStorage || 0)) /
                              (subscription.usageTracking.monthlyStats[1]
                                ?.avgStorage || 1)) *
                              100
                          )}
                          % vs previous
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Feature categories */}
              {featureCategories.map((category, index) => (
                <div
                  key={index}
                  className="rounded-lg border overflow-hidden dark:bg-gray-800 bg-gray-100"
                >
                  <button
                    type="button"
                    className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors"
                    onClick={() => toggleCategory(index)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        {category.icon}
                      </div>
                      <h4 className="font-medium text-left">{category.name}</h4>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        expandedCategories[index] ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedCategories[index] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-4 pt-2 grid grid-cols-1 md:grid-cols-2 gap-3 border-t">
                          {category.features.map((feature, fIndex) => (
                            <div
                              key={fIndex}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <div className="p-1.5 rounded-full bg-muted mt-0.5">
                                {feature.icon}
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  {feature.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {feature.value}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          {mainAction && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={mainAction.onClick}
                  disabled={isProcessing}
                  className="flex-1 gap-2 py-2"
                  variant={mainAction.variant}
                  size="md"
                >
                  {isProcessing ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      {mainAction.icon}
                      {mainAction.label}
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{mainAction.tooltip}</TooltipContent>
            </Tooltip>
          )}

          {secondaryActions.map((action, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button
                  onClick={action.onClick}
                  disabled={isProcessing}
                  variant={action.variant}
                  className="flex-1 gap-2 py-2"
                  size="md"
                >
                  {isProcessing ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      {action.icon}
                      {action.label}
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{action.tooltip}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanSummaryCard;
