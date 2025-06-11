"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";
import { AdminServices } from "@/lib/client/admin.service";
import { RefreshCcw, Edit, Loader2, MoveLeft, Clipboard } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CouponViewPage() {
  const params = useParams();
  const router = useRouter();
  const showToast = useToast();
  const couponId = params.couponId;
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toastRef = useRef(false);
  useEffect(() => {
    setTimeout(() => {
      toastRef.current = false;
    }, 10000);
  });

  const fetchCoupon = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await AdminServices.getCoupon(couponId);

      if (response.status && !response.ok) {
        throw new Error(response.message || "Failed to fetch coupon");
      }
      console.log(response);
      setCoupon(response.coupon);
    } catch (err) {
      setError(err.message);
      showToast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [couponId, showToast]);

  useEffect(() => {
    if (couponId) fetchCoupon();
  }, [couponId, fetchCoupon]);

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

  return (
    <div className="container mx-auto p-2 md:p-4">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/admin/coupons")}
          aria-label="Go back"
          title="Go back"
        >
          <MoveLeft />
        </Button>
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
          Coupon Details
        </h1>
        <Button
          onClick={() => router.push(`/admin/coupons/${couponId}/edit`)}
          variant="outline"
          className="gap-2"
        >
          <Edit className="h-4 w-4" />
          <span className="hidden sm:inline">Edit Coupon</span>
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{coupon.title}</CardTitle>
            <Badge className={`capitalize ${getStatusBadge(coupon.status)}`}>
              {coupon.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Created on {format(new Date(coupon.createdAt), "MMM dd, yyyy")}
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Coupon Code
                  </h3>
                  <Button
                    variant="outline"
                    value={coupon.code}
                    onClick={(e) => {
                      try {
                        const value = e.target.value;
                        navigator.clipboard.writeText(value);
                        if (!toastRef.current) {
                          showToast({
                            variant: "success",
                            description: `${value}Coupon copied successfully`,
                          });
                          toastRef.current = true;
                        }
                      } catch (err) {
                        if (!toastRef.current) {
                          showToast({
                            variant: "destructive",
                            description: err.message || "Unable to copy code",
                          });
                          toastRef.current = true;
                        }
                      }
                    }}
                    size="xs"
                    className="mt-1 flex items-center gap-1 text-lg font-mono bg-secondary text-secondary-foreground"
                  >
                    <Clipboard size={16} />
                    {coupon.code}
                  </Button>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Discount
                  </h3>
                  <p className="mt-1 text-xl font-semibold">
                    {coupon.discountType === "percent"
                      ? `${coupon.discountValue}%`
                      : coupon.currency === "INR"
                      ? `₹${coupon.discountValue.toFixed(2)}`
                      : `$${coupon.discountValue.toFixed(2)}`}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Currency
                  </h3>
                  <p className="mt-1 text-2xl font-semibold">
                    {coupon.currency}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Rules
                </h3>
                {coupon.rules?.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {coupon.rules.map((rule, index) => (
                      <li key={index} className="text-foreground">
                        {rule}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No rules defined</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Validity Period
                  </h3>
                  <p className="mt-1 text-foreground">
                    {format(new Date(coupon.startDate), "MMM dd, yyyy")} -{" "}
                    {format(new Date(coupon.endDate), "MMM dd, yyyy")}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Usage
                  </h3>
                  <p className="mt-1 text-foreground">
                    {coupon.usedCount} of {coupon.usageLimit} redemptions
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 dark:bg-gray-700">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{
                        width: `${Math.min(
                          (coupon.usedCount / coupon.usageLimit) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Applicable Plans
                </h3>
                {coupon.applicablePlans?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {coupon.applicablePlans.map((plan) => (
                      <Badge
                        key={plan}
                        variant="secondary"
                        className="capitalize"
                      >
                        {plan}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No plan restrictions</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
