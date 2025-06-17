"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useToast } from "../ui/toast-provider";
import { billingService } from "@/lib/client/billing";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Loader2,
  RefreshCcw,
  ArrowLeft,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Building2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Badge } from "../ui/badge";

export const BillingProfile = () => {
  const { workspaceId } = useParams();
  const showToast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const toastRef = useRef(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const returnUrl = searchParams.get("return");

  const hasChanges = useCallback(() => {
    if (!formData || !originalData) return false;
    return Object.keys(formData).some(
      (key) => formData[key] !== originalData[key]
    );
  }, [formData, originalData]);

  const fetchBillingProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await billingService.getBillingProfile(workspaceId);
      if (res?.profile) {
        setFormData(res.profile);
        setOriginalData(res.profile);
        setShowForm(false);
        setSaveSuccess(true);
      } else {
        setFormData(null);
        setOriginalData(null);
      }
    } catch (err) {
      if (!toastRef.current) {
        showToast({
          title: "Error",
          description: err.message || "Failed to fetch billing profile",
          variant: "destructive",
        });
        toastRef.current = true;
      }
      setFormData(null);
      setOriginalData(null);
    } finally {
      setIsLoading(false);
    }
  }, [showToast, workspaceId]);

  useEffect(() => {
    if (!workspaceId) return;
    fetchBillingProfile();
  }, [workspaceId, fetchBillingProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName?.trim())
      newErrors.companyName = "Company name is required";
    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.addressLine1?.trim())
      newErrors.addressLine1 = "Address line 1 is required";
    if (!formData.city?.trim()) newErrors.city = "City is required";
    if (!formData.state?.trim()) newErrors.state = "State is required";
    if (!formData.postalCode?.trim())
      newErrors.postalCode = "Postal code is required";
    if (!formData.country?.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = originalData
        ? await billingService.updateBillingProfile(workspaceId, formData)
        : await billingService.createBillingProfile(workspaceId, formData);

      if (result.status && !result.ok) {
        const error = await result.json;
        showToast({
          title: "Error",
          description: error.message || "Failed to save billing details",
          variant: "destructive",
        });
      }
      setFormData(result);
      setOriginalData(result);
      setSaveSuccess(true);
      showToast({
        title: "Success",
        description: "Billing details saved successfully",
        variant: "success",
      });
    } catch (error) {
      showToast({
        title: "Error",
        description: error.message || "Failed to save billing details",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddBillingDetails = () => {
    setFormData({
      companyName: "",
      email: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      gstin: "",
    });
    setShowForm(true);
    setSaveSuccess(false);
  };

  const handleReturnToCheckout = () => {
    router.push(returnUrl);
  };

  const handleCancel = () => {
    if (originalData) {
      setFormData(originalData);
      setShowForm(false);
    } else {
      setFormData(null);
      setShowForm(false);
    }
    setSaveSuccess(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Card className="border-0 shadow-sm">
        <CardHeader className="border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg md:text-xl font-semibold">
              Billing Details
            </CardTitle>

            <Button
              variant="ghost"
              size="icon"
              disabled={isLoading}
              onClick={() => fetchBillingProfile()}
              className="rounded-full"
            >
              <RefreshCcw
                size={16}
                className={`${isLoading && "animate-spin"}`}
              />
            </Button>
          </div>
        </CardHeader>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <CardContent className="py-2">
              {formData || showForm ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* Company Information */}
                    <div className="space-y-2 sm:col-span-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <Label
                          htmlFor="companyName"
                          className="text-sm font-medium"
                        >
                          Company Name <span className="text-red-500">*</span>
                        </Label>
                      </div>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData?.companyName || ""}
                        onChange={handleChange}
                        className={`${
                          errors.companyName
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        placeholder="Enter company name"
                      />
                      {errors.companyName && (
                        <p className="text-sm text-red-500">
                          {errors.companyName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email <span className="text-red-500">*</span>
                        </Label>
                      </div>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData?.email || ""}
                        onChange={handleChange}
                        className={`${
                          errors.email
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        placeholder="billing@company.com"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="phone" className="text-sm font-medium">
                          Phone Number
                        </Label>
                      </div>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData?.phone || ""}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    {/* Billing Address Section */}
                    <div className="sm:col-span-2 pt-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                          Billing Address
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label
                        htmlFor="addressLine1"
                        className="text-sm font-medium"
                      >
                        Address Line 1 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="addressLine1"
                        name="addressLine1"
                        value={formData?.addressLine1 || ""}
                        onChange={handleChange}
                        className={`${
                          errors.addressLine1
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        placeholder="Street address, P.O. box"
                      />
                      {errors.addressLine1 && (
                        <p className="text-sm text-red-500">
                          {errors.addressLine1}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label
                        htmlFor="addressLine2"
                        className="text-sm font-medium"
                      >
                        Address Line 2
                      </Label>
                      <Input
                        id="addressLine2"
                        name="addressLine2"
                        value={formData?.addressLine2 || ""}
                        onChange={handleChange}
                        placeholder="Apartment, suite, unit, building, floor, etc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData?.city || ""}
                        onChange={handleChange}
                        className={`${
                          errors.city ? "border-red-500 focus:ring-red-500" : ""
                        }`}
                        placeholder="City name"
                      />
                      {errors.city && (
                        <p className="text-sm text-red-500">{errors.city}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-sm font-medium">
                        State/Province <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData?.state || ""}
                        onChange={handleChange}
                        className={`${
                          errors.state
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        placeholder="State or province"
                      />
                      {errors.state && (
                        <p className="text-sm text-red-500">{errors.state}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="postalCode"
                        className="text-sm font-medium"
                      >
                        Postal Code <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData?.postalCode || ""}
                        onChange={handleChange}
                        className={`${
                          errors.postalCode
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        placeholder="ZIP or postal code"
                      />
                      {errors.postalCode && (
                        <p className="text-sm text-red-500">
                          {errors.postalCode}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-sm font-medium">
                        Country <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData?.country || ""}
                        onChange={handleChange}
                        className={`${
                          errors.country
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        placeholder="Country name"
                      />
                      {errors.country && (
                        <p className="text-sm text-red-500">{errors.country}</p>
                      )}
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="gstin" className="text-sm font-medium">
                        TAX ID (Optional)
                      </Label>
                      <Input
                        id="gstin"
                        name="gstin"
                        value={formData?.gstin || ""}
                        onChange={handleChange}
                        placeholder="Tax identification number"
                      />
                    </div>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 gap-6 text-center">
                  <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-gray-500"
                    >
                      <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      No billing details found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md">
                      Add your billing information to receive invoices and
                      manage payments.
                    </p>
                  </div>
                  <Button
                    onClick={handleAddBillingDetails}
                    size="md"
                    variant="outline-primary"
                  >
                    Add Billing Details
                  </Button>
                </div>
              )}
            </CardContent>

            {(formData || showForm) && (
              <CardFooter className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 px-6 py-4">
                <div className="flex w-full items-center justify-between">
                  {returnUrl && saveSuccess && (
                    <Button
                      onClick={handleReturnToCheckout}
                      variant="outline"
                      className="gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Return to Checkout
                    </Button>
                  )}
                  <div className="flex items-center justify-end gap-3">
                    {(hasChanges() || !originalData) && (
                      <>
                        <Button
                          type="button"
                          onClick={handleCancel}
                          variant="outline"
                          disabled={isSubmitting}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          onClick={handleSubmit}
                          disabled={
                            isSubmitting || (!hasChanges() && originalData)
                          }
                          className="min-w-[120px]"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : originalData ? (
                            "Save Changes"
                          ) : (
                            "Create Profile"
                          )}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardFooter>
            )}
          </>
        )}
      </Card>
    </div>
  );
};
