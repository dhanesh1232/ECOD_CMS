"use client";
import { useToast } from "@/components/ui/toast-provider";
import { PLANS, TAX_RATES } from "@/config/pricing.config";
import { billingService } from "@/lib/client/billing";
import { decryptData, encryptData } from "@/utils/encryption";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useState, useRef } from "react";

const PlanInfoCheckoutPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [selectedDuration, setSelectedDuration] = useState("monthly");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const showToast = useToast();
  const { email, phone, plan_name } = formData;
  const hasShownToast = useRef(false);

  const plan = PLANS[plan_name?.toLowerCase()];
  const isEnterprise = plan?.name.toLowerCase() === "enterprise";
  const enterpriseFeatures = [
    "Dedicated Account Manager",
    "24/7 Priority Support",
    "Custom SLAs",
    "On-premise Deployment",
    "Custom AI Training",
  ];

  useEffect(() => {
    const getPathquery = () => {
      const decrypted = {
        email: decryptData(searchParams.get("em")),
        phone: decryptData(searchParams.get("pn")),
        plan_name: decryptData(searchParams.get("plan_name")),
      };

      const isMissing =
        !decrypted.plan_name || !decrypted.phone || !decrypted.email;

      if (isMissing && !hasShownToast.current) {
        showToast({
          title: "Missing Profile",
          description: "Please update missing profile completion",
          variant: "warning",
        });
        hasShownToast.current = true;
        setTimeout(() => router.back(), 3000);
      }
      setFormData(decrypted);
    };
    getPathquery();
  }, [searchParams, showToast, router]);

  // Add tax calculations
  const calculatePrices = () => {
    if (!plan || !plan.prices) return null;
    const tax = plan.prices[selectedDuration] * TAX_RATES.INR;
    const subtotal = plan.prices[selectedDuration] - tax;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };
  const prices = calculatePrices();

  const handlePlanChange = (newPlanKey) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("plan_name", encryptData(newPlanKey));
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleCheckout = async () => {
    if (!isAgreed) {
      showToast({
        title: "Agreement Required",
        description: "Please accept the terms and conditions",
        variant: "warning",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const total_funds = plan.prices[selectedDuration] * 100;
      console.log(total_funds);
      const order = await billingService.createPaymentOrder({
        planId: plan_name,
        amount: total_funds,
        currency: "INR",
        period: selectedDuration,
      });
      console.log(order);
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "ECODrIx",
        description: `${plan_name} ${selectedDuration} Subscription`,
        order_id: order.id,
        prefill: {
          email: formData?.email,
          contact: formData?.phone,
        },
        handler: async (response) => {
          try {
            await billingService.verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              planId: plan_name,
              currency: order.currency,
              period: selectedDuration,
            });
            showToast({
              title: "Payment Successful",
              description: `You've upgraded to ${plan_name} plan!`,
            });
            razorpay.close();
          } catch (err) {
            showToast({
              title: "Payment Verification Failed",
              description: err.message,
              variant: "warning",
            });
          }
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      showToast({
        title: "Payment Error",
        description: "Failed to initialize payment gateway",
        variant: "error",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!plan)
    return <div className="p-6 text-center">Loading plan details...</div>;

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="w-full p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Complete Your Purchase
            </h1>
            <div />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
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
                      <span className="capitalize font-medium text-blue-600">
                        {selectedDuration}
                      </span>
                    </p>
                  )}
                </div>
              </div>
              <select
                value={plan_name?.toLowerCase()}
                onChange={(e) => handlePlanChange(e.target.value)}
                className="mt-2 sm:mt-0 bg-transparent border-b-2 border-gray-200 focus:border-blue-500 outline-none dark:text-gray-100"
              >
                {Object.entries(PLANS)
                  .filter(([key, p]) => p.name.toLowerCase() !== "free")
                  .map(([key, p]) => (
                    <option key={key} value={key} className="dark:bg-gray-800">
                      {p.name}
                    </option>
                  ))}
              </select>
            </div>

            {plan.prices && (
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
                  Choose Billing Cycle
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(plan.prices).map(([duration, price]) => (
                    <button
                      key={duration}
                      onClick={() => setSelectedDuration(duration)}
                      className={`p-4 rounded-xl border-2 transition-all relative overflow-hidden ${
                        selectedDuration === duration
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                      }`}
                    >
                      {duration === "yearly" && (
                        <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-bl-lg transform rotate-12 translate-x-2 -translate-y-1">
                          20% OFF
                        </div>
                      )}
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {duration.charAt(0).toUpperCase() + duration.slice(1)}
                        </div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                          ₹{price.toLocaleString("en-IN")}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          per {duration.replace("ly", "")}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
                Plan Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(plan.features).map(([feature, value]) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/30"
                  >
                    <div className="mt-1">
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
                      <div className="font-medium text-gray-900 dark:text-gray-100">
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
                      <StarIcon className="w-5 h-5 text-purple-500 flex-shrink-0" />
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

            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700/20 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2 text-blue-900 dark:text-gray-100">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400 font-bold">
                      Email
                    </label>
                    <p className="font-medium text-gray-900 dark:text-gray-100 mt-0">
                      {email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400 font-bold">
                      Phone
                    </label>
                    <p className="font-medium text-gray-900 dark:text-gray-100 mt-0">
                      {phone}
                    </p>
                  </div>
                </div>
              </div>
              {prices && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-300">
                      Subtotal:
                    </span>
                    <span className="font-medium">
                      ₹
                      {prices.subtotal.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-300">
                      Tax (18%):
                    </span>
                    <span className="font-medium">
                      ₹
                      {prices.tax.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-900 dark:text-gray-200 font-bold">
                      Total:
                    </span>
                    <span className="font-bold">
                      ₹
                      {prices.total.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              )}

              {plan.prices ? (
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAgreed}
                      onChange={(e) => setIsAgreed(e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      I agree to the{" "}
                      <a
                        href="/terms"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>

                  <button
                    onClick={handleCheckout}
                    disabled={!isAgreed || isProcessing}
                    className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors ${
                      !isAgreed || isProcessing
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isProcessing
                      ? "Processing..."
                      : `Pay ₹${prices?.total.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        })}`}
                  </button>
                </div>
              ) : (
                plan.name.toLowerCase() !== "free" && (
                  <div className="text-center py-6 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      Custom Enterprise Solution
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Contact our sales team to discuss your enterprise
                      requirements
                    </p>
                    <button
                      onClick={() => router.push("/contact")}
                      className="w-full py-3 px-6 rounded-lg font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors"
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

// Icons
const ArrowLeftIcon = (props) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);

const CheckCircleIcon = (props) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const XCircleIcon = (props) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const InformationCircleIcon = (props) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const StarIcon = (props) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

export default PlanInfoCheckoutPage;
