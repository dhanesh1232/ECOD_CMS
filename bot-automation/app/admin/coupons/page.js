"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format, isAfter, isBefore } from "date-fns";
import {
  Clipboard,
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Download,
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
  const [limit, setLimit] = useState(9);
  const [selectedCoupons, setSelectedCoupons] = useState([]);
  const [bulkAction, setBulkAction] = useState("");
  const [exportLoading, setExportLoading] = useState(false);
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || "all"
  );
  const [dateFilter, setDateFilter] = useState(
    searchParams.get("date") || "all"
  );
  const router = useRouter();
  const showToast = useToast();
  const toastRef = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      toastRef.current = false;
    }, 10000);
  }, []);

  useEffect(() => {
    fetchCoupons();
  }, [search, statusFilter, dateFilter, page, limit]);

  useEffect(() => {
    const query = new URLSearchParams();
    if (search) query.set("search", search);
    if (statusFilter !== "all") query.set("status", statusFilter);
    if (dateFilter !== "all") query.set("date", dateFilter);
    query.set("page", page);
    query.set("limit", limit);

    const queryString = query.toString();
    router.replace(`/admin/coupons${queryString ? "?" + queryString : ""}`);
  }, [search, statusFilter, dateFilter, page, limit, router]);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      let url = `/api/admin/coupons?status=${statusFilter}&page=${page}&limit=${limit}`;
      if (search) url += `&search=${search}`;
      if (dateFilter !== "all") url += `&date=${dateFilter}`;

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

  const handleArchive = async (id) => {
    try {
      const res = await fetch(`/api/admin/coupons/archived`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "archive" }),
      });
      const data = await res.json();
      if (data.success) {
        showToast({
          variant: "success",
          description: "Coupon archived successfully",
        });
        fetchCoupons();
      }
    } catch (error) {
      console.error("Error archiving coupon:", error);
      showToast({
        variant: "destructive",
        description: "Failed to archive coupon",
      });
    }
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedCoupons.length === 0) return;

    try {
      let success = false;
      const actions = {
        delete: handleDelete,
        archive: handleArchive,
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
      const response = await fetch(`/api/admin/coupons/export`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `coupons-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      showToast({
        variant: "success",
        description: "Coupons exported successfully",
      });
      setExportLoading(false);
    } catch (error) {
      setExportLoading(false);
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
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
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
          <Button onClick={handleExport} variant="outline" className="gap-2">
            {exportLoading ? (
              <SpinnerIcon />
            ) : (
              <div className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Export
              </div>
            )}
          </Button>
          <Button
            onClick={handleCreate}
            className="gap-2"
            variant="outline-success"
          >
            <Plus className="h-4 w-4" />
            Create
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
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, code, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
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
            </SelectContent>
          </Select>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[150px]">
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
            </SelectContent>
          </Select>
          <Button
            onClick={fetchCoupons}
            variant="outline"
            size="icon"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {coupons.map((coupon) => (
              <Card
                key={coupon._id}
                className={`relative transition-all hover:shadow-md ${
                  selectedCoupons.includes(coupon._id)
                    ? "ring-2 ring-primary"
                    : ""
                }`}
                onClick={() => {
                  if (selectedCoupons.length > 0) {
                    setSelectedCoupons((prev) =>
                      prev.includes(coupon._id)
                        ? prev.filter((id) => id !== coupon._id)
                        : [...prev, coupon._id]
                    );
                  }
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {coupon.title}
                        {selectedCoupons.includes(coupon._id) && (
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
                        {getStatusBadge(coupon.status)}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button variant="ghost" size="icon" className="h-8 w-8">
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
                        <DropdownMenuItem
                          onClick={() => handleArchive(coupon._id)}
                          className="text-amber-600"
                        >
                          {coupon.status === "archived"
                            ? "Unarchive"
                            : "Archive"}
                        </DropdownMenuItem>
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
                        : coupon.currency === "INR"
                        ? `₹${coupon.discountValue.toFixed(2)} off`
                        : `$${coupon.discountValue.toFixed(2)} off`}
                      {coupon.minPurchaseAmount > 0 && (
                        <span className="text-sm text-muted-foreground ml-2">
                          (min. {coupon.minPurchaseAmount})
                        </span>
                      )}
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-1">
                      <span>Usage</span>
                      <span>
                        {coupon.usedCount} / {coupon.usageLimit}
                      </span>
                    </div>
                    <Progress
                      value={(coupon.usedCount / coupon.usageLimit) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Starts</p>
                      <p className="text-sm font-medium">
                        {format(new Date(coupon.startDate), "MMM dd, yyyy")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expires</p>
                      <p className="text-sm font-medium">
                        {format(new Date(coupon.endDate), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
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
            ))}
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
            {search || statusFilter !== "all" || dateFilter !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Get started by creating your first coupon."}
          </p>
          <Button onClick={handleCreate} className="mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Create New Coupon
          </Button>
        </div>
      )}
    </div>
  );
}
