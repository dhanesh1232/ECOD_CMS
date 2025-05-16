"use client";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/toast-provider";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
const GeneralPage = () => {
  const { data: session } = useSession();
  const showToast = useToast();
  const params = useParams();
  const workspaceId = params.workspaceId;
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
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
  });
  const [hasChanges, setHasChanges] = useState(false);
  useEffect(() => {
    const fetchWorkspaceSettings = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/workspace/${workspaceId}/settings`);
        if (!response.ok) {
          throw new Error("Failed to fetch workspace settings");
        }
        const data = await response.json();
        setWorkspace(data);
        console.log(data);
        setFormData({
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
        });
      } catch (error) {
        showToast({
          title: "Error",
          description: "Failed to load workspace settings",
          variant: "warning",
        });
      } finally {
        setLoading(false);
      }
    };
    if (session && workspaceId) {
      fetchWorkspaceSettings();
    }
  }, [workspaceId, session, showToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      setHasChanges(JSON.stringify(newData) !== JSON.stringify(workspace));
      return newData;
    });
  };
  const handleNestedChange = (parent, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = {
        ...prev,
        [parent]: {
          ...prev[parent],
          [name]: value,
        },
      };
      setHasChanges(JSON.stringify(newData) !== JSON.stringify(workspace));
      return newData;
    });
  };
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = {
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          address: {
            ...prev.contactInfo.address,
            [name]: value,
          },
        },
      };
      setHasChanges(JSON.stringify(newData) !== JSON.stringify(workspace));
      return newData;
    });
  };

  const handleAddDomain = () => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        security: {
          ...prev.security,
          widgetDomainWhitelist: [...prev.security.widgetDomainWhitelist, ""],
        },
      };
      setHasChanges(true);
      return newData;
    });
  };
  const handleDomainChange = (index, value) => {
    setFormData((prev) => {
      const newDomains = [...prev.security.widgetDomainWhitelist];
      newDomains[index] = value;
      const newData = {
        ...prev,
        security: {
          ...prev.security,
          widgetDomainWhitelist: newDomains,
        },
      };
      setHasChanges(JSON.stringify(newData) !== JSON.stringify(workspace));
      return newData;
    });
  };
  const handleRemoveDomain = (index) => {
    setFormData((prev) => {
      const newDomains = [...prev.security.widgetDomainWhitelist];
      newDomains.splice(index, 1);
      const newData = {
        ...prev,
        security: {
          ...prev.security,
          widgetDomainWhitelist: newDomains,
        },
      };
      setHasChanges(JSON.stringify(newData) !== JSON.stringify(workspace));
      return newData;
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/workspace/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update workspace settings");
      }

      const updatedWorkspace = await response.json();
      setWorkspace(updatedWorkspace);
      setHasChanges(false);
      showToast({
        description: "Workspace settings updated successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Error updating workspace settings:", error);
      showToast({
        description: "Failed to update workspace settings",
        variant: "warning",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !workspace) {
    return (
      <div className="space-y-4">
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
    <div className="space-y-6 p-4 sm:p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">General Settings</h1>
        <p className="text-sm text-muted-foreground">
          {`Manage your workspace's basic information, branding, and security
          settings.`}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Workspace Information</h2>
            <p className="text-sm text-muted-foreground">
              Basic details about your workspace.
            </p>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Workspace Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your workspace name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, industry: value }))
                }
              >
                <SelectTrigger>
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
              <Select
                value={formData.timezone}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, timezone: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="America/New_York">
                    Eastern Time (ET)
                  </SelectItem>
                  <SelectItem value="America/Chicago">
                    Central Time (CT)
                  </SelectItem>
                  <SelectItem value="America/Denver">
                    Mountain Time (MT)
                  </SelectItem>
                  <SelectItem value="America/Los_Angeles">
                    Pacific Time (PT)
                  </SelectItem>
                  <SelectItem value="Europe/London">London</SelectItem>
                  <SelectItem value="Europe/Paris">Paris</SelectItem>
                  <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                  <SelectItem value="Asia/Shanghai">Shanghai</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="A brief description of your workspace"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Contact Information</h2>
            <p className="text-sm text-muted-foreground">
              How customers can get in touch with your business.
            </p>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                type="email"
                id="supportEmail"
                name="supportEmail"
                value={formData.contactInfo.supportEmail}
                onChange={(e) => handleNestedChange("contactInfo", e)}
                placeholder="support@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="websiteURL">Website URL</Label>
              <Input
                type="url"
                id="websiteURL"
                name="websiteURL"
                value={formData.contactInfo.websiteURL}
                onChange={(e) => handleNestedChange("contactInfo", e)}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.contactInfo.phone}
                onChange={(e) => handleNestedChange("contactInfo", e)}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <h3 className="text-sm font-medium">Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Street</Label>
                  <Input
                    id="street"
                    name="street"
                    value={formData.contactInfo.address.street}
                    onChange={handleAddressChange}
                    placeholder="123 Main St"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.contactInfo.address.city}
                    onChange={handleAddressChange}
                    placeholder="New York"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.contactInfo.address.state}
                    onChange={handleAddressChange}
                    placeholder="NY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">ZIP/Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={formData.contactInfo.address.postalCode}
                    onChange={handleAddressChange}
                    placeholder="10001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.contactInfo.address.country}
                    onChange={handleAddressChange}
                    placeholder="United States"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Branding Card */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Branding</h2>
            <p className="text-sm text-muted-foreground">
              Customize how your workspace looks across the platform.
            </p>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="primaryColor"
                  name="primaryColor"
                  value={formData.branding.primaryColor}
                  onChange={(e) => handleNestedChange("branding", e)}
                  className="h-10 w-10 rounded-md border cursor-pointer"
                />
                <Input
                  value={formData.branding.primaryColor}
                  onChange={(e) => handleNestedChange("branding", e)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Secondary Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="secondaryColor"
                  name="secondaryColor"
                  value={formData.branding.secondaryColor}
                  onChange={(e) => handleNestedChange("branding", e)}
                  className="h-10 w-10 rounded-md border cursor-pointer"
                />
                <Input
                  value={formData.branding.secondaryColor}
                  onChange={(e) => handleNestedChange("branding", e)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input
                type="url"
                id="logoUrl"
                name="logoUrl"
                value={formData.branding.logoUrl}
                onChange={(e) => handleNestedChange("branding", e)}
                placeholder="https://example.com/logo.png"
              />
              {formData.branding.logoUrl && (
                <div className="mt-2">
                  <Image
                    height={100}
                    width={100}
                    src={formData.branding.logoUrl}
                    alt="Logo preview"
                    className="h-16 object-contain rounded-md border"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="faviconUrl">Favicon URL</Label>
              <Input
                type="url"
                id="faviconUrl"
                name="faviconUrl"
                value={formData.branding.faviconUrl}
                onChange={(e) => handleNestedChange("branding", e)}
                placeholder="https://example.com/favicon.ico"
              />
              {formData.branding.faviconUrl && (
                <div className="mt-2">
                  <Image
                    height={100}
                    width={100}
                    src={formData.branding.faviconUrl}
                    alt="Favicon preview"
                    className="h-16 object-contain rounded-md border"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="customDomain">Custom Domain</Label>
              <Input
                id="customDomain"
                name="customDomain"
                value={formData.branding.customDomain}
                onChange={(e) => handleNestedChange("branding", e)}
                placeholder="example.com"
              />
              <p className="text-sm text-muted-foreground">
                Enter your custom domain without https:// or www.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Card */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Security</h2>
            <p className="text-sm text-muted-foreground">
              Configure security settings for your workspace.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Widget Domain Whitelist</Label>
                <p className="text-sm text-muted-foreground">
                  Domains where your chat widget is allowed to be embedded.
                </p>
              </div>

              <div className="space-y-2">
                {formData.security.widgetDomainWhitelist.map(
                  (domain, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        type="url"
                        value={domain}
                        onChange={(e) =>
                          handleDomainChange(index, e.target.value)
                        }
                        placeholder="https://example.com"
                      />
                      <Button
                        type="button"
                        onClick={() => handleRemoveDomain(index)}
                        variant="destructive"
                        size="icon"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                )}
                <Button
                  type="button"
                  onClick={handleAddDomain}
                  variant="outline"
                  className="gap-1"
                >
                  <PlusIcon className="h-4 w-4" />
                  Add Domain
                </Button>
              </div>
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
                value={formData.security.apiKeyRotationDays}
                onChange={(e) => handleNestedChange("security", e)}
              />
              <p className="text-sm text-muted-foreground">
                How often API keys should be automatically rotated (1-365 days).
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            onClick={() => {
              setFormData(workspace);
              setHasChanges(false);
            }}
            disabled={!hasChanges}
            variant="outline"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={!hasChanges || loading}>
            {loading ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

const TrashIcon = ({ className }) => (
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
    className={className}
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const PlusIcon = ({ className }) => (
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
    className={className}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const Loader2Icon = ({ className }) => (
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
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export default GeneralPage;
