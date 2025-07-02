"use client";
import { SpinnerIcon } from "@/public/Images/svg_ecod";
import { Button } from "../ui/button";
import { useToast } from "../ui/toast-provider";
import { useRef, useImperativeHandle, forwardRef } from "react";
import { billingService } from "@/lib/client/billing";
import Script from "next/script";

export const PayButton = forwardRef(function PayButton(
  {
    workspaceId,
    onSetModal,
    onShowMessage,
    agree,
    onCompleteBilling,
    status,
    paymentStatus,
    trial,
    price,
    plan_name,
    plan,
    onPaymentStatus,
    cycle,
    profile,
    currency = "INR",
    shown,
    couponCode,
  },
  ref
) {
  const showToast = useToast();
  const toastRef = useRef(false);

  useImperativeHandle(ref, () => ({
    startVerification: onHandleVerificationProccess,
  }));
  const onHandleVerificationProccess = async () => {
    // Set initial verifying state
    console.log("🔄 Starting payment verification process...");
    onPaymentStatus(paymentStatus.VERIFYING);
    onShowMessage({
      title: "Verifying Payment",
      description: "We're currently verifying your payment. Please wait...",
    });
    onSetModal(true);

    try {
      // In testing mode - simulate network delay (1-3 seconds)
      const minDelay = 1000;
      const maxDelay = 3000;
      const delayTime =
        Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;

      // Simulate API call with timeout
      const verificationResult = await new Promise(async (resolve, reject) => {
        // Set timeout as a safety net (real API would have this too)
        const timeoutId = setTimeout(() => {
          reject({
            status: paymentStatus.ERROR,
            title: "Verification Timeout",
            description:
              "Payment verification took too long. Please try again.",
          });
        }, 10000); // 10 second timeout

        try {
          // Simulate network delay
          await new Promise((res) => setTimeout(res, delayTime));

          // Simulate different response scenarios
          const scenarios = [
            {
              status: paymentStatus.SUCCESS,
              probability: 0.6,
              data: {
                title: "Payment Verified",
                description: "Your subscription is now active!",
                metadata: {
                  /* can add additional success data */
                },
              },
            },
            {
              status: paymentStatus.DELAY,
              probability: 0.3,
              data: {
                title: "Verification in Progress",
                description:
                  "Your payment is being processed. This may take a few minutes.",
                metadata: { estimatedTime: "2-5 minutes" },
              },
            },
            {
              status: paymentStatus.ERROR,
              probability: 0.1,
              data: {
                title: "Verification Failed",
                description:
                  "We couldn't verify your payment. Please try again.",
                metadata: { errorCode: "SIMULATED_ERROR" },
              },
            },
          ];

          // Select scenario based on probability
          const random = Math.random();
          let cumulativeProbability = 0;
          let selectedScenario = scenarios[0];

          for (const scenario of scenarios) {
            cumulativeProbability += scenario.probability;
            if (random <= cumulativeProbability) {
              selectedScenario = scenario;
              break;
            }
          }

          clearTimeout(timeoutId);
          resolve({
            status: selectedScenario.status,
            ...selectedScenario.data,
          });
        } catch (error) {
          clearTimeout(timeoutId);
          reject({
            status: paymentStatus.ERROR,
            title: "Verification Error",
            description: "An unexpected error occurred during verification.",
            error: error,
          });
        }
      });

      // Handle successful verification response
      onPaymentStatus(verificationResult.status);
      onShowMessage({
        title: verificationResult.title,
        description: verificationResult.description,
      });

      console.log("✅ Verification result:", verificationResult);

      // For success case, add automatic redirection
      if (verificationResult.status === paymentStatus.SUCCESS) {
        // Track successful payment (analytics, etc.)
        console.log("💰 Payment successfully verified");

        // Optional: Add delay before auto-redirect
        await new Promise((res) => setTimeout(res, 3000));
        // router.push('/dashboard'); // Uncomment when ready
      }
    } catch (error) {
      console.error("❗ Payment verification error:", error);

      // Enhanced error handling
      const errorTitle = error.title || "Verification Failed";
      let errorDescription = error.description || "Please try again later.";

      // Add specific error handling if available
      if (error.error?.code === "NETWORK_ERROR") {
        errorDescription =
          "Network connection failed. Please check your internet.";
      }

      onPaymentStatus(paymentStatus.ERROR);
      onShowMessage({
        title: errorTitle,
        description: errorDescription,
      });
    } finally {
      // Any cleanup logic can go here
      console.log("🏁 Verification process completed");
    }
  };

  const handleCheckout = async () => {
    if (!agree) {
      if (!toastRef.current) {
        showToast({
          title: "Agreement Required",
          description: "Please accept the terms and conditions to proceed",
          variant: "warning",
        });
        return;
      }
    }
    if (!onCompleteBilling()) {
      showToast({
        title: "Billing Details Required",
        description:
          "Please complete your billing information before proceeding",
        variant: "warning",
      });
      return;
    }
    if (!plan || !plan_name || !price) {
      showToast({
        title: "Invalid Selection",
        description: "Please select a valid plan and duration",
        variant: "warning",
      });
      return;
    }

    const publicKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY;
    if (!publicKey) {
      showToast({
        title: "Configuration Error",
        description: "Payment gateway is not properly configured",
        variant: "warning",
      });
      return;
    }
    const data = {
      planId: plan._id,
      cycle,
      amount: price,
      currency,
      couponCode,
    };
    try {
      onPaymentStatus(paymentStatus.LOADING);
      const res = await billingService.createPaymentOrder(workspaceId, data);
      if (res.ok === false && res.status !== 200) {
        const value = await res.json();
        console.log(value, "value");
        onPaymentStatus(paymentStatus.IDLE);
        throw new Error(value.message || "Payment initiation failed");
      }
      onPaymentStatus(paymentStatus.IDLE);
      const options = {
        key: publicKey,
        amount: res.amount,
        currency: res.currency,
        name: "ECODrIx",
        description: `${plan.name} ${cycle} Subscription`,
        ...(couponCode
          ? { order_id: res.id, save: true, recurring: true }
          : { subscription_id: res.id }),
        prefill: {
          name: profile?.companyName,
          email: profile?.email,
          contact: profile?.phone,
        },
        notes: {
          plan: plan.name,
          duration: cycle,
          price: res.amount,
          currency: res.currency,
        },
        handler: async (response) => {
          if (couponCode && response.razorpay_order_id) {
            try {
              const verify = await billingService.verifyPayment(workspaceId, {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                planId: plan._id,
                cycle,
                plan_name: plan.name,
                amount: res.amount,
                currency: res.currency,
                couponCode,
                customer_id: res.notes.customer_id,
              });
              if (
                verify.status !== 200 &&
                typeof verify.status === "number" &&
                !verify.ok
              ) {
                const value = await verify.json();
                onPaymentStatus(paymentStatus.IDLE);
                throw new Error(value.message || "Payment failed");
              }
              console.log(verify);
              if (!toastRef.current) {
                showToast({
                  title: "Success",
                  description: "Payment success",
                  variant: "success",
                });
                toastRef.current = true;
              }
            } catch (err) {
              if (!toastRef.current) {
                if (!toastRef.current) {
                  showToast({
                    description: "Payment failed",
                    variant: "destructive",
                    title: "Failed",
                  });
                  toastRef.current = true;
                }
              }
            }
          } else {
            if (!response?.razorpay_subscription_id) {
              throw new Error("Payment failed - no subscription ID");
            }
            console.log(response);
          }
        },
        modal: {
          ondismiss: async () => {
            console.log(res.id);
            await billingService.updateFailedPayment(workspaceId, res.id);
            if (!toastRef.current) {
              showToast({
                description: "Payment failed",
                variant: "destructive",
                title: "Failed",
              });
            }
          },
        },
      };
      const timer = res.expire_by * 1000;
      console.log(timer);
      if (window.Razorpay) {
        const rzy = new window.Razorpay(options);
        try {
          rzy.open(); // Preferred
        } catch (err) {
          window.open(res.short_url, "_blank"); // Fallback
        }
      } else {
        window.open(res.short_url, "_blank");
      }
    } catch (err) {
      if (!toastRef.current) {
        showToast({
          description: err.message || "Unable process checkout",
          variant: "destructive",
          title: "Failed",
        });
      }
    }
  };
  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <Button
        variant="premium"
        size="lg"
        fullWidth={true}
        onClick={handleCheckout}
        className="h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all relative overflow-hidden"
        disabled={
          !agree ||
          !onCompleteBilling() ||
          status === paymentStatus.LOADING ||
          (shown && !couponCode)
        }
      >
        {status === paymentStatus.LOADING ? (
          <>
            <SpinnerIcon className="w-5 h-5 animate-spin mr-2" />
            Processing...
          </>
        ) : (
          <>
            <span className="relative z-10">
              {trial > 0 ? "Start Free Trial" : "Complete Payment"}
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 hover:opacity-100 transition-opacity"></span>
          </>
        )}
      </Button>
    </>
  );
});
