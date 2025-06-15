"use client";

import { useEffect, useState } from "react";
import isEqual from "lodash.isequal";
import { useRouter, useSearchParams } from "next/navigation";
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
import { format, addDays, isAfter, isBefore } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { MultiSelect } from "@/components/ui/multi-select";
import { AdminServices } from "@/lib/client/admin.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast-provider";
import { Textarea } from "@/components/ui/textarea";
import { TimePicker } from "@/components/ui/time-picker";
import { TimezoneSelect } from "@/components/ui/timezone-select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const DEFAULT_USAGE_LIMIT = 100;
const DEFAULT_VALIDITY_DAYS = 30;
const now = new Date();
const currentHour = now.getHours().toString().padStart(2, "0");
const currentMinute = now.getMinutes().toString().padStart(2, "0");

const INITIAL_FORM_DATA = {
  title: "",
  description: "",
  code: "",
  discountType: "percent",
  discountValue: "",
  maxDiscountAmount: "",
  minCartValue: "",
  validity: {
    start: {
      date: now,
      time: `${currentHour}:${currentMinute}`,
    },
    end: {
      date: addDays(new Date(), DEFAULT_VALIDITY_DAYS),
      time: "23:59",
    },
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
  usageLimits: {
    total: DEFAULT_USAGE_LIMIT,
    perUser: 1,
  },
  applicablePlans: ["all"],
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
  },
};
export default function CreateCouponPage() {
  const router = useRouter();
  const showToast = useToast();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [hasChanged, setHasChanged] = useState(false);

  const planOptions = [
    { value: "starter", label: "Starter" },
    { value: "pro", label: "Pro" },
    { value: "growth", label: "Growth" },
    { value: "enterprise", label: "Enterprise" },
    { value: "all", label: "All Plans" },
  ];

  const currencyOptions = [
    { value: "INR", label: "Indian Rupee (₹)" },
    { value: "USD", label: "US Dollar ($)" },
    { value: "EUR", label: "Euro (€)" },
    { value: "GBP", label: "British Pound (£)" },
  ];

  const periodOptions = [
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
    { value: "both", label: "Both" },
  ];

  const ruleOptions = [
    {
      id: "minCartValue",
      name: "Minimum Cart Value",
      description:
        "Coupon only applicable if cart value exceeds specified amount",
      inputType: "number",
    },
    {
      id: "newCustomerOnly",
      name: "New Customers Only",
      description: "Only for first-time customers",
      inputType: "none",
    },
    {
      id: "firstPurchase",
      name: "First Purchase",
      description: "Only for first purchase (even for returning customers)",
      inputType: "none",
    },
    {
      id: "specificCustomer",
      name: "Specific Customers",
      description: "Only for specific customer emails",
      inputType: "text",
    },
    {
      id: "productCategory",
      name: "Product Category",
      description: "Only applicable to specific product categories",
      inputType: "text",
    },
  ];

  useEffect(() => {
    const changed = !isEqual(INITIAL_FORM_DATA, formData);
    setHasChanged(changed);
  }, [formData]);

  const generateCouponCode = async () => {
    setIsGeneratingCode(true);
    try {
      const response = await AdminServices.generateCouponCode();
      if (!response.ok && response.status) {
        const data = await response.json();
        throw Error(data.message || "Failed to generate coupon code");
      } else {
        setFormData((prev) => ({ ...prev, code: response.code }));
      }
    } catch (error) {
      showToast({
        title: "Error",
        description: error.message || "Error generating coupon code",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingCode(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const keys = name.split(".");
      if (keys.length > 1) {
        return {
          ...prev,
          [keys[0]]: {
            ...prev[keys[0]],
            [keys[1]]: value,
          },
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleTimeChange = (field, time) => {
    setFormData((prev) => ({
      ...prev,
      validity: {
        ...prev.validity,
        [field]: {
          ...prev.validity[field],
          time,
        },
      },
    }));
  };

  const handleDateChange = (field, date) => {
    setFormData((prev) => {
      const newState = {
        ...prev,
        validity: {
          ...prev.validity,
          [field]: {
            ...prev.validity[field],
            date,
          },
        },
      };

      // If date changed to today, reset time to current time if it's in the past
      const now = new Date();
      const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

      if (isToday && field === "start") {
        const currentHour = now.getHours().toString().padStart(2, "0");
        const currentMinute = now.getMinutes().toString().padStart(2, "0");
        const currentTime = `${currentHour}:${currentMinute}`;

        // Check if existing time is in the past
        const [hours, minutes] = newState.validity.start.time.split(":");
        const selectedTime = new Date();
        selectedTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        if (isBefore(selectedTime, now)) {
          newState.validity.start.time = currentTime;
        }
      }

      return newState;
    });
  };

  const handleRuleToggle = (ruleId, value) => {
    setFormData((prev) => {
      const existingRuleIndex = prev.rules.findIndex((r) => r.type === ruleId);

      if (value) {
        // Adding new rule with default value
        const rule = ruleOptions.find((r) => r.id === ruleId);
        const newRule = {
          type: ruleId,
          value: rule.inputType === "number" ? 0 : "",
          description: rule.description,
        };

        return {
          ...prev,
          rules: [...prev.rules, newRule],
        };
      } else {
        // Removing rule
        return {
          ...prev,
          rules: prev.rules.filter((r) => r.type !== ruleId),
        };
      }
    });
  };

  const handleRuleValueChange = (ruleId, value) => {
    setFormData((prev) => ({
      ...prev,
      rules: prev.rules.map((rule) =>
        rule.type === ruleId ? { ...rule, value } : rule
      ),
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.metadata.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          tags: [...prev.metadata.tags, newTag.trim()],
        },
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        tags: prev.metadata.tags.filter((tag) => tag !== tagToRemove),
      },
    }));
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setHasChanged(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send to the server
    const dataToSend = {
      ...formData,
      validity: {
        ...formData.validity,
        start: {
          date: format(formData.validity.start.date, "yyyy-MM-dd"),
          time: formData.validity.start.time,
        },
        end: {
          date: format(formData.validity.end.date, "yyyy-MM-dd"),
          time: formData.validity.end.time,
        },
        timezone: formData.validity.timezone,
      },
    };

    // Validate dates and times
    const startDate = new Date(
      `${dataToSend.validity.start.date}T${dataToSend.validity.start.time}`
    );
    const endDate = new Date(
      `${dataToSend.validity.end.date}T${dataToSend.validity.end.time}`
    );
    const now = new Date();
    // Check if start time is in the past for today
    if (
      format(formData.validity.start.date, "yyyy-MM-dd") ===
        format(now, "yyyy-MM-dd") &&
      isBefore(startDate, now)
    ) {
      showToast({
        title: "Error",
        description: "Start time cannot be in the past for today",
        variant: "destructive",
      });
      return;
    }
    if (isAfter(startDate, endDate)) {
      showToast({
        title: "Error",
        description: "End date/time must be after start date/time",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await AdminServices.createCoupon(dataToSend);
      if (!response.ok && response.status) {
        const data = await response.json();
        throw Error(data.message || "Failed to create coupon");
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
        description: error.message || "Error creating coupon",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl">
      <form onSubmit={handleSubmit} className="space-y-6 relative">
        <Card>
          <CardHeader className="flex flex-row flex-1 items-center justify-between">
            <CardTitle className="text-lg md:text-xl xl:text-2xl">
              Create New
            </CardTitle>
            {hasChanged && (
              <div className="flex justify-center gap-4">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => router.push("/admin/coupons")}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline-warning"
                  type="button"
                  size="sm"
                  onClick={() => handleReset()}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Create
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Coupon Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Coupon Information</h3>

                <div className="space-y-2">
                  <Label className="truncate" htmlFor="title">
                    Coupon Title *
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Summer Sale 2023"
                    required
                    maxLength={100}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="truncate" htmlFor="description">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Optional description shown to customers"
                    rows={3}
                    maxLength={500}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="truncate" htmlFor="code">
                      Coupon Code *
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      title="Generate Coupon Code"
                      onClick={generateCouponCode}
                      disabled={isGeneratingCode}
                    >
                      {isGeneratingCode ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      Generate
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
                    minLength={4}
                    maxLength={20}
                    title="Only uppercase letters, numbers, hyphens and underscores"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="truncate" htmlFor="discountType">
                      Type *
                    </Label>
                    <Select
                      value={formData.discountType}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          discountType: value,
                          discountValue: "",
                          maxDiscountAmount: "",
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percent">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                        <SelectItem value="free_shipping">
                          Free Shipping
                        </SelectItem>
                        <SelectItem value="trial">Free Trial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.discountType !== "free_shipping" && (
                    <div className="space-y-2">
                      <Label className="truncate" htmlFor="discountValue">
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
                          formData.discountType === "percent"
                            ? "100"
                            : undefined
                        }
                        step={
                          formData.discountType === "percent" ? "1" : "0.01"
                        }
                        placeholder={
                          formData.discountType === "percent" ? "0-100" : "0.00"
                        }
                      />
                    </div>
                  )}
                </div>

                {formData.discountType === "percent" && (
                  <div className="space-y-2">
                    <Label className="truncate" htmlFor="maxDiscountAmount">
                      Maximum Discount Amount *
                    </Label>
                    <Input
                      id="maxDiscountAmount"
                      name="maxDiscountAmount"
                      type="number"
                      value={formData.maxDiscountAmount}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      placeholder="No limit if empty"
                    />
                    <span className="text-sm text-muted-foreground mb-2">
                      (Leave empty for no limit)
                    </span>
                  </div>
                )}

                {(formData.discountType === "fixed" ||
                  formData.discountType === "percent") && (
                  <div className="space-y-2">
                    <Label className="truncate" htmlFor="currency">
                      Currency *
                    </Label>
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

                <div className="space-y-2">
                  <Label className="truncate" htmlFor="minCartValue">
                    Minimum Cart Value
                    <span className="text-sm text-muted-foreground ml-2">
                      (Optional)
                    </span>
                  </Label>
                  <Input
                    id="minCartValue"
                    name="minCartValue"
                    type="number"
                    value={formData.minCartValue}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="No minimum if empty"
                  />
                </div>
              </div>

              {/* Validity Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Validity & Usage</h3>

                <div className="space-y-2">
                  <Label className="truncate">Timezone *</Label>
                  <TimezoneSelect
                    value={formData.validity.timezone}
                    onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        validity: {
                          ...prev.validity,
                          timezone: value,
                        },
                      }))
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label className="truncate" htmlFor="start">
                      Start Date *
                    </Label>
                    <div className="flex lg:flex-col xl:flex-row gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(formData.validity.start.date, "PPP")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.validity.start.date}
                            onSelect={(date) => {
                              console.log(date.toISOString().split("T")[0]);
                              handleDateChange("start", date);
                            }}
                            minDate={new Date()}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      <TimePicker
                        value={formData.validity.start.time}
                        onChange={(time) => handleTimeChange("start", time)}
                        referenceDate={formData.validity.start.date}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="truncate">End Date *</Label>
                    <div className="flex lg:flex-col xl:flex-row gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(formData.validity.end.date, "PPP")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.validity.end.date}
                            onSelect={(date) => {
                              console.log(date);
                              handleDateChange("end", date);
                            }}
                            initialFocus
                            fromDate={formData.validity.start.date}
                          />
                        </PopoverContent>
                      </Popover>
                      <TimePicker
                        value={formData.validity.end.time}
                        onChange={(time) => handleTimeChange("end", time)}
                        referenceDate={formData.validity.end.date}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="truncate" htmlFor="usageLimit">
                      Usage Limit *
                    </Label>
                    <Input
                      id="usageLimit"
                      name="usageLimits.total"
                      type="number"
                      value={formData.usageLimits.total}
                      onChange={handleChange}
                      required
                      min="1"
                      max="1000000"
                      placeholder="Maximum number of redemptions"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="truncate" htmlFor="perUserLimit">
                      Per User Limit
                    </Label>
                    <Input
                      id="perUserLimit"
                      name="usageLimits.perUser"
                      type="number"
                      value={formData.usageLimits.perUser}
                      onChange={handleChange}
                      min="1"
                      max="100"
                      placeholder="Uses per customer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="truncate" htmlFor="subscriptionPeriod">
                    Subscription Period *
                  </Label>
                  <Select
                    id="subscriptionPeriod"
                    value={formData.period}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, period: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      {periodOptions.map((period) => (
                        <SelectItem key={period.value} value={period.value}>
                          {period.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="truncate">Applicable Plans</Label>
                  <MultiSelect
                    options={planOptions}
                    selected={formData.applicablePlans}
                    onChange={(selected) =>
                      setFormData((prev) => ({
                        ...prev,
                        applicablePlans:
                          selected.length > 0 ? selected : ["all"],
                      }))
                    }
                    placeholder="Select plans (defaults to all)"
                  />
                </div>
              </div>
            </div>

            {/* Interaction Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Interaction Settings</h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
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
                  <Switch
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

                <div className="flex items-center space-x-2">
                  <Switch
                    id="showInBanner"
                    checked={formData.interActions?.showInBanner || false}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        interActions: {
                          ...prev.interActions,
                          showInBanner: checked,
                        },
                      }))
                    }
                  />
                  <Label htmlFor="showInBanner" className="font-normal">
                    Show in promotional banner
                    <p className="text-sm text-muted-foreground">
                      Display this coupon in site-wide promotional banners
                    </p>
                  </Label>
                </div>

                {formData.interActions.showInBanner && (
                  <div className="space-y-2 pl-8">
                    <Label htmlFor="bannerText">Banner Text</Label>
                    <Input
                      id="bannerText"
                      name="interActions.bannerText"
                      value={formData.interActions.bannerText}
                      onChange={handleChange}
                      placeholder="e.g., Summer Sale - 20% Off!"
                      maxLength={100}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Rules Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Coupon Rules</h3>
              <p className="text-sm text-muted-foreground">
                Add conditions that must be met for this coupon to be applicable
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ruleOptions.map((rule) => (
                  <div key={rule.id} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`rule-${rule.id}`}
                        checked={formData.rules.some((r) => r.type === rule.id)}
                        onCheckedChange={(checked) =>
                          handleRuleToggle(rule.id, checked)
                        }
                      />
                      <Label
                        htmlFor={`rule-${rule.id}`}
                        className="font-normal"
                      >
                        {rule.name}
                      </Label>
                    </div>

                    {formData.rules.some((r) => r.type === rule.id) &&
                      rule.inputType !== "none" && (
                        <div className="pl-8">
                          {rule.inputType === "number" ? (
                            <Input
                              type="number"
                              value={
                                formData.rules.find((r) => r.type === rule.id)
                                  ?.value || ""
                              }
                              onChange={(e) =>
                                handleRuleValueChange(rule.id, e.target.value)
                              }
                              placeholder={rule.description}
                              min="0"
                            />
                          ) : (
                            <Input
                              type="text"
                              value={
                                formData.rules.find((r) => r.type === rule.id)
                                  ?.value || ""
                              }
                              onChange={(e) =>
                                handleRuleValueChange(rule.id, e.target.value)
                              }
                              placeholder={rule.description}
                            />
                          )}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>

            {/* Metadata Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Metadata</h3>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tags for organization"
                    onKeyDown={(e) => e.key === "Enter" && addTag()}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    Add
                  </Button>
                </div>

                {formData.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.metadata.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaignId">Campaign ID</Label>
                <Input
                  id="campaignId"
                  name="metadata.campaignId"
                  value={formData.metadata.campaignId || ""}
                  onChange={handleChange}
                  placeholder="Associated marketing campaign ID"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
