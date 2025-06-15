"use client";

import { Button } from "@/components/ui/button";
import { AdminServices } from "@/lib/client/admin.service";
import {
  RefreshCcw,
  Edit,
  Loader2,
  MoveLeft,
  Clipboard,
  Check,
  X,
  Trash,
  Clock,
  Calendar,
  Globe,
  Copy,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { format, formatDistanceToNow, isAfter, isBefore } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast-provider";
import { formatCurrency } from "@/lib/client/utils";
import { CouponUsageChart } from "@/components/admin/coupons/CouponUsageChart";
import { StatusBadge } from "@/components/admin/coupons/StatusBadge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Skeleton } from "@/components/ui/skeleton";

export default function CouponViewPage() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
  const couponId = params.couponId;
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usageData, setUsageData] = useState([]);
  const [isRulesExpanded, setIsRulesExpanded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchCoupon = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await AdminServices.getCoupon(couponId);

      if (!response.ok && response.status) {
        throw new Error(response.message || "Failed to fetch coupon");
      }

      const fetchedCoupon = response.coupon;
      setCoupon(fetchedCoupon);

      // Check if coupon is expired
      const now = new Date();
      const endDate = new Date(fetchedCoupon.validity.end.date);
      if (isAfter(now, endDate)) {
        toast({
          title: "Notice",
          description: "This coupon has expired",
          variant: "default",
        });
      }

      // Fetch usage analytics
      const usageResponse = await AdminServices.getCouponUsage(couponId);
      if (usageResponse.data) {
        setUsageData(usageResponse.data);
      }
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [couponId, toast]);

  useEffect(() => {
    if (couponId) fetchCoupon();
  }, [couponId, fetchCoupon]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        description: "Copied to clipboard",
        action: {
          label: "Dismiss",
          onClick: () => {},
        },
      });
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Failed to copy",
      });
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const res = await AdminServices.updateCouponStatus(couponId, newStatus);
      if (res.success) {
        toast({
          variant: "success",
          description: `Coupon ${newStatus} successfully`,
        });
        fetchCoupon();
      }
    } catch (err) {
      toast({
        variant: "destructive",
        description: `Failed to ${newStatus} coupon: ${err.message}`,
      });
    }
  };

  const handleDelete = async () => {
    try {
      const confirmed = confirm(
        "Are you sure you want to delete this coupon? This action cannot be undone."
      );
      if (!confirmed) return;

      const res = await AdminServices.deleteCoupon(couponId);
      if (res.success) {
        toast({
          variant: "success",
          description: "Coupon deleted successfully",
        });
        router.push("/admin/coupons");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Failed to delete coupon: " + err.message,
      });
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchCoupon();
  };

  if (loading && !isRefreshing) {
    return (
      <div className="container mx-auto p-4 max-w-6xl space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-8 w-1/2" />
                  </div>
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </div>
                <Skeleton className="h-64 w-full" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !coupon) {
    return (
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error || "Coupon not found"}</AlertDescription>
          </Alert>
          <div className="flex gap-2">
            <Button onClick={fetchCoupon} variant="outline">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Retry
            </Button>
            <Button
              onClick={() => router.push("/admin/coupons")}
              variant="secondary"
            >
              <MoveLeft className="mr-2 h-4 w-4" />
              Back to Coupons
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const usagePercentage = Math.min(
    (coupon.usageLimits.usedCount / coupon.usageLimits.total) * 100,
    100
  );

  const isExpired = isAfter(new Date(), new Date(coupon.validity.end.date));

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/admin/coupons")}
          className="gap-2"
        >
          <MoveLeft className="h-4 w-4" />
          <span className="sm:block hidden">Back to Coupons</span>
        </Button>

        <div className="flex items-center gap-4">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
            Coupon Details
          </h1>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCcw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </Button>
          <Button
            variant="info"
            onClick={() => router.push(`/admin/coupons/${couponId}/edit`)}
            className="gap-2"
            disabled={isExpired}
          >
            <Edit className="h-4 w-4" />
            <span className="hidden sm:block">Edit</span>
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="gap-2"
          >
            <Trash className="h-4 w-4" />
            <span className="hidden sm:block">Delete</span>
          </Button>
        </div>
      </div>

      {isExpired && (
        <Alert variant="default" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>This coupon has expired</AlertTitle>
          <AlertDescription>
            It can no longer be used for new purchases.
          </AlertDescription>
        </Alert>
      )}

      <Card className="shadow-sm">
        <CardHeader className="border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl flex items-center gap-3">
                {coupon.title}
                <StatusBadge status={coupon.status} />
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Created{" "}
                {formatDistanceToNow(new Date(coupon.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            {coupon.interActions && (
              <div className="flex gap-3">
                {coupon.interActions.autoApply && (
                  <Badge variant="secondary" className="gap-1">
                    <Check className="h-3 w-3" /> Auto-apply
                  </Badge>
                )}
                {coupon.interActions.autoSuggest && (
                  <Badge variant="secondary" className="gap-1">
                    <Check className="h-3 w-3" /> Auto-suggest
                  </Badge>
                )}
                {coupon.interActions.showInBanner && (
                  <Badge variant="secondary" className="gap-1">
                    <Check className="h-3 w-3" /> Promoted
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <Label>Coupon Code</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2 text-lg font-mono flex-1"
                          onClick={() => copyToClipboard(coupon.code)}
                        >
                          <Clipboard className="h-4 w-4" />
                          {coupon.code}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Click to copy</TooltipContent>
                    </Tooltip>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(coupon.code)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Discount Value</Label>
                  <p className="mt-2 text-2xl font-semibold">
                    {coupon.discountType === "percent"
                      ? `${coupon.discountValue}%`
                      : coupon.discountType === "fixed"
                      ? formatCurrency(coupon.discountValue, coupon.currency)
                      : coupon.discountType === "free_shipping"
                      ? "Free Shipping"
                      : "Free Trial"}
                  </p>
                  {coupon.discountType === "percent" &&
                    coupon.maxDiscountAmount && (
                      <p className="text-sm text-muted-foreground">
                        Max discount:{" "}
                        {formatCurrency(
                          coupon.maxDiscountAmount,
                          coupon.currency
                        )}
                      </p>
                    )}
                  {coupon.minCartValue > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Min. purchase:{" "}
                      {formatCurrency(coupon.minCartValue, coupon.currency)}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Validity Period</Label>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {format(new Date(coupon.validity.start.date), "PP")} -{" "}
                        {format(new Date(coupon.validity.end.date), "PP")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {coupon.validity.start.time} -{" "}
                        {coupon.validity.end.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span>{coupon.validity.timezone}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {isExpired
                      ? "Expired"
                      : `Expires ${formatDistanceToNow(
                          new Date(coupon.validity.end.date),
                          { addSuffix: true }
                        )}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Usage Analytics */}
            <div className="space-y-4">
              <Label>Usage Analytics</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Redemptions</span>
                    <span>
                      {coupon.usageLimits.usedCount} /{" "}
                      {coupon.usageLimits.total}
                    </span>
                  </div>
                  <Progress
                    value={usagePercentage}
                    className="h-2"
                    indicatorClass={
                      usagePercentage > 90
                        ? "bg-red-500"
                        : usagePercentage > 70
                        ? "bg-amber-500"
                        : "bg-green-500"
                    }
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {Math.round(usagePercentage)}% utilized
                    {usagePercentage >= 90 && (
                      <span className="text-red-500 ml-2">
                        (Almost exhausted)
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm">
                    Per user limit:{" "}
                    <span className="font-medium">
                      {coupon.usageLimits.perUser || "Unlimited"}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {coupon.period === "both"
                      ? "Applies to monthly and yearly subscriptions"
                      : `Applies to ${coupon.period} subscriptions`}
                  </p>
                </div>
              </div>
              {usageData.length > 0 ? (
                <div className="mt-4 h-64">
                  <CouponUsageChart data={usageData} />
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
                  <p className="text-muted-foreground">
                    No usage data available yet
                  </p>
                </div>
              )}
            </div>

            {/* Rules Section */}
            {coupon.rules?.length > 0 && (
              <div className="space-y-2">
                <Collapsible
                  open={isRulesExpanded}
                  onOpenChange={setIsRulesExpanded}
                >
                  <div className="flex items-center justify-between">
                    <Label>Rules ({coupon.rules.length})</Label>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-9 p-0">
                        {isRulesExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent>
                    <ul className="space-y-2 mt-2">
                      {coupon.rules.map((rule) => (
                        <li
                          key={rule._id}
                          className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{rule.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {rule.conditionType}
                            </p>
                            {rule.description && (
                              <p className="text-sm mt-1">{rule.description}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Applicable Plans */}
            <div className="space-y-2">
              <Label>Applicable Plans</Label>
              {coupon.applicablePlans?.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {coupon.applicablePlans.map((plan) => (
                    <Badge key={plan} variant="outline" className="capitalize">
                      {plan}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground mt-2">
                  No plan restrictions
                </p>
              )}
            </div>

            {/* Metadata */}
            {coupon.metadata && (
              <div className="space-y-4">
                {coupon.metadata.tags?.length > 0 && (
                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {coupon.metadata.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {coupon.metadata.campaignId && (
                  <div className="space-y-2">
                    <Label>Campaign</Label>
                    <p className="text-sm mt-2">{coupon.metadata.campaignId}</p>
                  </div>
                )}
              </div>
            )}

            {/* Status Actions */}
            <div className="space-y-2">
              <Label>Status Actions</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {coupon.status === "active" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange("paused")}
                  >
                    Pause Coupon
                  </Button>
                )}
                {coupon.status === "paused" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange("active")}
                  >
                    Activate Coupon
                  </Button>
                )}
                {coupon.status === "archived" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange("active")}
                  >
                    Unarchive Coupon
                  </Button>
                )}
                {!["archived", "expired"].includes(coupon.status) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange("archived")}
                  >
                    Archive Coupon
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t p-6">
          <div className="w-full flex justify-between items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/admin/coupons")}
            >
              Back to List
            </Button>
            <div className="space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push(`/admin/coupons/${couponId}/edit`)}
                disabled={isExpired}
              >
                Edit Details
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={() =>
                  router.push(`/admin/coupons/${couponId}/analytics`)
                }
              >
                View Analytics
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
