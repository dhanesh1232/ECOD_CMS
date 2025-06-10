"use client";

import { useToast } from "@/components/ui/toast-provider";
import { AdminServices } from "@/lib/client/admin.service";
import { useCallback, useEffect, useRef, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Info, ArrowRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const statusColors = {
  active: "bg-green-500",
  trialing: "bg-blue-500",
  past_due: "bg-yellow-500",
  pending: "bg-gray-500",
  paused: "bg-orange-500",
  canceled: "bg-red-500",
  unpaid: "bg-red-500",
};

export default function SubscriptionsPage() {
  const [pageState, setPageState] = useState({
    loading: true,
    error: false,
  });
  const [subscriptions, setSubscriptions] = useState([]);
  const showToast = useToast();
  const toastRef = useRef(false);
  const router = useRouter();

  const fetchSubscriptions = useCallback(async () => {
    try {
      setPageState((prev) => ({
        ...prev,
        loading: true,
        error: false,
      }));

      const response = await AdminServices.getSubscriptionData();

      if (response.status && !response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to fetch subscriptions");
      }

      setSubscriptions(response.subscriptions || []);
      setPageState((prev) => ({
        ...prev,
        loading: false,
      }));
    } catch (err) {
      if (!toastRef.current) {
        showToast({
          title: "Error",
          description: err.message || "Failed to fetch subscriptions",
          type: "destructive",
        });
        toastRef.current = true;
      }
      setPageState((prev) => ({
        ...prev,
        loading: false,
        error: true,
      }));
    }
  }, [showToast]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const formatPrice = (price) => {
    return price === 0
      ? "Free"
      : new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(price);
  };

  const getPlanName = (planId) => {
    switch (planId) {
      case "free":
        return "Free Plan";
      case "starter":
        return "Starter";
      case "growth":
        return "Growth";
      case "pro":
        return "Professional";
      case "enterprise":
        return "Enterprise";
      default:
        return planId;
    }
  };

  const handleRetry = () => {
    toastRef.current = false;
    fetchSubscriptions();
  };

  if (pageState.loading) {
    return <SkeletonLoader />;
  }

  if (pageState.error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold">
            Failed to load subscriptions
          </h2>
          <p className="text-muted-foreground">
            Please check your connection and try again
          </p>
        </div>
        <Button onClick={handleRetry}>Retry</Button>
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold">No subscriptions found</h2>
          <p className="text-muted-foreground">
            There are currently no active subscriptions
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Subscriptions
        </h1>
        <p className="text-muted-foreground">
          Manage and view all active subscriptions
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {subscriptions.map((subscription) => (
          <Card
            key={subscription._id}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{getPlanName(subscription.plan)}</CardTitle>
                  <CardDescription>
                    {subscription.workspace.name || "Workspace"}
                  </CardDescription>
                </div>
                <Badge
                  className={`${
                    statusColors[subscription.status] || "bg-gray-500"
                  } text-white`}
                >
                  {subscription.status.replace("_", " ")}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">
                  Billing Information
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Cycle:</div>
                  <div className="font-medium capitalize">
                    {subscription.billingCycle}
                  </div>

                  <div className="text-muted-foreground">Price:</div>
                  <div className="font-medium">
                    {formatPrice(
                      subscription.plan === "free"
                        ? 0
                        : subscription.billingCycle === "monthly"
                        ? subscription.plan.prices.monthly
                        : subscription.plan.prices.yearly
                    )}
                  </div>

                  <div className="text-muted-foreground">Period:</div>
                  <div className="font-medium">
                    {format(
                      new Date(subscription.currentPeriodStart),
                      "MMM d, yyyy"
                    )}{" "}
                    -{" "}
                    {subscription.currentPeriodEnd
                      ? format(
                          new Date(subscription.currentPeriodEnd),
                          "MMM d, yyyy"
                        )
                      : "Forever"}
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-2">Usage</h4>
                <div className="space-y-3">
                  {Object.entries(subscription?.usagePercentage || {}).map(
                    ([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize">{key}</span>
                          <span>{value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${
                              value > 90 ? "bg-red-500" : "bg-blue-500"
                            } h-2 rounded-full`}
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-2">Key Features</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(subscription?.features)
                    .filter(([_, value]) => value === true)
                    .slice(0, 5)
                    .map(([feature]) => (
                      <Badge
                        key={feature}
                        variant="outline"
                        className="text-xs capitalize"
                      >
                        {feature.replace(/([A-Z])/g, " $1").trim()}
                      </Badge>
                    ))}
                  {Object.keys(
                    Object.entries(subscription?.features).filter(
                      ([_, value]) => value === true
                    )
                  ).length > 5 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="outline" className="text-xs">
                          +
                          {Object.keys(
                            Object.entries(subscription.features).filter(
                              ([_, value]) => value === true
                            )
                          ).length - 5}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="grid grid-cols-2 gap-2 p-2">
                          {Object.entries(subscription.features)
                            .filter(([_, value]) => value === true)
                            .slice(5)
                            .map(([feature]) => (
                              <span
                                key={feature}
                                className="text-xs capitalize"
                              >
                                {feature.replace(/([A-Z])/g, " $1").trim()}
                              </span>
                            ))}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Info className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="p-2 space-y-2">
                    <div>
                      <span className="text-xs text-muted-foreground">
                        Created:
                      </span>{" "}
                      <span className="text-xs">
                        {format(
                          new Date(subscription.metadata.createdAt),
                          "MMM d, yyyy"
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">
                        Payment:
                      </span>{" "}
                      <span className="text-xs capitalize">
                        {subscription.paymentGateway || "None"}
                      </span>
                    </div>
                    {subscription.gatewaySubscriptionId && (
                      <div>
                        <span className="text-xs text-muted-foreground">
                          Gateway ID:
                        </span>{" "}
                        <span className="text-xs font-mono">
                          {subscription.gatewaySubscriptionId.substring(0, 8)}
                          ...
                        </span>
                      </div>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  router.push(`/admin/subscriptions/${subscription._id}`)
                }
              >
                Manage <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

const SkeletonLoader = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="space-y-1">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  ))}
                </div>
              </div>
              <Skeleton className="h-px w-full" />
              <div className="space-y-3">
                {[1, 2, 3].map((j) => (
                  <div key={j}>
                    <div className="flex justify-between mb-1">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-px w-full" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((j) => (
                  <Skeleton key={j} className="h-6 w-16 rounded-full" />
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
