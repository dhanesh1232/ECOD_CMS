import { renderToStream } from "@react-pdf/renderer";
import InvoicePDF from "@/components/settings/InvoicePDF";
import { getInvoiceById } from "@/lib/server/invoice";
import { validateSession } from "@/lib/auth";
export async function GET(request, { params }) {
  const { id } = await params;

  try {
    await validateSession(request);
    const invoice = await getInvoiceById(id);
    console.log(invoice);
    // Generate a readable PDF stream
    const stream = await renderToStream(<InvoicePDF invoice={invoice} />);
    const response = new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="invoice-${id}.pdf"`,
        // Force download in browser
        "Cache-Control": "no-store",
      },
    });

    return response;
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to generate invoice PDF" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
