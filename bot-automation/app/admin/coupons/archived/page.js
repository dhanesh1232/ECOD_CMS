"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function ArchivedCouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArchivedCoupons();
  }, []);

  const fetchArchivedCoupons = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/coupons/archived");
      const data = await response.json();

      if (data.success) {
        setCoupons(data.coupons);
      }
    } catch (error) {
      console.error("Error fetching archived coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (couponId, action) => {
    try {
      const response = await fetch("/api/admin/coupons/archived", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: couponId,
          action,
        }),
      });

      const data = await response.json();

      if (data.success) {
        fetchArchivedCoupons();
      }
    } catch (error) {
      console.error("Error performing action:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Archived Coupons</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table>
          <TableCaption>A list of archived and expired coupons</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Date Range</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon._id}>
                <TableCell>{coupon.title}</TableCell>
                <TableCell>{coupon.code}</TableCell>
                <TableCell>
                  {coupon.discountType === "percent"
                    ? `${coupon.discountValue}%`
                    : `$${coupon.discountValue}`}
                </TableCell>
                <TableCell>
                  {coupon.usedCount} / {coupon.usageLimit}
                </TableCell>
                <TableCell>
                  {format(new Date(coupon.startDate), "MMM dd, yyyy")} -{" "}
                  {format(new Date(coupon.endDate), "MMM dd, yyyy")}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      coupon.status === "archived" ? "warning" : "secondary"
                    }
                  >
                    {coupon.status}
                  </Badge>
                </TableCell>
                <TableCell className="space-x-2">
                  {coupon.status === "archived" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAction(coupon._id, "restore")}
                    >
                      Restore
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleAction(coupon._id, "delete")}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
