"use client";
import { SpinnerIcon } from "@/public/Images/svg_ecod";
import { Button } from "../ui/button";
import { useToast } from "../ui/toast-provider";
import { useRef } from "react";
import { billingService } from "@/lib/client/billing";
import Script from "next/script";

export function PayButton({
  workspaceId,
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
}) {
  const showToast = useToast();
  const toastRef = useRef(false);

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
}
