"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { format, isAfter, isBefore } from "date-fns";
import { RefreshCcw, Loader2, ArrowLeft, AlertCircle } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { TimePicker } from "@/components/ui/time-picker";
import { TimezoneSelect } from "@/components/ui/timezone-select";
import { MultiSelect } from "@/components/ui/multi-select";
import { useToast } from "@/components/ui/toast-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

// Services
import { AdminServices } from "@/lib/client/admin.service";

// Constants
const PLAN_OPTIONS = [
  { value: "starter", label: "Starter" },
  { value: "pro", label: "Pro" },
  { value: "growth", label: "Growth" },
  { value: "enterprise", label: "Enterprise" },
  { value: "all", label: "All" },
];

const DISCOUNT_TYPE_OPTIONS = [
  { value: "percent", label: "Percentage" },
  { value: "fixed", label: "Fixed Amount" },
  { value: "free_shipping", label: "Free Shipping" },
  { value: "trial", label: "Free Trial" },
];

const PERIOD_OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
  { value: "both", label: "Both" },
];

const CURRENCY_OPTIONS = [
  { value: "INR", label: "Indian Rupee (₹)" },
  { value: "USD", label: "US Dollar ($)" },
  { value: "EUR", label: "Euro (€)" },
];

const INITIAL_FORM_DATA = {
  title: "",
  description: "",
  code: "",
  discountType: "fixed",
  discountValue: 0,
  maxDiscountAmount: "",
  minCartValue: "",
  startDate: format(new Date(), "yyyy-MM-dd"),
  startTime: "00:00",
  endDate: format(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    "yyyy-MM-dd"
  ),
  endTime: "23:59",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  usageLimits: {
    total: 100,
    perUser: 1,
  },
  applicablePlans: [],
  period: "both",
  currency: "INR",
  rules: [],
  interActions: {
    autoApply: false,
    autoSuggest: false,
    showInBanner: false,
    bannerText: "",
  },
  metadata: {
    tags: [],
    campaignId: "",
  },
};

