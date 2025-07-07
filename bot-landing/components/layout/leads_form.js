"use client";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import { X } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMediaQuery } from "@/hooks/mediaQuery";
import { LandingPageAPIHandles } from "@/lib/client/api";

const NotifyMeForm = ({ onClose }) => {
  const toast = useToast();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyOrWebsite: "",
    phoneNumber: "",
    industryUseCase: "",
    otherIndustryText: "",
    referralSource: "",
    consentToUpdates: false,
  });
  const [errors, setErrors] = useState({});

  const industries = [
    "Real Estate",
    "E-commerce",
    "Education",
    "Healthcare",
    "Restaurants",
    "Agencies",
    "Finance",
    "Other",
  ];

  // Close dialog after 5 seconds on success
  useEffect(() => {
    let timer;
    if (isSuccess && onClose) {
      timer = setTimeout(() => {
        onClose();
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isSuccess, onClose]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "consentToUpdates") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.industryUseCase) {
      newErrors.industryUseCase = "Please select an industry";
    } else if (
      formData.industryUseCase === "Other" &&
      !formData.otherIndustryText.trim()
    ) {
      newErrors.otherIndustryText = "Please specify your industry";
    }

    if (!formData.consentToUpdates) {
      newErrors.consentToUpdates = "You must agree to receive updates";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await LandingPageAPIHandles.preNotifyConnect(formData);

      if (!response.ok && response.status) {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong");
      }

      // Show success state
      setIsSuccess(true);

      toast({
        description: "🎉 You're on the list! We'll notify you at launch.",
        variant: "success",
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        companyOrWebsite: "",
        phoneNumber: "",
        industryUseCase: "",
        otherIndustryText: "",
        referralSource: "",
        consentToUpdates: false,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description:
          error.message || "Failed to submit form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <DialogContent className="max-w-xs sm:max-w-md md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-2xl font-bold text-center">
            Thank You!
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            {`You're on the list!`}
          </h3>
          <div className="mt-2 text-sm text-gray-500">
            {`We'll notify you when we launch. The dialog will close automatically in a few seconds...`}
          </div>
          <Button onClick={onClose} variant="outline-primary" className="mt-4">
            Close
          </Button>
        </div>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="max-w-xs sm:max-w-md md:max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-lg md:text-2xl font-bold text-center">
          Get Notified at Launch
        </DialogTitle>
        <DialogDescription className="text-center text-sm md:text-base text-muted-foreground">
          Join our waiting list to be the first to know when we launch.
        </DialogDescription>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogHeader>

      <form
        onSubmit={handleSubmit}
        className="space-y-1 sm:space-y-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Full Name */}
          <div className="space-y-1 md:space-y-2">
            <Label htmlFor="fullName" className="text-sm truncate font-medium">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              size={isMobile ? "sm" : "md"}
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full ${errors.fullName ? "border-red-500" : ""}`}
            />
            {errors.fullName && (
              <p className="text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1 md:space-y-2">
            <Label htmlFor="email" className="text-sm  truncate font-medium">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              size={isMobile ? "sm" : "md"}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Company or Website */}
          <div className="space-y-1 md:space-y-2">
            <Label
              htmlFor="companyOrWebsite"
              className="text-sm truncate font-medium"
            >
              Company or Website (optional)
            </Label>
            <Input
              type="text"
              size={isMobile ? "sm" : "md"}
              id="companyOrWebsite"
              name="companyOrWebsite"
              value={formData.companyOrWebsite}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1 md:space-y-2">
            <Label
              htmlFor="phoneNumber"
              className="text-sm truncate font-medium"
            >
              Phone Number (optional)
            </Label>
            <Input
              type="tel"
              id="phoneNumber"
              size={isMobile ? "sm" : "md"}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </div>

        {/* Industry Use Case */}
        <div className="space-y-1 md:space-y-2">
          <Label
            htmlFor="industryUseCase"
            className="text-sm truncate font-medium"
          >
            How do you plan to use our platform?{" "}
            <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.industryUseCase}
            onValueChange={(value) =>
              handleSelectChange("industryUseCase", value)
            }
          >
            <SelectTrigger
              size={isMobile ? "sm" : "md"}
              className={`w-full ${
                errors.industryUseCase ? "border-red-500" : ""
              }`}
            >
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.industryUseCase && (
            <p className="text-sm text-red-600">{errors.industryUseCase}</p>
          )}
        </div>

        {/* Other Industry Text */}
        {formData.industryUseCase === "Other" && (
          <div className="space-y-1 md:space-y-2">
            <Label
              htmlFor="otherIndustryText"
              className="text-sm truncate font-medium"
            >
              Please specify your industry{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              size={isMobile ? "sm" : "md"}
              type="text"
              id="otherIndustryText"
              name="otherIndustryText"
              value={formData.otherIndustryText}
              onChange={handleChange}
              className={`w-full ${
                errors.otherIndustryText ? "border-red-500" : ""
              }`}
            />
            {errors.otherIndustryText && (
              <p className="text-sm text-red-600">{errors.otherIndustryText}</p>
            )}
          </div>
        )}

        {/* Referral Source */}
        <div className="space-y-1 md:space-y-2">
          <Label
            htmlFor="referralSource"
            className="text-sm truncate font-medium"
          >
            How did you hear about us? (optional)
          </Label>
          <Input
            type="text"
            id="referralSource"
            size={isMobile ? "sm" : "md"}
            name="referralSource"
            value={formData.referralSource}
            onChange={handleChange}
            className="w-full ring-0 focus:ring-0"
          />
        </div>

        {/* Consent Checkbox */}
        <div className="flex flex-col pt-2">
          <div className="flex space-x-3 items-center">
            <Checkbox
              id="consentToUpdates"
              name="consentToUpdates"
              checked={formData.consentToUpdates}
              onCheckedChange={(checked) =>
                handleSelectChange("consentToUpdates", checked)
              }
            />
            <Label htmlFor="consentToUpdates" className="text-sm font-medium">
              I agree to receive launch updates{" "}
              <span className="text-red-500">*</span>
            </Label>
          </div>
          <div className="grid gap-0 leading-none">
            <p className="text-xs text-gray-600 md:text-sm text-muted-foreground">
              {`We'll only send you important updates about our launch.`}
            </p>
          </div>
        </div>
        {errors.consentToUpdates && (
          <p className="text-sm text-red-600">{errors.consentToUpdates}</p>
        )}

        {/* Submit Button */}
        <div className="pt-2 md:pt-4">
          <Button
            type="submit"
            variant="premium"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Notify Me at Launch"
            )}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export const LeadsForm = ({
  buttonText = "Get Started",
  icon: Icon,
  iconPosition = "left",
  className = "",
  variant = "premium",
  slogan = "",
  ...props
}) => {
  const [open, setOpen] = useState(false); // control dialog visibility

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="custom"
          variant={variant}
          className={`inline-flex items-center justify-center gap-2 ${className}`}
          {...props}
        >
          {Icon && iconPosition === "left" && <Icon className="h-4 w-4" />}
          <span>{buttonText}</span>
          {Icon && iconPosition === "right" && <Icon className="h-4 w-4" />}
        </Button>
      </DialogTrigger>
      <NotifyMeForm onClose={() => setOpen(false)} />
    </Dialog>
  );
};
