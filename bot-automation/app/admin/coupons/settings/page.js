"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function CouponSettingsPage() {
  const [settings, setSettings] = useState({
    isEnabled: true,
    defaultUsageLimit: 100,
    defaultValidityDays: 30,
    notifyOnCouponCreation: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/coupons/settings");
      const data = await response.json();

      if (data.success) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch("/api/admin/coupons/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (data.success) {
        // Optionally show success message
      }
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto py-8">Loading settings...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Coupon Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <Label htmlFor="isEnabled">Enable Coupon System</Label>
            <p className="text-sm text-muted-foreground">
              Turn the entire coupon system on or off
            </p>
          </div>
          <Switch
            id="isEnabled"
            name="isEnabled"
            checked={settings.isEnabled}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, isEnabled: checked }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="defaultUsageLimit">Default Usage Limit</Label>
          <Input
            id="defaultUsageLimit"
            name="defaultUsageLimit"
            type="number"
            value={settings.defaultUsageLimit}
            onChange={handleChange}
            min="1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="defaultValidityDays">Default Validity (Days)</Label>
          <Input
            id="defaultValidityDays"
            name="defaultValidityDays"
            type="number"
            value={settings.defaultValidityDays}
            onChange={handleChange}
            min="1"
          />
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <Label htmlFor="notifyOnCouponCreation">
              Notify Team on Coupon Creation
            </Label>
            <p className="text-sm text-muted-foreground">
              Send email notifications when new coupons are created
            </p>
          </div>
          <Switch
            id="notifyOnCouponCreation"
            name="notifyOnCouponCreation"
            checked={settings.notifyOnCouponCreation}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({
                ...prev,
                notifyOnCouponCreation: checked,
              }))
            }
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}
