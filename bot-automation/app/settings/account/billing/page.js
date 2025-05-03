"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import { PLANS, TAX_RATES } from "@/config/pricing.config";
import { encryptData } from "@/utils/encryption";
import { useSession } from "next-auth/react";
import { billingService } from "@/lib/client/billing";
import Script from "next/script";

const EXCHANGE_RATE = 83.33; // Update with current rate

const BillingPage = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subscription, setSubscription] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [userCred, setUserCred] = useState({});
  const [currency, setCurrency] = useState("INR");
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const showToast = useToast();
  const getLocalizedPrice = (amount) => {
    const convertedAmount =
      currency === "INR" ? amount : amount / EXCHANGE_RATE;
    return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(convertedAmount);
  };

  const getPlanPrice = (planId) => {
    const plan = PLANS[planId];
    if (!plan.prices) return null;
    const rawPrice = plan.prices[billingPeriod];
    return {
      raw: rawPrice,
      localized: getLocalizedPrice(rawPrice),
      currency,
      period: billingPeriod,
    };
  };

  const calculateTotal = (price) => {
    const taxRate = TAX_RATES[currency];
    return price + Math.round(price * taxRate);
  };

  const fetchSubscription = useCallback(async () => {
    try {
      const data = await billingService.getSubscription();
      setUserCred({
        phone: data?.user?.phone,
        email: data?.user?.email,
      });
      setSubscription(data?.user?.subscription);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscription();
    const pop = searchParams.get("plans_comp");
    setShowPlans(!!pop);
  }, [fetchSubscription, searchParams]);

  const closePlans = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("plans_comp");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handlePlansTab = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    const en = encryptData(session?.user?.email);
    newParams.set("plans_comp", `user_${en}`);
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const handlePlanSelection = async (planId) => {
    if (!PLANS[planId].prices) return;

    setIsProcessing(true);
    setSelectedPlan(planId);

    try {
      const priceInfo = getPlanPrice(planId);
      const totalAmount = calculateTotal(priceInfo.raw);

      // Convert amount to base currency unit
      const amountInSubunits =
        currency === "INR" ? totalAmount * 100 : totalAmount * 100;

      const orderData = await billingService.createPaymentOrder({
        planId,
        amount: amountInSubunits,
        currency: currency,
        period: billingPeriod,
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "ECODrIx",
        description: `${PLANS[planId].name} ${billingPeriod} Subscription`,
        order_id: orderData.id,
        prefill: {
          email: userCred?.email,
          contact: userCred?.phone,
        },
        handler: async (response) => {
          try {
            await billingService.verifyPayment({
              ...response,
              planId,
              currency,
              period: billingPeriod,
            });

            const updatedSub = await billingService.getSubscription();
            setSubscription(updatedSub);

            showToast({
              title: "Payment Successful",
              description: `You've upgraded to ${PLANS[planId].name} plan!`,
            });
            razorpay.close();
          } catch (error) {
            showToast({
              title: "Payment Verification Failed",
              description: error.message,
              variant: "destructive",
            });
          }
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

  const CurrencyPeriodToggles = () => (
    <div className="flex flex-col sm:flex-row gap-8 justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">INR</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={currency === "USD"}
              onChange={(e) => setCurrency(e.target.checked ? "USD" : "INR")}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
          <span className="text-sm font-medium">USD</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Monthly</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={billingPeriod === "yearly"}
              onChange={(e) =>
                setBillingPeriod(e.target.checked ? "yearly" : "monthly")
              }
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
          <span className="text-sm font-medium">Yearly</span>
        </div>
      </div>
    </div>
  );

  const renderPlanCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {Object.entries(PLANS).map(([planId, plan]) => {
        const priceInfo = getPlanPrice(planId);
        const yearlyPriceInfo =
          billingPeriod === "monthly" ? PLANS[planId].prices?.yearly : null;

        return (
          <div
            key={planId}
            className={`relative p-8 rounded-2xl border-2 ${
              subscription?.plan === planId
                ? "border-primary shadow-md bg-gradient-to-r from-blue-300 via-purple-300 to-pink-200"
                : "border-muted shadow-sm hover:border-primary/50 transition-all"
            } ${planId === "pro" ? "ring-2 ring-primary/10" : ""}`}
          >
            {planId === "pro" && (
              <div className="absolute right-0 top-0 transform rotate-3 origin-right">
                <div className="bg-primary/95 backdrop-blur-sm text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold tracking-tight flex items-center gap-2 shadow-lg border border-primary/30 hover:scale-105 transition-all duration-300 group">
                  <Star className="h-4 w-4 animate-pulse text-yellow-400" />
                  <span>Most Popular</span>
                </div>
              </div>
            )}
            {subscription?.plan === planId && (
              <div className="bg-green-100 absolute top-4 right-4 text-green-600 px-3 py-1 rounded-full text-sm">
                Current Plan
              </div>
            )}
            {planId === "enterprise" && (
              <span className="text-xs absolute -left-2 -top-1 -rotate-1 bg-purple-700 dark:bg-blue-800 text-gray-50 dark:text-gray-100 px-2 py-1 rounded-full">
                Custom Solutions
              </span>
            )}

            <div className="flex flex-col h-full gap-6">
              <div className="space-y-4">
                <h3 className="text-2xl flex flex-col font-bold gap-2">
                  {plan.name}
                </h3>

                {priceInfo ? (
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">
                        {priceInfo.localized}
                      </span>
                      <span className="text-muted-foreground">
                        /{billingPeriod}
                      </span>
                    </div>
                    {TAX_RATES[currency] > 0 && (
                      <div className="text-sm text-muted-foreground">
                        <span>
                          + {TAX_RATES[currency] * 100}%{" "}
                          {currency === "INR" && "GST"}{" "}
                        </span>
                        <span className="block">
                          Total:{" "}
                          {getLocalizedPrice(calculateTotal(priceInfo.raw))}
                        </span>
                      </div>
                    )}
                    {yearlyPriceInfo && billingPeriod === "monthly" && (
                      <div className="bg-primary/10 p-3 rounded-lg mt-3">
                        <p className="text-sm text-primary">
                          <span className="font-semibold">
                            Save{" "}
                            {Math.round(
                              100 -
                                (yearlyPriceInfo / (priceInfo.raw * 12)) * 100
                            )}
                            %
                          </span>
                          <span className="block">
                            {getLocalizedPrice(yearlyPriceInfo)}/year
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  plan.name !== "Free" && (
                    <div className="text-xl font-bold text-muted-foreground">
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
                    className={`w-full h-12 ${
                      subscription?.plan === planId &&
                      "bg-purple-400 hover:border hover:bg-gray-200 hover:text-gray-950"
                    }`}
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
          Feature breakdown across all plans ({currency})
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="text-left p-4 pl-6 min-w-[240px] sticky left-0 bg-background z-20">
                Features
              </th>
              {Object.entries(PLANS).map(([planId, plan]) => (
                <th
                  key={planId}
                  className={`p-4 text-center ${
                    subscription?.plan === planId
                      ? "bg-primary/10"
                      : "bg-background"
                  } sticky top-0 z-10`}
                >
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-lg">{plan.name}</span>
                    {plan.prices && (
                      <span className="text-sm text-muted-foreground mt-1">
                        {getPlanPrice(planId).localized}/{billingPeriod}
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
                <td className="p-4 pl-6 font-medium sticky left-0 bg-background z-10">
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
                        <div className="flex flex-col gap-1">
                          {value.map((v, index) => (
                            <span key={index} className="font-medium text-sm">
                              {v.charAt(0).toUpperCase() + v.slice(1)}
                            </span>
                          ))}
                        </div>
                      ) : typeof value === "string" && value.includes("GB") ? (
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
        <div className="flex-col flex sm:flex-row gap-4 mt-4">
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
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="flex-1 p-2 py-4 sm:p-6 bg-background rounded-2xl space-y-8">
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
                onClick={closePlans}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Billing
              </Button>
            </div>
            <CurrencyPeriodToggles />
            {renderPlanCards()}
            {renderComparisonTable()}
          </>
        ) : (
          <>
            <PlanSummaryCard
              subscription={subscription}
              isProcessing={isProcessing}
              onUpgrade={handlePlansTab}
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
                    onClick={handlePlansTab}
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
    </>
  );
};

export default BillingPage;
