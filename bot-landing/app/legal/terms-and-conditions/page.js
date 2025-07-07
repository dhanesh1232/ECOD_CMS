import TermsAndConditions from "@/components/legal/__terms-and-conditions";
import { metadataForPath } from "@/lib/seo";

export async function generateMetadata() {
  return metadataForPath("/legal/terms-and-conditions", {
    title: "Terms and Conditions",
    description:
      "Understand the terms and conditions governing your use of ECODrIx's AI-powered platform.",
    keywords: [
      "terms and conditions",
      "user agreement",
      "legal terms",
      "platform usage",
      "service terms",
      "terms of service",
    ],
    openGraph: {
      images: [
        {
          url: "/og-terms.jpg",
          width: 1200,
          height: 630,
          alt: "Terms and Conditions - ECODrIx",
        },
      ],
    },
  });
}
export default function TermsAndConditionsPage() {
  return <TermsAndConditions />;
}
