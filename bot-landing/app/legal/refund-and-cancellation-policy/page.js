import CancellationRefundPolicy from "@/components/legal/__refund-and-cancellation-policy";
import { metadataForPath } from "@/lib/seo";

export async function generateMetadata() {
  return metadataForPath("/legal/refund-and-cancellation-policy", {
    title: "Refund and Cancellation Policy",
    description:
      "Review ECODrIx's refund and cancellation policy for our AI-powered platform.",
    keywords: [
      "refund policy",
      "cancellation policy",
      "refund terms",
      "cancellation terms",
      "service refund",
      "service cancellation",
    ],
    openGraph: {
      images: [
        {
          url: "/og-refund-cancellation.jpg",
          width: 1200,
          height: 630,
          alt: "Refund and Cancellation Policy - ECODrIx",
        },
      ],
    },
  });
}
export default function RefundCancellationPolicyPage() {
  return <CancellationRefundPolicy />;
}
