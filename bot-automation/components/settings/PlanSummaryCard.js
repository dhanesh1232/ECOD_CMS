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
  BookOpen,
  FileText,
  BarChart2,
  Shield,
  Mic,
  Cpu,
  Mail,
  Calendar,
  Globe,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PLANS } from "@/config/pricing.config";

const PlanSummaryCard = ({
  subscription,
  isProcessing,
  onUpgrade,
  onCancel,
  onReactivate,
  usageData = {},
}) => {
  // Get the full plan configuration
  const plan = subscription ? PLANS[subscription.plan] : PLANS.free;

  // Enhanced status handling
  const getStatusBadge = (status) => {
    const statusMap = {
      active: {
        variant: "success",
        icon: <CheckCircle className="h-4 w-4" />,
        text: "Active",
      },
      past_due: {
        variant: "warning",
        icon: <AlertTriangle className="h-4 w-4" />,
        text: "Payment Due",
      },
      grace_period: {
        variant: "info",
        icon: <RotateCw className="h-4 w-4 animate-spin" />,
        text: "Grace Period",
      },
      canceled: {
        variant: "destructive",
        icon: <XCircle className="h-4 w-4" />,
        text: "Canceled",
      },
      unpaid: {
        variant: "warning",
        icon: <Wallet className="h-4 w-4" />,
        text: "Unpaid",
      },
      trialing: {
        variant: "info",
        icon: <Loader className="h-4 w-4 animate-spin" />,
        text: "Trial Active",
      },
      pending: {
        variant: "secondary",
        icon: <Loader className="h-4 w-4 animate-spin" />,
        text: "Pending",
      },
    };

    const statusConfig = statusMap[status] || {
      variant: "secondary",
      icon: null,
      text: status.replace(/_/g, " "),
    };

    return (
      <Badge variant={statusConfig.variant} className="gap-2 capitalize">
        {statusConfig.icon}
        {statusConfig.text}
      </Badge>
    );
  };

  // Enhanced usage display with icons and better formatting
  const renderUsageItem = (resource, used, limit, icon) => {
    const isUnlimited = limit === Infinity;
    const percentage = isUnlimited ? 100 : Math.min((used / limit) * 100, 100);

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            {icon}
            <span className="capitalize">
              {resource.replace(/([A-Z])/g, " $1")}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {used.toLocaleString()}
            {isUnlimited ? "" : ` / ${limit.toLocaleString()}`}
          </span>
        </div>
        <Progress
          value={percentage}
          indicatorClass={
            percentage > 90
              ? "bg-red-500"
              : percentage > 75
              ? "bg-orange-500"
              : "bg-primary"
          }
        />
      </div>
    );
  };

  // Get all usage items to display
  const getUsageItems = () => {
    if (!subscription) return [];

    const commonItems = [
      {
        resource: "chatbots",
        used: usageData.chatbotsCreated || 0,
        limit: plan.limits.chatbots,
        icon: <Bot className="h-4 w-4" />,
      },
      {
        resource: "messages",
        used: usageData.messagesUsed || 0,
        limit: plan.limits.messages,
        icon: <MessageSquare className="h-4 w-4" />,
      },
      {
        resource: "members",
        used: usageData.teamMembers || 0,
        limit: plan.limits.members,
        icon: <Users className="h-4 w-4" />,
      },
      {
        resource: "storage",
        used: usageData.storageUsed || 0,
        limit: plan.limits.storage,
        icon: <Database className="h-4 w-4" />,
      },
    ];

    // Add plan-specific usage items
    const additionalItems = [];

    if (plan.limits.integrations > 0) {
      additionalItems.push({
        resource: "integrations",
        used: usageData.integrations || 0,
        limit: plan.limits.integrations,
        icon: <Plug className="h-4 w-4" />,
      });
    }

    if (plan.limits.knowledgeBases > 0) {
      additionalItems.push({
        resource: "knowledgeBases",
        used: usageData.knowledgeBases || 0,
        limit: plan.limits.knowledgeBases,
        icon: <BookOpen className="h-4 w-4" />,
      });
    }

    if (plan.limits.trainingDocuments > 0) {
      additionalItems.push({
        resource: "trainingDocuments",
        used: usageData.trainingDocuments || 0,
        limit: plan.limits.trainingDocuments,
        icon: <FileText className="h-4 w-4" />,
      });
    }

    return [...commonItems, ...additionalItems];
  };

  // Get key features to highlight
  const getKeyFeatures = () => {
    if (!plan) return [];

    const features = [];

    // Channels
    if (plan.features.channels?.length) {
      features.push({
        name: "Channels",
        value: plan.features.channels.join(", "),
        icon: <Globe className="h-4 w-4" />,
      });
    }

    // Key limits
    if (plan.limits.automationRules > 0) {
      features.push({
        name: "Automation Rules",
        value:
          plan.limits.automationRules === Infinity
            ? "Unlimited"
            : plan.limits.automationRules,
        icon: <Cpu className="h-4 w-4" />,
      });
    }

    // Key features
    if (plan.features.aiFeatures) {
      features.push({
        name: "AI Features",
        value: "Enabled",
        icon: <Zap className="h-4 w-4" />,
      });
    }

    if (plan.features.prioritySupport) {
      features.push({
        name: "Support",
        value: "Priority",
        icon: <Shield className="h-4 w-4" />,
      });
    }

    if (plan.features.voiceInteraction) {
      features.push({
        name: "Voice",
        value: "Enabled",
        icon: <Mic className="h-4 w-4" />,
      });
    }

    return features.slice(0, 4); // Show top 4 features
  };

  // Trial days calculation
  const getTrialDaysRemaining = () => {
    if (!subscription?.trialEndDate || subscription.status !== "trialing")
      return 0;
    const diff = new Date(subscription.trialEndDate) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Renewal date display
  const getRenewalDate = () => {
    if (!subscription?.renewalDate) return null;
    return new Date(subscription.renewalDate).toLocaleDateString();
  };

  // Determine the main action for the card
  const getMainAction = () => {
    if (!subscription) return null;

    if (subscription.status === "canceled") {
      return {
        label: "Reactivate Plan",
        icon: <Zap className="h-4 w-4" />,
        onClick: onReactivate,
        variant: "secondary",
      };
    }

    if (subscription.plan === "free") {
      return {
        label: "Upgrade Plan",
        icon: <ArrowUp className="h-4 w-4" />,
        onClick: onUpgrade,
        variant: "info",
      };
    }

    return {
      label: "Change Plan",
      icon: <CreditCard className="h-4 w-4" />,
      onClick: onUpgrade,
      variant: "primary",
    };
  };

  const mainAction = getMainAction();

  return (
    <div className="rounded-lg overflow-hidden">
      {/* Plan header with status */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 border-b dark:border-gray-700 border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2 ">
            <h2 className="text-2xl font-bold">{plan?.name || "Loading..."}</h2>
            <p className="text-sm text-muted-foreground">
              {plan?.description || "Loading plan details..."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {subscription && getStatusBadge(subscription.status)}
            {subscription?.billingCycle !== "lifetime" && (
              <Badge variant="outline" className="gap-2">
                {subscription?.billingCycle === "yearly" ? (
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

      {/* Trial notice */}
      {subscription?.status === "trialing" && getTrialDaysRemaining() > 0 && (
        <div className="bg-blue-50 dark:bg-blue-800/10 px-6 py-3 border-b flex items-center gap-3">
          <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm text-blue-600 dark:text-blue-400">
            {getTrialDaysRemaining()} days remaining in your free trial
          </span>
        </div>
      )}

      {/* Renewal notice */}
      {subscription?.renewalDate && subscription.status === "active" && (
        <div className="bg-green-50 dark:bg-green-800/10 px-6 py-3 border-b flex items-center gap-3">
          <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
          <span className="text-sm text-green-600 dark:text-green-400">
            Renews on {getRenewalDate()}
          </span>
        </div>
      )}
      <div className="p-6 space-y-8">
        {/* Key features summary */}
        <div className="grid grid-cols-2 gap-4">
          {getKeyFeatures().map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <div>
                <p className="text-sm font-medium">{feature.name}</p>
                <p className="text-sm text-muted-foreground">{feature.value}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Usage statistics */}
        <div className="space-y-6">
          <h3 className="font-medium flex items-center gap-2">
            <BarChart2 className="h-5 w-5" />
            Usage Summary
          </h3>

          <div className="space-y-4">
            {subscription ? (
              getUsageItems().map((item, index) => (
                <div key={index}>
                  {renderUsageItem(
                    item.resource,
                    item.used,
                    item.limit,
                    item.icon
                  )}
                </div>
              ))
            ) : (
              <Skeleton className="h-4 w-full" />
            )}
          </div>
        </div>
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          {mainAction && (
            <Button
              onClick={mainAction.onClick}
              disabled={isProcessing}
              className="flex-1 gap-2 py-2"
              variant={mainAction.variant}
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
          )}

          {subscription && subscription.plan !== "free" && (
            <Button
              onClick={onCancel}
              disabled={isProcessing || subscription.status === "canceled"}
              variant="destructive"
              className="flex-1 gap-2 py-2"
            >
              {isProcessing ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <XCircle className="h-4 w-4" />
                  Cancel Plan
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanSummaryCard;
