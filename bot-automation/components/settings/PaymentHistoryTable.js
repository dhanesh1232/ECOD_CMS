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
  Clock,
  Zap,
  Pause,
  CircleDollarSign,
  Calendar,
  User,
  Box,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import React, { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/mediaQuery";
import { useToast } from "../ui/toast-provider";
import { billingService } from "@/lib/client/billing";

// Utility functions
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date)) return "Invalid date";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0);
};

// Configuration objects
const statusConfig = {
  active: {
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
  past_due: {
    variant: "warning",
    icon: <Clock className="h-4 w-4" />,
    label: "Past Due",
  },
  trialing: {
    variant: "info",
    icon: <Zap className="h-4 w-4" />,
    label: "Trialing",
  },
  paused: {
    variant: "secondary",
    icon: <Pause className="h-4 w-4" />,
    label: "Paused",
  },
  canceled: {
    variant: "destructive",
    icon: <XCircle className="h-4 w-4" />,
    label: "Canceled",
  },
  unpaid: {
    variant: "destructive",
    icon: <CircleDollarSign className="h-4 w-4" />,
    label: "Unpaid",
  },
};

const actionIcons = {
  create: <ArrowUpRight className="h-4 w-4" />,
  update: <ArrowUpRight className="h-4 w-4" />,
  payment_captured: <CircleDollarSign className="h-4 w-4" />,
  payment_failed: <XCircle className="h-4 w-4" />,
  subscription_authenticated: <User className="h-4 w-4" />,
  subscription_activated: <Zap className="h-4 w-4" />,
  subscription_charged: <CircleDollarSign className="h-4 w-4" />,
  subscription_completed: <CheckCircle className="h-4 w-4" />,
  subscription_cancelled: <XCircle className="h-4 w-4" />,
  subscription_resumed: <ArrowUpRight className="h-4 w-4" />,
  subscription_renewed: <Calendar className="h-4 w-4" />,
  subscription_paused: <Pause className="h-4 w-4" />,
  invoice_paid: <FileText className="h-4 w-4" />,
  refund_created: <ArrowDownLeft className="h-4 w-4" />,
  refund_processed: <ArrowDownLeft className="h-4 w-4" />,
  refund_failed: <XCircle className="h-4 w-4" />,
  reactivate: <ArrowUpRight className="h-4 w-4" />,
  cancel: <XCircle className="h-4 w-4" />,
};

const PaymentHistoryTable = ({
  paymentHistory,
  onReload,
  workspaceId,
  loading,
}) => {
  const [downloadingId, setDownloadingId] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const showToast = useToast();
  const toastRef = useRef(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setTimeout(() => {
      toastRef.current = false;
    }, 10000);
  });
  const toggleRowExpansion = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getStatusBadge = (status) => {
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Badge variant={config.variant} className="gap-2 whitespace-nowrap">
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const getActionBadge = (action) => {
    const formattedText = action
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return (
      <Badge variant="outline" className="gap-2 whitespace-nowrap">
        {actionIcons[action] || <Box className="h-4 w-4" />}
        {formattedText.length > 1 ? formattedText[1] : formattedText[0]}
      </Badge>
    );
  };

  const generateInvoicePDF = async (invoiceId) => {
    setDownloadingId(invoiceId);
    try {
      const invoice = await fetch(
        `/api/workspace/${workspaceId}/subscription/history/${invoiceId}`
      );
      console.log(invoice);
      if (invoice.status && !invoice.ok) {
        const data = await invoice.json();
        setDownloadingId(null);
        throw new Error(
          data.message ||
            "Unable to proccess for download Invoice please try again"
        );
      }
      const blob = await invoice.blob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${invoiceId}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (err) {
      if (!toastRef.current) {
        showToast({
          title: "Failed",
          description:
            "Unable to proccess for download Invoice please try again",
          variant: "destructive",
        });
      }
      setDownloadingId(null);
    } finally {
      setDownloadingId(null);
    }
  };

  const renderPaymentMethod = (payment) => {
    if (!payment.paymentMethod) return "N/A";

    switch (payment.paymentMethod.type) {
      case "card":
        return (
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              {payment.paymentMethod.brand} •••• {payment.paymentMethod.last4}
            </TooltipTrigger>
            <TooltipContent>
              {payment.paymentMethod.expiry
                ? `Expires ${payment.paymentMethod.expiry}`
                : "No expiry date"}
            </TooltipContent>
          </Tooltip>
        );
      case "upi":
        return "UPI Payment";
      case "netbanking":
        return "Net Banking";
      case "wallet":
        return `${payment.paymentMethod.provider || "Digital"} Wallet`;
      default:
        return "Other Method";
    }
  };

  const renderAmountBreakdown = (amount) => {
    return (
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="text-muted-foreground">Subtotal:</div>
        <div className="text-right">{formatCurrency(amount.subtotal)}</div>

        {amount.tax > 0 && (
          <>
            <div className="text-muted-foreground">Tax:</div>
            <div className="text-right">{formatCurrency(amount.tax)}</div>
          </>
        )}

        {amount.discount > 0 && (
          <>
            <div className="text-muted-foreground">Discount:</div>
            <div className="text-right text-green-500">
              -{formatCurrency(amount.discount)}
            </div>
          </>
        )}

        <Separator className="col-span-2 my-1" />

        <div className="font-medium">Total:</div>
        <div className="text-right font-medium">
          {formatCurrency(amount.total)}
        </div>
      </div>
    );
  };

  // Enhanced animation variants
  const rowVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        opacity: { duration: 0.15 },
        height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        opacity: { duration: 0.2, delay: 0.1 },
        height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      },
    },
  };

  const contentVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        y: { type: "spring", stiffness: 300, damping: 25 },
        opacity: { duration: 0.2 },
      },
    },
    exit: {
      y: -10,
      opacity: 0,
      transition: {
        y: { duration: 0.15 },
        opacity: { duration: 0.1 },
      },
    },
  };

  const sectionVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 25 },
        opacity: { duration: 0.2 },
      },
    },
  };

  return (
    <Card className="shadow-sm border-0 overflow-hidden">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold">
                Subscription & Payment History
              </h3>
              <p className="text-sm text-muted-foreground">
                {paymentHistory.length} transaction
                {paymentHistory.length !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onReload}
                disabled={loading}
                aria-label="Refresh data"
                className="rounded-full"
              >
                {loading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <RotateCcw className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Refresh data</TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-left text-sm font-medium [&_tr]:border-b border-gray-200 dark:border-gray-700">
              <tr className="hover:bg-transparent">
                <th className="h-12 px-4 py-2 text-muted-foreground">Date</th>
                <th className="h-12 px-4 py-2 text-muted-foreground">Action</th>
                {!isMobile && (
                  <th className="h-12 px-4 py-2 text-muted-foreground">
                    Amount
                  </th>
                )}
                <th className="h-12 px-4 py-2 text-muted-foreground">Status</th>
                <th className="h-12 px-4 py-2 text-right text-muted-foreground">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {loading ? (
                <tr>
                  <td colSpan={5} className="h-24 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Loader className="h-4 w-4 animate-spin" />
                      <span>Loading payments...</span>
                    </div>
                  </td>
                </tr>
              ) : paymentHistory.length > 0 ? (
                paymentHistory.map((payment) => (
                  <React.Fragment key={payment.id}>
                    <motion.tr
                      layout
                      className="border-b border-gray-200 dark:border-gray-700 transition-colors hover:bg-muted/50 cursor-pointer"
                      onClick={() => toggleRowExpansion(payment.id)}
                      initial={false}
                      animate={{
                        backgroundColor: expandedRows[payment.id]
                          ? "rgba(0, 0, 0, 0.02)"
                          : "transparent",
                      }}
                    >
                      <td className="p-4 align-middle font-medium">
                        <div className="flex flex-col">
                          <span>
                            {formatDate(
                              payment.createdAt || payment.processedAt
                            )}
                          </span>
                          {isMobile && (
                            <span className="text-sm text-muted-foreground">
                              {formatCurrency(payment.amount?.total)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        {getActionBadge(payment.action)}
                      </td>
                      {!isMobile && (
                        <td className="p-4 align-middle">
                          {payment.amount?.total
                            ? formatCurrency(payment.amount.total)
                            : "-"}
                        </td>
                      )}
                      <td className="p-4 align-middle">
                        {getStatusBadge(payment.status)}
                      </td>
                      <td className="p-4 align-middle text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  generateInvoicePDF(payment._id);
                                }}
                                disabled={
                                  (payment.status === "pending" ||
                                    downloadingId === payment.id) &&
                                  !payment.gateway?.invoiceId
                                }
                                aria-label="Download invoice"
                                className="rounded-full"
                              >
                                {downloadingId === payment.id ? (
                                  <Loader className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Download className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {payment.status === "pending" &&
                              !payment.gateway?.invoiceId
                                ? "Available when processed"
                                : "Download receipt"}
                            </TooltipContent>
                          </Tooltip>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRowExpansion(payment.id);
                            }}
                            aria-label={
                              expandedRows[payment.id]
                                ? "Collapse details"
                                : "Expand details"
                            }
                          >
                            {expandedRows[payment.id] ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                    <AnimatePresence>
                      {expandedRows[payment.id] && (
                        <motion.tr
                          layout
                          variants={rowVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                        >
                          <td colSpan={5} className="p-0 overflow-hidden">
                            <motion.div
                              variants={contentVariants}
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              className="p-4 bg-muted/30 border-b border-gray-200 dark:border-gray-700"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <motion.div
                                  variants={sectionVariants}
                                  transition={{ delay: 0.1 }}
                                >
                                  <h4 className="font-medium mb-3">
                                    Transaction Details
                                  </h4>
                                  <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Gateway:
                                      </span>
                                      <span>
                                        {payment.gateway?.name || "N/A"}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Payment ID:
                                      </span>
                                      <span className="font-mono">
                                        {payment.gateway?.paymentId || "N/A"}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Subscription ID:
                                      </span>
                                      <span className="font-mono">
                                        {payment.gateway?.subscriptionId ||
                                          "N/A"}
                                      </span>
                                    </div>
                                  </div>
                                </motion.div>

                                <motion.div
                                  variants={sectionVariants}
                                  transition={{ delay: 0.15 }}
                                >
                                  <h4 className="font-medium mb-3">
                                    Payment Method
                                  </h4>
                                  <div className="text-sm">
                                    {renderPaymentMethod(payment)}
                                  </div>
                                </motion.div>

                                <motion.div
                                  variants={sectionVariants}
                                  transition={{ delay: 0.2 }}
                                >
                                  <h4 className="font-medium mb-3">
                                    Amount Breakdown
                                  </h4>
                                  {payment.amount
                                    ? renderAmountBreakdown(payment.amount)
                                    : "No amount details available"}
                                </motion.div>

                                {payment.refund && (
                                  <motion.div
                                    className="md:col-span-3"
                                    variants={contentVariants}
                                    transition={{ delay: 0.25 }}
                                  >
                                    <h4 className="font-medium mb-3">
                                      Refund Details
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                      <div>
                                        <div className="text-muted-foreground">
                                          Amount:
                                        </div>
                                        <div>
                                          {formatCurrency(
                                            payment.refund.amount
                                          )}
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-muted-foreground">
                                          Reason:
                                        </div>
                                        <div>
                                          {payment.refund.reason ||
                                            "Not specified"}
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-muted-foreground">
                                          Date:
                                        </div>
                                        <div>
                                          {formatDate(payment.refund.date)}
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}

                                {payment.metadata?.notes && (
                                  <motion.div
                                    className="md:col-span-3"
                                    variants={contentVariants}
                                    transition={{ delay: 0.3 }}
                                  >
                                    <h4 className="font-medium mb-3">Notes</h4>
                                    <p className="text-sm">
                                      {payment.metadata.notes}
                                    </p>
                                  </motion.div>
                                )}
                              </div>
                            </motion.div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="h-24 p-4 text-center">
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
