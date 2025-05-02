"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Loader,
  AlertCircle,
  RotateCw,
  Check,
  X,
  Star,
  InfinityIcon,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";
import { Skeleton } from "@/components/ui/skeleton";
import PlanSummaryCard from "@/components/settings/PlanSummaryCard";
import UsageStatsCard from "@/components/settings/UsageStatsCard";
import PaymentMethodForm from "@/components/settings/PaymentMethodForm";
import PaymentHistoryTable from "@/components/settings/PaymentHistoryTable";
import CancellationModal from "@/components/settings/CancellationModal";
import { PLANS, CURRENCY, TAX_RATE } from "@/config/pricing.config";

const BillingPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subscription, setSubscription] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const showToast = useToast();

  const fetchSubscription = useCallback(async () => {
    try {
      const res = await fetch("/api/profile/subscription");
      if (!res.ok) {
        if (res.status === 401) router.push("/auth/login");
        throw new Error(`Failed to fetch: ${res.statusText}`);
      }
      const data = await res.json();
      setSubscription(data.user?.subscription || null);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const calculateTotal = (price) => {
    return price + Math.round(price * TAX_RATE);
  };

  const handlePlanSelection = async (planId) => {
    if (!PLANS[planId].prices) return;

    setIsProcessing(true);
    setSelectedPlan(planId);

    try {
      const plan = PLANS[planId];
      const priceInfo = plan.prices.get("monthly");
      const totalAmount = calculateTotal(priceInfo.raw);

      const orderRes = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          amount: totalAmount,
          currency: CURRENCY,
        }),
      });

      const orderData = await orderRes.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Your SaaS Platform",
        description: `${plan.name} Subscription`,
        order_id: orderData.id,
        prefill: {
          email: orderData.email,
          contact: orderData.phone,
        },
        handler: async (response) => {
          await fetch("/api/verify-payment", {
            method: "POST",
            body: JSON.stringify({
              ...response,
              planId,
            }),
          });
          fetchSubscription();
          showToast({
            title: "Payment Successful",
            description: `You've upgraded to ${plan.name} plan!`,
          });
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      showToast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setSelectedPlan(null);
    }
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

  const FeatureIcon = ({ included }) => (
    <div className="p-1.5 rounded-full bg-accent">
      {included ? (
        <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
      ) : (
        <X className="h-5 w-5 text-rose-600 dark:text-rose-400" />
      )}
    </div>
  );

  const renderPlanCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {Object.entries(PLANS).map(([planId, plan]) => {
        const priceInfo = plan.prices?.get("monthly");
        const yearlyPriceInfo = plan.prices?.get("yearly");
        return (
          <div
            key={planId}
            className={`relative p-8 rounded-2xl border-2 ${
              subscription?.plan === planId
                ? "border-primary shadow-lg"
                : "border-muted hover:border-primary/50 transition-all"
            } ${planId === "pro" ? "ring-2 ring-primary/10" : ""}`}
          >
            {planId === "pro" && (
              <div className="absolute right-0 top-4 transform rotate-3 origin-right">
                <div className="bg-primary/95 backdrop-blur-sm text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold tracking-tight flex items-center gap-2 shadow-lg border border-primary/30 hover:scale-105 transition-all duration-300 group">
                  <Star className="h-4 w-4 animate-pulse" />
                  <span>Most Popular</span>
                </div>
              </div>
            )}
            {subscription?.plan === planId && (
              <div className="bg-green-100 absolute top-4 right-4 text-green-600 px-3 py-1 rounded-full text-sm">
                Current Plan
              </div>
            )}

            <div className="flex flex-col h-full gap-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  {plan.name}
                  {planId === "enterprise" && (
                    <span className="text-xs bg-purple-100 dark:bg-gray-800 text-gray-950 dark:text-gray-100 px-2 py-1 rounded-full">
                      Custom Solutions
                    </span>
                  )}
                </h3>

                {priceInfo ? (
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">
                        {priceInfo.localized}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    {TAX_RATE > 0 && (
                      <div className="text-sm text-muted-foreground">
                        <span>
                          + {TAX_RATE * 100}%{" "}
                          {CURRENCY === "INR" ? "GST" : "tax"}{" "}
                        </span>
                        <span className="block">
                          Total:{" "}
                          {getPlanPrice(
                            planId,
                            "monthly",
                            calculateTotal(priceInfo.raw)
                          )}
                        </span>
                      </div>
                    )}
                    {yearlyPriceInfo && (
                      <div className="bg-primary/10 p-3 rounded-lg mt-3">
                        <p className="text-sm text-primary">
                          <span className="font-semibold">
                            Save{" "}
                            {Math.round(
                              100 -
                                (yearlyPriceInfo.raw / (priceInfo.raw * 12)) *
                                  100
                            )}
                            %
                          </span>
                          <span className="block">
                            {yearlyPriceInfo.localized}/year
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  plan.name !== "Free" && (
                    <div className="text-2xl font-bold text-muted-foreground">
                      Contact for Pricing
                    </div>
                  )
                )}
              </div>

              <div className="flex-1 space-y-4">
                {Object.entries(plan.features).map(([key, value]) => {
                  const formattedKey = key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/\b\w/g, (c) => c.toUpperCase())
                    .trim();

                  return (
                    <div key={key} className="flex items-start gap-3">
                      <FeatureIcon included={!!value} />
                      <div className="flex-1">
                        <p className="font-medium">{formattedKey}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatFeatureValue(value)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4">
                {planId === "enterprise" ? (
                  <Button
                    className="w-full"
                    size="lg"
                    variant="outline"
                    asChild
                  >
                    <Link href="/contact-sales">Contact Sales</Link>
                  </Button>
                ) : (
                  <Button
                    className="w-full h-12"
                    size="lg"
                    onClick={() => handlePlanSelection(planId)}
                    disabled={isProcessing || subscription?.plan === planId}
                  >
                    {isProcessing && selectedPlan === planId ? (
                      <Loader className="h-4 w-4 animate-spin mr-2" />
                    ) : subscription?.plan === planId ? (
                      "Current Plan"
                    ) : planId === "free" ? (
                      "Downgrade"
                    ) : (
                      `Upgrade to ${plan.name}`
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderComparisonTable = () => (
    <div className="mt-12 border rounded-xl overflow-hidden shadow-sm">
      <div className="p-6 bg-muted/50 border-b">
        <h3 className="text-2xl font-bold">Plan Comparison</h3>
        <p className="text-muted-foreground mt-2">
          Detailed feature breakdown across all available plans ({CURRENCY})
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="text-left p-6 min-w-[240px]">Features</th>
              {Object.entries(PLANS).map(([planId, plan]) => (
                <th
                  key={planId}
                  className={`p-6 text-center ${
                    subscription?.plan === planId ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-lg">{plan.name}</span>
                    {subscription?.plan === planId && (
                      <span className="text-xs text-primary mt-1">
                        Current Plan
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(PLANS.pro.features).map((featureKey) => (
              <tr key={featureKey} className="border-b">
                <td className="p-6 font-medium">
                  {featureKey
                    .replace(/([A-Z])/g, " $1")
                    .replace(/\b\w/g, (c) => c.toUpperCase())
                    .trim()}
                </td>
                {Object.entries(PLANS).map(([planId, plan]) => {
                  const value = plan.features[featureKey];
                  return (
                    <td key={planId} className="p-6 text-center">
                      {typeof value === "boolean" ? (
                        <FeatureIcon included={value} />
                      ) : value === Infinity ? (
                        <div className="flex items-center justify-center gap-2">
                          <InfinityIcon className="h-5 w-5 text-primary" />
                          <span className="sr-only">Unlimited</span>
                        </div>
                      ) : Array.isArray(value) ? (
                        <span className="font-medium">
                          {value
                            .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
                            .join(", ")}
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
    </div>
  );

  if (loading) {
    return (
      <div className="flex-1 p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64 rounded-lg" />
          <Skeleton className="h-6 w-48 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-4 text-center">
        <div className="p-4 bg-rose-100 dark:bg-rose-900/30 rounded-full">
          <AlertCircle className="h-12 w-12 text-rose-600 dark:text-rose-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Failed to Load Subscription
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">{error}</p>
        <div className="flex gap-4 mt-4">
          <Button
            onClick={fetchSubscription}
            variant="outline"
            className="gap-2"
          >
            <RotateCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button asChild>
            <Link href="/support">Contact Support</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-6 bg-background rounded-2xl shadow-xl space-y-8">
      {showPlans ? (
        <>
          <div className="flex justify-between items-center relative">
            <div>
              <h1 className="md:text-3xl text-lg sm:text-xl font-bold">
                Pricing Plans
              </h1>
              <p className="text-base mt-2">
                Choose the perfect plan for your needs
              </p>
            </div>
            <Button
              variant="outline"
              className="absolute -top-2 right-0"
              onClick={() => setShowPlans(false)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          {renderPlanCards()}
          {renderComparisonTable()}
        </>
      ) : (
        <>
          <PlanSummaryCard
            subscription={subscription}
            isProcessing={isProcessing}
            onUpgrade={() => setShowPlans(true)}
            onCancel={() => setShowCancelModal(true)}
          />

          <UsageStatsCard subscription={subscription} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PaymentMethodForm
              subscription={subscription}
              onUpdatePaymentMethod={async () => {
                const res = await fetch("/api/billing/portal");
                const { url } = await res.json();
                window.location.href = url;
              }}
            />

            <div className="space-y-6">
              <div className="p-6 bg-muted/50 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">
                  Plan Recommendations
                </h3>
                <Button
                  className="w-full"
                  onClick={() => setShowPlans(true)}
                  variant="secondary"
                >
                  Explore Premium Plans
                </Button>
              </div>
              <PaymentHistoryTable
                paymentHistory={subscription?.paymentHistory}
              />
            </div>
          </div>

          <CancellationModal
            open={showCancelModal}
            onOpenChange={setShowCancelModal}
            subscription={subscription}
            onCancel={async () => {
              try {
                const res = await fetch("/api/subscription/cancel", {
                  method: "POST",
                });
                if (!res.ok) throw new Error("Cancellation failed");
                fetchSubscription();
                showToast({ title: "Cancellation Successful" });
              } catch (error) {
                showToast({
                  title: "Cancellation Failed",
                  description: error.message,
                  variant: "destructive",
                });
              }
            }}
            onDowngrade={async () => {
              try {
                const res = await fetch("/api/downgrade", { method: "POST" });
                if (!res.ok) throw new Error("Downgrade failed");
                fetchSubscription();
                showToast({ title: "Downgraded to Free Plan" });
              } catch (error) {
                showToast({
                  title: "Downgrade Failed",
                  description: error.message,
                  variant: "destructive",
                });
              }
            }}
          />
        </>
      )}
    </div>
  );
};

export default BillingPage;
