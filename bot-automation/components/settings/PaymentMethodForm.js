"use client";

import { useState } from "react";
import {
  CreditCard,
  AlertTriangle,
  RotateCw,
  Loader,
  Wallet,
  IndianRupee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const PaymentMethodForm = ({ subscription, onUpdatePaymentMethod }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpdate = async () => {
    setIsProcessing(true);
    try {
      await onUpdatePaymentMethod();
    } finally {
      setIsProcessing(false);
    }
  };

  const getPaymentMethodIcon = (type) => {
    switch (type) {
      case "card":
        return <CreditCard className="h-5 w-5" />;
      case "upi":
        return <IndianRupee className="h-5 w-5" />;
      case "wallet":
        return <Wallet className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  const renderPaymentDetails = () => {
    if (!subscription?.paymentMethod) {
      return (
        <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800/50">
          <CreditCard className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          <span className="text-sm text-yellow-700 dark:text-yellow-300">
            No payment method on file
          </span>
        </div>
      );
    }

    const { paymentMethod } = subscription;
    const paymentType = paymentMethod.type || "card";

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
          <div className="text-gray-600 dark:text-gray-400 flex-shrink-0">
            {getPaymentMethodIcon(paymentType)}
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                {paymentMethod.brand || paymentMethod.name || "Payment Method"}
              </h4>
              <Badge variant="outline" className="text-xs">
                {paymentType.toUpperCase()}
              </Badge>
            </div>

            {paymentType === "card" && (
              <>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ending in {paymentMethod.last4}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Expires {paymentMethod.expMonth.toString().padStart(2, "0")}/
                  {paymentMethod.expYear.toString().slice(-2)}
                </p>
              </>
            )}

            {paymentType === "upi" && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                UPI ID: {paymentMethod.upiId || "••••••••@upi"}
              </p>
            )}
          </div>
        </div>

        {subscription.status === "past_due" && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Payment Required</AlertTitle>
            <AlertDescription>
              Your subscription renewal failed. Please update your payment
              method.
            </AlertDescription>
          </Alert>
        )}

        {paymentMethod.expiresSoon && (
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Payment Method Expiring Soon</AlertTitle>
            <AlertDescription>
              Your {paymentType} will expire soon. Please update your payment
              method to avoid service interruption.
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 space-y-6">
      <div className="flex items-center gap-3">
        <CreditCard className="h-6 w-6 text-blue-500 dark:text-blue-400" />
        <h3 className="text-lg font-semibold">Payment Method</h3>
      </div>

      {subscription ? (
        <div className="space-y-6">
          {renderPaymentDetails()}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleUpdate}
              disabled={isProcessing}
              className="w-full sm:w-auto gap-2"
              variant={
                subscription.status === "past_due" ? "destructive" : "outline"
              }
            >
              {isProcessing ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <RotateCw className="h-4 w-4" />
                  {subscription.status === "past_due"
                    ? "Fix Payment Method"
                    : "Update Payment"}
                </>
              )}
            </Button>

            {subscription?.paymentMethod && (
              <Button
                variant="ghost"
                className="w-full sm:w-auto"
                onClick={() => window.open("/docs/payment-methods", "_blank")}
              >
                Learn about payment methods
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default PaymentMethodForm;
