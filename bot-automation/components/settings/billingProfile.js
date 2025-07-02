"use client";
import countries from "world-countries";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "../ui/toast-provider";
import { billingService } from "@/lib/client/billing";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Loader2,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Building2,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { StyledPhoneInput } from "../ui/phone_input";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/mediaQuery";
import { motion } from "framer-motion";
import { OverlayLoader } from "../animate/overlay_loader";

export const BillingProfile = ({ returnUrl }) => {
  const { workspaceId } = useParams();
  const showToast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [matchedCountries, setMatchedCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const countryInputRef = useRef(null);
  const countryDropdownRef = useRef(null);
  const isMobile = useMediaQuery("(max-width:640px)");
  const toastRef = useRef(false);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countryInputRef.current &&
        !countryInputRef.current.contains(event.target) &&
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const findCountries = (input) => {
    if (!input?.trim()) return [];
    const searchTerm = input.trim().toLowerCase();
    return countries.filter(
      (c) =>
        c.name.common.toLowerCase().includes(searchTerm) ||
        c.name.official.toLowerCase().includes(searchTerm)
    ); // Limit to 5 results
  };
  useEffect(() => {
    if (originalData && originalData?.country) {
      const country = countries.find(
        (each) =>
          each.name.common.toLowerCase() === originalData?.country.toLowerCase()
      );

      setSelectedCountry(country.cca2.toLowerCase());
    }
  }, [originalData?.country, originalData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "country") {
      const matches = findCountries(value);

      setMatchedCountries(matches);
      setShowCountryDropdown(value.trim().length > 0 && matches.length > 0);
    }
  };

  const handleCountrySelect = (countryName, code) => {
    setFormData((prev) => ({ ...prev, country: countryName }));
    setSelectedCountry(code);
    setMatchedCountries([]);
    setShowCountryDropdown(false);
  };

  const handlePhoneInput = (value) => {
    setFormData((prev) => ({ ...prev, phone: value || "" }));
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
        title: "Missing or Invalid",
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

      showToast({
        title: "Success",
        description:
          "Billing details saved successfully and can navigate checkout page",
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
  };

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Card className="border-0 shadow-sm">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
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
                <RotateCcw
                  size={16}
                  className={`${isLoading && "animate-spin"}`}
                />
              </Button>
            </div>
          </CardHeader>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <OverlayLoader open={true} />
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <CardContent className="py-2">
                {formData || showForm ? (
                  <form onSubmit={handleSubmit} className="space-y-2">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
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
                          <Label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
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
                          <Label
                            htmlFor="phone"
                            className="text-sm font-medium"
                          >
                            Phone Number
                          </Label>
                        </div>
                        <StyledPhoneInput
                          id="phone"
                          value={formData?.phone || ""}
                          onChange={handlePhoneInput}
                          placeholder="+1 (555) 123-4567"
                          className="pl-0"
                        />
                      </div>

                      {/* Billing Address Section */}
                      <div className="sm:col-span-2 pt-2">
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
                            errors.city
                              ? "border-red-500 focus:ring-red-500"
                              : ""
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

                      <div className="space-y-2 relative" ref={countryInputRef}>
                        <Label
                          htmlFor="country"
                          className="text-sm font-medium"
                        >
                          Country <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative flex items-center gap-1">
                          {selectedCountry && (
                            <div className="absolute z-20 inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                              <Image
                                width={20}
                                height={15}
                                src={`https://flagcdn.com/w40/${selectedCountry}.png`}
                                alt={formData?.country || ""}
                                className="h-4 w-6 border-0"
                              />
                            </div>
                          )}
                          <Input
                            id="country"
                            name="country"
                            value={formData?.country || ""}
                            onChange={handleChange}
                            onFocus={() => {
                              if (formData?.country) {
                                const matches = findCountries(formData.country);
                                setMatchedCountries(matches);
                                setShowCountryDropdown(matches.length > 0);
                              }
                            }}
                            className={`${selectedCountry && "pl-12"} ${
                              errors.country
                                ? "border-red-500 focus:ring-red-500"
                                : ""
                            }`}
                            placeholder="Country name"
                          />
                        </div>
                        {errors.country && (
                          <p className="text-sm text-red-500">
                            {errors.country}
                          </p>
                        )}
                        {showCountryDropdown && matchedCountries.length > 0 && (
                          <div
                            ref={countryDropdownRef}
                            className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 max-h-60 scrollbar-transparent overflow-auto"
                          >
                            {matchedCountries.map((country) => (
                              <div
                                key={country.cca2}
                                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                                onClick={() =>
                                  handleCountrySelect(
                                    country.name.common,
                                    country.cca2.toLowerCase()
                                  )
                                }
                              >
                                <span
                                  className="text-xl mr-2"
                                  aria-hidden="true"
                                >
                                  <Image
                                    width={25}
                                    height={20}
                                    src={`https://flagcdn.com/w40/${country.cca2.toLowerCase()}.png`}
                                    alt={country.name.common}
                                    className="h-4 w-6 rounded-sm border-0"
                                  />
                                </span>
                                <div className="font-medium text-sm truncate">
                                  {country.name.common}
                                </div>
                              </div>
                            ))}
                          </div>
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
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
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
                {!isLoading &&
                  (showForm ||
                    formData ||
                    (hasChanges() && originalData) ||
                    !originalData) && (
                    <motion.div
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -100, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className=" w-full"
                    >
                      <div className="w-full mx-auto px-4 py-1.5">
                        <div className="flex items-center justify-between gap-4">
                          {/* Left side - Back button */}
                          <div className="">
                            {returnUrl && (
                              <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                <Button
                                  onClick={handleReturnToCheckout}
                                  variant="outline-primary"
                                  size={isMobile ? "xs" : "sm"}
                                  className="gap-2 transition-colors"
                                >
                                  <ArrowLeft className="h-4 w-4" />
                                  <span className="truncate">Checkout</span>
                                </Button>
                              </motion.div>
                            )}
                          </div>
                          {/* Right side - Action buttons */}
                          <div className="flex items-center">
                            <div className="flex items-center gap-2">
                              {(hasChanges() || !originalData) && (
                                <>
                                  <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                  >
                                    <Button
                                      type="button"
                                      size={isMobile ? "xs" : "sm"}
                                      onClick={handleCancel}
                                      variant="outline"
                                      disabled={isSubmitting}
                                      className="min-w-[80px] hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                    >
                                      Cancel
                                    </Button>
                                  </motion.div>
                                  <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.15 }}
                                  >
                                    <Button
                                      type="submit"
                                      size={isMobile ? "xs" : "sm"}
                                      onClick={handleSubmit}
                                      disabled={
                                        isSubmitting ||
                                        (!hasChanges() && originalData)
                                      }
                                      variant="success"
                                    >
                                      {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                          Saving...
                                        </span>
                                      ) : originalData ? (
                                        "Save"
                                      ) : (
                                        "Update"
                                      )}
                                    </Button>
                                  </motion.div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </>
  );
};
