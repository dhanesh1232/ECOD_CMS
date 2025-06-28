"use client";

import { useState } from "react";
import { AlertTriangle, Zap, XCircle, Loader, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return "Invalid date";
  const day = String(date.getDate()).padStart(2, "0"); // Ensure two-digit day
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure two-digit month
  const year = String(date.getFullYear()).slice(-2); // Extract last two digits of the year
  return `${month}/${day}/${year}`; // Return in MM/DD/YY format
};

const CancellationModal = ({
  open,
  onOpenChange,
  subscription,
  onCancel,
  onPause,
  onReactivate,
}) => {
  const [processing, setProcessing] = useState(false);
  const [actionType, setActionType] = useState(null);

  const handleAction = async (action) => {
    setProcessing(true);
    setActionType(action);
    try {
      if (action === "reactivate") {
        await onReactivate();
      } else if (action === "pause") {
        await onPause();
      } else {
        await onCancel();
      }
      onOpenChange(false);
    } finally {
      setProcessing(false);
      setActionType(null);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-4">
            {subscription?.status === "canceled" ? (
              <Zap className="h-6 w-6" />
            ) : (
              <AlertTriangle className="h-6 w-6" />
            )}
            <AlertDialogTitle>
              {subscription?.status === "canceled"
                ? "Reactivate Subscription"
                : "Cancel Subscription"}
            </AlertDialogTitle>
          </div>

          <AlertDialogDescription asChild>
            <div className="space-y-3">
              {subscription?.status === "canceled" ? (
                <>
                  <p>
                    Reactivating will restore your {subscription.plan} plan
                    benefits immediately.
                  </p>
                  <p className="font-medium">
                    Next payment: {formatDate(subscription.currentPeriodEnd)}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Your access will continue until{" "}
                    {formatDate(subscription.currentPeriodEnd)}. Choose an
                    option:
                  </p>

                  <div className="p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Pause Options</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <span className="">Pause Subscription</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAction("pasuse")}
                          disabled={processing}
                        >
                          {processing && actionType === "pause" ? (
                            <Loader className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <Pause className="h-4 w-4 mr-2" />
                          )}
                          Pause
                        </Button>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={processing}>
            {subscription?.status === "canceled" ? "Later" : "Keep Plan"}
          </AlertDialogCancel>

          {subscription?.status === "canceled" ? (
            <Button
              variant="link"
              onClick={() => handleAction("reactivate")}
              disabled={processing}
            >
              {processing && actionType === "reactivate" ? (
                <Loader className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Zap className="h-4 w-4 mr-2" />
              )}
              Reactivate Plan
            </Button>
          ) : (
            <Button
              variant="destructive"
              onClick={() => handleAction("cancel")}
              disabled={processing}
            >
              {processing && actionType === "cancel" ? (
                <Loader className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <XCircle className="h-4 w-4 mr-2" />
              )}
              Confirm Cancellation
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancellationModal;
