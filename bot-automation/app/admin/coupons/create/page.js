"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, addDays } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { MultiSelect } from "@/components/ui/multi-select";
import { AdminServices } from "@/lib/client/admin.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast-provider";

const DEFAULT_USAGE_LIMIT = 100;
const DEFAULT_VALIDITY_DAYS = 30;

export default function CreateCouponPage() {
  const router = useRouter();
  const showToast = useToast();
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    discountType: "percent",
    discountValue: "",
    startDate: new Date(),
    endDate: addDays(new Date(), DEFAULT_VALIDITY_DAYS),
    usageLimit: DEFAULT_USAGE_LIMIT,
    applicablePlans: [],
    currency: "INR",
    rules: [],
    interActions: {
      autoApply: false,
      autoSuggest: false,
    },
  });
  const [loading, setLoading] = useState(false);
  const [rules, setRules] = useState([]);
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);

  const planOptions = [
    { value: "starter", label: "Starter" },
    { value: "pro", label: "Pro" },
    { value: "growth", label: "Growth" },
    { value: "enterprise", label: "Enterprise" },
  ];

  const currencyOptions = [
    { value: "INR", label: "Indian Rupee (₹)" },
    { value: "USD", label: "US Dollar ($)" },
  ];

  const fetchRules = useCallback(async () => {
    try {
      const response = await AdminServices.fetchCouponRules();
      if (!response.ok && response.status) {
        showToast({
          title: "Error",
          description: "Failed to fetch coupon rules",
          variant: "destructive",
        });
      } else {
        setRules(response.rules);
      }
    } catch (error) {
      showToast({
        title: "Error",
        description: "Error fetching coupon rules",
        variant: "destructive",
      });
      console.error("Error fetching rules:", error);
    }
  }, [showToast]);

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  const generateCouponCode = async () => {
    setIsGeneratingCode(true);
    try {
      const response = await AdminServices.generateCouponCode();
      if (!response.ok && response.status) {
        showToast({
          title: "Error",
          description: "Failed to generate coupon code",
          variant: "destructive",
        });
      } else {
        setFormData((prev) => ({ ...prev, code: response.code }));
      }
    } catch (error) {
      showToast({
        title: "Error",
        description: "Error generating coupon code",
        variant: "destructive",
      });
      console.error("Error generating coupon code:", error);
    } finally {
      setIsGeneratingCode(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await AdminServices.createCoupon(formData);
      if (!response.ok && response.status) {
        showToast({
          title: "Error",
          description: response.message || "Failed to create coupon",
          variant: "destructive",
        });
      } else {
        showToast({
          title: "Success",
          description: "Coupon created successfully",
          variant: "success",
        });
        router.push(`/admin/coupons/${response.coupon._id}`);
      }
    } catch (error) {
      showToast({
        title: "Error",
        description: "Error creating coupon",
        variant: "destructive",
      });
      console.error("Error creating coupon:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">
            Create New Coupon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Coupon Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Coupon Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="title">Coupon Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Summer Sale 2023"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="code">Coupon Code *</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={generateCouponCode}
                      disabled={isGeneratingCode}
                    >
                      {isGeneratingCode ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      Generate Code
                    </Button>
                  </div>
                  <Input
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="e.g., SUMMER20"
                    required
                    className="uppercase"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="discountType">Type *</Label>
                    <Select
                      value={formData.discountType}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          discountType: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percent">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                        <SelectItem value="trial">Free Trial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
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
                      onChange={handleChange}
                      required
                      min="0"
                      max={
                        formData.discountType === "percent" ? "100" : undefined
                      }
                      step={formData.discountType === "percent" ? "1" : "0.01"}
                      placeholder={
                        formData.discountType === "percent" ? "0-100" : "0.00"
                      }
                    />
                  </div>
                </div>

                {formData.discountType === "fixed" && (
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency *</Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, currency: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencyOptions.map((currency) => (
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
              </div>

              {/* Validity Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Validity & Usage</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.startDate ? (
                            format(formData.startDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.startDate}
                          onSelect={(date) =>
                            setFormData((prev) => ({
                              ...prev,
                              startDate: date,
                            }))
                          }
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>End Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.endDate ? (
                            format(formData.endDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.endDate}
                          onSelect={(date) =>
                            setFormData((prev) => ({ ...prev, endDate: date }))
                          }
                          initialFocus
                          fromDate={formData.startDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="usageLimit">Usage Limit *</Label>
                  <Input
                    id="usageLimit"
                    name="usageLimit"
                    type="number"
                    value={formData.usageLimit}
                    onChange={handleChange}
                    required
                    min="1"
                    placeholder="Maximum number of redemptions"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Applicable Plans</Label>
                  <MultiSelect
                    className="flex-1 flex-nowrap truncate"
                    options={planOptions}
                    selected={formData.applicablePlans}
                    onChange={(selected) =>
                      setFormData((prev) => ({
                        ...prev,
                        applicablePlans: selected,
                      }))
                    }
                    placeholder="Select plans (leave empty for all plans)"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Interaction Settings</h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autoApply"
                    checked={formData.interActions?.autoApply || false}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        interActions: {
                          ...prev.interActions,
                          autoApply: checked,
                        },
                      }))
                    }
                  />
                  <Label htmlFor="autoApply" className="font-normal">
                    Auto-apply coupon
                    <p className="text-sm text-muted-foreground">
                      Automatically apply this coupon if eligible (without user
                      input)
                    </p>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autoSuggest"
                    checked={formData.interActions?.autoSuggest || false}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        interActions: {
                          ...prev.interActions,
                          autoSuggest: checked,
                        },
                      }))
                    }
                  />
                  <Label htmlFor="autoSuggest" className="font-normal">
                    Auto-suggest coupon
                    <p className="text-sm text-muted-foreground">
                      Suggest this coupon to eligible users at checkout
                    </p>
                  </Label>
                </div>
              </div>
            </div>
            {/* Rules Section */}
            {rules.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Coupon Rules</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rules.map((rule) => (
                    <div key={rule._id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`rule-${rule._id}`}
                        checked={formData.rules.includes(rule._id)}
                        onCheckedChange={(checked) => {
                          setFormData((prev) => ({
                            ...prev,
                            rules: checked
                              ? [...prev.rules, rule._id]
                              : prev.rules.filter((id) => id !== rule._id),
                          }));
                        }}
                      />
                      <Label
                        htmlFor={`rule-${rule._id}`}
                        className="font-normal"
                      >
                        {rule.name}{" "}
                        <span className="text-muted-foreground">
                          ({rule.conditionType})
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/coupons")}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Create
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
