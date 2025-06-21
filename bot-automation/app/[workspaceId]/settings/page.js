"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useToast } from "@/components/ui/toast-provider";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { WorkspaceService } from "@/lib/client/team";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ColorPicker } from "@/components/ui/color-picker";
import { DomainWhitelist } from "@/components/ui/domain-whitelist";
import { ImageUpload } from "@/components/ui/image-upload";
import { Building, Contact, Palette, Shield } from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import { deepEqual } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";
import LocationSearch from "@/components/workspaceLocation";
import { StyledPhoneInput } from "@/components/ui/phone_input";
const TimezoneSelect = dynamic(() => import("@/components/selectTimezone"), {
  ssr: false,
});

const GeneralPage = () => {
  const { data: session } = useSession();
  const showToast = useToast();
  const params = useParams();
  const workspaceId = params.workspaceId;
  const toastRef = useRef(false);

  const initialFormState = {
    name: "",
    description: "",
    industry: "technology",
    timezone: "UTC",
    contactInfo: {
      supportEmail: "",
      websiteURL: "",
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
    },
    branding: {
      primaryColor: "#4f46e5",
      secondaryColor: "#7c3aed",
      logoUrl: "",
      faviconUrl: "",
      customDomain: "",
    },
    security: {
      widgetDomainWhitelist: [],
      apiKeyRotationDays: 90,
    },
  };

  const [state, setState] = useState({
    loading: true,
    saving: false,
    workspace: null,
    formData: initialFormState,
    initialData: initialFormState,
  });

  const hasChanges = !deepEqual(state.formData, state.initialData);

  useEffect(() => {
    setTimeout(() => {
      toastRef.current = false;
    }, 10000);
  });
  const fetchWorkspaceSettings = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));

      const data = await WorkspaceService.getWorkspaceConfig(workspaceId);
      const initialData = {
        name: data.name || "",
        description: data.description || "",
        industry: data.industry || "technology",
        timezone: data.timezone || "UTC",
        contactInfo: data.contactInfo || {
          supportEmail: "",
          websiteURL: "",
          phone: "",
          address: {
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
          },
        },
        branding: data.branding || {
          primaryColor: "#4f46e5",
          secondaryColor: "#7c3aed",
          logoUrl: "",
          faviconUrl: "",
          customDomain: "",
        },
        security: data.security || {
          widgetDomainWhitelist: [],
          apiKeyRotationDays: 90,
        },
      };

      setState((prev) => ({
        ...prev,
        loading: false,
        workspace: data,
        formData: initialData,
        initialData: JSON.parse(JSON.stringify(initialData)),
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      if (!toastRef.current) {
        showToast({
          title: "Error",
          description: "Failed to load workspace settings",
          variant: "destructive",
        });
        toastRef.current = true;
      }
    }
  }, [workspaceId, showToast]);

  useEffect(() => {
    if (session && workspaceId) {
      fetchWorkspaceSettings();
    }
  }, [session, workspaceId, fetchWorkspaceSettings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [name]: value,
      },
    }));
  };

  const handlePhoneChange = (phoneNumber) => {
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        contactInfo: {
          ...prev.formData.contactInfo,
          phone: phoneNumber || "",
        },
      },
    }));
  };

  const handleNestedChange = (parent, e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [parent]: {
          ...prev.formData[parent],
          [name]: value !== null && value !== undefined ? value : "",
        },
      },
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        contactInfo: {
          ...prev.formData.contactInfo,
          address: {
            ...prev.formData.contactInfo.address,
            [name]: value,
          },
        },
      },
    }));
  };

  const handlePlaceSelected = (place) => {
    const address = {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    };
    console.log(place);
  };

  const handleAddDomain = (domain) => {
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        security: {
          ...prev.formData.security,
          widgetDomainWhitelist: [
            ...prev.formData.security.widgetDomainWhitelist,
            domain,
          ],
        },
      },
    }));
  };

  const handleDomainChange = (index, value) => {
    setState((prev) => {
      const newDomains = [...prev.formData.security.widgetDomainWhitelist];
      newDomains[index] = value;
      return {
        ...prev,
        formData: {
          ...prev.formData,
          security: {
            ...prev.formData.security,
            widgetDomainWhitelist: newDomains,
          },
        },
      };
    });
  };

  const handleRemoveDomain = (index) => {
    setState((prev) => {
      const newDomains = [...prev.formData.security.widgetDomainWhitelist];
      newDomains.splice(index, 1);
      return {
        ...prev,
        formData: {
          ...prev.formData,
          security: {
            ...prev.formData.security,
            widgetDomainWhitelist: newDomains,
          },
        },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasChanges) return;

    try {
      setState((prev) => ({ ...prev, saving: true }));
      const updatedWorkspace = await WorkspaceService.updateWorkspaceConfig(
        workspaceId,
        state.formData
      );

      if (updatedWorkspace.error) {
        showToast({
          title: updatedWorkspace.error.error || "Validation Failed",
          description: updatedWorkspace.details[0].message,
          variant: "warning",
        });
      } else {
        setState((prev) => ({
          ...prev,
          workspace: updatedWorkspace,
          initialData: JSON.parse(JSON.stringify(prev.formData)),
          saving: false,
        }));

        showToast({
          description: "Workspace settings updated successfully",
          variant: "success",
        });
      }
    } catch (error) {
      setState((prev) => ({ ...prev, saving: false }));
      showToast({
        description: error.message || "Failed to update workspace settings",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setState((prev) => ({
      ...prev,
      formData: JSON.parse(JSON.stringify(prev.initialData)),
    }));
  };

  if (state.loading && !state.workspace) {
    return (
      <div className="space-y-4 p-4 sm:p-6">
        <Skeleton className="h-10 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          General Settings
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-3xl">
          {`Manage your workspace's basic information, branding, and security settings.`}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Workspace Information Card */}
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30">
                <Building className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <CardTitle className="text-lg sm:text-xl">
                  Workspace Information
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Basic details about your workspace
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3">
            <div className="space-y-2">
              <Label htmlFor="name">Organization</Label>
              <Input
                id="name"
                name="name"
                value={state.formData.name}
                onChange={handleChange}
                placeholder="Your Organization"
                className="bg-white dark:bg-gray-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                value={state.formData.industry}
                onValueChange={(value) =>
                  handleChange({ target: { name: "industry", value } })
                }
              >
                <SelectTrigger className="bg-white dark:bg-gray-900">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <TimezoneSelect
                value={state.formData.timezone}
                onValueChange={(value) =>
                  handleChange({
                    target: { name: "timezone", value },
                  })
                }
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={3}
                value={state.formData.description}
                onChange={handleChange}
                placeholder="A brief description of your workspace"
                className="bg-white dark:bg-gray-900"
              />
            </div>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        {/* Contact Information Card */}
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                <Contact className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-lg sm:text-xl">
                  Contact Information
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  How customers can get in touch with your business
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3">
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                type="email"
                id="supportEmail"
                name="supportEmail"
                value={state.formData.contactInfo.supportEmail}
                onChange={(e) => handleNestedChange("contactInfo", e)}
                placeholder="support@example.com"
                className="bg-white dark:bg-gray-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="websiteURL">Website URL</Label>
              <Input
                type="url"
                id="websiteURL"
                name="websiteURL"
                value={state.formData.contactInfo.websiteURL}
                onChange={(e) => handleNestedChange("contactInfo", e)}
                placeholder="https://example.com"
                className="bg-white dark:bg-gray-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <StyledPhoneInput
                id="phone"
                onChange={handlePhoneChange}
                value={state.formData.contactInfo.phone || ""}
              />
            </div>

            {process.env.NODE_ENV === "development" && (
              <div className="space-y-2 md:col-span-2">
                <LocationSearch onPlaceSelected={handlePlaceSelected} />
              </div>
            )}

            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <h3 className="text-sm font-medium">Address Details</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Street</Label>
                  <Input
                    id="street"
                    name="street"
                    value={state.formData.contactInfo?.address?.street || ""}
                    onChange={handleAddressChange}
                    placeholder="123 Main St"
                    className="bg-white dark:bg-gray-900"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={state.formData.contactInfo?.address?.city || ""}
                    onChange={handleAddressChange}
                    placeholder="New York"
                    className="bg-white dark:bg-gray-900"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    name="state"
                    value={state.formData.contactInfo?.address?.state || ""}
                    onChange={handleAddressChange}
                    placeholder="NY"
                    className="bg-white dark:bg-gray-900"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">ZIP/Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={
                      state.formData.contactInfo?.address?.postalCode || ""
                    }
                    onChange={handleAddressChange}
                    placeholder="10001"
                    className="bg-white dark:bg-gray-900"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={state.formData.contactInfo?.address?.country || ""}
                    onChange={handleAddressChange}
                    placeholder="United States"
                    className="bg-white dark:bg-gray-900"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        {/* Branding Card */}
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/30">
                <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-lg sm:text-xl">Branding</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Customize how your workspace looks across the platform
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3">
            <div className="space-y-2">
              <Label htmlFor="logoUrl">Logo URL</Label>
              <ImageUpload
                value={state.formData.branding.logoUrl || ""}
                onChange={(url) =>
                  handleNestedChange("branding", {
                    target: { name: "logoUrl", value: url },
                  })
                }
                placeholder="Upload logo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="faviconUrl">Favicon URL</Label>
              <ImageUpload
                value={state.formData.branding.faviconUrl || ""}
                onChange={(url) =>
                  handleNestedChange("branding", {
                    target: { name: "faviconUrl", value: url },
                  })
                }
                placeholder="Upload favicon"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full">
              <div className="sm:space-y-2 space-x-2 sm:space-x-0 flex  flex-row sm:flex-col items-center sm:items-start">
                <Label>Primary Color</Label>
                <ColorPicker
                  color={state.formData.branding.primaryColor}
                  onChange={(color) =>
                    handleNestedChange("branding", {
                      target: { name: "primaryColor", value: color },
                    })
                  }
                />
              </div>
              <div className="sm:space-y-2 space-x-2 sm:space-x-0 flex flex-row sm:flex-col items-center sm:items-start">
                <Label>Secondary Color</Label>
                <ColorPicker
                  color={state.formData.branding.secondaryColor}
                  onChange={(color) =>
                    handleNestedChange("branding", {
                      target: { name: "secondaryColor", value: color },
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="customDomain">Custom Domain</Label>
              <Input
                id="customDomain"
                name="customDomain"
                value={state.formData.branding.customDomain || ""}
                onChange={(e) => handleNestedChange("branding", e)}
                placeholder="example.com"
                className="bg-white dark:bg-gray-900"
              />
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Enter your custom domain without https:// or www.
              </p>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        {/* Security Card */}
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/30">
                <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <CardTitle className="text-lg sm:text-xl">Security</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Configure security settings for your workspace
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-3">
            <div className="space-y-4">
              <div>
                <Label>Widget Domain Whitelist</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Domains where your chat widget is allowed to be embedded
                </p>
              </div>

              <DomainWhitelist
                domains={state.formData.security.widgetDomainWhitelist}
                onAdd={handleAddDomain}
                onChange={handleDomainChange}
                onRemove={handleRemoveDomain}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiKeyRotationDays">
                API Key Rotation (Days)
              </Label>
              <Input
                type="number"
                id="apiKeyRotationDays"
                name="apiKeyRotationDays"
                min="1"
                max="365"
                value={state.formData.security.apiKeyRotationDays || ""}
                onChange={(e) => {
                  let inputValue = e.target.value;
                  if (inputValue.length > 1 && inputValue.startsWith("0")) {
                    inputValue = inputValue.slice(1);
                  }
                  const value = parseInt(inputValue, 10);
                  handleNestedChange("security", {
                    target: {
                      name: e.target.name,
                      value: isNaN(value) ? 90 : value,
                    },
                  });
                }}
                className="bg-white dark:bg-gray-900 max-w-xs"
              />
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                How often API keys should be automatically rotated (1-365 days)
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
          <Button
            type="button"
            onClick={handleReset}
            disabled={!hasChanges || state.saving}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={!hasChanges || state.saving}
            className="w-full sm:w-auto relative overflow-hidden"
          >
            {state.saving && (
              <motion.span
                className="absolute inset-0 bg-primary/20"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center">
              {state.saving ? (
                <>
                  <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GeneralPage;
