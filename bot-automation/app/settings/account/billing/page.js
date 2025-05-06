"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  RotateCw,
  InfinityIcon,
  ChevronRight,
  StarsIcon,
  CheckCircle2,
  CheckCircle,
  Rocket,
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
import Separator from "@/components/ui/separator";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaTelegram,
  FaGlobe,
} from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const iconMap = {
  whatsapp: <FaWhatsapp className="text-green-500" />,
  instagram: <FaInstagram className="text-pink-500" />,
  facebook: <FaFacebook className="text-blue-600" />,
  telegram: <FaTelegram className="text-blue-400" />,
  web: <FaGlobe className="text-gray-600" />,
};

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
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [userCred, setUserCred] = useState({});
  const [currency] = useState("INR");
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const showToast = useToast();

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

  const fetchSubscription = useCallback(async () => {
    try {
      setIsProcessing(true);
      const data = await billingService.getSubscription();
      setUserCred({
        phone: data?.user?.phone,
        email: data?.user?.email,
        name: data?.user?.name,
      });
      setSubscription(data?.user?.subscription);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscription();
    const pop = searchParams.get("plans_comp");
    setShowPlans(!!pop);
  }, [fetchSubscription, searchParams]);

  const handlePlansTab = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    const en = encryptData(session?.user?.email);
    newParams.set("plans_comp", `user_${en}`);
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const handlePlanSelection = async (planId) => {
    if (!PLANS[planId].prices) return;
    console.log(planId);

    const obj = {
      plan_name: encryptData(planId),
      em: encryptData(userCred.email),
      pn: encryptData(userCred.phone),
    };
    const params = new URLSearchParams(obj).toString();
    router.replace(`/checkout_info?${params}`);
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

  const PlanCard = ({ planId, plan }) => {
    const priceInfo = getPlanPrice(planId);

    return (
      <Card
        className={`hover:shadow-lg transition-shadow relative overflow-hidden`}
      >
        {planId === "pro" && (
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-2">
            <StarsIcon className="h-4 w-4 text-yellow-600" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-yellow-500 font-bold to-pink-500">
              Most Popular
            </span>
          </div>
        )}

        <CardHeader className="pb-0">
          <h3 className="text-2xl font-bold">{plan.name}</h3>
          {priceInfo ? (
            <div className="space-y-0">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">
                  {priceInfo.localized.toLocaleString("en-IN")}
                </span>
                <span className="text-muted-foreground">/{billingPeriod}</span>
              </div>
              {TAX_RATES[currency] > 0 && (
                <p className="text-xs font-bold text-muted-foreground">
                  Includes( {TAX_RATES[currency] * 100}%{" "}
                  {currency === "INR" && "GST"} )
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
            variant="outline"
            className="w-full"
            onClick={() => handlePlanSelection(planId)}
          >
            View Details <ChevronRight className="ml-2 h-4 w-4" />
          </Button>

          <Separator />

          <div className="space-y-4">
            {Object.entries(plan.features).map(([key, value]) => (
              <div key={key} className="flex items-start gap-3">
                <span
                  className={`text-xl font-bold ${
                    value ? "text-green-600" : "text-rose-600"
                  }`}
                >
                  {value ? "✓" : "✕"}
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
            className="w-full gap-2 text-lg font-semibold transition-all"
            size="lg"
            variant={
              planId.toLowerCase() === "enterprise"
                ? "premium"
                : planId.toLowerCase() === "free"
                ? "outline"
                : "default"
            }
            onClick={() => handlePlanSelection(planId)}
            disabled={subscription?.plan === planId}
          >
            {subscription?.plan === planId ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle />
                Current Plan
              </span>
            ) : planId === "enterprise" ? (
              "Contact Us"
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
                    {plan.prices && (
                      <span className="text-xs text-muted-foreground mt-1">
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
                        <div className="flex flex-wrap justify-center items-center gap-1">
                          {value.map((v, index) => (
                            <span
                              key={index}
                              className="text-lg flex items-center gap-2"
                            >
                              {iconMap[v.toLowerCase()] || <span>{v}</span>}
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
      <div className="flex-1 p-2 py-4 sm:p-6 bg-background rounded-2xl space-y-8">
        {showPlans ? (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  Choose Your Plan
                </h1>
                <p className="text-muted-foreground mt-2">
                  Select the perfect plan for your business needs
                </p>
              </div>
              <TabsList className="hidden lg:grid w-full grid-cols-2 max-w-xs">
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

            <Tabs defaultValue="monthly">
              <TabsList className="grid lg:hidden w-full grid-cols-2 max-w-xs">
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

              <TabsContent value="monthly">
                <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6">
                  {Object.entries(PLANS).map(([planId, plan]) => (
                    <PlanCard key={planId} planId={planId} plan={plan} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6">Feature Comparison</h3>
              {renderComparisonTable()}
            </div>
          </div>
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
