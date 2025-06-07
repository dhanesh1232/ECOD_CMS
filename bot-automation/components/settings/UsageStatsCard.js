"use client";

import {
  AlertTriangle,
  Zap,
  Calendar,
  Bot,
  MessageSquare,
  Database,
  Plug,
  Users,
  FileText,
  BookOpen,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PLANS } from "@/config/pricing.config";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date) ? "Invalid date" : format(date, "MMM do, yyyy");
};

const UsageStatsCard = ({ subscription, isLoading }) => {
  const getPlanLimits = (planId) => {
    return (
      PLANS[planId]?.limits || {
        chatbots: 1,
        messages: 500,
        members: 1,
        storage: 1,
        integrations: 1,
        knowledgeBases: 1,
        trainingDocuments: 3,
      }
    );
  };

  const getUsagePercentage = (used, limit) =>
    limit === Infinity ? 0 : Math.min((used / limit) * 100, 100);

  const getWarningLevel = (percentage) => {
    if (percentage >= 90) return "critical";
    if (percentage >= 75) return "warning";
    return "normal";
  };

  const renderUsageItem = (used, limit, label, icon, unit = "") => {
    const percentage = getUsagePercentage(used, limit);
    const warningLevel = getWarningLevel(percentage);
    const isUnlimited = limit === Infinity;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            {icon}
            <span>{label}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {used.toLocaleString()}
            {isUnlimited ? "" : ` / ${limit.toLocaleString()}`}
            {unit}
          </span>
        </div>

        <Progress
          value={percentage}
          className="h-2"
          indicatorClass={
            warningLevel === "critical"
              ? "bg-red-500"
              : warningLevel === "warning"
              ? "bg-amber-500"
              : isUnlimited
              ? "bg-gradient-to-r from-blue-500 to-purple-500"
              : "bg-primary"
          }
        />

        {warningLevel !== "normal" && (
          <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
            <AlertTriangle className="h-3 w-3" />
            <span>
              {warningLevel === "critical" ? "Approaching limit" : "High usage"}
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderRenewalInfo = () => {
    if (
      !subscription?.endDate ||
      subscription.renewalInterval === "life_time"
    ) {
      return null;
    }

    const renewalDate = new Date(subscription.endDate);
    const daysRemaining = Math.ceil(
      (renewalDate - new Date()) / (1000 * 60 * 60 * 24)
    );
    const isExpiringSoon = daysRemaining <= 7;
    const isPastDue = ["past_due", "unpaid"].includes(subscription.status);
    const isTrialing = subscription.status === "trialing";

    return (
      <div
        className={cn(
          "p-4 rounded-lg border flex items-start gap-3",
          isPastDue
            ? "bg-destructive/10 border-destructive/20"
            : isExpiringSoon
            ? "bg-warning/10 border-warning/20"
            : "bg-primary/10 border-primary/20"
        )}
      >
        <Calendar className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium">
            {isPastDue
              ? "Payment Required"
              : isTrialing
              ? `Trial ending soon`
              : `Renewal date approaching`}
          </p>
          <p className="text-sm text-muted-foreground">
            {isPastDue
              ? "Your subscription requires immediate attention"
              : isTrialing
              ? `Your trial ends ${formatDate(
                  renewalDate
                )} (in ${daysRemaining} days)`
              : `Next billing date: ${formatDate(renewalDate)}`}
          </p>
        </div>
      </div>
    );
  };

  const getUsageItems = () => {
    if (!subscription) return [];

    const limits = getPlanLimits(subscription.plan);
    const usage = subscription.usage || {};

    return [
      {
        label: "Messages",
        used: usage.messagesUsed || 0,
        limit: limits.messages,
        icon: <MessageSquare className="h-4 w-4" />,
        unit: "",
      },
      {
        label: "Chatbots",
        used: usage.chatbotsCreated || 0,
        limit: limits.chatbots,
        icon: <Bot className="h-4 w-4" />,
        unit: "",
      },
      {
        label: "Team Members",
        used: usage.teamMembers || 0,
        limit: limits.members,
        icon: <Users className="h-4 w-4" />,
        unit: "",
      },
      {
        label: "Storage",
        used: usage.storageUsed || 0,
        limit: limits.storage,
        icon: <Database className="h-4 w-4" />,
        unit: " GB",
      },
      ...(limits.integrations > 0
        ? [
            {
              label: "Integrations",
              used: usage.integrations || 0,
              limit: limits.integrations,
              icon: <Plug className="h-4 w-4" />,
              unit: "",
            },
          ]
        : []),
      ...(limits.knowledgeBases > 0
        ? [
            {
              label: "Knowledge Bases",
              used: usage.knowledgeBases || 0,
              limit: limits.knowledgeBases,
              icon: <BookOpen className="h-4 w-4" />,
              unit: "",
            },
          ]
        : []),
      ...(limits.trainingDocuments > 0
        ? [
            {
              label: "Training Documents",
              used: usage.trainingDocuments || 0,
              limit: limits.trainingDocuments,
              icon: <FileText className="h-4 w-4" />,
              unit: "",
            },
          ]
        : []),
    ];
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 border-b">
        <div className="flex items-center gap-3">
          <Zap className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">Usage Statistics</h3>
          {subscription?.status && (
            <Badge variant="outline" className="ml-auto">
              {subscription.plan === "free"
                ? "Free Plan"
                : subscription.plan === "starter"
                ? "Starter Plan"
                : subscription.plan === "pro"
                ? "Pro Plan"
                : "Enterprise Plan"}
            </Badge>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {isLoading || !subscription ? (
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {getUsageItems().map((item, index) => (
                <div key={index}>
                  {renderUsageItem(
                    item.used,
                    item.limit,
                    item.label,
                    item.icon,
                    item.unit
                  )}
                </div>
              ))}
            </div>

            {renderRenewalInfo()}

            <div className="pt-2 text-xs text-muted-foreground">
              <p>Usage statistics are updated every 24 hours.</p>
              <p>
                Last updated:{" "}
                {formatDate(subscription.usageUpdatedAt || new Date())}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UsageStatsCard;
