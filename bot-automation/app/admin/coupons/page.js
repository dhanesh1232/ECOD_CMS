"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Clipboard, MoreHorizontal, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

export default function AllCouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || "all"
  );
  const router = useRouter();
  const showToast = useToast();
  const toastRef = useRef(false);
  useEffect(() => {
    setTimeout(() => {
      toastRef.current = false;
    }, 10000);
  });

  useEffect(() => {
    fetchCoupons();
  }, [search, statusFilter]);

  useEffect(() => {
    const query = new URLSearchParams();
    if (search) query.set("search", search);
    if (statusFilter !== "all") query.set("status", statusFilter);
    else query.delete("status");

    const queryString = query.toString();
    router.replace(`/admin/coupons${queryString ? "?" + queryString : ""}`);
  }, [search, statusFilter, router]);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      let url = `/api/admin/coupons?status=${statusFilter}`;
      if (search) {
        url += `&search=${search}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setCoupons(data.coupons);
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => router.push("/admin/coupons/create");
  const handleView = (id) => router.push(`/admin/coupons/${id}`);
  const handleEdit = (id) => router.push(`/admin/coupons/${id}/edit`);

  const handleArchive = async (id) => {
    try {
      const res = await fetch(`/api/admin/coupons/archived`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "archive" }),
      });
      const data = await res.json();
      if (data.success) fetchCoupons();
    } catch (error) {
      console.error("Error archiving coupon:", error);
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
    <div className="w-full max-w-7xl mx-auto p-2 sm:p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Coupon Management</h1>
          <p className="text-sm text-muted-foreground">
            Create, filter, and manage all your active and expired coupons.
          </p>
        </div>
        <Button
          aria-label="Create Coupon"
          title="Create Coupon"
          onClick={handleCreate}
          className="gap-2"
          variant="outline"
        >
          <Plus className="h-4 w-4" />
          Create
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin h-8 w-8 rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : coupons.length ? (
        // Coupons List
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
          {coupons.map((coupon) => (
            <Card key={coupon._id} className="relative">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{coupon.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        variant="outline"
                        className="flex items-center gap-1 text-xs"
                        value={coupon.code}
                        onClick={(e) => {
                          try {
                            const value = e.target.value;
                            navigator.clipboard.writeText(value);
                            if (!toastRef.current) {
                              showToast({
                                variant: "success",
                                description: `${value} Coupon copied successfully`,
                              });
                              toastRef.current = true;
                            }
                          } catch (err) {
                            if (!toastRef.current) {
                              showToast({
                                variant: "destructive",
                                description:
                                  err.message || "Unable to copy code",
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
                      {getStatusBadge(coupon.status)}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(coupon._id)}>
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(coupon._id)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleArchive(coupon._id)}
                        className="text-destructive"
                      >
                        Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Discount</p>
                  <p className="font-medium">
                    {coupon.discountType === "percent"
                      ? `${coupon.discountValue}%`
                      : coupon.currency === "INR"
                      ? `₹${coupon.discountValue.toFixed(2)}`
                      : `$${coupon.discountValue.toFixed(2)}`}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Usage</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {coupon.usedCount} / {coupon.usageLimit}
                    </span>
                    <div className="flex-1 bg-secondary h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full"
                        style={{
                          width: `${
                            (coupon.usedCount / coupon.usageLimit) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Valid Dates</p>
                  <p className="text-sm">
                    {format(new Date(coupon.startDate), "MMM dd, yyyy")} -{" "}
                    {format(new Date(coupon.endDate), "MMM dd, yyyy")}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="pt-0 text-sm text-muted-foreground text-gray-500">
                Created: {format(new Date(coupon.createdAt), "MMM dd, yyyy")}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        // Empty state
        <div className="text-center border rounded-lg p-10">
          <h3 className="text-lg font-semibold">No Coupons Found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {search || statusFilter !== "all"
              ? "Try adjusting your search or filter."
              : "Get started by creating a new coupon."}
          </p>
          <Button onClick={handleCreate} className="mt-4">
            Create Coupon
          </Button>
        </div>
      )}
    </div>
  );
}
