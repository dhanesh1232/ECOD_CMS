"use client";

import { AlertTriangle, Zap, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date) ? "Invalid date" : format(date, "MMM do, yyyy");
};

const UsageStatsCard = ({ subscription }) => {
  const planConfig = {
    free: { limits: { chatbots: 1, messages: 500, monthlyMessages: 500 } },
    starter: { limits: { chatbots: 3, messages: 5000, monthlyMessages: 5000 } },
    pro: { limits: { chatbots: 10, messages: Infinity } },
    enterprise: { limits: { chatbots: Infinity, messages: Infinity } },
  };

  const getUsagePercentage = (used, limit) =>
    limit === Infinity ? 0 : Math.min((used / limit) * 100, 100);

  const getWarningLevel = (percentage) => {
    if (percentage >= 90) return "critical";
    if (percentage >= 75) return "warning";
    return "normal";
  };

  const renderProgressBar = (used, limit, label) => {
    const percentage = getUsagePercentage(used, limit);
    const warningLevel = getWarningLevel(percentage);

    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>{label}</span>
            {warningLevel !== "normal" && (
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            )}
          </div>
          <span className="text-sm font-medium">
            {used.toLocaleString()}
            {limit !== Infinity && ` / ${limit.toLocaleString()}`}
          </span>
        </div>

        <div className="relative h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className={cn(
              "absolute h-full rounded-full transition-all duration-500",
              warningLevel === "critical"
                ? "bg-red-500"
                : warningLevel === "warning"
                ? "bg-amber-500"
                : limit === Infinity
                ? "bg-gradient-to-r from-blue-500 to-purple-500"
                : "bg-blue-500"
            )}
            style={{ width: `${percentage}%` }}
          />
          {limit === Infinity && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x" />
          )}
        </div>
      </div>
    );
  };

  const renderRenewalInfo = () => {
    if (!subscription?.endDate || subscription.renewalInterval === "life_time")
      return null;

    const renewalDate = new Date(subscription.endDate);
    const daysRemaining = Math.ceil(
      (renewalDate - new Date()) / (1000 * 60 * 60 * 24)
    );
    const isExpiringSoon = daysRemaining <= 7;
    const isPastDue = ["past_due", "unpaid"].includes(subscription.status);

    return (
      <div
        className={cn(
          "p-4 rounded-lg border",
          isPastDue
            ? "bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800"
            : isExpiringSoon
            ? "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800"
            : "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
        )}
      >
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">
              {isPastDue
                ? "Payment Required"
                : subscription.status === "trialing"
                ? `Trial ends in ${daysRemaining} days`
                : `Renews in ${daysRemaining} days`}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formatDate(renewalDate)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 space-y-6">
      <div className="flex items-center gap-3">
        <Zap className="h-6 w-6 text-blue-500 dark:text-blue-400" />
        <h3 className="text-lg font-semibold">Usage Statistics</h3>
      </div>

      {subscription ? (
        <div className="space-y-6">
          {renderProgressBar(
            subscription.usage?.messagesUsed || 0,
            planConfig[subscription.plan].limits.messages,
            "Messages Used"
          )}

          {renderProgressBar(
            subscription.usage?.chatbotsCreated || 0,
            planConfig[subscription.plan].limits.chatbots,
            "Chatbots Created"
          )}

          {renderRenewalInfo()}
        </div>
      ) : (
        <div className="space-y-6">
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-16 w-full rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default UsageStatsCard;
