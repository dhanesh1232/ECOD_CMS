"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import {
  Clipboard,
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Download,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/toast-provider";
import { AdminServices } from "@/lib/client/admin.service";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { SpinnerIcon } from "@/public/Images/svg_ecod";

export default function AllCouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCoupons, setTotalCoupons] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedCoupons, setSelectedCoupons] = useState([]);
  const [bulkAction, setBulkAction] = useState("");
  const [exportLoading, setExportLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || "all"
  );
  const [dateFilter, setDateFilter] = useState(
    searchParams.get("date") || "all"
  );
  const [discountTypeFilter, setDiscountTypeFilter] = useState(
    searchParams.get("discountType") || "all"
  );
  const [planFilter, setPlanFilter] = useState(
    searchParams.get("plan") || "all"
  );
  const router = useRouter();
  const showToast = useToast();
  const toastRef = useRef(false);

  const planOptions = [
    { value: "all", label: "All Plans" },
    { value: "starter", label: "Starter" },
    { value: "pro", label: "Pro" },
    { value: "growth", label: "Growth" },
    { value: "enterprise", label: "Enterprise" },
  ];

  const discountTypeOptions = [
    { value: "all", label: "All Types" },
    { value: "percent", label: "Percentage" },
    { value: "fixed", label: "Fixed Amount" },
    { value: "free_shipping", label: "Free Shipping" },
    { value: "trial", label: "Free Trial" },
  ];

  useEffect(() => {
    setTimeout(() => {
      toastRef.current = false;
    }, 10000);
  }, []);

  useEffect(() => {
    fetchCoupons();
  }, [
    search,
    statusFilter,
    dateFilter,
    discountTypeFilter,
    planFilter,
    page,
    limit,
  ]);

  useEffect(() => {
    const query = new URLSearchParams();
    if (search) query.set("search", search);
    if (statusFilter !== "all") query.set("status", statusFilter);
    if (dateFilter !== "all") query.set("date", dateFilter);
    if (discountTypeFilter !== "all")
      query.set("discountType", discountTypeFilter);
    if (planFilter !== "all") query.set("plan", planFilter);
    query.set("page", page);
    query.set("limit", limit);

    const queryString = query.toString();
    router.replace(`/admin/coupons${queryString ? "?" + queryString : ""}`);
  }, [
    search,
    statusFilter,
    dateFilter,
    discountTypeFilter,
    planFilter,
    page,
    limit,
    router,
  ]);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      let url = `/api/admin/coupons?page=${page}&limit=${limit}`;
      if (search) url += `&search=${search}`;
      if (statusFilter !== "all") url += `&status=${statusFilter}`;
      if (dateFilter !== "all") url += `&date=${dateFilter}`;
      if (discountTypeFilter !== "all")
        url += `&discountType=${discountTypeFilter}`;
      if (planFilter !== "all") url += `&plan=${planFilter}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setCoupons(data.coupons);
        setTotalCoupons(data.total);
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
      showToast({
        variant: "destructive",
        description: "Failed to fetch coupons",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => router.push("/admin/coupons/create");
  const handleView = (id) => router.push(`/admin/coupons/${id}`);
  const handleEdit = (id) => router.push(`/admin/coupons/${id}/edit`);

  const handleDelete = async (id) => {
    try {
      const res = await AdminServices.deleteCoupon(id);
      if (res.status && !res.ok) {
        showToast({
          variant: "destructive",
          description: "Failed to delete coupon",
        });
        return;
      } else {
        showToast({
          variant: "success",
          description: "Coupon deleted successfully",
        });
        await fetchCoupons();
      }
    } catch (err) {
      showToast({
        variant: "destructive",
        description: "Failed to delete coupon",
      });
    }
  };

  const handleDeleteAll = async () => {
    try {
      setDeleteLoading(true);
      const res = await AdminServices.deleteAllCoupons();
      if (res.status && !res.ok) {
        const data = await res.json();
        throw Error(data.message || "Failed to delete coupons");
      }
      if (!toastRef.current) {
        showToast({
          title: "Success",
          variant: "success",
          description: "Successfully deleted coupons",
        });
        toastRef.current = true;
      }
      await fetchCoupons();
    } catch (err) {
      if (!toastRef.current) {
        showToast({
          variant: "destructive",
          description: "Failed to delete coupon",
        });
        toastRef.current = true;
      }
      setDeleteLoading(false);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/admin/coupons/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showToast({
          variant: "success",
          description: `Coupon ${newStatus} successfully`,
        });
        fetchCoupons();
      }
    } catch (error) {
      console.error("Error changing coupon status:", error);
      showToast({
        variant: "destructive",
        description: `Failed to ${newStatus} coupon`,
      });
    }
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedCoupons.length === 0) return;

    try {
      const actions = {
        delete: handleDelete,
        archive: (id) => handleStatusChange(id, "archived"),
        activate: (id) => handleStatusChange(id, "active"),
        deactivate: (id) => handleStatusChange(id, "paused"),
      };

      for (const id of selectedCoupons) {
        await actions[bulkAction](id);
      }

      setSelectedCoupons([]);
      setBulkAction("");
      fetchCoupons();
    } catch (error) {
      console.error("Bulk action error:", error);
      showToast({
        variant: "destructive",
        description: `Failed to perform bulk ${bulkAction}`,
      });
    }
  };

  const handleExport = async () => {
    try {
      setExportLoading(true);
      let url = `/api/admin/coupons/export?status=${statusFilter}`;
      if (search) url += `&search=${search}`;
      if (dateFilter !== "all") url += `&date=${dateFilter}`;
      if (discountTypeFilter !== "all")
        url += `&discountType=${discountTypeFilter}`;
      if (planFilter !== "all") url += `&plan=${planFilter}`;

      const response = await fetch(url);
      const blob = await response.blob();
      const urlObject = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = urlObject;
      a.download = `coupons-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      showToast({
        variant: "success",
        description: "Coupons exported successfully",
      });
    } catch (error) {
      console.error("Export error:", error);
      showToast({
        variant: "destructive",
        description: "Failed to export coupons",
      });
    } finally {
      setExportLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: "success",
      upcoming: "info",
      expired: "secondary",
      archived: "warning",
      paused: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const getCouponStatus = (coupon) => {
    const now = new Date();
    const startDate = new Date(
      `${coupon.validity.start.date}T${coupon.validity.start.time}`
    );
    const endDate = new Date(
      `${coupon.validity.end.date}T${coupon.validity.end.time}`
    );

    if (coupon.status === "archived" || coupon.status === "paused") {
      return coupon.status;
    }
    if (now < startDate) return "upcoming";
    if (now > endDate) return "expired";
    return "active";
  };

  const getUsagePercentage = (coupon) => {
    return Math.min(
      100,
      (coupon.usageLimits.usedCount / coupon.usageLimits.total) * 100
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Coupon Management</h1>
          <p className="text-sm text-muted-foreground">
            Create, filter, and manage all your coupons in one place.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleExport}
            disabled={coupons.length === 0 || exportLoading}
            variant="outline"
            className="gap-2"
          >
            {exportLoading && <SpinnerIcon />}
            <span className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Export
            </span>
          </Button>
          <Button
            onClick={handleCreate}
            className="gap-2"
            variant="outline-success"
          >
            <Plus className="h-4 w-4" />
            Create
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteAll}
            aria-label="Delete Coupons"
            disabled={deleteLoading || coupons.length === 0}
            title="Delete coupons"
          >
            {deleteLoading && <SpinnerIcon />}
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCoupons.length > 0 && (
        <div className="flex items-center gap-4 mb-4 p-3 bg-secondary/50 rounded-lg">
          <span className="text-sm">
            {selectedCoupons.length} coupon
            {selectedCoupons.length !== 1 ? "s" : ""} selected
          </span>
          <Select value={bulkAction} onValueChange={setBulkAction}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Bulk actions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="activate">Activate</SelectItem>
              <SelectItem value="deactivate">Deactivate</SelectItem>
              <SelectItem value="archive">Archive</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleBulkAction} disabled={!bulkAction} size="sm">
            Apply
          </Button>
          <Button
            onClick={() => setSelectedCoupons([])}
            variant="ghost"
            size="sm"
          >
            Cancel
          </Button>
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between gap-2">
          <div className="relative flex-1">
            <Search className="absolute z-10 left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, code, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            onClick={fetchCoupons}
            variant="outline"
            size="icon"
            disabled={loading}
            className="col-span-2 sm:col-span-1"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={discountTypeFilter}
            onValueChange={setDiscountTypeFilter}
          >
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Discount Type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {discountTypeOptions.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={planFilter} onValueChange={setPlanFilter}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Plan" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {planOptions.map((plan) => (
                <SelectItem key={plan.value} value={plan.value}>
                  {plan.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Date Range" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="active">Currently Active</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <div className="flex gap-2 mt-2">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-2 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-4 w-2/3" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : coupons.length ? (
        <>
          {/* Coupons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((coupon) => {
              const status = getCouponStatus(coupon);
              const usagePercentage = getUsagePercentage(coupon);
              const isSelected = selectedCoupons.includes(coupon._id);

              return (
                <Card
                  key={coupon._id}
                  className={`relative transition-all hover:shadow-md ${
                    isSelected ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => {
                    if (selectedCoupons.length > 0) {
                      setSelectedCoupons((prev) =>
                        isSelected
                          ? prev.filter((id) => id !== coupon._id)
                          : [...prev, coupon._id]
                      );
                    }
                  }}
                >
                  {coupon.interActions.showInBanner && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className="text-xs">
                        Promoted
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {coupon.title}
                          {isSelected && (
                            <Badge variant="outline">Selected</Badge>
                          )}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                className="flex items-center gap-1 text-xs"
                                value={coupon.code}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  try {
                                    const value = e.currentTarget.value;
                                    navigator.clipboard.writeText(value);
                                    if (!toastRef.current) {
                                      showToast({
                                        variant: "success",
                                        description: `Copied "${value}" to clipboard`,
                                      });
                                      toastRef.current = true;
                                    }
                                  } catch (err) {
                                    if (!toastRef.current) {
                                      showToast({
                                        variant: "destructive",
                                        description: "Unable to copy code",
                                      });
                                      toastRef.current = true;
                                    }
                                  }
                                }}
                                size="xs"
                              >
                                <Clipboard size={14} />
                                {coupon.code}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Click to copy code</TooltipContent>
                          </Tooltip>
                          {getStatusBadge(status)}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          asChild
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleView(coupon._id)}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEdit(coupon._id)}
                          >
                            Edit Coupon
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {status === "archived" ? (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(coupon._id, "active")
                              }
                              className="text-green-600"
                            >
                              Unarchive
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(coupon._id, "archived")
                              }
                              className="text-amber-600"
                            >
                              Archive
                            </DropdownMenuItem>
                          )}
                          {status === "paused" ? (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(coupon._id, "active")
                              }
                              className="text-green-600"
                            >
                              Activate
                            </DropdownMenuItem>
                          ) : (
                            status !== "expired" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(coupon._id, "paused")
                                }
                                className="text-blue-600"
                              >
                                Pause
                              </DropdownMenuItem>
                            )
                          )}
                          <DropdownMenuItem
                            onClick={() => handleDelete(coupon._id)}
                            className="text-red-600"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Discount Value
                      </p>
                      <p className="font-medium">
                        {coupon.discountType === "percent"
                          ? `${coupon.discountValue}% off`
                          : coupon.discountType === "fixed"
                          ? `${
                              coupon.currency === "INR" ? "₹" : "$"
                            }${coupon.discountValue.toFixed(2)} off`
                          : coupon.discountType === "free_shipping"
                          ? "Free Shipping"
                          : "Free Trial"}
                        {coupon.minCartValue > 0 && (
                          <span className="text-sm text-muted-foreground ml-2">
                            (min. {coupon.minCartValue})
                          </span>
                        )}
                        {coupon.discountType === "percent" &&
                          coupon.maxDiscountAmount && (
                            <span className="text-sm text-muted-foreground ml-2">
                              (max. {coupon.maxDiscountAmount})
                            </span>
                          )}
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm text-muted-foreground mb-1">
                        <span>Usage</span>
                        <span>
                          {coupon.usageLimits.usedCount} /{" "}
                          {coupon.usageLimits.total}
                        </span>
                      </div>
                      <Progress
                        value={usagePercentage}
                        className="h-2"
                        indicatorClass={
                          usagePercentage > 90
                            ? "bg-red-500"
                            : usagePercentage > 70
                            ? "bg-amber-500"
                            : "bg-green-500"
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Starts</p>
                        <p className="text-sm font-medium">
                          {format(
                            new Date(coupon.validity.start.date),
                            "MMM dd, yyyy"
                          )}
                          <span className="block text-xs text-muted-foreground">
                            {coupon.validity.start.time}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Expires</p>
                        <p className="text-sm font-medium">
                          {format(
                            new Date(coupon.validity.end.date),
                            "MMM dd, yyyy"
                          )}
                          <span className="block text-xs text-muted-foreground">
                            {coupon.validity.end.time}
                          </span>
                        </p>
                      </div>
                    </div>

                    {coupon.applicablePlans &&
                      coupon.applicablePlans.length > 0 && (
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Applicable Plans
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {coupon.applicablePlans.map((plan) => (
                              <Badge
                                key={plan}
                                variant="outline"
                                className="text-xs"
                              >
                                {planOptions.find((p) => p.value === plan)
                                  ?.label || plan}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                    {coupon.metadata?.tags?.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground">Tags</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {coupon.metadata.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="pt-0 text-xs text-muted-foreground flex justify-between">
                    <span>
                      Created:{" "}
                      {format(new Date(coupon.createdAt), "MMM dd, yyyy")}
                    </span>
                    {coupon.updatedAt && (
                      <span>
                        Updated:{" "}
                        {format(new Date(coupon.updatedAt), "MMM dd, yyyy")}
                      </span>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* Pagination */}
          {totalCoupons > limit && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <span className="text-sm">
                      Page {page} of {Math.ceil(totalCoupons / limit)}
                    </span>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setPage((p) => p + 1)}
                      disabled={page >= Math.ceil(totalCoupons / limit)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      ) : (
        // Empty state
        <div className="text-center border-2 border-dashed rounded-lg p-12">
          <h3 className="text-lg font-semibold">No Coupons Found</h3>
          <p className="text-sm text-muted-foreground mt-2">
            {search ||
            statusFilter !== "all" ||
            dateFilter !== "all" ||
            discountTypeFilter !== "all" ||
            planFilter !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Get started by creating your first coupon."}
          </p>
          <Button
            onClick={handleCreate}
            variant="outline-success"
            className="mt-4"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </div>
      )}
    </div>
  );
}
