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
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  InformationCircleIcon,
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
  CalendarIcon,
  InfoIcon,
  ReceiptIcon,
  EditIcon,
  PlusIcon,
  AlertCircleIcon,
  CreditCardIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AdminServices } from "@/lib/client/admin.service";
import CouponInput from "@/components/couponBox";
import { PayButton } from "@/components/settings/purchaseButton";
import { Label } from "@/components/ui/label";
import { OverlayLoader } from "@/components/animate/overlay_loader";
import { Checkbox } from "@/components/ui/checkbox";

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
  DELAY: "delay",
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
  const [showCoupon, setShowCoupon] = useState(false);
  const [billingDetails, setBillingDetails] = useState(null);
  const [updateBillingDetails, setUpdateBillingDetails] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedDuration, setSelectedDuration] = useState("monthly");
  const [isAgreed, setIsAgreed] = useState(false);
  const [plan, setPlan] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(PAYMENT_STATUS.IDLE);
  const [paymentMessage, setPaymentMessage] = useState(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});
  const payButtonRef = useRef();
  const [prices, setFinalPrice] = useState({
    base: 0,
    tax: 0,
    taxRate: 0,
    sub_total: 0,
    discount: 0,
    total: 0,
  });
  const toastRef = useRef(false);
  const { email, phone, plan_name, id, cycle_ } = formData;
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

  // Helper functions
  const saveToLocalStorage = useCallback(
    (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
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
    const parseQueryParams = async () => {
      try {
        const decrypted = {
          id: searchParams.get("id"),
          cycle_: searchParams.get("cycle"),
          email: searchParams.get("em"),
          phone: searchParams.get("pn"),
          plan_name: searchParams.get("plan_name"),
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
        saveToLocalStorage(STORAGE_KEYS.DURATION, decrypted.cycle_);
        setFormData(decrypted);
      } catch (error) {
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

  useEffect(() => {
    if (paymentStatus === PAYMENT_STATUS.SUCCESS) {
      const timer = setTimeout(() => {
        //router.push("/"); // Or your success route
        console.log("redirecting.....");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [paymentStatus, router]);
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

  // Event handlers
  const handlePlanChange = (newPlanId) => {
    try {
      const selectedPlan = plans.find((p) => p._id === newPlanId);
      if (!selectedPlan) {
        throw new Error("Selected plan not found");
      }
      const params = new URLSearchParams(searchParams.toString());
      params.set("plan_name", selectedPlan.name);
      params.set("id", selectedPlan._id);

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
      showToast({
        title: "Error",
        description: error.message || "Failed to change plan",
        variant: "destructive",
      });
    }
  };

  const handleDurationChange = (duration) => {
    try {
      const params = new URLSearchParams(searchParams.toString());
      params.set("cycle", duration);
      if (!params.has("plan_name"))
        params.set("plan_name", searchParams.get("plan_name"));
      if (!params.has("id")) params.set("id", searchParams.get("id"));
      if (!params.has("em")) params.set("em", searchParams.get("em"));
      if (!params.has("pn")) params.set("pn", searchParams.get("pn"));

      router.replace(`?${params.toString()}`, { scroll: false });
      setSelectedDuration(duration);
      saveToLocalStorage(STORAGE_KEYS.DURATION, duration);
    } catch (err) {
      if (!toastRef.current) {
        showToast({
          title: "Failed",
          description:
            err.message || "unable to change plan duration please try again",
          variant: "destructive",
        });
      }
    }
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

  return (
    <>
      {/* Payment Verification Modal */}
      <AlertDialog open={showVerificationModal}>
        <AlertDialogContent className="max-w-md rounded-lg p-8">
          <AlertDialogHeader className="flex flex-col items-center space-y-6">
            {/* Visually hidden title for accessibility */}
            <AlertDialogTitle className="sr-only">
              Payment Verification Status
            </AlertDialogTitle>

            {/* VERIFYING STATE */}
            {paymentStatus === PAYMENT_STATUS.VERIFYING && (
              <div className="flex flex-col items-center space-y-6">
                <div className="relative w-24 h-24">
                  {/* Outer ring with gradient */}
                  <div className="absolute inset-0 rounded-full border-8 border-blue-50 dark:border-blue-900/50"></div>
                  {/* Animated spinner with gradient */}
                  <div
                    className="absolute inset-0 rounded-full border-8 border-transparent border-t-blue-500 border-r-blue-500 animate-spin"
                    style={{ animationDuration: "1.5s" }}
                  ></div>
                  {/* Inner icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-pulse"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {paymentMessage.title || "Verifying Payment"}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {paymentMessage.description ||
                      "Please wait while we confirm your payment details..."}
                  </p>
                </div>
                {/* Animated dots for better waiting indication */}
                <div className="flex space-x-1">
                  {[1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{
                        animationDelay: `${dot * 0.2}s`,
                        animationDuration: "1s",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {/* DELAY STATE */}
            {paymentStatus === PAYMENT_STATUS.DELAY && (
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-orange-500 dark:text-orange-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  {/* Pulsing animation for attention */}
                  <div className="absolute inset-0 rounded-full border-4 border-orange-200 dark:border-orange-900/30 animate-ping opacity-75"></div>
                </div>
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {paymentMessage.title || "Processing Delay"}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {paymentMessage.description ||
                      "Your payment is taking longer than usual to process. We'll notify you once it's completed."}
                  </p>
                </div>
                <div className="w-full space-y-2">
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Processing</span>
                    <span>Estimated time: 2-5 mins</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div
                      className="bg-orange-500 h-2 rounded-full animate-progress-pulse"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex gap-4 w-full pt-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowVerificationModal(false)}
                  >
                    {`I'll check later`}
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => payButtonRef.current?.startVerification()}
                  >
                    Refresh Status
                  </Button>
                </div>
              </div>
            )}

            {/* SUCCESS STATE */}
            {paymentStatus === PAYMENT_STATUS.SUCCESS && (
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-green-500 dark:text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  {/* Celebration confetti effect */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-4 bg-yellow-400 rounded-full opacity-0 animate-confetti"
                        style={{
                          transform: `rotate(${i * 30}deg) translateY(-40px)`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {paymentMessage.title || "Payment Successful!"}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {paymentMessage.description ||
                      "Your payment has been verified and processed successfully."}
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div
                    className="bg-green-500 h-2 rounded-full animate-progress"
                    style={{ animationDuration: "3s", width: "100%" }}
                  ></div>
                </div>
                <Button
                  variant="primary"
                  className="w-full py-3 rounded-lg"
                  onClick={() => setShowVerificationModal(false)}
                >
                  Continue to Dashboard
                </Button>
              </div>
            )}

            {/* ERROR STATE */}
            {paymentStatus === PAYMENT_STATUS.ERROR && (
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-red-500 dark:text-red-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  {/* Pulsing error effect */}
                  <div className="absolute inset-0 rounded-full border-4 border-red-200 dark:border-red-900/30 animate-pulse opacity-75"></div>
                </div>
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {paymentMessage.title || "Verification Failed"}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {paymentMessage.description ||
                      "We couldn't verify your payment. Please try again or contact support."}
                  </p>
                </div>
                <div className="flex gap-4 w-full">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowVerificationModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => payButtonRef.current?.startVerification()}
                  >
                    Try Again
                  </Button>
                </div>
                <div className="pt-2 text-sm text-gray-500 dark:text-gray-400">
                  Need help?{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    Contact support
                  </a>
                </div>
              </div>
            )}
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>

      {/*Loader Block while loading it can shown */}
      <OverlayLoader open={isLoading} />

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
      {plan && (
        <div className="w-full h-full overflow-y-auto scrollbar-transparent bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="w-full mx-auto px-2 sm:px-4 lg:px-6 py-4 md:py-8">
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
                    Complete Purchase
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
                          <Badge
                            variant="premium"
                            className="whitespace-nowrap"
                          >
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
                                p.name.toLowerCase() ===
                                plan_name?.toLowerCase()
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
                        {Object.entries(plan.prices).map(
                          ([duration, price]) => {
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
                          }
                        )}
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
                        {Object.entries(plan.limits[cycle_])
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
                <div className="sticky top-8 space-y-4">
                  {/* Billing Information Section */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="p-2 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                      <div className="flex items-center gap-3">
                        <CreditCardIcon className="w-5 h-5 text-blue-500" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          Billing Information
                        </h3>
                      </div>
                    </div>

                    {!billingDetails ? (
                      <div className="p-4">
                        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/50 rounded-lg p-4 flex items-start gap-3">
                          <AlertCircleIcon className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-amber-800 dark:text-amber-200">
                              Billing Details Required
                            </h4>
                            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                              Please add your billing information to complete
                              your purchase.
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="primary"
                          size="md"
                          className="mt-4 w-full gap-2"
                          onClick={handleBillingDetails}
                        >
                          <PlusIcon className="w-4 h-4" />
                          Add Billing Details
                        </Button>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        <div className="grid grid-cols-1 gap-2 p-4">
                          <div className="space-y-1">
                            <Label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Company
                            </Label>
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                              {billingDetails.companyName || "Not provided"}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 gap-2">
                            <div className="space-y-1">
                              <Label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Email
                              </Label>
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                {billingDetails.email ||
                                  email ||
                                  "Not provided"}
                              </p>
                            </div>

                            <div className="space-y-1">
                              <Label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Phone
                              </Label>
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                {billingDetails.phone ||
                                  phone ||
                                  "Not provided"}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <Label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Billing Address
                            </Label>
                            <div className="font-medium text-gray-900 dark:text-gray-100">
                              <p>
                                {billingDetails.addressLine1 || "Not provided"}
                              </p>
                              {billingDetails.addressLine2 && (
                                <p>{billingDetails.addressLine2}</p>
                              )}
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {[
                                  billingDetails.city,
                                  billingDetails.state,
                                  billingDetails.postalCode,
                                ]
                                  .filter(Boolean)
                                  .join(", ")}
                              </p>
                              {billingDetails.country && (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {billingDetails.country}
                                </p>
                              )}
                            </div>
                          </div>

                          {billingDetails.gstin && (
                            <div className="space-y-1">
                              <Label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Tax ID
                              </Label>
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                {billingDetails.gstin}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="p-2">
                          <Button
                            variant="outline"
                            size="md"
                            className="w-full gap-2"
                            onClick={handleBillingDetails}
                          >
                            <EditIcon className="w-4 h-4" />
                            Edit Billing Details
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Order Summary */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                      <div className="flex items-center gap-3">
                        <ReceiptIcon className="w-5 h-5 text-blue-500" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          Order Summary
                        </h3>
                      </div>
                    </div>

                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                      <div className="p-3 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Plan
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {plan?.name || "N/A"}
                          </span>
                        </div>

                        <div className="flex justify-between items-start">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Billing Period
                          </span>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {selectedDuration === "yearly"
                                ? "Annual"
                                : "Monthly"}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center justify-end gap-1">
                              <CalendarIcon className="h-3.5 w-3.5" />
                              {(() => {
                                const startDate = new Date();
                                const endDate = new Date();
                                endDate.setFullYear(
                                  startDate.getFullYear() +
                                    (selectedDuration === "yearly" ? 1 : 0)
                                );
                                endDate.setMonth(
                                  startDate.getMonth() +
                                    (selectedDuration === "yearly" ? 0 : 1)
                                );

                                return (
                                  <span>
                                    {startDate.toLocaleDateString("en-IN", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    })}{" "}
                                    –{" "}
                                    {endDate.toLocaleDateString("en-IN", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    })}
                                  </span>
                                );
                              })()}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 space-y-3 bg-gray-50/50 dark:bg-gray-700/20">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Subtotal
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            ₹{prices?.base?.toLocaleString("en-IN") || "0.00"}
                          </span>
                        </div>

                        {prices.discount > 0 && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Discount ({appliedCoupon?.discount_percent || 0}%)
                            </span>
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">
                              -₹
                              {prices?.discount?.toLocaleString("en-IN") ||
                                "0.00"}
                            </span>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Tax ({prices?.taxRate || 0}%)
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            ₹{prices?.tax?.toLocaleString("en-IN") || "0.00"}
                          </span>
                        </div>
                        {/*This is want enable in feature when resolve all problems related in subscription coupon handle */}
                        {/*<CouponInput
                          workspaceId={workspaceId}
                          plan={plan}
                          applied={appliedCoupon}
                          shown={showCoupon}
                          onShown={setShowCoupon}
                          discount={prices.discount}
                          onApplied={setAppliedCoupon}
                        />*/}
                      </div>

                      <div className="p-3 bg-blue-50/50 dark:bg-blue-900/10">
                        <div className="flex justify-between items-center">
                          <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                            Total Due
                          </span>
                          <div className="text-right">
                            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              ₹
                              {prices?.total?.toLocaleString("en-IN") || "0.00"}
                            </span>
                            {selectedDuration === "yearly" && prices.base && (
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                (₹
                                {Math.round(prices.total / 12).toLocaleString(
                                  "en-IN"
                                )}
                                /mo)
                              </div>
                            )}
                          </div>
                        </div>

                        {prices.discount > 0 && (
                          <div className="mt-2 pt-2 border-t border-blue-100 dark:border-blue-800/30">
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                              <span>Current Payment:</span>
                              <span className="font-medium">
                                ₹{prices.total.toLocaleString("en-IN")}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                              <span>Next Renewal:</span>
                              <span>
                                ₹{prices.base.toLocaleString("en-IN")}
                              </span>
                            </div>
                            {appliedCoupon?.description && (
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
                                {appliedCoupon.description}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Terms and Payment */}
                    <div className="p-5 space-y-4">
                      {trialDays > 0 && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800/50">
                          <div className="flex items-start gap-3">
                            <InfoIcon className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-blue-800 dark:text-blue-200">
                                {trialDays}-Day Free Trial
                              </h4>
                              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                                Your card will be charged a ₹5 verification
                                amount (refundable). After {trialDays} days,
                                your subscription will automatically continue at
                                ₹{prices.base?.toLocaleString("en-IN")}/
                                {selectedDuration === "yearly"
                                  ? "year"
                                  : "month"}
                                .
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-start gap-3">
                        <Checkbox
                          id="terms"
                          checked={isAgreed}
                          onCheckedChange={(checked) => {
                            if (!billingDetails) {
                              setUpdateBillingDetails(true);
                              return;
                            }
                            setIsAgreed(checked);
                          }}
                        />
                        <Label
                          htmlFor="terms"
                          className="text-sm font-normal leading-5"
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
                      </div>
                      {!isAgreed && (
                        <p className="text-red-500 text-xs -mt-3">
                          You must agree to the terms to proceed
                        </p>
                      )}

                      <PayButton
                        ref={payButtonRef}
                        onSetModal={setShowVerificationModal}
                        onShowMessage={setPaymentMessage}
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
                        className="w-full"
                        shown={showCoupon}
                        couponCode={appliedCoupon?.code}
                      />

                      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <LockIcon className="w-3.5 h-3.5" />
                        <span>Secure 256-bit SSL encrypted payment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlanInfoCheckoutPage;
