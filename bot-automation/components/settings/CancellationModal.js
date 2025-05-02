"use client";

import { useState } from "react";
import { AlertTriangle, Zap, XCircle, Loader, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { format } from "date-fns";

const formatDate = (dateString) => {
  console.log(dateString);
  const date = new Date(dateString);
  console.log(date);
  return isNaN(date) ? "Invalid date" : format(date, "MMM do, yyyy");
};

const CancellationModal = ({
  open,
  onOpenChange,
  subscription,
  onCancel,
  onDowngrade,
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
      } else if (action === "downgrade") {
        await onDowngrade();
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
                    Next payment: {formatDate(subscription.endDate)}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Your access will continue until{" "}
                    {formatDate(subscription.endDate)}. Choose an option:
                  </p>

                  <div className="p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Downgrade Options</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <span className="">Free Plan</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-blue-600 "
                          onClick={() => handleAction("downgrade")}
                          disabled={processing}
                        >
                          {processing && actionType === "downgrade" ? (
                            <Loader className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <ArrowDown className="h-4 w-4 mr-2" />
                          )}
                          Downgrade
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
            <AlertDialogAction
              onClick={() => handleAction("reactivate")}
              disabled={processing}
            >
              {processing && actionType === "reactivate" ? (
                <Loader className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Zap className="h-4 w-4 mr-2" />
              )}
              Reactivate Plan
            </AlertDialogAction>
          ) : (
            <AlertDialogAction
              onClick={() => handleAction("cancel")}
              disabled={processing}
            >
              {processing && actionType === "cancel" ? (
                <Loader className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <XCircle className="h-4 w-4 mr-2" />
              )}
              Confirm Cancellation
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancellationModal;
