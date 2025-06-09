"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";
import { Skeleton } from "@/components/ui/skeleton";
import PlanSummaryCard from "@/components/settings/PlanSummaryCard";
import PaymentMethodForm from "@/components/settings/PaymentMethodForm";
import PaymentHistoryTable from "@/components/settings/PaymentHistoryTable";
import CancellationModal from "@/components/settings/CancellationModal";
import { encryptData } from "@/utils/encryption";
import { billingService } from "@/lib/client/billing";

const BillingPage = () => {
  const router = useRouter();
  const params = useParams();
  const workspaceId = params.workspaceId;
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subscription, setSubscription] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isLoadinghistory, setIsLoadingHistory] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const showToast = useToast();
  const toastRef = useRef(false);

  const fetchHistory = useCallback(async () => {
    try {
      setIsLoadingHistory(true);
      const history = await billingService.getPaymentHistory(workspaceId);
      if (history.status && !history.ok) {
        const data = await history.json();
        if (!toastRef.current) {
          showToast({ description: data.message, variant: "warning" });
          toastRef.current = true;
        }
        setIsLoadingHistory(false);
        return;
      }
      setPaymentHistory(history);
      setIsLoadingHistory(false);
    } catch (err) {
      if (!toastRef.current) {
        showToast({
          title: "Retry",
          description:
            err.message || "Failed to fetch subscription history data.",
          variant: "warning",
        });
        toastRef.current = true;
      }
    } finally {
      setIsLoadingHistory(false);
    }
  }, [showToast, workspaceId]);

  useEffect(() => {
    setTimeout(() => {
      toastRef.current = false;
    }, 10000);
  });

  const fetchSubscription = useCallback(async () => {
    if (!workspaceId) return;
    try {
      setIsProcessing(true);
      const data = await billingService.getSubscription(workspaceId);
      if (data.status && !data.ok) {
        const value = await data.json();
        if (!toastRef.current) {
          showToast({ description: value.message, variant: "warning" });
          toastRef.current = true;
        }
      }
      setSubscription(data?.data?.subscription);
      setError("");
      setIsProcessing(false);
    } catch (err) {
      showToast({ description: err.message, variant: "warning" });
    } finally {
      setIsProcessing(false);
      setLoading(false);
    }
  }, [showToast, workspaceId]);

  useEffect(() => {
    if (!workspaceId) return;
    fetchSubscription();
  }, [fetchSubscription, workspaceId, searchParams]);

  useEffect(() => {
    if (
      subscription?.plan.toLowerCase() !== "free" &&
      subscription &&
      workspaceId
    ) {
      fetchHistory();
    }
  }, [fetchHistory, subscription, workspaceId]);
  const handleRefresh = () => {
    if (subscription && workspaceId) {
      fetchHistory();
    }
  };

  const handlePlansTab = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    const en = encryptData(workspaceId);
    newParams.set("plans_comp", `user_${en}`);
    router.replace(`/${workspaceId}/plans?${newParams.toString()}`, {
      scroll: false,
    });
  };

  if (loading) {
    return (
      <div className="flex-1 p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64 rounded-lg" />
          <Skeleton className="h-6 w-48 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-4 text-center">
        <div className="p-4 bg-rose-100 dark:bg-rose-900/30 rounded-full">
          <AlertCircle className="h-12 w-12 text-rose-600 dark:text-rose-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Failed to Load Subscription
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">{error}</p>
        <div className="flex-col flex sm:flex-row gap-4 mt-4">
          <Button
            onClick={fetchSubscription}
            variant="outline"
            className="gap-2"
          >
            <RotateCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button asChild>
            <Link href="/support">Contact Support</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 p-2 py-4 sm:p-6 bg-background rounded-2xl space-y-8">
        <PlanSummaryCard
          subscription={subscription}
          isProcessing={isProcessing}
          onUpgrade={handlePlansTab}
          onCancel={() => setShowCancelModal(true)}
        />

        {subscription.plan.toLowerCase() !== "free" && (
          <div className="grid grid-cols-1 gap-6">
            <PaymentMethodForm
              subscription={subscription}
              onUpdatePaymentMethod={async () => {
                const res = await fetch("/api/billing/portal");
                const { url } = await res.json();
                window.location.href = url;
              }}
            />
            <PaymentHistoryTable
              onReload={handleRefresh}
              onRefresh={isLoadinghistory}
              paymentHistory={paymentHistory}
            />
          </div>
        )}

        <CancellationModal
          open={showCancelModal}
          onOpenChange={setShowCancelModal}
          subscription={subscription}
          onCancel={async () => {
            try {
              const res = await fetch("/api/subscription/cancel", {
                method: "POST",
              });
              if (!res.ok) throw new Error("Cancellation failed");
              fetchSubscription();
              if (!toastRef.current) {
                showToast({
                  title: "Success",
                  variant: "success",
                  description: "You have successfully cancelled current plan",
                });
                toastRef.current = true;
              }
            } catch (error) {
              if (!toastRef.current) {
                showToast({
                  title: "Cancellation Failed",
                  description: error.message,
                  variant: "destructive",
                });
                toastRef.current = true;
              }
            }
          }}
          onDowngrade={async () => {
            try {
              const res = await fetch("/api/downgrade", { method: "POST" });
              if (!res.ok) throw new Error("Downgrade failed");
              fetchSubscription();
              if (toastRef.current) {
                showToast({ title: "Downgraded to Free Plan" });
                toastRef.current = true;
              }
            } catch (error) {
              if (!toastRef.current) {
                showToast({
                  title: "Downgrade Failed",
                  description: error.message,
                  variant: "destructive",
                });
                toastRef.current = true;
              }
            }
          }}
        />
      </div>
    </>
  );
};

export default BillingPage;
