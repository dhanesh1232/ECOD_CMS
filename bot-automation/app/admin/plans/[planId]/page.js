"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/toast-provider";
import { AdminServices } from "@/lib/client/admin.service";
import { PLANS } from "@/utils/config.plans";
import { decryptData } from "@/utils/encryption";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Loader2,
  Save,
  Edit2,
  X,
  ChevronDown,
  ChevronRight,
  MoveLeft,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

export default function PlanDetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const id = decryptData(searchParams.get("id"));
  const planId = params.planId;
  const showToast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [planData, setPlanData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    channels: true,
    coreFeatures: false,
    chatbotAutomation: false,
    adsAutomation: false,
    dripCampaigns: false,
    landingPageBuilder: false,
    growthFeatures: false,
    enterpriseFeatures: false,
  });

  // Validate plan type
  useEffect(() => {
    if (!id || !Object.keys(PLANS).includes(id)) {
      router.push("/admin/plans");
    }
  }, [id, router]);

  // Fetch plan data
  const fetchPlan = useCallback(async () => {
    if (!planId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await AdminServices.getPlan(planId, id);

      if (response.status && !response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to fetch plan");
      }

      setPlanData(response.plan);
      setFormData(response.plan);
    } catch (err) {
      setError(err.message);
      showToast({
        title: "Error loading plan",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [planId, id, showToast]);

  useEffect(() => {
    fetchPlan();
  }, [fetchPlan]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleFeatureChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (section, field, value, checked) => {
    setFormData((prev) => {
      const currentArray = prev[section][field] || [];
      let newArray;

      if (checked) {
        newArray = [...currentArray, value];
      } else {
        newArray = currentArray.filter((item) => item !== value);
      }

      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newArray,
        },
      };
    });
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const response = await AdminServices.updatePlan(planId, id, formData);

      if (!response.ok) {
        throw new Error(response.message || "Update failed");
      }

      setPlanData(formData);
      setIsEditing(false);
      showToast({
        title: "Success",
        description: "Plan updated successfully",
      });
    } catch (err) {
      showToast({
        title: "Update failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(planData);
    setIsEditing(false);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const resetToDefault = () => {
    if (
      confirm("Are you sure you want to reset this plan to its default values?")
    ) {
      setFormData(PLANS[id]);
    }
  };

  const CHANNEL_OPTIONS = [
    { value: "web", label: "Web Chat" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "facebook", label: "Facebook Messenger" },
    { value: "instagram", label: "Instagram" },
    { value: "telegram", label: "Telegram" },
    { value: "sms", label: "SMS" },
    { value: "voice", label: "Voice" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="text-destructive text-lg">{error}</div>
        <Button onClick={fetchPlan}>Retry</Button>
      </div>
    );
  }

  if (!formData) return null;

  return (
    <div className="w-full py-8 p-4 sm:p-6 scrollbar-transparent overflow-y-auto">
      <div className="w-full flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          title="Back"
          aria-label="Back"
        >
          <MoveLeft className="h-5 w-10" />
        </Button>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                variant="secondary"
                onClick={handleCancel}
                disabled={isLoading}
              >
                <X className="h-4 w-4 mr-2" /> Cancel
              </Button>
              <Button
                variant="outline-warning"
                onClick={resetToDefault}
                disabled={isLoading}
              >
                Reset
              </Button>
              <Button
                variant="premium"
                onClick={handleUpdate}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save
              </Button>
            </>
          ) : (
            <Button variant="forest" onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4 mr-2" /> Edit
            </Button>
          )}
        </div>
      </div>
      <Separator thickness="px" className="my-2" />
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              {formData.name} Plan Management
            </h1>
            <p className="text-muted-foreground">{formData.description}</p>
          </div>
        </div>
      </div>
      <div className="w-full mb-2 space-y-2">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Configure the basic details of this plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Plan Name</Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label>Plan ID</Label>
                <Input value={formData.id} disabled />
              </div>
              <div className="md:col-span-2">
                <Label>Description</Label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Plan Limits</CardTitle>
            <CardDescription>
              Set usage limits and quotas for this plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(formData.limits || {}).map(([key, value]) => (
                <div key={key}>
                  <Label>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())
                      .replace("Api", "API")}
                  </Label>
                  {key === "storage" ? (
                    <div className="flex">
                      <Input
                        name={`limits.${key}`}
                        value={value === Infinity ? "" : value}
                        onChange={(e) =>
                          handleNestedChange(
                            "limits",
                            key,
                            e.target.value === ""
                              ? Infinity
                              : Number(e.target.value)
                          )
                        }
                        disabled={!isEditing}
                        type="number"
                      />
                      <span className="ml-2 flex items-center text-sm text-muted-foreground">
                        GB
                      </span>
                    </div>
                  ) : (
                    <Input
                      name={`limits.${key}`}
                      value={value === Infinity ? "" : value}
                      onChange={(e) =>
                        handleNestedChange(
                          "limits",
                          key,
                          e.target.value === ""
                            ? Infinity
                            : Number(e.target.value)
                        )
                      }
                      disabled={!isEditing}
                      type="number"
                      suffix={
                        value === Infinity ? (
                          <Badge variant="outline" className="ml-2">
                            Unlimited
                          </Badge>
                        ) : null
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Plan Features</CardTitle>
            <CardDescription>
              Enable or disable features for this plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Channels Section */}
            <Collapsible
              open={expandedSections.channels}
              onOpenChange={() => toggleSection("channels")}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Channels</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    {expandedSections.channels ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CHANNEL_OPTIONS.map((channel) => (
                    <div
                      key={channel.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`channel-${channel.value}`}
                        checked={formData.features.channels?.includes(
                          channel.value
                        )}
                        onCheckedChange={(checked) =>
                          handleArrayChange(
                            "features",
                            "channels",
                            channel.value,
                            checked
                          )
                        }
                        disabled={!isEditing}
                      />
                      <Label htmlFor={`channel-${channel.value}`}>
                        {channel.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Core Features Section */}
            <Collapsible
              open={expandedSections.coreFeatures}
              onOpenChange={() => toggleSection("coreFeatures")}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Core Features</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    {expandedSections.coreFeatures ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "fileAttachments",
                    "analyticsDashboard",
                    "customBranding",
                    "prioritySupport",
                    "whiteLabel",
                    "apiAccess",
                    "webhooks",
                    "sso",
                    "aiFeatures",
                    "customFlows",
                    "autoScheduling",
                    "advancedReporting",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Switch
                        id={`feature-${feature}`}
                        checked={formData.features[feature]}
                        onCheckedChange={(checked) =>
                          handleFeatureChange("features", feature, checked)
                        }
                        disabled={!isEditing}
                      />
                      <Label htmlFor={`feature-${feature}`}>
                        {feature
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </Label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Chatbot Automation Section */}
            <Collapsible
              open={expandedSections.chatbotAutomation}
              onOpenChange={() => toggleSection("chatbotAutomation")}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Chatbot Automation</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    {expandedSections.chatbotAutomation ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "visualFlowBuilder",
                    "aiResponseTuning",
                    "chatbotTemplates",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Switch
                        id={`feature-${feature}`}
                        checked={formData.features[feature]}
                        onCheckedChange={(checked) =>
                          handleFeatureChange("features", feature, checked)
                        }
                        disabled={!isEditing}
                      />
                      <Label htmlFor={`feature-${feature}`}>
                        {feature
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </Label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Ads Automation Section */}
            <Collapsible
              open={expandedSections.adsAutomation}
              onOpenChange={() => toggleSection("adsAutomation")}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Ads Automation</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    {expandedSections.adsAutomation ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "adCopyGeneration",
                    "smartTargeting",
                    "budgetSuggestions",
                    "autoPublishing",
                    "audienceSegmentation",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Switch
                        id={`feature-${feature}`}
                        checked={formData.features[feature]}
                        onCheckedChange={(checked) =>
                          handleFeatureChange("features", feature, checked)
                        }
                        disabled={!isEditing}
                      />
                      <Label htmlFor={`feature-${feature}`}>
                        {feature
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </Label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Drip Campaigns Section */}
            <Collapsible
              open={expandedSections.dripCampaigns}
              onOpenChange={() => toggleSection("dripCampaigns")}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Drip Campaigns</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    {expandedSections.dripCampaigns ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["emailSequences", "behavioralTriggers", "aBTesting"].map(
                    (feature) => (
                      <div
                        key={feature}
                        className="flex items-center space-x-2"
                      >
                        <Switch
                          id={`feature-${feature}`}
                          checked={formData.features[feature]}
                          onCheckedChange={(checked) =>
                            handleFeatureChange("features", feature, checked)
                          }
                          disabled={!isEditing}
                        />
                        <Label htmlFor={`feature-${feature}`}>
                          {feature === "aBTesting"
                            ? "A/B Testing"
                            : feature
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                        </Label>
                      </div>
                    )
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Landing Page Builder Section */}
            <Collapsible
              open={expandedSections.landingPageBuilder}
              onOpenChange={() => toggleSection("landingPageBuilder")}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Landing Page Builder</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    {expandedSections.landingPageBuilder ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "dragDropEditor",
                    "pageTemplates",
                    "formBuilders",
                    "popupCreators",
                    "seoTools",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Switch
                        id={`feature-${feature}`}
                        checked={formData.features[feature]}
                        onCheckedChange={(checked) =>
                          handleFeatureChange("features", feature, checked)
                        }
                        disabled={!isEditing}
                      />
                      <Label htmlFor={`feature-${feature}`}>
                        {feature
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </Label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Growth Features Section */}
            <Collapsible
              open={expandedSections.growthFeatures}
              onOpenChange={() => toggleSection("growthFeatures")}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Growth Features</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    {expandedSections.growthFeatures ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "teamCollaboration",
                    "customAiModels",
                    "advancedSegmentation",
                    "dynamicContent",
                    "webinarIntegration",
                    "membershipSites",
                    "paymentGateways",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Switch
                        id={`feature-${feature}`}
                        checked={formData.features[feature]}
                        onCheckedChange={(checked) =>
                          handleFeatureChange("features", feature, checked)
                        }
                        disabled={!isEditing}
                      />
                      <Label htmlFor={`feature-${feature}`}>
                        {feature
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </Label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Enterprise Features Section */}
            <Collapsible
              open={expandedSections.enterpriseFeatures}
              onOpenChange={() => toggleSection("enterpriseFeatures")}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Enterprise Features</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    {expandedSections.enterpriseFeatures ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "dedicatedInstance",
                    "sla99_9",
                    "enterpriseSso",
                    "customDataCenter",
                    "aiModelHosting",
                    "auditLogs",
                    "dataResidency",
                    "hipaaCompliance",
                    "accountManager",
                    "developerSupport",
                    "trainingSessions",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Switch
                        id={`feature-${feature}`}
                        checked={formData.features[feature]}
                        onCheckedChange={(checked) =>
                          handleFeatureChange("features", feature, checked)
                        }
                        disabled={!isEditing}
                      />
                      <Label htmlFor={`feature-${feature}`}>
                        {feature === "sla99_9"
                          ? "99.9% SLA"
                          : feature === "hipaaCompliance"
                          ? "HIPAA Compliance"
                          : feature
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                      </Label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>{" "}
        <Card>
          <CardHeader>
            <CardTitle>Pricing & Metadata</CardTitle>
            <CardDescription>
              Configure pricing and marketing metadata
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pricing</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label>Monthly Price ($)</Label>
                    <Input
                      name="prices.monthly"
                      value={formData.prices?.monthly}
                      onChange={(e) =>
                        handleNestedChange(
                          "prices",
                          "monthly",
                          Number(e.target.value)
                        )
                      }
                      disabled={!isEditing}
                      type="number"
                    />
                  </div>
                  <div>
                    <Label>Yearly Price ($)</Label>
                    <Input
                      name="prices.yearly"
                      value={formData.prices?.yearly}
                      onChange={(e) =>
                        handleNestedChange(
                          "prices",
                          "yearly",
                          Number(e.target.value)
                        )
                      }
                      disabled={!isEditing}
                      type="number"
                    />
                  </div>
                  <div>
                    <Label>Billing Interval</Label>
                    <Select
                      value={formData.prices?.interval || "monthly"}
                      onValueChange={(value) =>
                        handleNestedChange("prices", "interval", value)
                      }
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select billing interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Metadata</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="recommended"
                      checked={formData.metadata?.recommended}
                      onCheckedChange={(checked) =>
                        handleNestedChange("metadata", "recommended", checked)
                      }
                      disabled={!isEditing}
                    />
                    <Label htmlFor="recommended">Recommended Plan</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="popular"
                      checked={formData.metadata?.popular}
                      onCheckedChange={(checked) =>
                        handleNestedChange("metadata", "popular", checked)
                      }
                      disabled={!isEditing}
                    />
                    <Label htmlFor="popular">Popular Plan</Label>
                  </div>
                  <div>
                    <Label>Trial Days</Label>
                    <Input
                      name="metadata.trialDays"
                      value={formData.metadata?.trialDays}
                      onChange={(e) =>
                        handleNestedChange(
                          "metadata",
                          "trialDays",
                          Number(e.target.value)
                        )
                      }
                      disabled={!isEditing}
                      type="number"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="implementationSupport"
                      checked={formData.metadata?.implementationSupport}
                      onCheckedChange={(checked) =>
                        handleNestedChange(
                          "metadata",
                          "implementationSupport",
                          checked
                        )
                      }
                      disabled={!isEditing}
                    />
                    <Label htmlFor="implementationSupport">
                      Implementation Support
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
