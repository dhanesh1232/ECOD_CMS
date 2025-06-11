"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

const conditionTypes = [
  { value: "first_time_user", label: "First-time user only" },
  { value: "min_subscriptions", label: "Minimum subscriptions" },
  { value: "plan_specific", label: "Plan specific" },
  { value: "redemption_limit", label: "Redemption limit" },
];

export default function CouponRulesPage() {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRule, setEditingRule] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    conditionType: "",
    value: "",
    isActive: true,
  });

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/coupons/rules");
      const data = await response.json();

      if (data.success) {
        setRules(data.rules);
      }
    } catch (error) {
      console.error("Error fetching rules:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingRule
        ? "/api/admin/coupons/rules"
        : "/api/admin/coupons/rules";
      const method = editingRule ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          editingRule ? { ...formData, _id: editingRule._id } : formData
        ),
      });

      const data = await response.json();

      if (data.success) {
        fetchRules();
        setIsDialogOpen(false);
        setEditingRule(null);
        setFormData({
          name: "",
          conditionType: "",
          value: "",
          isActive: true,
        });
      }
    } catch (error) {
      console.error("Error saving rule:", error);
    }
  };

  const handleEdit = (rule) => {
    setEditingRule(rule);
    setFormData({
      name: rule.name,
      conditionType: rule.conditionType,
      value: rule.value || "",
      isActive: rule.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (ruleId) => {
    try {
      const response = await fetch(`/api/admin/coupons/rules?id=${ruleId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        fetchRules();
      }
    } catch (error) {
      console.error("Error deleting rule:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Coupon Rules</h1>
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button onClick={() => setEditingRule(null)}>Create Rule</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {editingRule ? "Edit Rule" : "Create New Rule"}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Rule Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="conditionType">Condition Type</Label>
                <Select
                  value={formData.conditionType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, conditionType: value }))
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition type" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditionTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.conditionType === "min_subscriptions" && (
                <div className="space-y-2">
                  <Label htmlFor="value">Minimum Subscriptions</Label>
                  <Input
                    id="value"
                    name="value"
                    type="number"
                    value={formData.value}
                    onChange={handleChange}
                    min="1"
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, isActive: checked }))
                  }
                />
                <Label htmlFor="isActive">Active</Label>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingRule ? "Update Rule" : "Create Rule"}
                </Button>
              </div>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {loading ? (
        <div className="flex items-center justify-center w-full">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : rules.length > 0 ? (
        <Table>
          <TableCaption>A list of coupon rules</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Condition Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule._id}>
                <TableCell>{rule.name}</TableCell>
                <TableCell>
                  {conditionTypes.find((t) => t.value === rule.conditionType)
                    ?.label || rule.conditionType}
                </TableCell>
                <TableCell>{rule.value || "-"}</TableCell>
                <TableCell>
                  {rule.isActive ? (
                    <span className="text-green-500">Active</span>
                  ) : (
                    <span className="text-gray-500">Inactive</span>
                  )}
                </TableCell>
                <TableCell className="space-x-2 gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(rule)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(rule._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center border rounded-lg p-10">
          <h3 className="text-lg font-semibold">No Rules Found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {"Get started by creating a new rules."}
          </p>
          <Button onClick={setIsDialogOpen} className="mt-4">
            Create Rule
          </Button>
        </div>
      )}
    </div>
  );
}
