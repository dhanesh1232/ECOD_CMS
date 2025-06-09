"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast-provider";
import { PLANS, PricingUtils } from "@/config/pricing.config";
import { billingService } from "@/lib/client/billing";
import { decryptData, encryptData } from "@/utils/encryption";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { startWebhookPolling } from "@/lib/client/payment_check";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  SpinnerIcon,
  XCircleIcon,
  StarIcon,
} from "@/public/Images/svg_ecod";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

// LocalStorage keys
const STORAGE_KEYS = {
  PLAN: "selected_plan",
  DURATION: "selected_duration",
  SHOW_COUPON: "show_coupon",
  COUPON_CODE: "coupon_code",
  VALID_COUPON: "valid_coupon",
  COUPON_DATA: "coupon_data",
};

const PlanInfoCheckoutPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const workspaceId = params.workspaceId;
  const [couponState, setCouponState] = useState(() => {
    const coupon = localStorage.getItem(STORAGE_KEYS.COUPON_CODE);
    const valid = localStorage.getItem(STORAGE_KEYS.VALID_COUPON);
    const shown = localStorage.getItem(STORAGE_KEYS.SHOW_COUPON);
    const couponData = localStorage.getItem(STORAGE_KEYS.COUPON_DATA);

    let discount = { percentage: 0, fixed: 0, trial: 0 };

    try {
      const parsed = couponData ? JSON.parse(couponData) : null;
      if (parsed && typeof parsed.discount === "object") {
        discount = {
          percentage: parsed.discount.percentage || 0,
          fixed: parsed.discount.fixed || 0,
          trial: parsed.discount.trial || 0,
        };
      }
    } catch (e) {
      console.warn("Invalid couponData in localStorage:", e);
    }

    return {
      code: coupon ? JSON.parse(coupon) : "",
      discount,
      isValid: valid ? JSON.parse(valid) : false,
      isShow: shown ? JSON.parse(shown) : false,
      isValidating: false,
      hasChanged: false,
      isInitialLoad: true,
      error: false,
    };
  });

  const [formData, setFormData] = useState({});
  const [selectedDuration, setSelectedDuration] = useState("monthly");
  const [isAgreed, setIsAgreed] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState({
    loading: false,
    verifying: false,
    success: false,
    error: null,
  });
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const showToast = useToast();
  const { email, phone, plan_name } = formData;
  const toastRef = useRef(false);
  const [isMount, setIsMount] = useState(true);

  const plan = PLANS[plan_name?.toLowerCase()];
  const isEnterprise = plan?.name.toLowerCase() === "enterprise";
  const enterpriseFeatures = [
    "Dedicated Account Manager",
    "24/7 Priority Support",
    "Custom SLAs",
    "On-premise Deployment",
    "Custom AI Training",
  ];

  // Save to localStorage
  const saveToLocalStorage = useCallback(
    (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        if (!toastRef.current) {
          showToast({
            title: "Retry",
            description: `Failed to save to localStorage: ${error}`,
            variant: "warning",
          });
          toastRef.current = true;
        }
      }
    },
    [showToast]
  );

  // Load from localStorage
  const loadFromLocalStorage = useCallback(
    (key) => {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      } catch (error) {
        if (!toastRef.current) {
          showToast({
            title: "Retry",
            description: `Failed to load from localStorage: ${error}`,
            variant: "warning",
          });
          toastRef.current = true;
        }
        return null;
      }
    },
    [showToast]
  );

  const prices = PricingUtils.calculatePrice(
    plan_name,
    selectedDuration,
    couponState.discount
  );

  useEffect(() => {
    setTimeout(() => {
      toastRef.current = false;
    }, 10000);
  }, [couponState]);

  useEffect(() => {
    if (isMount) {
      setIsMount(false);
    }
  }, [isMount]);

  useEffect(() => {
    // Load saved duration from localStorage if available
    const savedDuration = loadFromLocalStorage(STORAGE_KEYS.DURATION);
    if (savedDuration) {
      setSelectedDuration(savedDuration);
    }
  }, [loadFromLocalStorage]);

  useEffect(() => {
    const getPathQuery = () => {
      try {
        const decrypted = {
          email: decryptData(searchParams.get("em")),
          phone: decryptData(searchParams.get("pn")),
          plan_name: decryptData(searchParams.get("plan_name")),
        };

        const isMissing =
          !decrypted.plan_name || !decrypted.phone || !decrypted.email;

        if (isMissing && !toastRef.current) {
          showToast({
            title: "Missing Profile Information",
            description: "Please complete your profile before proceeding",
            variant: "warning",
          });
          toastRef.current = true;
          setTimeout(
            () => router.push(`/${workspaceId}/settings/account/profile`),
            3000
          );
          return;
        }

        // Save the new plan to localStorage
        if (decrypted.plan_name) {
          saveToLocalStorage(STORAGE_KEYS.PLAN, decrypted.plan_name);
        }

        setFormData(decrypted);
      } catch (error) {
        if (!toastRef.current) {
          showToast({
            title: "Invalid Request",
            description: "Could not process your request. Please try again.",
            variant: "destructive",
          });
          toastRef.current = true;
        }
        router.back();
      }
    };
    getPathQuery();
  }, [searchParams, showToast, workspaceId, router, saveToLocalStorage]);

  const handlePlanChange = (newPlanKey) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("plan_name", encryptData(newPlanKey));
    router.replace(`?${params.toString()}`, { scroll: false });

    // Save the new plan to localStorage
    saveToLocalStorage(STORAGE_KEYS.PLAN, newPlanKey);
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
    // Save the new duration to localStorage
    saveToLocalStorage(STORAGE_KEYS.DURATION, duration);
  };

  const handleCouponApply = useCallback(
    async (couponCodeParam = null) => {
      const couponCode = couponCodeParam || couponState.code.trim();
      if (!couponCode) return;

      setCouponState((prev) => ({ ...prev, isValidating: true }));

      try {
        const response = await billingService.validateCoupon(
          workspaceId,
          couponCode
        );

        if (response.status && !response.ok) {
          const data = await response.json();

          if (!toastRef.current) {
            showToast({
              title: "Invalid Coupon",
              description: data.message || "This coupon code is not valid",
              variant: "warning",
            });
            toastRef.current = true;
          }

          // Clear invalid coupon from storage
          saveToLocalStorage(STORAGE_KEYS.COUPON_CODE, "");
          saveToLocalStorage(STORAGE_KEYS.VALID_COUPON, false);
          saveToLocalStorage(STORAGE_KEYS.COUPON_DATA, null);

          setCouponState((prev) => ({
            ...prev,
            isValid: false,
            isValidating: false,
            discount: {
              percentage: 0,
              fixed: 0,
              trial: 0,
            },
            error: true,
          }));
          return;
        }

        const data = response.data;

        if (!toastRef.current) {
          showToast({
            title: "Coupon Applied",
            description:
              data.message || "Discount has been applied to your plan",
            variant: "success",
          });
          toastRef.current = true;
        }

        const newDiscount = {
          percentage: data.type === "percentage" ? data.value : 0,
          fixed: data.type === "fixed" ? data.value : 0,
          trial: data.type === "trial" ? data.value : 0,
        };

        // Save coupon data to localStorage
        saveToLocalStorage(STORAGE_KEYS.COUPON_CODE, couponCode);
        saveToLocalStorage(STORAGE_KEYS.VALID_COUPON, data.isValid);
        saveToLocalStorage(STORAGE_KEYS.COUPON_DATA, {
          code: couponCode,
          discount: newDiscount,
          type: data.type,
        });

        setCouponState((prev) => ({
          ...prev,
          isValid: data.isValid,
          discount: newDiscount,
          code: couponCode,
          hasChanged: false,
          isValidating: false,
          isInitialLoad: false,
          error: false,
        }));
      } catch (error) {
        if (!toastRef.current) {
          showToast({
            title: "Coupon Error",
            description: error.message || "Failed to validate coupon",
            variant: "destructive",
          });
          toastRef.current = true;
        }

        // Clear invalid coupon from storage
        saveToLocalStorage(STORAGE_KEYS.COUPON_CODE, "");
        saveToLocalStorage(STORAGE_KEYS.VALID_COUPON, false);
        saveToLocalStorage(STORAGE_KEYS.COUPON_DATA, null);

        setCouponState((prev) => ({
          ...prev,
          isValid: false,
          error: true,
          isValidating: false,
          discount: {
            percentage: 0,
            fixed: 0,
            trial: 0,
          },
        }));
      }
    },
    [couponState.code, saveToLocalStorage, showToast, workspaceId]
  );

  // Load and validate coupon on initial render if exists
  useEffect(() => {
    const savedCode = loadFromLocalStorage(STORAGE_KEYS.COUPON_CODE);
    const isValid = loadFromLocalStorage(STORAGE_KEYS.VALID_COUPON);
    const couponData = loadFromLocalStorage(STORAGE_KEYS.COUPON_DATA);

    if (couponState.isInitialLoad && savedCode && isValid && couponData) {
      // Only validate if we don't have complete data
      if (
        !couponData.discount ||
        (couponData.discount.percentage === 0 &&
          couponData.discount.fixed === 0 &&
          couponData.discount.trial === 0)
      ) {
        handleCouponApply(savedCode);
      } else {
        // Use the stored coupon data
        setCouponState((prev) => ({
          ...prev,
          code: savedCode,
          isValid: isValid,
          discount: couponData.discount,
          isInitialLoad: false,
        }));
      }
    } else {
      setCouponState((prev) => ({ ...prev, isInitialLoad: false }));
    }
  }, [handleCouponApply, loadFromLocalStorage, couponState.isInitialLoad]);

  // plan trial days configurations
  const trialDays = plan?.metadata?.trialDays || 0;
  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + trialDays);
  const formattedTrialEndDate = trialEndDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleCheckout = async () => {
    if (!isAgreed) {
      if (!toastRef.current) {
        showToast({
          title: "Agreement Required",
          description: "Please accept the terms and conditions to proceed",
          variant: "warning",
        });
        toastRef.current = true;
      }
      return;
    }
    if (!plan || !plan_name || !plan.prices[selectedDuration]) {
      if (!toastRef.current) {
        showToast({
          title: "Invalid Selection",
          description: "Please select a valid plan and duration",
          variant: "warning",
        });
        toastRef.current = true;
      }
      return;
    }
    const publicKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY;
    if (!publicKey) {
      if (!toastRef.current) {
        showToast({
          title: "Configuration Error",
          description: "Payment gateway is not properly configured",
          variant: "warning",
        });
        toastRef.current = true;
      }
      return;
    }
    setPaymentStatus({ ...paymentStatus, loading: true });
    try {
      const totalAmount = Math.round(prices.total * 100); // Convert to paise and round
      const order = await billingService.createPaymentOrder(workspaceId, {
        planName: plan_name,
        amount: totalAmount,
        currency: "INR",
        interval: selectedDuration,
        period: selectedDuration === "monthly" ? 1 : 12,
        email: email,
        phone: phone,
        totalCount: selectedDuration === "monthly" ? 12 : 1,
      });
      if (order.status && order.ok === false) {
        setPaymentStatus({
          loading: false,
          verifying: false,
          success: false,
          error: null,
        });
        const data = await order.json();
        if (!toastRef.current) {
          showToast({
            description:
              data.message ||
              "For this workspace already have subscription if your want to upgrade with new plan contact support team",
            variant: "warning",
          });
          toastRef.current = true;
        }
        return;
      }
      console.log(order);
      const options = {
        key: publicKey,
        amount: order.amount,
        currency: order.currency,
        name: "ECODrIx",
        description: `${plan.name} ${selectedDuration} Subscription`,
        subscription_id: order.id,
        theme: {
          color: "#4F46E5",
        },
        prefill: {
          name: "Customer",
          email: email,
          contact: phone,
        },
        notes: {
          plan: plan_name,
          duration: selectedDuration,
          customerId: order.notes.customer_id,
        },
        handler: async (response) => {
          if (!response?.razorpay_subscription_id) {
            showToast({
              title: "Payment Failed",
              description: "Payment could not be processed",
              variant: "warning",
            });
            setPaymentStatus({
              loading: false,
              verifying: false,
              success: false,
              error: "Payment failed - no subscription ID",
            });
            return;
          }
          // Show verification modal
          setShowVerificationModal(true);
          setPaymentStatus({
            loading: false,
            verifying: true,
            success: false,
            error: null,
          });

          /// after paymnet creation verification doing with webhooks, how can set status
          /*try {
            const verification = billingService.verifyPayment(workspaceId, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_subscription_id: response.razorpay_subscription_id,
              razorpay_signature: response.razorpay_signature,
              plan_name: plan_name,
              amount: Math.round(prices.total * 100), // amount in paise
              interval: selectedDuration,
            });
            if (verification.status && !verification.ok) {
              const data = await verification.json();
              throw new Error(data.message || "Payment verification failed");
            } else {
              setPaymentStatus({
                loading: false,
                verifying: false,
                success: true,
                error: null,
              });
              // startWebhookPolling(response.razorpay_payment_id, workspaceId);
              // Redirect after delay
              setTimeout(() => {
                router.push(
                  `/${workspaceId}/settings/workspace/billing?payment_id=${response.razorpay_payment_id}`
                );
              }, 2000);
            }
          } catch (err) {
            setPaymentStatus({
              loading: false,
              verifying: false,
              success: false,
              error: err.message || "Payment verification failed",
            });
            if (!toastRef.current) {
              showToast({
                title: "Verification Failed",
                description: err.message || "Could not verify your payment",
                variant: "warning",
              });
              toastRef.current = true;
            }
          }*/
        },
        modal: {
          ondismiss: () => {
            setPaymentStatus({
              loading: false,
              verifying: false,
              success: false,
              error: "Payment cancelled by user",
            });
            showToast({
              title: "Payment Cancelled",
              description: "You can complete your purchase later",
              variant: "warning",
            });
          },
        },
      };

      if (window.Razorpay) {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        showToast({
          title: "Payment Error",
          description:
            "Payment gateway failed to load. Please refresh the page.",
          variant: "warning",
        });
        setPaymentStatus({
          loading: false,
          verifying: false,
          success: false,
          error: "Razorpay not loaded",
        });
      }
    } catch (error) {
      showToast({
        title: "Payment Error",
        description: error.message || "Failed to initialize payment gateway",
        variant: "destructive",
      });
      setPaymentStatus({
        loading: false,
        verifying: false,
        success: false,
        error: error.message || "Payment error",
      });
    }
  };

  if (isMount) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <AlertDialog
        open={showVerificationModal}
        onOpenChange={(open) => {
          if (!open && paymentStatus.success) {
            return;
          }
          setShowVerificationModal(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              {paymentStatus.success
                ? "Payment Successful!"
                : paymentStatus.verifying
                ? "Verifying Payment"
                : "Payment Verification"}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            {paymentStatus.verifying && (
              <>
                <SpinnerIcon className="w-12 h-12 text-blue-500 animate-spin" />
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Please wait while we verify your payment...
                </p>
              </>
            )}
            {paymentStatus.success && (
              <>
                <CheckCircleIcon className="w-12 h-12 text-green-500" />
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Your payment was successfully processed!
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-blue-600 h-2.5 rounded-full animate-pulse"></div>
                </div>
              </>
            )}
            {paymentStatus.error && (
              <>
                <XCircleIcon className="w-12 h-12 text-red-500" />
                <p className="text-center text-gray-600 dark:text-gray-400">
                  {paymentStatus.error || "Errors"}
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowVerificationModal(false);
                    setPaymentStatus({
                      loading: false,
                      verifying: false,
                      success: false,
                      error: null,
                    });
                  }}
                >
                  Close
                </Button>
              </>
            )}
          </div>
        </AlertDialogContent>
      </AlertDialog>
      <div className="w-full p-4 sm:p-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-y-auto scrollbar-transparent">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push(`/${workspaceId}/plans`)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
              aria-label="Go back to plans"
              title="Go back to plans"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Complete Your Purchase
            </h1>
            <div className="w-5 h-5" /> {/* Spacer for alignment */}
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            {/* Plan Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`p-4 rounded-lg ${
                    isEnterprise
                      ? "bg-purple-100 dark:bg-purple-900"
                      : "bg-blue-100 dark:bg-blue-900"
                  }`}
                >
                  <span
                    className={`text-2xl font-bold ${
                      isEnterprise
                        ? "text-purple-600 dark:text-purple-300"
                        : "text-blue-600 dark:text-blue-300"
                    }`}
                  >
                    {plan.name}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {plan.name} Plan
                  </h2>
                  {plan.prices && (
                    <p className="text-gray-600 dark:text-gray-400">
                      Selected duration:{" "}
                      <span className="capitalize font-medium text-blue-600 dark:text-blue-400">
                        {selectedDuration}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <Select
                value={plan_name?.toLowerCase()}
                onValueChange={handlePlanChange}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Select Plan" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PLANS)
                    .filter(([key, p]) => p.name.toLowerCase() !== "free")
                    .map(([key, p]) => (
                      <SelectItem key={key} value={key}>
                        {p.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Billing Cycle Selection */}
            {plan.prices && (
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
                  Choose Billing Cycle
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

                    return (
                      <button
                        key={duration}
                        onClick={() => handleDurationChange(duration)}
                        className={`p-4 rounded-xl border-2 transition-all relative overflow-hidden ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md"
                            : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                        }`}
                        aria-label={`Select ${duration} billing at ₹${price}`}
                      >
                        {isYearly && (
                          <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-bl-lg transform rotate-12 translate-x-2 -translate-y-1">
                            Save{" "}
                            {Math.round(
                              (1 -
                                plan.prices.yearly /
                                  (plan.prices.monthly * 12)) *
                                100
                            )}
                            %
                          </div>
                        )}
                        <div className="text-left">
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {duration.charAt(0).toUpperCase() +
                              duration.slice(1)}
                          </div>
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                            ₹{price.toLocaleString("en-IN")}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {isYearly ? (
                              <>
                                <span>
                                  Billed annually (₹{monthlyEquivalent}/mo)
                                </span>
                              </>
                            ) : (
                              `Billed monthly`
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Plan Features */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
                Plan Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(plan.features).map(([feature, value]) => (
                  <div
                    key={feature}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      value
                        ? "bg-gray-50 dark:bg-gray-700/30"
                        : "bg-gray-100/50 dark:bg-gray-700/50"
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
                        {feature.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {typeof value === "boolean"
                          ? value
                            ? "Included"
                            : "Not included"
                          : Array.isArray(value)
                          ? value.join(", ")
                          : value === Infinity
                          ? "Unlimited"
                          : value}
                      </div>
                    </div>
                  </div>
                ))}
                {isEnterprise &&
                  enterpriseFeatures.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20"
                    >
                      <StarIcon className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {feature}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Exclusive Enterprise Feature
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Checkout Section */}
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700/20 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-blue-900 dark:text-gray-100">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400 font-bold">
                      Email
                    </label>
                    <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100 mt-1">
                      {email || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400 font-bold">
                      Phone
                    </label>
                    <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100 mt-1">
                      {phone || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/20 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between py-1">
                  <h3 className="text-lg font-medium text-blue-900 dark:text-gray-100">
                    Coupon Code
                  </h3>
                  {!couponState.isValid && (
                    <Button
                      size="xs"
                      variant={couponState.isShow ? `destructive` : `ghost`}
                      onClick={() => {
                        setCouponState((prev) => ({
                          ...prev,
                          isShow: !prev.isShow,
                        }));
                        saveToLocalStorage(
                          STORAGE_KEYS.SHOW_COUPON,
                          !couponState.isShow
                        );
                      }}
                    >
                      {couponState.isShow ? <Minus /> : <Plus />}
                    </Button>
                  )}
                </div>

                {couponState.isShow && (
                  <div className="mt-2 flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Enter your coupon code"
                      value={couponState.code}
                      onChange={(e) =>
                        setCouponState((prev) => ({
                          ...prev,
                          code: e.target.value,
                          hasChanged: prev.code !== e.target.value,
                          isValid: prev.code === e.target.value && prev.isValid,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && couponState.code.trim()) {
                          handleCouponApply();
                        }
                      }}
                    />
                    <Button
                      variant={couponState.isValid ? "default" : "premium"}
                      size="md"
                      disabled={
                        !couponState.code.trim() || // Disabled if empty
                        couponState.isValidating || // Disabled while validating
                        (couponState.isValid && !couponState.hasChanged) // Disabled if already valid and unchanged
                      }
                      className="flex-shrink-0"
                      onClick={() => handleCouponApply()}
                    >
                      {couponState.isValidating ? (
                        <SpinnerIcon size="sm" color="white" />
                      ) : couponState.isValid ? (
                        "Applied"
                      ) : (
                        "Apply"
                      )}
                    </Button>
                  </div>
                )}

                {/* Coupon status messages */}
                {couponState.isValidating ? (
                  <div className="mt-2 text-sm text-blue-600">
                    Validating coupon...
                  </div>
                ) : couponState.isValid ? (
                  <div className="mt-2 text-sm text-green-600 dark:text-green-400 font-medium">
                    {couponState.discount.trial > 0
                      ? `🎉 You've unlocked a ${couponState.discount.trial}-day free trial!`
                      : couponState.discount.percentage > 0
                      ? `✅ ${couponState.discount.percentage}% discount applied!`
                      : `✅ ₹${couponState.discount.fixed} discount applied!`}
                  </div>
                ) : couponState.code &&
                  couponState.error &&
                  !couponState.isValid &&
                  !couponState.isValidating ? (
                  <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                    Invalid coupon code. Please try another one.
                  </div>
                ) : null}
              </div>

              {/* Price Summary */}
              {prices && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-300">
                      Subtotal:
                    </span>
                    <span className="font-medium">
                      ₹
                      {prices.base.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-300">
                      Tax (18% GST):
                    </span>
                    <span className="font-medium">
                      ₹
                      {prices.tax.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-300">
                      Discount:
                    </span>
                    <span className="font-medium flex items-center gap-1">
                      ₹
                      {prices.discount.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      {couponState.discount.percentage > 0 && (
                        <span className="text-green-600 dark:text-green-400">
                          ({couponState.discount.percentage}% OFF)
                        </span>
                      )}
                      {couponState.discount.fixed > 0 && (
                        <span className="text-green-600 dark:text-green-400">
                          (₹
                          {couponState.discount.fixed.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                          )
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-lg text-gray-900 dark:text-gray-200 font-bold">
                      Total Amount:
                    </span>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      ₹
                      {prices.total.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              )}

              {/* Payment Action */}
              {plan.prices ? (
                <div className="space-y-4">
                  {trialDays > 0 && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                      To begin your subscription, a refundable amount of ₹5 will
                      be charged now. ECODrIx will then charge
                      <span className="font-bold px-2">
                        ₹{" "}
                        {prices?.total.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      every {selectedDuration === "monthly" ? "month" : "year"}{" "}
                      starting on {formattedTrialEndDate}.
                    </div>
                  )}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAgreed}
                      onChange={(e) => setIsAgreed(e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms of Service
                      </Link>
                      ,{" "}
                      <Link
                        href="/privacy"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Privacy Policy
                      </Link>
                      , and authorize ECODrIx to charge my payment method for
                      the selected plan.
                    </span>
                  </label>

                  <Button
                    variant="premium"
                    size="lg"
                    fullWidth={true}
                    onClick={handleCheckout}
                    disabled={
                      !isAgreed ||
                      paymentStatus.loading ||
                      (couponState.isShow &&
                        !couponState.code &&
                        !couponState.isValid)
                    }
                  >
                    {paymentStatus.loading ? (
                      <>
                        <SpinnerIcon
                          className="w-5 h-5 animate-spin"
                          color="red"
                        />
                        Processing...
                      </>
                    ) : (
                      <>
                        {trialDays > 0
                          ? "Start Trial"
                          : `Pay ₹${prices?.total.toLocaleString("en-IN", {
                              maximumFractionDigits: 2,
                            })}`}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    {`Your payment is secured with 256-bit SSL encryption. We
                    don't store your payment details.`}
                  </p>
                </div>
              ) : (
                plan.name.toLowerCase() !== "free" && (
                  <div className="text-center py-6 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      Custom Enterprise Solution
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Contact our sales team to discuss your enterprise
                      requirements and get a tailored quote
                    </p>
                    <button
                      onClick={() => router.push("/contact")}
                      className="w-full py-3 px-6 rounded-lg font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
                    >
                      Contact Sales Team
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const LoadingSkeleton = () => (
  <div className="w-full p-4 sm:p-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-y-auto scrollbar-transparent">
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="w-24 h-6" />
        <Skeleton className="w-64 h-8" />
        <Skeleton className="w-5 h-5" />
      </div>

      {/* Plan Card Skeleton */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Plan Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="w-32 h-6" />
              <Skeleton className="w-48 h-4" />
            </div>
          </div>
          <Skeleton className="w-32 h-10" />
        </div>

        {/* Billing Cycle Skeleton */}
        <div className="mb-8">
          <Skeleton className="w-48 h-6 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
          </div>
        </div>

        {/* Features Skeleton */}
        <div className="mb-8">
          <Skeleton className="w-48 h-6 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Checkout Section Skeleton */}
        <div className="space-y-6">
          <div className="space-y-4">
            <Skeleton className="w-48 h-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </div>
          </div>

          {/* Price Summary Skeleton */}
          <div className="space-y-2">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-6 mt-4" />
          </div>

          {/* Payment Button Skeleton */}
          <div className="space-y-4">
            <Skeleton className="w-full h-12 rounded-lg" />
            <Skeleton className="w-full h-4" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PlanInfoCheckoutPage;
