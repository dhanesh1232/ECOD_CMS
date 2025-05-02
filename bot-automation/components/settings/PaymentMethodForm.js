"use client";

import { useState } from "react";
import { CreditCard, AlertTriangle, RotateCw, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

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

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
          <CreditCard className="h-6 w-6 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          <div className="space-y-1">
            <h4 className="font-medium text-gray-900 dark:text-gray-100">
              {subscription.paymentMethod.brand || "Credit Card"} ending in{" "}
              {subscription.paymentMethod.last4}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Expires{" "}
              {subscription.paymentMethod.expMonth.toString().padStart(2, "0")}/
              {subscription.paymentMethod.expYear.toString().slice(-2)}
            </p>
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
