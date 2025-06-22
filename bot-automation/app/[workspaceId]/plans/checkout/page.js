"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/toast-provider";
import { TAX_RATES } from "@/config/pricing.config";
import { billingService } from "@/lib/client/billing";
import { decryptData, encryptData } from "@/utils/encryption";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  SpinnerIcon,
  XCircleIcon,
} from "@/public/Images/svg_ecod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  LockIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  InfinityIcon,
  AlertTriangleIcon,
  Minus,
  CalendarIcon,
  InfoIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AdminServices } from "@/lib/client/admin.service";
import CouponInput from "@/components/couponBox";
import { PayButton } from "@/components/settings/purchaseButton";
import { Label } from "@/components/ui/label";

// Constants
const STORAGE_KEYS = {
  PLAN: "selected_plan",
  DURATION: "selected_duration",
};

const PAYMENT_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  VERIFYING: "verifying",
  SUCCESS: "success",
  ERROR: "error",
};

const FEATURE_CATEGORIES = [
  {
    name: "chatbotAutomation",
    title: "Chatbot Automation",
    icon: "🤖",
  },
  {
    name: "adsAutomation",
    title: "Ads Automation",
    icon: "📢",
  },
  {
    name: "seoTools",
    title: "SEO Tools",
    icon: "🔍",
  },
  {
    name: "landingBuilder",
    title: "Landing Page Builder",
    icon: "🖥️",
  },
  {
    name: "crmAndDripCampaigns",
    title: "CRM & Drip Campaigns",
    icon: "📈",
  },
  {
    name: "aiAgent",
    title: "AI Agent",
    icon: "🧠",
  },
  {
    name: "growthFeatures",
    title: "Growth Features",
    icon: "🚀",
  },
  {
    name: "enterpriseFeatures",
    title: "Enterprise Features",
    icon: "🏢",
  },
];

