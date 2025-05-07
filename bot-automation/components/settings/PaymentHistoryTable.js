"use client";

import { CheckCircle, XCircle, Loader, Download, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { generateInvoicePDF } from "@/lib/client/generateInvoice";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return "Invalid date";
  const day = String(date.getDate()).padStart(2, "0"); // Ensure two-digit day
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure two-digit month
  const year = String(date.getFullYear()).slice(-2); // Extract last two digits of the year
  return `${month}/${day}/${year}`; // Return in MM/DD/YY format
};

const PaymentHistoryTable = ({ paymentHistory }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      paid: {
        color: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
        icon: <CheckCircle className="h-4 w-4" />,
        label: "Paid",
      },
      failed: {
        color: "bg-rose-500/20 text-rose-600 dark:text-rose-400",
        icon: <XCircle className="h-4 w-4" />,
        label: "Failed",
      },
      pending: {
        color: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
        icon: <Loader className="h-4 w-4 animate-spin" />,
        label: "Processing",
      },
      refunded: {
        color: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
        icon: <Undo2 className="h-4 w-4" />,
        label: "Refunded",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${config.color}`}
      >
        {config.icon}
        <span>{config.label}</span>
      </div>
    );
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold">Payment History</h3>
      </div>

      {paymentHistory ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-left text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="pb-4 px-2">Date</th>
                <th className="pb-4 px-2">Amount</th>
                <th className="pb-4 px-2">Status</th>
                <th className="pb-4 px-2 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-gray-700 last:border-0"
                  >
                    <td className="py-4 px-2">
                      {formatDate(payment.createdAt)}
                    </td>
                    <td className="py-4 px-2 font-medium">
                      ₹
                      {payment.amount.total.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-4 px-2">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="py-4 px-2 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={payment.status !== "paid"}
                        className="text-blue-600 dark:text-blue-400 outline-none active:outline-none active:ring-0 focus:outline-none focus-within:outline-none focus:ring-0 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        onClick={() => generateInvoicePDF(payment)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Invoice
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {paymentHistory.length === 0 && (
            <div className="py-8 text-center text-gray-600 dark:text-gray-400">
              No payment history available
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center p-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-28" />
              <Skeleton className="h-10 w-32" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistoryTable;