export default function CouponEditPage() {
  const { couponId } = useParams();
  const router = useRouter();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [formErrors, setFormErrors] = useState({});
  const [isExpired, setIsExpired] = useState(false);

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }

    if (!formData.code.trim()) {
      errors.code = "Code is required";
    } else if (!/^[A-Z0-9_-]+$/.test(formData.code)) {
      errors.code = "Only letters, numbers, hyphens and underscores allowed";
    }

    if (formData.discountType !== "free_shipping" && !formData.discountValue) {
      errors.discountValue = "Discount value is required";
    }

    if (formData.discountType === "percent" && formData.discountValue > 100) {
      errors.discountValue = "Percentage cannot exceed 100%";
    }

    const startDate = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDate = new Date(`${formData.endDate}T${formData.endTime}`);

    if (isAfter(startDate, endDate)) {
      errors.endDate = "End date must be after start date";
    }

    if (formData.usageLimits.total <= 0) {
      errors.usageLimits = {
        ...errors.usageLimits,
        total: "Must be at least 1",
      };
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const fetchCouponData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await AdminServices.getCoupon(couponId);

      if (!res.ok && res.status) {
        throw new Error(res.message || "Failed to fetch coupon data");
      }

      const data = res.coupon;

      // Check if coupon is expired
      const now = new Date();
      const endDate = new Date(data.validity.end.date);
      setIsExpired(isAfter(now, endDate));

      setFormData({
        title: data.title,
        description: data.description || "",
        code: data.code,
        discountType: data.discountType,
        discountValue: data.discountValue,
        maxDiscountAmount: data.maxDiscountAmount || "",
        minCartValue: data.minCartValue || "",
        startDate: format(new Date(data.validity.start.date), "yyyy-MM-dd"),
        startTime: data.validity.start.time,
        endDate: format(new Date(data.validity.end.date), "yyyy-MM-dd"),
        endTime: data.validity.end.time,
        timezone: data.validity.timezone,
        usageLimits: {
          total: data.usageLimits.total,
          perUser: data.usageLimits.perUser || 1,
        },
        applicablePlans: data.applicablePlans || [],
        period: data.period || "both",
        currency: data.currency || "INR",
        rules: data.rules?.map((r) => r._id) || [],
        interActions: {
          autoApply: data.interActions?.autoApply || false,
          autoSuggest: data.interActions?.autoSuggest || false,
          showInBanner: data.interActions?.showInBanner || false,
          bannerText: data.interActions?.bannerText || "",
        },
        metadata: {
          tags: data.metadata?.tags || [],
          campaignId: data.metadata?.campaignId || "",
        },
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to fetch coupon data",
        variant: "destructive",
      });
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [couponId, toast]);

  useEffect(() => {
    if (couponId) fetchCouponData();
  }, [couponId, fetchCouponData]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleNestedChange = (path, value) => {
    setFormData((prev) => {
      const keys = path.split(".");
      if (keys.length === 1) return { ...prev, [keys[0]]: value };

      return {
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value,
        },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);

      const submissionData = {
        ...formData,
        validity: {
          start: {
            date: formData.startDate,
            time: formData.startTime,
          },
          end: {
            date: formData.endDate,
            time: formData.endTime,
          },
          timezone: formData.timezone,
        },
      };

      const response = await AdminServices.updateCoupon(
        couponId,
        submissionData
      );

      if (!response.ok && response.status) {
        throw new Error(response.message || "Failed to update coupon");
      }

      toast({
        title: "Success",
        description: "Coupon updated successfully",
        variant: "success",
      });

      router.push(`/admin/coupons/${couponId}`);
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const generateCouponCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, code: result }));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-8 w-32" />
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="flex gap-2">
            <Button onClick={fetchCouponData} variant="outline">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Retry
            </Button>
            <Button
              onClick={() => router.push(`/admin/coupons/${couponId}`)}
              variant="secondary"
            >
              Back to Coupon
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/admin/coupons/${couponId}`)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Coupon
        </Button>
        <h1 className="text-2xl font-bold">Edit Coupon</h1>
      </div>

      {isExpired && (
        <Alert variant="default" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>This coupon has expired</AlertTitle>
          <AlertDescription>
            Editing expired coupons may not affect existing usage.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Coupon Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                    error={formErrors.title}
                  />
                  {formErrors.title && (
                    <p className="text-sm text-red-500 mt-1">
                      {formErrors.title}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="code">Coupon Code *</Label>
                    <Button
                      type="button"
                      variant="link"
                      size="sm"
                      onClick={generateCouponCode}
                    >
                      Generate Code
                    </Button>
                  </div>
                  <Input
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        code: e.target.value.toUpperCase(),
                      }))
                    }
                    required
                    className="mt-2 uppercase"
                    error={formErrors.code}
                  />
                  {formErrors.code && (
                    <p className="text-sm text-red-500 mt-1">
                      {formErrors.code}
                    </p>
                  )}
                </div>
              </div>

              {/* Discount Information */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="discountType">Discount Type *</Label>
                    <Select
                      value={formData.discountType}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          discountType: value,
                          maxDiscountAmount:
                            value === "percent" ? "" : undefined,
                        }))
                      }
                      required
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {DISCOUNT_TYPE_OPTIONS.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="discountValue">
                      {formData.discountType === "percent"
                        ? "Percentage *"
                        : formData.discountType === "fixed"
                        ? "Amount *"
                        : "Value"}
                    </Label>
                    <Input
                      id="discountValue"
                      name="discountValue"
                      type="number"
                      value={formData.discountValue}
                      onChange={handleInputChange}
                      min="0"
                      max={
                        formData.discountType === "percent" ? "100" : undefined
                      }
                      step={formData.discountType === "percent" ? "0.01" : "1"}
                      required={formData.discountType !== "free_shipping"}
                      disabled={formData.discountType === "free_shipping"}
                      className="mt-2"
                      error={formErrors.discountValue}
                    />
                    {formErrors.discountValue && (
                      <p className="text-sm text-red-500 mt-1">
                        {formErrors.discountValue}
                      </p>
                    )}
                  </div>
                </div>

                {formData.discountType === "percent" && (
                  <div>
                    <Label htmlFor="maxDiscountAmount">
                      Max Discount Amount
                    </Label>
                    <Input
                      id="maxDiscountAmount"
                      name="maxDiscountAmount"
                      type="number"
                      value={formData.maxDiscountAmount}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="mt-2"
                    />
                  </div>
                )}

                {(formData.discountType === "percent" ||
                  formData.discountType === "fixed") && (
                  <div>
                    <Label htmlFor="currency">Currency *</Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, currency: value }))
                      }
                      required
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {CURRENCY_OPTIONS.map((currency) => (
                          <SelectItem
                            key={currency.value}
                            value={currency.value}
                          >
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label htmlFor="minCartValue">Minimum Cart Value</Label>
                  <Input
                    id="minCartValue"
                    name="minCartValue"
                    type="number"
                    value={formData.minCartValue}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Validity Period */}
            <div className="space-y-4">
              <Label>Validity Period *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                      className="mt-2"
                      min={format(new Date(), "yyyy-MM-dd")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="startTime">Start Time *</Label>
                    <TimePicker
                      value={formData.startTime}
                      onChange={(time) =>
                        setFormData((prev) => ({ ...prev, startTime: time }))
                      }
                      className="mt-2"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                      className="mt-2"
                      min={formData.startDate}
                      error={formErrors.endDate}
                    />
                    {formErrors.endDate && (
                      <p className="text-sm text-red-500 mt-1">
                        {formErrors.endDate}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time *</Label>
                    <TimePicker
                      value={formData.endTime}
                      onChange={(time) =>
                        setFormData((prev) => ({ ...prev, endTime: time }))
                      }
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="timezone">Timezone *</Label>
                <TimezoneSelect
                  value={formData.timezone}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, timezone: value }))
                  }
                  className="mt-2"
                />
              </div>
            </div>

            {/* Usage Limits */}
            <div className="space-y-4">
              <Label>Usage Limits *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="usageLimitTotal">Total Limit *</Label>
                  <Input
                    id="usageLimitTotal"
                    type="number"
                    value={formData.usageLimits.total}
                    onChange={(e) =>
                      handleNestedChange(
                        "usageLimits.total",
                        parseInt(e.target.value) || 0
                      )
                    }
                    min="1"
                    required
                    className="mt-2"
                    error={formErrors.usageLimits?.total}
                  />
                  {formErrors.usageLimits?.total && (
                    <p className="text-sm text-red-500 mt-1">
                      {formErrors.usageLimits.total}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="usageLimitPerUser">Per User Limit</Label>
                  <Input
                    id="usageLimitPerUser"
                    type="number"
                    value={formData.usageLimits.perUser}
                    onChange={(e) =>
                      handleNestedChange(
                        "usageLimits.perUser",
                        parseInt(e.target.value) || 0
                      )
                    }
                    min="1"
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Subscription Period */}
            <div>
              <Label htmlFor="period">Subscription Period *</Label>
              <Select
                value={formData.period}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, period: value }))
                }
                required
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  {PERIOD_OPTIONS.map((period) => (
                    <SelectItem key={period.value} value={period.value}>
                      {period.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Applicable Plans */}
            <div>
              <Label>Applicable Plans</Label>
              <MultiSelect
                options={PLAN_OPTIONS}
                selected={formData.applicablePlans}
                onChange={(selected) =>
                  setFormData((prev) => ({
                    ...prev,
                    applicablePlans: selected,
                  }))
                }
                placeholder="Select plans (leave empty for all plans)"
                className="mt-2"
              />
            </div>

            {/* Interaction Settings */}
            <div className="space-y-4">
              <Label>Interaction Settings</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autoApply"
                    checked={formData.interActions.autoApply}
                    onCheckedChange={() =>
                      handleNestedChange(
                        "interActions.autoApply",
                        !formData.interActions.autoApply
                      )
                    }
                  />
                  <Label htmlFor="autoApply" className="font-normal">
                    Auto-apply coupon
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autoSuggest"
                    checked={formData.interActions.autoSuggest}
                    onCheckedChange={() =>
                      handleNestedChange(
                        "interActions.autoSuggest",
                        !formData.interActions.autoSuggest
                      )
                    }
                  />
                  <Label htmlFor="autoSuggest" className="font-normal">
                    Auto-suggest coupon
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showInBanner"
                    checked={formData.interActions.showInBanner}
                    onCheckedChange={() =>
                      handleNestedChange(
                        "interActions.showInBanner",
                        !formData.interActions.showInBanner
                      )
                    }
                  />
                  <Label htmlFor="showInBanner" className="font-normal">
                    Show in promotional banner
                  </Label>
                </div>
                {formData.interActions.showInBanner && (
                  <div className="pl-6">
                    <Label htmlFor="bannerText">Banner Text</Label>
                    <Input
                      id="bannerText"
                      value={formData.interActions.bannerText}
                      onChange={(e) =>
                        handleNestedChange(
                          "interActions.bannerText",
                          e.target.value
                        )
                      }
                      className="mt-2"
                      maxLength={100}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Metadata */}
            <div className="space-y-4">
              <Label>Metadata</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="campaignId">Campaign ID</Label>
                  <Input
                    id="campaignId"
                    value={formData.metadata.campaignId}
                    onChange={(e) =>
                      handleNestedChange("metadata.campaignId", e.target.value)
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Tags</Label>
                  <MultiSelect
                    creatable
                    selected={formData.metadata.tags || []}
                    onChange={(tags) =>
                      handleNestedChange("metadata.tags", tags || [])
                    }
                    placeholder="Add tags"
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t py-2 flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/admin/coupons/${couponId}`)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
