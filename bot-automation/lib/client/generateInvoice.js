import jsPDF from "jspdf";
import "jspdf-autotable";
import { autoTable } from "jspdf-autotable";
import { format } from "date-fns";

export const generateInvoicePDF = (payment) => {
  try {
    // Validate essential payment data
    if (!payment?.razorpay?.paymentId) {
      throw new Error("Invalid payment data: Missing payment ID");
    }

    const doc = new jsPDF();
    const companyColor = "#2563eb";
    const currentDate = new Date();

    // Safe data access with fallbacks
    const invoiceNumber =
      payment.invoice?.number ||
      `INV-${payment.razorpay.paymentId.slice(-6).toUpperCase()}`;

    const paymentDate = payment.createdAt
      ? format(new Date(payment.createdAt), "dd MMM yyyy")
      : format(currentDate, "dd MMM yyyy");

    // Convert amounts to rupees (assuming amounts are in paise)
    const formatCurrency = (value) =>
      `₹${Number(value || 0).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}`;

    // Header Section
    doc.setFontSize(22);
    doc.setTextColor(companyColor);
    doc.text("INVOICE", 14, 22);

    try {
      doc.addImage("/Images/ECOD_dark.png", "PNG", 160, 10, 30, 30);
    } catch (error) {
      console.warn("Company logo not found, using text fallback");
      doc.text("ECOD", 160, 25);
    }

    // Company Information
    doc.setFontSize(10);
    doc.setTextColor(40);
    const companyInfo = [
      "Tech Solutions Inc.",
      "123 Business Street",
      "Mumbai, MH 400001",
      `GSTIN: ${payment?.taxDetails?.gstin || "27ABCDE1234F1Z5"}`,
      "Phone: +91 12345 67890",
      "Email: support@ecod.com",
    ];
    companyInfo.forEach((line, index) => doc.text(line, 14, 40 + index * 5));

    // Invoice Details
    doc.setFontSize(12);
    const invoiceDetails = [
      `Invoice #: ${invoiceNumber}`,
      `Date: ${paymentDate}`,
      `Status: ${(payment.status || "paid").toUpperCase()}`,
      `Due Date: ${format(currentDate, "dd MMM yyyy")}`,
    ];
    invoiceDetails.forEach((line, index) =>
      doc.text(line, 140, 40 + index * 5)
    );

    // Bill To Section
    doc.setFontSize(12);
    doc.text("Bill To:", 14, 90);
    doc.setFontSize(10);
    const userInfo = [
      payment.userInfo?.name || "Customer Name",
      payment.userInfo?.email || "No email provided",
      `Plan: ${(payment.plan || "pro").toUpperCase()}`,
      `Billing Period: ${payment.period || "monthly"}`,
      `User ID: ${payment.userInfo?._id?.slice(-6) || "N/A"}`,
    ];
    userInfo.forEach((line, index) => doc.text(line, 14, 95 + index * 5));

    // Items Table
    const tableData = [
      ["Description", "Subtotal", "Tax (18%)", "Discount", "Total"],
      [
        `${(payment.plan || "pro").toUpperCase()} Plan - ${
          payment.period || "monthly"
        }`,
        formatCurrency(payment.amount?.subtotal),
        formatCurrency(payment.amount?.tax),
        formatCurrency(payment.amount?.discount),
        formatCurrency(payment.amount?.total),
      ],
    ];

    autoTable(doc, {
      startY: 130,
      head: [["Description", "Subtotal", "Tax (18%)", "Discount", "Total"]],
      body: [
        [
          `${(payment.plan || "pro").toUpperCase()} Plan - ${
            payment.period || "monthly"
          }`,
          formatCurrency(payment.amount?.subtotal),
          formatCurrency(payment.amount?.tax),
          formatCurrency(payment.amount?.discount),
          formatCurrency(payment.amount?.total),
        ],
      ],
      styles: {
        fontSize: 10,
        cellPadding: 3,
        fillColor: [255, 255, 255], // White background
      },
      headStyles: {
        fillColor: [37, 99, 235], // RGB equivalent of #2563eb
        textColor: 255,
        fontStyle: "bold",
      },
      theme: "grid",
    });

    // Payment Details
    const yPosition = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.text(`Payment ID: ${payment.razorpay.paymentId}`, 14, yPosition);
    doc.text(
      `Order ID: ${payment.razorpay.orderId || "N/A"}`,
      14,
      yPosition + 5
    );
    doc.text(
      `Payment Method: ${payment.paymentMethod || "Razorpay"}`,
      14,
      yPosition + 10
    );

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text("Thank you for choosing ECODEMY!", 14, 280);
    doc.text(
      "Terms & Conditions: All payments are non-refundable. For support, contact support@ecod.com",
      14,
      285
    );

    // Save PDF with error handling
    try {
      doc.save(`Invoice_${invoiceNumber}.pdf`);
    } catch (saveError) {
      console.error("Failed to save PDF:", saveError);
      alert("Could not generate invoice. Please try again.");
    }
  } catch (error) {
    console.error("Invoice generation failed:", error);
    alert(`Invoice generation failed: ${error.message}`);
  }
};