const PlanInfoCheckoutPage = () => {
  const [plans, setPlans] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const workspaceId = params.workspaceId;
  const showToast = useToast();
  const [currency, setCurrency] = useState("INR");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [billingDetails, setBillingDetails] = useState(null);
  const [updateBillingDetails, setUpdateBillingDetails] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedDuration, setSelectedDuration] = useState("monthly");
  const [isAgreed, setIsAgreed] = useState(false);
  const [plan, setPlan] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(PAYMENT_STATUS.IDLE);
  const [paymentError, setPaymentError] = useState(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [prices, setFinalPrice] = useState({
    base: 0,
    tax: 0,
    taxRate: 0,
    sub_total: 0,
    discount: 0,
    total: 0,
  });
  const toastRef = useRef(false);
  const { email, phone, plan_name, id } = formData;
  const isEnterprise = plan?.name.toLowerCase() === "enterprise";

  // Calculate Prices
  useEffect(() => {
    if (!plan || !selectedDuration) return;

    const base = plan.prices?.[selectedDuration] || 0;
    const taxRate = (TAX_RATES[currency] || 0) * 100;
    const tax = Math.round((base * taxRate) / 100) || 0;
    const sub_total = base + tax || 0;
    const discount = appliedCoupon
      ? calculateDiscountAmount(appliedCoupon, sub_total)
      : 0;
    const total = sub_total - discount || 0;

    setFinalPrice({
      base,
      tax,
      taxRate,
      sub_total,
      discount,
      total,
    });
  }, [currency, plan, selectedDuration, appliedCoupon]);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setIsLoading(true);
        const [response, plans, profile] = await Promise.all([
          billingService.getPlanDetails(workspaceId, id),
          AdminServices.getPlans(),
          billingService.getBillingProfile(workspaceId),
        ]);
        setPlans([...plans.plans]);
        setPlan(response.plan);
        setBillingDetails(profile.profile || null);
        setIsLoading(false);
      } catch (err) {
        if (!toastRef.current) {
          showToast({
            title: "Something went wrong",
            description: "Please try again later",
            variant: "destructive",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      fetchPlan();
    }
  }, [workspaceId, id, showToast, formData]);

  // Helper functions
  const saveToLocalStorage = useCallback(
    (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error("LocalStorage error:", error);
        if (!toastRef.current) {
          showToast({
            title: "Storage Error",
            description: "Could not save your preferences",
            variant: "warning",
          });
          toastRef.current = true;
        }
      }
    },
    [showToast]
  );

  const loadFromLocalStorage = useCallback((key) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("LocalStorage error:", error);
      return null;
    }
  }, []);

  const calculateDiscountAmount = (coupon, basePrice) => {
    if (!coupon) return 0;

    switch (coupon.type) {
      case "fixed":
        return Math.min(coupon.value, basePrice);
      case "percent":
        return Math.round((basePrice * coupon.value) / 100);
      case "trial":
        return basePrice;
      default:
        return 0;
    }
  };

  const toggleCategory = (categoryName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const formatFeatureValue = (value) => {
    if (value === true) return "Yes";
    if (value === false) return "No";
    if (value === "Infinity")
      return <InfinityIcon className="w-4 h-4 inline" />;
    if (Array.isArray(value)) return value.join(", ");
    return value;
  };

  const hasCompleteBillingDetails = () => {
    if (!billingDetails) return false;

    const requiredFields = [
      "companyName",
      "email",
      "addressLine1",
      "city",
      "state",
      "postalCode",
      "country",
    ];

    return requiredFields.every(
      (field) => billingDetails[field] && billingDetails[field].trim() !== ""
    );
  };

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => {
      toastRef.current = false;
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedDuration = loadFromLocalStorage(STORAGE_KEYS.DURATION);
    if (savedDuration) {
      setSelectedDuration(savedDuration);
    }
  }, [loadFromLocalStorage]);

  useEffect(() => {
    console.log(paymentStatus);
  });
  useEffect(() => {
    const parseQueryParams = async () => {
      try {
        const decrypted = {
          email: decryptData(searchParams.get("em")),
          phone: decryptData(searchParams.get("pn")),
          plan_name: decryptData(searchParams.get("plan_name")),
          id: decryptData(searchParams.get("id")),
        };

        if (!decrypted.plan_name || !decrypted.phone || !decrypted.email) {
          showToast({
            title: "Incomplete Information",
            description: "Please complete your profile before proceeding",
            variant: "warning",
          });
          router.push(`/${workspaceId}/settings/account/profile`);
          return;
        }

        saveToLocalStorage(STORAGE_KEYS.PLAN, decrypted.plan_name);
        setFormData(decrypted);
      } catch (error) {
        console.error("Decryption error:", error);
        showToast({
          title: "Invalid Request",
          description: "Could not process your request. Please try again.",
          variant: "destructive",
        });
        router.back();
      } finally {
        setIsLoading(false);
      }
    };

    parseQueryParams();
  }, [searchParams, workspaceId, router, saveToLocalStorage, showToast]);

  // Event handlers
  const handlePlanChange = (newPlanId) => {
    try {
      const selectedPlan = plans.find((p) => p._id === newPlanId);
      if (!selectedPlan) {
        throw new Error("Selected plan not found");
      }

      const params = new URLSearchParams(searchParams.toString());
      params.set("plan_name", encryptData(selectedPlan.name));
      params.set("id", encryptData(selectedPlan._id));

      if (!params.has("em")) params.set("em", searchParams.get("em"));
      if (!params.has("pn")) params.set("pn", searchParams.get("pn"));

      router.replace(`?${params.toString()}`, { scroll: false });
      saveToLocalStorage(STORAGE_KEYS.PLAN, selectedPlan.name);

      showToast({
        title: "Plan Changed",
        description: `You've selected the ${selectedPlan.name} plan`,
        variant: "success",
      });
    } catch (error) {
      console.error("Plan change error:", error);
      showToast({
        title: "Error",
        description: error.message || "Failed to change plan",
        variant: "destructive",
      });
    }
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
    saveToLocalStorage(STORAGE_KEYS.DURATION, duration);
  };
  const handleBillingDetails = () => {
    const currentPath = window.location.pathname + window.location.search;
    router.push(
      `/${workspaceId}/settings/workspace/billing?return=${encodeURIComponent(
        currentPath
      )}`
    );
  };

  // Derived values
  const trialDays = plan?.metadata?.trialDays || 0;
  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + trialDays);

  if (isLoading || !plan) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      {/* Payment Verification Modal */}
      <AlertDialog
        open={showVerificationModal}
        onOpenChange={(open) => {
          if (!open && paymentStatus === PAYMENT_STATUS.SUCCESS) return;
          setShowVerificationModal(open);
        }}
      >
        <AlertDialogContent
          className="rounded-xl"
          aria-describedby="dialog-description"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-2xl font-bold">
              {paymentStatus === PAYMENT_STATUS.SUCCESS
                ? "Payment Successful!"
                : paymentStatus === PAYMENT_STATUS.VERIFYING
                ? "Verifying Payment"
                : "Payment Verification"}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription asChild>
            <div
              id="dialog-description"
              className="flex flex-col items-center justify-center py-6 space-y-4"
            >
              {paymentStatus === PAYMENT_STATUS.VERIFYING && (
                <>
                  <div className="relative">
                    <SpinnerIcon className="w-12 h-12 text-blue-500 animate-spin" />
                    <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-ping opacity-75"></div>
                  </div>
                  <p className="text-center text-gray-600 dark:text-gray-400 max-w-md">
                    Please wait while we verify your payment. This usually takes
                    just a few seconds.
                  </p>
                </>
              )}
              {paymentStatus === PAYMENT_STATUS.SUCCESS && (
                <>
                  <div className="relative">
                    <CheckCircleIcon className="w-12 h-12 text-green-500" />
                    <div className="absolute -inset-2 rounded-full bg-green-100 dark:bg-green-900/30 opacity-60 animate-pulse"></div>
                  </div>
                  <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
                    Your payment was successfully processed!
                  </p>
                  <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-green-500 h-2.5 rounded-full animate-progress"></div>
                  </div>
                </>
              )}
              {paymentStatus === PAYMENT_STATUS.ERROR && (
                <>
                  <div className="relative">
                    <XCircleIcon className="w-12 h-12 text-red-500" />
                    <div className="absolute -inset-2 rounded-full bg-red-100 dark:bg-red-900/30 opacity-60 animate-pulse"></div>
                  </div>
                  <p className="text-center text-gray-600 dark:text-gray-400 max-w-md">
                    {paymentError ||
                      "Payment verification failed. Please try again."}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setShowVerificationModal(false);
                      setPaymentStatus(PAYMENT_STATUS.IDLE);
                      setPaymentError(null);
                    }}
                  >
                    Close
                  </Button>
                </>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>

      {updateBillingDetails && (
        <AlertDialog open={updateBillingDetails}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Complete your billing profile</AlertDialogTitle>
              <AlertDialogDescription>
                To continue using ECODrIx, please update your billing details.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setUpdateBillingDetails(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setUpdateBillingDetails(false);
                  handleBillingDetails();
                }}
              >
                Go to Billing
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Main Content */}
      <div className="w-full h-full overflow-y-auto scrollbar-transparent bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 md:py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Plan Details */}
            <div className="lg:w-3/5 xl:w-2/3">
              <div className="flex items-start justify-between sm:mb-6 mb-4">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/${workspaceId}/plans`)}
                  size="sm"
                  aria-label="Go back"
                  title="Go back"
                >
                  <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="hidden sm:inline ml-2">Back</span>
                </Button>
                <h1 className="text-lg sm:text-xl self-center font-bold text-gray-900 dark:text-gray-100">
                  Complete Your Purchase
                </h1>
                <div className="w-5 h-5" /> {/* Spacer */}
              </div>

              {/* Plan Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Plan Header */}
                <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row xl:flex-row lg:flex-col sm:justify-between sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-4 rounded-lg ${
                          isEnterprise
                            ? "bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800"
                            : "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800"
                        } shadow-sm`}
                      >
                        <span
                          className={`text-lg sm:text-2xl font-bold ${
                            isEnterprise
                              ? "text-purple-600 dark:text-purple-300"
                              : "text-blue-600 dark:text-blue-300"
                          }`}
                        >
                          {plan.name}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-sm sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                          {plan.name} Plan
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                          {plan.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end lg:w-full xl:w-auto gap-2">
                      {plan.metadata.recommended && (
                        <Badge variant="premium" className="whitespace-nowrap">
                          Recommended
                        </Badge>
                      )}
                      {plan.metadata.popular && (
                        <Badge
                          variant="secondary"
                          className="whitespace-nowrap"
                        >
                          Most Popular
                        </Badge>
                      )}
                      <Select
                        value={
                          plans.find(
                            (p) =>
                              p.name.toLowerCase() === plan_name?.toLowerCase()
                          )?._id || ""
                        }
                        onValueChange={handlePlanChange}
                        disabled={paymentStatus === PAYMENT_STATUS.LOADING}
                      >
                        <SelectTrigger className="w-full sm:w-48 lg:w-full xl:w-48 bg-white dark:bg-gray-700">
                          <SelectValue placeholder="Select Plan" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                          {plans
                            .filter((p) => p.name.toLowerCase() !== "free")
                            .map((p, key) => (
                              <SelectItem
                                key={key}
                                value={p._id}
                                className="hover:bg-gray-100 hover:cursor-pointer dark:hover:bg-gray-900"
                              >
                                <div className="flex items-center gap-2">
                                  <span>{p.name}</span>
                                  {p.metadata.recommended && (
                                    <Badge
                                      variant="premium"
                                      className="text-xs py-0 px-1.5"
                                    >
                                      Rec
                                    </Badge>
                                  )}
                                  {p.metadata.popular && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs py-0 px-1.5"
                                    >
                                      Popular
                                    </Badge>
                                  )}
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Billing Cycle Selection */}
                {plan.prices && (
                  <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                      Select your billing preference
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(plan.prices).map(([duration, price]) => {
                        const isYearly = duration === "yearly";
                        const isSelected = selectedDuration === duration;
                        const monthlyEquivalent = isYearly
                          ? (price / 12).toLocaleString("en-IN", {
                              maximumFractionDigits: 2,
                            })
                          : null;
                        const savingsPercentage = isYearly
                          ? Math.round(
                              (1 -
                                plan.prices.yearly /
                                  (plan.prices.monthly * 12)) *
                                100
                            )
                          : 0;

                        return (
                          <button
                            key={duration}
                            onClick={() => handleDurationChange(duration)}
                            className={`p-4 rounded-lg border transition-all relative overflow-hidden ${
                              isSelected
                                ? "border-blue-500 bg-gradient-to-br from-blue-50/80 to-blue-100/80 dark:from-blue-900/30 dark:to-blue-800/30 shadow-lg ring-2 ring-blue-200/60 dark:ring-blue-900/40"
                                : "border-gray-200 dark:border-gray-700 hover:border-blue-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750"
                            }`}
                          >
                            {isYearly && savingsPercentage > 0 && (
                              <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg shadow-md">
                                Save {savingsPercentage}%
                              </div>
                            )}

                            <div className="flex flex-col items-start">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                    isSelected
                                      ? "border-blue-500 bg-blue-500"
                                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                                  }`}
                                >
                                  {isSelected && (
                                    <svg
                                      className="w-3 h-3 text-white"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  )}
                                </div>
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                  {duration.charAt(0).toUpperCase() +
                                    duration.slice(1)}
                                </span>
                              </div>

                              <div className="mt-3 flex items-end gap-1">
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                  ₹
                                  {price.toLocaleString("en-IN", {
                                    maxFractionDigits: 2,
                                  })}
                                </span>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-0.5">
                                  {isYearly ? "/year" : "/month"}
                                </span>
                              </div>

                              <div
                                className={`text-sm mt-1 px-2 py-1 rounded-md ${
                                  isYearly
                                    ? "bg-green-100/70 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                                    : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                }`}
                              >
                                {isYearly
                                  ? `₹${monthlyEquivalent}/mo equivalent`
                                  : "Flexible monthly billing"}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Plan Limits */}
                {plan.limits && (
                  <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
                      Plan Limits
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {Object.entries(plan.limits)
                        .filter(
                          ([key]) =>
                            !key.includes("adCredits") &&
                            !key.includes("dedicatedConcurrency")
                        )
                        .map(([limit, value]) => (
                          <div
                            key={limit}
                            className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                          >
                            <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                              {limit.replace(/([A-Z])/g, " $1").trim()}
                            </div>
                            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {value === "Infinity" ? (
                                <InfinityIcon className="w-6 h-6 inline" />
                              ) : (
                                value
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Plan Features */}
                <div className="p-4 lg:p-6">
                  <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
                    Plan Features
                  </h3>
                  <div className="space-y-4">
                    {FEATURE_CATEGORIES.map((category) => {
                      if (!plan.features[category.name]) return null;
                      const isExpanded =
                        expandedCategories[category.name] || false;

                      return (
                        <div
                          key={category.name}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                        >
                          <button
                            onClick={() => toggleCategory(category.name)}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{category.icon}</span>
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                {category.title}
                              </h4>
                            </div>
                            {isExpanded ? (
                              <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                            )}
                          </button>
                          {isExpanded && (
                            <div className="p-4 bg-gray-50 dark:bg-gray-700/20 border-t border-gray-200 dark:border-gray-700">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(
                                  plan.features[category.name]
                                ).map(([feature, value]) => (
                                  <div
                                    key={feature}
                                    className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                                      value
                                        ? "bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/30 dark:hover:bg-gray-700/50"
                                        : "bg-gray-100/50 hover:bg-gray-200/50 dark:bg-gray-700/50 dark:hover:bg-gray-700/70"
                                    }`}
                                  >
                                    <div className="mt-1 flex-shrink-0">
                                      {typeof value === "boolean" ? (
                                        value ? (
                                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                        ) : (
                                          <XCircleIcon className="w-5 h-5 text-red-500" />
                                        )
                                      ) : (
                                        <InformationCircleIcon className="w-5 h-5 text-blue-500" />
                                      )}
                                    </div>
                                    <div>
                                      <div className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                                        {feature
                                          .replace(/([A-Z])/g, " $1")
                                          .trim()}
                                      </div>
                                      <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {formatFeatureValue(value)}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Checkout Summary */}
            <div className="lg:w-2/5 xl:w-1/3">
              <div className="sticky top-8 space-y-6">
                {/* Billing Information Section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      Billing Information
                    </h3>
                  </div>

                  {!billingDetails ? (
                    <div className="p-4 lg:p-6">
                      <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/50 rounded-lg p-4 flex items-start gap-3">
                        <AlertTriangleIcon className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-yellow-800 dark:text-yellow-200">
                            Billing Details Required
                          </h4>
                          <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                            Please add your billing information to proceed with
                            checkout.
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="primary"
                        size="md"
                        fullWidth={true}
                        className="mt-4"
                        onClick={handleBillingDetails}
                      >
                        Add Billing Details
                      </Button>
                    </div>
                  ) : (
                    <div className="p-2 space-y-4">
                      <div className="grid p-2 lg:py-2 lg:px-4 grid-cols-1 gap-4 lg:gap-2">
                        <div>
                          <Label className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                            Company Name
                          </Label>
                          <p className="font-medium text-gray-900 dark:text-gray-100 mt-1">
                            {billingDetails.companyName || "N/A"}
                          </p>
                        </div>

                        <div>
                          <Label className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                            Email
                          </Label>
                          <p className="font-medium text-gray-900 dark:text-gray-100 mt-1">
                            {billingDetails.email || email || "N/A"}
                          </p>
                        </div>

                        <div>
                          <Label className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                            Phone
                          </Label>
                          <p className="font-medium text-gray-900 dark:text-gray-100 mt-1">
                            {billingDetails.phone || phone || "N/A"}
                          </p>
                        </div>

                        <div>
                          <Label className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                            Address
                          </Label>
                          <p className="font-medium text-gray-900 dark:text-gray-100 mt-1">
                            {billingDetails.addressLine1 || "N/A"}
                            {billingDetails.addressLine2 && (
                              <span>, {billingDetails.addressLine2}</span>
                            )}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {billingDetails.city || "N/A"},{" "}
                            {billingDetails.state || "N/A"},{" "}
                            {billingDetails.postalCode || "N/A"}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {billingDetails.country || "N/A"}
                          </p>
                        </div>

                        <div>
                          <Label className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                            Tax ID
                          </Label>
                          <p className="font-medium text-gray-900 dark:text-gray-100 mt-1">
                            {billingDetails.gstin || "N/A"}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="md"
                        fullWidth={true}
                        onClick={handleBillingDetails}
                      >
                        Edit Billing Details
                      </Button>
                    </div>
                  )}
                </div>

                {/* Order Summary */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      Order Summary
                    </h3>
                  </div>

                  <div className="p-4 lg:p-6 space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Plan:
                        </span>
                        <span className="text-sm font-medium">
                          {plan?.name || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Duration :
                        </span>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            {(() => {
                              const startDate = new Date();
                              const endDate = new Date();

                              if (selectedDuration === "yearly") {
                                endDate.setFullYear(
                                  startDate.getFullYear() + 1
                                );
                              } else {
                                endDate.setMonth(startDate.getMonth() + 1);
                              }

                              const formatOptions = {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              };

                              return (
                                <span className="flex flex-col items-end gap-1">
                                  <span className="flex items-center gap-1">
                                    <CalendarIcon className="h-3 w-3" />
                                    {startDate.toLocaleDateString(
                                      "en-IN",
                                      formatOptions
                                    )}{" "}
                                    –{" "}
                                    {endDate.toLocaleDateString(
                                      "en-IN",
                                      formatOptions
                                    )}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    (
                                    {selectedDuration === "yearly"
                                      ? "12 months"
                                      : "1 month"}
                                    )
                                  </span>
                                </span>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Subtotal:
                        </span>
                        <span className="text-sm font-medium">
                          ₹
                          {prices?.base?.toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                          }) || "0.00"}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Tax ({prices?.taxRate || 0}%):
                        </span>
                        <span className="text-sm font-medium">
                          ₹
                          {prices?.tax?.toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                          }) || "0.00"}
                        </span>
                      </div>

                      {/*<CouponInput
                        plan={plan}
                        workspaceId={workspaceId}
                        applied={appliedCoupon}
                        shown={isCouponShown}
                        onShown={setIsCouponShown}
                        onApplied={setAppliedCoupon}
                        discount={prices.discount}
                      />*/}

                      <div className="pt-3 mt-2 border-t border-gray-200 dark:border-gray-600">
                        <div className="flex justify-between items-center">
                          <span className="text-base font-bold text-gray-900 dark:text-gray-200">
                            Total:
                          </span>
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            ₹
                            {prices?.total?.toLocaleString("en-IN", {
                              maximumFractionDigits: 2,
                            }) || "0.00"}
                            {selectedDuration === "yearly" && (
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {prices.base &&
                                  `(₹${Math.round(
                                    prices.base / 12
                                  ).toLocaleString("en-IN")}/mo)`}
                              </div>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-4">
                      {trialDays > 0 && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800/50">
                          <div className="flex items-start gap-3">
                            <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-blue-800 dark:text-blue-200">
                                {trialDays}-Day Free Trial
                              </h4>
                              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                                Your card will be charged a ₹5 verification
                                amount (refundable). After {trialDays} days,
                                your subscription will automatically continue at
                                ₹{prices.total?.toLocaleString("en-IN")}/
                                {selectedDuration === "yearly"
                                  ? "year"
                                  : "month"}
                                .
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                        <input
                          id="terms"
                          type="checkbox"
                          checked={isAgreed}
                          onChange={(e) => {
                            if (!billingDetails) {
                              setUpdateBillingDetails(true);
                              return;
                            }
                            setIsAgreed(e.target.checked);
                          }}
                          className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <div className="text-sm">
                          <Label
                            htmlFor="terms"
                            className="text-gray-600 cursor-pointer dark:text-gray-400"
                          >
                            I agree to the{" "}
                            <Link
                              href="/terms"
                              className="text-blue-600 hover:underline dark:text-blue-400"
                            >
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="/privacy"
                              className="text-blue-600 hover:underline dark:text-blue-400"
                            >
                              Privacy Policy
                            </Link>
                            , and authorize recurring payments.
                          </Label>
                          {!isAgreed && (
                            <p className="text-red-500 text-xs mt-1">
                              You must agree to the terms to proceed
                            </p>
                          )}
                        </div>
                      </div>

                      <PayButton
                        onSetModal={setShowVerificationModal}
                        onSetError={setPaymentError}
                        workspaceId={workspaceId}
                        agree={isAgreed}
                        onCompleteBilling={hasCompleteBillingDetails}
                        status={paymentStatus}
                        paymentStatus={PAYMENT_STATUS}
                        trial={trialDays}
                        price={prices.total}
                        currency={currency}
                        plan={plan}
                        plan_name={plan.name}
                        onPaymentStatus={setPaymentStatus}
                        cycle={selectedDuration}
                        profile={billingDetails || formData}
                      />

                      <div className="flex flex-col items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <LockIcon className="h-3 w-3" />
                          <span>Secure 256-bit SSL encrypted payment</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const LoadingSkeleton = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <div className="flex items-center space-x-4">
      <SpinnerIcon className="h-8 w-8 animate-spin text-blue-500" />
      <span className="text-gray-600 dark:text-gray-400">
        Loading plan details...
      </span>
    </div>
  </div>
);

export default PlanInfoCheckoutPage;
