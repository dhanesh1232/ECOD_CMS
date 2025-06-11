"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";
import { AdminServices } from "@/lib/client/admin.service";
import { RefreshCcw, Loader2, ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
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

export default function CouponEditPage() {
  const params = useParams();
  const router = useRouter();
  const showToast = useToast();
  const couponId = params.couponId;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [coupon, setCoupon] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    code: "",
    discountType: "fixed",
    discountValue: 0,
    startDate: "",
    endDate: "",
    usageLimit: 1,
    applicablePlans: [],
    currency: "INR",
    rules: [],
  });

  const fetchCoupon = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await AdminServices.getCoupon(couponId);

      if (response.status && !response.ok) {
        throw new Error(response.message || "Failed to fetch coupon");
      }

      const data = response.coupon;
      console.log(response);
      setCoupon(data);
      setFormData({
        title: data.title,
        code: data.code,
        discountType: data.discountType,
        discountValue: data.discountValue,
        startDate: format(new Date(data.startDate), "yyyy-MM-dd"),
        endDate: format(new Date(data.endDate), "yyyy-MM-dd"),
        usageLimit: data.usageLimit,
        applicablePlans: data.applicablePlans || [],
        rules: data.rules || [],
        currency: data.currency,
      });
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

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handlePlanToggle = (plan) => {
    setFormData((prev) => {
      const plans = prev.applicablePlans.includes(plan)
        ? prev.applicablePlans.filter((p) => p !== plan)
        : [...prev.applicablePlans, plan];
      return { ...prev, applicablePlans: plans };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);

      // Validation
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        throw new Error("End date must be after start date");
      }

      const response = await AdminServices.updateCoupon(couponId, formData);

      if (response.status && !response.ok) {
        throw new Error(response.message || "Failed to update coupon");
      }

      showToast({
        title: "Success",
        description: "Coupon updated successfully",
        variant: "success",
      });

      router.push(`/admin/coupons/${couponId}`);
    } catch (err) {
      showToast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !coupon) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-500">{error || "Coupon not found"}</p>
        <Button onClick={fetchCoupon} variant="outline">
          <RefreshCcw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6 gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(`/admin/coupons/${couponId}`)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Edit Coupon</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="code">Coupon Code</Label>
              <Input
                id="code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                required
                className="mt-2 uppercase"
              />
            </div>

            <div>
              <Label htmlFor="discountType">Discount Type</Label>
              <Select
                id="discountType"
                name="discountType"
                value={formData.discountType}
                onValueChange={handleInputChange}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select discount type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percent">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                  <SelectItem value="trial">Free Trial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="discountValue">
                {formData.discountType === "fixed" ? "Amount" : "Percentage"}
              </Label>
              <Input
                id="discountValue"
                name="discountValue"
                type="number"
                value={formData.discountValue}
                onChange={handleInputChange}
                min="0"
                step={formData.discountType === "percent" ? "0.01" : "1"}
                required
                className="mt-2"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="usageLimit">Usage Limit</Label>
              <Input
                id="usageLimit"
                name="usageLimit"
                type="number"
                value={formData.usageLimit}
                onChange={handleInputChange}
                min="1"
                required
                className="mt-2"
              />
            </div>
            {coupon.discountType === "fixed" && (
              <div className="space-y-2">
                <Label htmlFor="currency">Currency Type</Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, currency: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">INR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label>Applicable Plans</Label>
              <div className="mt-2 space-y-2">
                {["starter", "pro", "growth", "enterprise"].map((plan) => (
                  <div key={plan} className="flex items-center space-x-2">
                    <Checkbox
                      id={`plan-${plan}`}
                      checked={formData.applicablePlans.includes(plan)}
                      onCheckedChange={() => handlePlanToggle(plan)}
                    />
                    <label
                      htmlFor={`plan-${plan}`}
                      className="text-sm font-medium leading-none capitalize"
                    >
                      {plan}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/admin/coupons/${couponId}`)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
