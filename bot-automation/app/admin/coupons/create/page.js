"use client";

import { useState, useEffect } from "react";
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
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { MultiSelect } from "@/components/ui/multi-select";
import { AdminServices } from "@/lib/client/admin.service";

export default function CreateCouponPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    discountType: "percent",
    discountValue: "",
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    usageLimit: 100,
    applicablePlans: [],
    currency: "",
    rules: [],
  });
  const [loading, setLoading] = useState(false);
  const [rules, setRules] = useState([]);
  const [planOptions] = useState([
    { value: "starter", label: "Starter" },
    { value: "pro", label: "Pro" },
    { value: "growth", label: "Growth" },
    { value: "enterprise", label: "Enterprise" },
  ]);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await AdminServices.fetchCouponRules();
        if (response.status && !response.ok) {
          console.error("Error fetching rules");
        }
        setRules(response.rules);
      } catch (error) {
        console.error("Error fetching rules:", error);
      }
    };
    fetchRules();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await AdminServices.createCoupon(formData);
      if (response.status && !response.ok) {
        const data = await response.json();
        console.error(data.message || "Creation failed");
      }
      console.log(response.coupon);
      if (response.success) {
        router.push(`/admin/coupons/${response.coupon._id}`);
      }
    } catch (error) {
      console.error("Error creating coupon:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Coupon</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Coupon Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Coupon Code</Label>
            <Input
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discountType">Discount Type</Label>
            <Select
              value={formData.discountType}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, discountType: value }))
              }
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

          <div className="space-y-2">
            <Label htmlFor="discountValue">
              {formData.discountType === "percent" ? "Percentage" : "Amount"}
            </Label>
            <Input
              id="discountValue"
              name="discountValue"
              type="number"
              value={formData.discountValue}
              onChange={handleChange}
              required
              min="0"
              step={formData.discountType === "percent" ? "1" : "0.01"}
            />
          </div>

          <div className="space-y-2">
            <Label>Start Date</Label>
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
                    setFormData((prev) => ({ ...prev, startDate: date }))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>End Date</Label>
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

          <div className="space-y-2">
            <Label htmlFor="usageLimit">Usage Limit</Label>
            <Input
              id="usageLimit"
              name="usageLimit"
              type="number"
              value={formData.usageLimit}
              onChange={handleChange}
              required
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label>Applicable Plans</Label>
            <MultiSelect
              options={planOptions}
              selected={formData.applicablePlans}
              onChange={(selected) =>
                setFormData((prev) => ({ ...prev, applicablePlans: selected }))
              }
              placeholder="Select plans..."
            />
          </div>
          {formData.discountType === "fixed" && (
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
        </div>

        <div className="space-y-4">
          <Label>Coupon Rules</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <Label htmlFor={`rule-${rule._id}`}>
                  {rule.name} ({rule.conditionType})
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/coupons")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Coupon"}
          </Button>
        </div>
      </form>
    </div>
  );
}
