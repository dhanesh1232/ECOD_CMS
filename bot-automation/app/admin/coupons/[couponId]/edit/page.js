"use client";
import { Button } from "@/components/ui/button";
import { AdminServices } from "@/lib/client/admin.service";
import { RefreshCcw, Loader2, ArrowLeft, Check, X } from "lucide-react";
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
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/toast-provider";

export default function CouponEditPage() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
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
    interActions: {
      autoApply: false,
      autoSuggest: false,
    },
  });

  const fetchCoupon = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await AdminServices.getCoupon(couponId);

      if (!response.ok && response.status) {
        throw new Error(response.message || "Failed to fetch coupon");
      }

      const data = response.coupon;
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
        rules: data.rules?.map((r) => r._id) || [],
        currency: data.currency || "INR",
        interActions: data.interActions || {
          autoApply: false,
          autoSuggest: false,
        },
      });
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

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handlePlanToggle = (plan) => {
    setFormData((prev) => ({
      ...prev,
      applicablePlans: prev.applicablePlans.includes(plan)
        ? prev.applicablePlans.filter((p) => p !== plan)
        : [...prev.applicablePlans, plan],
    }));
  };

  const handleRuleToggle = (ruleId) => {
    setFormData((prev) => ({
      ...prev,
      rules: prev.rules.includes(ruleId)
        ? prev.rules.filter((id) => id !== ruleId)
        : [...prev.rules, ruleId],
    }));
  };

  const handleInteractionToggle = (field) => {
    setFormData((prev) => ({
      ...prev,
      interActions: {
        ...prev.interActions,
        [field]: !prev.interActions[field],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);

      // Validation
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        throw new Error("End date must be after start date");
      }

      if (
        formData.discountType === "percent" &&
        (formData.discountValue < 0 || formData.discountValue > 100)
      ) {
        throw new Error("Percentage must be between 0 and 100");
      }

      const response = await AdminServices.updateCoupon(couponId, formData);

      if (!response.ok && response.status) {
        throw new Error(response.message || "Failed to update coupon");
      }

      toast({
        title: "Success",
        description: "Coupon updated successfully",
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
        <p className="text-destructive">{error || "Coupon not found"}</p>
        <Button onClick={fetchCoupon} variant="outline">
          <RefreshCcw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  const planOptions = ["starter", "pro", "growth", "enterprise"];

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
                  />
                </div>

                <div>
                  <Label htmlFor="code">Coupon Code *</Label>
                  <Input
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    required
                    className="mt-2 uppercase"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="discountType">Discount Type *</Label>
                    <Select
                      value={formData.discountType}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          discountType: value,
                        }))
                      }
                      required
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select type" />
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
                      {formData.discountType === "percent"
                        ? "Percentage *"
                        : "Amount *"}
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
                      required
                      className="mt-2"
                    />
                  </div>
                </div>

                {formData.discountType === "fixed" && (
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
                        <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                        <SelectItem value="USD">US Dollar ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Validity & Usage */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
                    />
                  </div>
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
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="usageLimit">Usage Limit *</Label>
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

                <div>
                  <Label>Interaction Settings</Label>
                  <div className="space-y-3 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="autoApply"
                        checked={formData.interActions.autoApply}
                        onCheckedChange={() =>
                          handleInteractionToggle("autoApply")
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
                          handleInteractionToggle("autoSuggest")
                        }
                      />
                      <Label htmlFor="autoSuggest" className="font-normal">
                        Auto-suggest coupon
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Applicable Plans */}
            <div>
              <Label>Applicable Plans</Label>
              <div className="flex flex-wrap gap-4 mt-2">
                {planOptions.map((plan) => (
                  <div key={plan} className="flex items-center space-x-2">
                    <Checkbox
                      id={`plan-${plan}`}
                      checked={formData.applicablePlans.includes(plan)}
                      onCheckedChange={() => handlePlanToggle(plan)}
                    />
                    <Label
                      htmlFor={`plan-${plan}`}
                      className="capitalize font-normal"
                    >
                      {plan}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon Rules */}
            {coupon.rules?.length > 0 && (
              <div>
                <Label>Coupon Rules</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                  {coupon.rules.map((rule) => (
                    <div key={rule._id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`rule-${rule._id}`}
                        checked={formData.rules.includes(rule._id)}
                        onCheckedChange={() => handleRuleToggle(rule._id)}
                      />
                      <div>
                        <Label
                          htmlFor={`rule-${rule._id}`}
                          className="font-normal"
                        >
                          {rule.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {rule.conditionType}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
