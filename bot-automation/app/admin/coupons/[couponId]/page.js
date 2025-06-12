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
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { format, formatDistanceToNow } from "date-fns";
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

export default function CouponViewPage() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
  const couponId = params.couponId;
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCoupon = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await AdminServices.getCoupon(couponId);

      if (!response.ok && response.status) {
        throw new Error(response.message || "Failed to fetch coupon");
      }

      setCoupon(response.coupon);
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [couponId, toast]);

  useEffect(() => {
    if (couponId) fetchCoupon();
  }, [couponId, fetchCoupon]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        description: "Coupon code copied to clipboard",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Failed to copy code",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const res = await AdminServices.deleteCoupon(couponId);
      if (res.status && !res.ok) {
        toast({
          variant: "destructive",
          description: "Failed to Delete code",
        });
      } else {
        toast({
          variant: "success",
          description: "Successfully Deleted",
        });
        router.push(`/admin/coupons`);
      }
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Failed to Delete code",
      });
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      active:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      upcoming: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      expired: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
      archived:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    };
    return (
      variants[status] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    );
  };

  const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
      style: "currency",
      currency: currency || "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !coupon) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-destructive">{error || "Coupon not found"}</p>
        <Button onClick={fetchCoupon} variant="outline">
          <RefreshCcw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  const usagePercentage = Math.min(
    (coupon.usedCount / coupon.usageLimit) * 100,
    100
  );

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
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
          Coupon Details
        </h1>
        <Button
          variant="info"
          onClick={() => router.push(`/admin/coupons/${couponId}/edit`)}
          className="gap-2"
        >
          <Edit className="h-4 w-4" />
          <span className="hidden sm:block">Edit</span>
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl flex items-center gap-3">
                {coupon.title}
                <Badge
                  className={`capitalize ${getStatusBadge(coupon.status)}`}
                >
                  {coupon.status}
                </Badge>
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
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Coupon Code</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="mt-2 flex items-center gap-2 text-lg font-mono"
                        onClick={() => copyToClipboard(coupon.code)}
                      >
                        <Clipboard className="h-4 w-4" />
                        {coupon.code}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Click to copy</TooltipContent>
                  </Tooltip>
                </div>

                <div>
                  <Label>Discount Value</Label>
                  <p className="mt-2 text-2xl font-semibold">
                    {coupon.discountType === "percent"
                      ? `${coupon.discountValue}%`
                      : formatCurrency(coupon.discountValue, coupon.currency)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {coupon.discountType === "percent"
                      ? "Percentage discount"
                      : coupon.discountType === "fixed"
                      ? "Fixed amount discount"
                      : "Free trial"}
                  </p>
                </div>
              </div>

              {coupon.rules?.length > 0 && (
                <div className="space-y-2">
                  <Label>Rules</Label>
                  <ul className="space-y-2">
                    {coupon.rules.map((rule) => (
                      <li key={rule._id} className="flex items-start gap-2">
                        <div className="mt-1">
                          {rule.isActive ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{rule.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {rule.conditionType}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Validity Period</Label>
                  <p className="mt-2">
                    {format(new Date(coupon.startDate), "PP")} -{" "}
                    {format(new Date(coupon.endDate), "PP")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(coupon.endDate), {
                      addSuffix: true,
                    })}
                  </p>
                </div>

                <div>
                  <Label>Usage</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        {coupon.usedCount} of {coupon.usageLimit} redemptions
                      </span>
                      <span>{Math.round(usagePercentage)}%</span>
                    </div>
                    <Progress value={usagePercentage} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Applicable Plans</Label>
                {coupon.applicablePlans?.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {coupon.applicablePlans.map((plan) => (
                      <Badge
                        key={plan}
                        variant="outline"
                        className="capitalize"
                      >
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
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t p-6">
          <div className="w-full flex justify-between items-center">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete()}
            >
              <Trash size={14} />
            </Button>
            <div className="space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="sm:text-sm text-xs"
                onClick={() => router.push("/admin/coupons")}
              >
                Back to List
              </Button>
              <Button
                size="sm"
                className="sm:text-sm text-xs"
                variant="primary"
                onClick={() => router.push(`/admin/coupons/${couponId}/edit`)}
              >
                Edit Coupon
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
