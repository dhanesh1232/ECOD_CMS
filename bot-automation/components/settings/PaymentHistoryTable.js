"use client";

import {
  CheckCircle,
  XCircle,
  Loader,
  Download,
  Undo2,
  RotateCcw,
  FileText,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { SpinnerIcon } from "@/public/Images/svg_ecod";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Card, CardHeader, CardContent } from "../ui/card";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return "Invalid date";
  const options = { month: "short", day: "numeric", year: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const statusConfig = {
  paid: {
    variant: "success",
    icon: <CheckCircle className="h-4 w-4" />,
    label: "Paid",
  },
  failed: {
    variant: "destructive",
    icon: <XCircle className="h-4 w-4" />,
    label: "Failed",
  },
  pending: {
    variant: "warning",
    icon: <Loader className="h-4 w-4 animate-spin" />,
    label: "Processing",
  },
  refunded: {
    variant: "info",
    icon: <Undo2 className="h-4 w-4" />,
    label: "Refunded",
  },
};

const PaymentHistoryTable = ({ paymentHistory, onReload, onRefresh }) => {
  const [downloadingId, setDownloadingId] = useState(null);

  const getStatusBadge = (status) => {
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Badge variant={config.variant} className="gap-2">
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const generateInvoicePDF = (invoiceId) => {
    setDownloadingId(invoiceId);
    setTimeout(() => {
      setDownloadingId(null);
    }, 2000);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Payment History</h3>
              <p className="text-sm text-muted-foreground">
                {paymentHistory.length} transactions found
              </p>
            </div>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onReload}
                disabled={onRefresh}
              >
                {onRefresh ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <RotateCcw className="h-4 w-4" />
                )}
                <span className="sr-only">Refresh</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Refresh data</TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-left text-sm font-medium [&_tr]:border-b">
              <tr className="hover:bg-transparent">
                <th className="h-10 px-4 py-2 text-muted-foreground">Date</th>
                <th className="h-10 px-4 py-2 text-muted-foreground">Amount</th>
                <th className="h-10 px-4 py-2 text-muted-foreground">Status</th>
                <th className="h-10 px-4 py-2 text-right text-muted-foreground">
                  Receipt
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {onRefresh ? (
                <tr>
                  <td colSpan={4} className="h-24 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Loader className="h-4 w-4 animate-spin" />
                      <span>Loading payments...</span>
                    </div>
                  </td>
                </tr>
              ) : paymentHistory.length > 0 ? (
                paymentHistory.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    <td className="p-4 align-middle font-medium">
                      {formatDate(payment.createdAt)}
                    </td>
                    <td className="p-4 align-middle">
                      ₹
                      {payment.amount.total.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="p-4 align-middle">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="p-4 align-middle text-right">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={
                              payment.status === "pending" ||
                              downloadingId === payment.id
                            }
                            onClick={() => generateInvoicePDF(payment.id)}
                          >
                            {downloadingId === payment.id ? (
                              <Loader className="h-4 w-4 animate-spin" />
                            ) : (
                              <Download className="h-4 w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {payment.status === "pending"
                            ? "Available when processed"
                            : "Download receipt"}
                        </TooltipContent>
                      </Tooltip>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="h-24 p-4 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <AlertCircle className="h-8 w-8" />
                      <p>No payment history available</p>
                      <Button variant="outline" size="sm" onClick={onReload}>
                        Refresh
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentHistoryTable;
