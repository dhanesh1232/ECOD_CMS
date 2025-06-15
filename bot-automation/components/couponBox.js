"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle, Gift, Plus, Minus } from "lucide-react";

export default function CouponBox({
  workspaceId,
  plan,
  planPrice = 0,
  isFirstTimeUser,
  activeSubscriptionsCount,
  onCouponApplied,
  onHandleShown,
  appliedCoupon,
  isShown,
}) {
  const [couponCode, setCouponCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [error, setError] = useState("");
  const [hasAutoApplied, setHasAutoApplied] = useState(false);

  const validateCoupon = async (code) => {
    setIsLoading(true);
    setError("");
    setValidationResult(null);

    try {
      const response = await fetch(
        `/api/workspace/${workspaceId}/subscription/validate-coupon`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            workspaceId,
            plan,
            planPrice,
            isFirstTimeUser,
            activeSubscriptionsCount,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Validation failed");
      }

      setValidationResult(data);

      if (data.valid) {
        onCouponApplied(data.coupon);
      } else {
        onCouponApplied(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  // Auto-validate on mount for auto-apply coupons
  useEffect(() => {
    if (!hasAutoApplied) {
      validateCoupon("");
      setHasAutoApplied(true);
    }
  }, [hasAutoApplied]);

  const handleSubmit = (e) => {
    e.preventDefault();
    validateCoupon(couponCode);
  };

  const handleApplySuggestion = (suggestion) => {
    setCouponCode(suggestion.code);
    validateCoupon(suggestion.code);
  };

  const formatDiscountText = (coupon) => {
    if (!coupon) return "";

    switch (coupon.discountType) {
      case "percent":
        return `${coupon.discountValue}% OFF`;
      case "fixed":
        return `₹${coupon.discountValue} OFF`;
      case "trial":
        return `${coupon.discountValue} DAYS FREE TRIAL`;
      default:
        return "";
    }
  };

  const calculateDiscountAmount = (coupon) => {
    if (!coupon) return 0;

    switch (coupon.discountType) {
      case "fixed":
        return coupon.discountValue;
      case "percent":
        return Math.round((planPrice * coupon.discountValue) / 100);
      case "trial":
        return planPrice;
      default:
        return 0;
    }
  };

  const handleClearCoupon = () => {
    setCouponCode("");
    setValidationResult(null);
    setError("");
    onCouponApplied(null);
  };

  return (
    <Card className="border border-gray-200 rounded-xl shadow-sm">
      <CardHeader className="pb-3 flex items-center flex-row justify-between">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Gift className="w-5 h-5 text-purple-600" />
          Apply Coupon
        </CardTitle>
        <Button
          size="sm"
          onClick={() => onHandleShown(!isShown)}
          variant={isShown ? "destructive" : "outline-success"}
        >
          {isShown ? <Minus size={14} /> : <Plus size={14} />}
        </Button>
      </CardHeader>

      {isShown && (
        <CardContent>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex sm:flex-row flex-col gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  value={couponCode || appliedCoupon?.code || ""}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter coupon code"
                  disabled={isLoading}
                  className="pr-10"
                />
                {couponCode && (
                  <button
                    type="button"
                    onClick={handleClearCoupon}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                )}
              </div>

              <Button
                type="submit"
                variant="premium"
                disabled={isLoading || !couponCode.trim()}
                className="min-w-[100px]"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Apply"
                )}
              </Button>
            </div>
          </form>

          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 text-red-600 bg-red-50 rounded-lg">
              <XCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {validationResult?.valid && (
            <div className="p-4 mb-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">{validationResult.message}</span>
                {validationResult.type === "autoApply" && (
                  <Badge className="ml-2 bg-green-100 text-green-800">
                    Auto Applied
                  </Badge>
                )}
              </div>

              <div className="flex justify-between items-center mt-3">
                <div>
                  <p className="font-medium">{validationResult.coupon.title}</p>
                  <p className="text-sm text-gray-600">
                    {validationResult.coupon.code}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-green-700">
                    {formatDiscountText(validationResult.coupon)}
                  </p>
                  <p className="text-sm text-gray-600">
                    -₹{calculateDiscountAmount(validationResult.coupon)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {validationResult?.upgradeSuggestions?.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-blue-800 font-semibold mb-2">
                Want more savings?
              </h4>
              <p className="text-sm text-blue-700 mb-4">
                These plans have better discounts. Consider upgrading:
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {validationResult.upgradeSuggestions.map((sug, index) => (
                  <div
                    key={index}
                    className="border border-blue-100 rounded p-3 bg-white hover:bg-blue-50 transition"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-blue-700">
                        {sug.title}
                      </span>
                      <Badge className="bg-blue-100 text-blue-800">
                        {sug.code}
                      </Badge>
                    </div>
                    <p className="text-sm mt-1 text-gray-600">
                      {sug.discountType === "percent"
                        ? `${sug.discountValue}% OFF`
                        : sug.discountType === "fixed"
                        ? `₹${sug.discountValue} OFF`
                        : `${sug.discountValue} Days Trial`}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Apply on <strong>{sug.plan}</strong> plan
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
