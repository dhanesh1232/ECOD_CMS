import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#333",
    lineHeight: 1.4,
  },
  link: {
    color: "blue",
    textDecoration: "underline",
    fontSize: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  companyInfo: {
    width: "60%",
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c7be5",
    marginBottom: 4,
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c7be5",
    marginBottom: 10,
    textAlign: "right",
  },
  invoiceInfo: {
    width: "35%",
    alignItems: "flex-end",
  },
  label: {
    fontWeight: "bold",
    color: "#444",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2c7be5",
    marginBottom: 8,
    borderBottom: "1 solid #2c7be5",
    paddingBottom: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  divider: {
    borderBottom: "1 solid #eee",
    marginVertical: 15,
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    paddingHorizontal: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 4,
    borderLeft: "4 solid #2c7be5",
  },
  footer: {
    marginTop: 30,
    paddingTop: 10,
    borderTop: "1 solid #eee",
    fontSize: 10,
    color: "#666",
    textAlign: "center",
  },
  highlight: {
    color: "#2c7be5",
  },
});

export default function InvoicePDF({ invoice }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>
              ECODRIX TECHNOLOGIES PVT. LTD.
            </Text>
            <Text>Yerpadu, Tirupati</Text>
            <Text>Andhra Pradesh, India - 517501</Text>
            <Text>GSTIN: 27ABCDE1234F1Z5</Text>
            <Text>www.ecodrix.com | +91 9876543210</Text>
            <Link href="https://ecodrix.com" style={styles.link}>
              ecodrix.com
            </Link>
          </View>

          <View style={styles.invoiceInfo}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.label}>Invoice #: {invoice.id}</Text>
            <Text>
              Date: {new Date(invoice.invoiceDate).toLocaleDateString()}
            </Text>
            <Text>Billing Period: {invoice.billingPeriod}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Billing Info */}
        <View
          style={[
            styles.section,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <View style={{ width: "48%" }}>
            <Text style={styles.sectionTitle}>BILLED TO</Text>
            <Text style={{ fontWeight: "bold" }}>{invoice.user.name}</Text>
            <Text>{invoice.user.company}</Text>
            <Text>{invoice.user.email}</Text>
            <Text>{invoice.user.phone}</Text>
            <Text>GSTIN: {invoice.user.gst || "Not provided"}</Text>
          </View>

          <View style={{ width: "48%" }}>
            <Text style={styles.sectionTitle}>PAYMENT METHOD</Text>
            <Text>{invoice.paymentMethod}</Text>
            <Text style={{ marginTop: 10 }}>
              Status:
              <Text
                style={{
                  color: invoice.status === "Paid" ? "#00a854" : "#f5222d",
                  fontWeight: "bold",
                }}
              >
                {" "}
                {invoice.status}
              </Text>
            </Text>
          </View>
        </View>

        {/* Subscription Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUBSCRIPTION DETAILS</Text>
          <View
            style={[
              styles.row,
              { backgroundColor: "#f8f9fa", padding: 8, borderRadius: 4 },
            ]}
          >
            <Text style={styles.label}>Plan</Text>
            <Text style={styles.highlight}>{invoice.plan}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Billing Cycle</Text>
            <Text>{invoice.cycle}</Text>
          </View>
        </View>

        {/* Amount Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AMOUNT DETAILS</Text>

          <View style={styles.amountRow}>
            <Text>Subtotal:</Text>
            <Text>₹{invoice.amount.subtotal.toFixed(2)}</Text>
          </View>

          {invoice.amount.discount > 0 && (
            <View style={styles.amountRow}>
              <Text>Discount:</Text>
              <Text>-₹{invoice.amount.discount.toFixed(2)}</Text>
            </View>
          )}

          <View style={styles.amountRow}>
            <Text>Tax (18%):</Text>
            <Text>₹{invoice.amount.tax.toFixed(2)}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={[styles.label, { fontSize: 14 }]}>Total Amount:</Text>
            <Text style={[styles.label, { fontSize: 14, color: "#2c7be5" }]}>
              ₹{invoice.amount.total.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Thank you for choosing ECODRIX Technologies</Text>
          <Text>
            For any queries, please contact support@ecodrix.com or call +91
            9876543210
          </Text>
          <Text style={{ marginTop: 8 }}>
            This is a computer-generated invoice and does not require a physical
            signature.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
