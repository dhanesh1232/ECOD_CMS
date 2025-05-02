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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const PlanSummaryCard = ({
  subscription,
  isProcessing,
  onUpgrade,
  onCancel,
  onReactivate,
}) => {
  const planConfig = {
    free: {
      name: "Free Plan",
      features: ["Web Channel", "1 Chatbot", "500 messages/month"],
      limits: { chatbots: 1, messages: 500 },
      color: "bg-gray-100 dark:bg-gray-800",
    },
    starter: {
      name: "Starter Plan",
      features: [
        "Web + WhatsApp",
        "3 Chatbots",
        "5000 messages/month",
        "Basic Analytics",
      ],
      limits: { chatbots: 3, messages: 5000 },
      color: "bg-blue-100 dark:bg-blue-900/20",
    },
    pro: {
      name: "Professional Plan",
      features: [
        "All Channels",
        "10 Chatbots",
        "Unlimited messages",
        "Advanced Analytics",
        "File Attachments",
      ],
      limits: { chatbots: 10, messages: Infinity },
      color: "bg-purple-100 dark:bg-purple-900/20",
    },
    enterprise: {
      name: "Enterprise Plan",
      features: [
        "Custom Channels",
        "Unlimited Chatbots",
        "Priority Support",
        "Dedicated Account Manager",
        "White Labeling",
      ],
      limits: { chatbots: Infinity, messages: Infinity },
      color: "bg-rose-100 dark:bg-rose-900/20",
    },
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      active: {
        class: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
        icon: <CheckCircle className="h-4 w-4" />,
      },
      past_due: {
        class: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
        icon: <AlertTriangle className="h-4 w-4" />,
      },
      grace_period: {
        class: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
        icon: <RotateCw className="h-4 w-4 animate-spin" />,
      },
      canceled: {
        class: "bg-rose-500/20 text-rose-600 dark:text-rose-400",
        icon: <XCircle className="h-4 w-4" />,
      },
      unpaid: {
        class: "bg-orange-500/20 text-orange-600 dark:text-orange-400",
        icon: <Wallet className="h-4 w-4" />,
      },
      trialing: {
        class: "bg-purple-500/20 text-purple-600 dark:text-purple-400",
        icon: <Loader className="h-4 w-4 animate-spin" />,
      },
    };

    return (
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${statusMap[status]?.class}`}
      >
        {statusMap[status]?.icon}
        <span className="capitalize">{status.replace(/_/g, " ")}</span>
      </div>
    );
  };

  const renderUsageProgress = (used = 0, limit) => {
    if (limit === Infinity) {
      return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x" />
        </div>
      );
    }

    const percentage = Math.min((used / limit) * 100, 100);
    return (
      <div className="space-y-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="h-2.5 rounded-full bg-blue-600 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>{used.toLocaleString()} used</span>
          <span>{limit === Infinity ? "∞" : limit.toLocaleString()} limit</span>
        </div>
      </div>
    );
  };

  const getTrialDaysRemaining = () => {
    if (!subscription?.trialEndDate || subscription.status !== "trialing")
      return 0;
    const diff = new Date(subscription.trialEndDate) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div
      className={`p-6 rounded-xl border ${
        planConfig[subscription?.plan]?.color || "bg-gray-50 dark:bg-gray-800"
      } border-gray-100 dark:border-gray-700`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {subscription ? planConfig[subscription.plan].name : "Loading..."}
          </h2>
          {subscription && getStatusBadge(subscription.status)}
        </div>

        {subscription?.renewalInterval !== "life_time" && (
          <div className="flex items-center gap-2 bg-white dark:bg-gray-700 px-3 py-1.5 rounded-full">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Billed{" "}
              {subscription?.renewalInterval === "year" ? "Yearly" : "Monthly"}
            </span>
          </div>
        )}
      </div>

      {subscription?.status === "trialing" && getTrialDaysRemaining() > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {getTrialDaysRemaining()} days remaining in trial
            </span>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            <span>Plan Features</span>
          </h3>
          <ul className="space-y-2">
            {subscription ? (
              planConfig[subscription.plan].features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {feature}
                  </span>
                </li>
              ))
            ) : (
              <Skeleton className="h-4 w-full" />
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <span>Chatbots</span>
          </h3>
          {subscription ? (
            renderUsageProgress(
              subscription.usage?.chatbotsCreated || 0,
              planConfig[subscription.plan].limits.chatbots
            )
          ) : (
            <Skeleton className="h-2.5 w-full rounded-full" />
          )}
        </div>

        <div>
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <span>Messages</span>
          </h3>
          {subscription ? (
            renderUsageProgress(
              subscription.usage?.messagesUsed || 0,
              planConfig[subscription.plan].limits.messages
            )
          ) : (
            <Skeleton className="h-2.5 w-full rounded-full" />
          )}
        </div>

        <div className="pt-4">
          {subscription ? (
            <Button
              onClick={
                subscription.status === "canceled"
                  ? onReactivate
                  : subscription.plan === "free"
                  ? onUpgrade
                  : onCancel
              }
              disabled={isProcessing}
              className="w-full gap-2"
              variant={
                subscription.status === "canceled"
                  ? "default"
                  : subscription.plan === "free"
                  ? "default"
                  : "destructive"
              }
            >
              {isProcessing ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : subscription.status === "canceled" ? (
                <>
                  <Zap className="h-4 w-4" />
                  Reactivate Plan
                </>
              ) : subscription.plan === "free" ? (
                <>
                  <ArrowUp className="h-4 w-4" />
                  Upgrade Plan
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4" />
                  Cancel Plan
                </>
              )}
            </Button>
          ) : (
            <Skeleton className="h-10 w-full rounded-lg" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanSummaryCard;
