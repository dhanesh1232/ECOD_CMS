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
import { encryptData } from "@/lib/client/crypto";
import { billingService } from "@/lib/client/billing";
import { BillingProfile } from "@/components/settings/billingProfile";
import { cn } from "@/lib/utils";
import { BillingNav } from "@/data/bot-links";
import { Separator } from "@/components/ui/separator";
import { OverlayLoader } from "@/components/animate/overlay_loader";

const BillingPage = () => {
  // Hooks and refs
  const router = useRouter();
  const params = useParams();
  const workspaceId = params.workspaceId;
  const searchParams = useSearchParams();
  const showToast = useToast();
  const toastRef = useRef(false);

  // State management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subscription, setSubscription] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const returnUrl = searchParams.get("return");
  const [activeTab, setActiveTab] = useState(() => {
    return returnUrl ? "billing" : "current-plan";
  });

  // Reset toast ref after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      toastRef.current = false;
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch subscription data
  const fetchSubscription = useCallback(async () => {
    if (!workspaceId) return;

    try {
      setIsProcessing(true);
      setLoading(true);

      const response = await billingService.getSubscription(workspaceId);

      if (response?.status && !response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch subscription");
      }

      setSubscription(response?.data?.subscription || null);
      setError("");
    } catch (err) {
      setError(err.message);
      if (!toastRef.current) {
        showToast({
          description: err.message,
          variant: "warning",
        });
        toastRef.current = true;
      }
    } finally {
      setIsProcessing(false);
      setLoading(false);
    }
  }, [workspaceId, showToast]);

  // Fetch payment history
  const fetchPaymentHistory = useCallback(async () => {
    if (
      !workspaceId ||
      !subscription ||
      subscription?.plan?.toLowerCase() === "free"
    )
      return;

    try {
      setIsLoadingHistory(true);
      const response = await billingService.getPaymentHistory(workspaceId);

      if (response?.status && !response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch payment history");
      }

      setPaymentHistory(response?.history || []);
    } catch (err) {
      if (!toastRef.current) {
        showToast({
          title: "Retry",
          description: err.message || "Failed to fetch payment history",
          variant: "warning",
        });
        toastRef.current = true;
      }
    } finally {
      setIsLoadingHistory(false);
    }
  }, [workspaceId, subscription, showToast]);

  // Initial data fetch
  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  // Fetch payment history when subscription changes
  useEffect(() => {
    fetchPaymentHistory();
  }, [fetchPaymentHistory]);

  // Handlers
  const handleRefresh = () => {
    fetchPaymentHistory();
  };

  const handlePlansTab = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    const encryptedId = encryptData(workspaceId);
    newParams.set("plans", `user_${encryptedId}`);
    router.replace(`/${workspaceId}/plans?${newParams.toString()}`, {
      scroll: false,
    });
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleCancelSubscription = async () => {
    try {
      const response = await fetch("/api/subscription/cancel", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Cancellation failed");
      }

      await fetchSubscription();

      showToast({
        title: "Success",
        variant: "success",
        description: "You have successfully cancelled your current plan",
      });
    } catch (err) {
      showToast({
        title: "Cancellation Failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setShowCancelModal(false);
    }
  };

  const handleDowngradeToFree = async () => {
    try {
      const response = await fetch("/api/downgrade", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Downgrade failed");
      }

      await fetchSubscription();

      showToast({
        title: "Success",
        description: "Downgraded to Free Plan",
      });
    } catch (err) {
      showToast({
        title: "Downgrade Failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setShowCancelModal(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <>
        <div className="flex-1 p-2 bg-white h-full dark:bg-gray-900 space-y-8">
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
        <OverlayLoader open={true} />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex-1 p-2 bg-white dark:bg-gray-900 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-4 text-center">
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

  // Main render
  return (
    <>
      <div className="sticky top-0 z-10 bg-transparent border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 md:space-x-6">
          {BillingNav.map((link) => (
            <Button
              variant="link"
              size="sm"
              onClick={() => handleTabChange(link.id)}
              key={link.id}
              className={cn(
                "text-xs sm:text-sm font-medium transition-colors",
                activeTab === link.id
                  ? "text-blue-500 border-b-2 border-blue-600"
                  : "text-muted-foreground hover:text-blue-600"
              )}
            >
              {link.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-0 bg-transparent border border-gray-200 dark:border-gray-700 transition-all duration-300 scrollbar-transparent h-[90%] sm:h-[96%] w-full overflow-y-auto">
        {activeTab === "current-plan" && (
          <PlanSummaryCard
            subscription={subscription}
            isProcessing={isProcessing}
            onUpgrade={handlePlansTab}
            onCancel={() => setShowCancelModal(true)}
          />
        )}

        {activeTab === "billing" && (
          <>
            <PaymentMethodForm
              subscription={subscription}
              onUpdatePaymentMethod={async () => {
                try {
                  const response = await fetch("/api/billing/portal");
                  const { url } = await response.json();
                  window.location.href = url;
                } catch (err) {
                  showToast({
                    title: "Error",
                    description: "Failed to load billing portal",
                    variant: "destructive",
                  });
                }
              }}
            />
            <Separator />
            <BillingProfile />
          </>
        )}
        {activeTab === "add-on" && <div className="">Add Ons</div>}

        {activeTab === "history-invoice" && (
          <PaymentHistoryTable
            onReload={handleRefresh}
            workspaceId={workspaceId}
            loading={isLoadingHistory}
            paymentHistory={paymentHistory}
          />
        )}

        <CancellationModal
          open={showCancelModal}
          onOpenChange={setShowCancelModal}
          subscription={subscription}
          onCancel={handleCancelSubscription}
          onPause={handleDowngradeToFree}
        />
      </div>
    </>
  );
};

export default BillingPage;
