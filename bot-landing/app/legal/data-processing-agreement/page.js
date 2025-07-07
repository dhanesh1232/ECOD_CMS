import DataProcessingAgreement from "@/components/legal/__dpa-policy";
import { metadataForPath } from "@/lib/seo";

export async function generateMetadata() {
  return metadataForPath("/legal/data-processing-agreement", {
    title: "Data Processing Agreement",
    description:
      "Review our DPA outlining how ECODrIx processes personal data in compliance with GDPR and CCPA.",
    keywords: [
      "DPA",
      "data processing",
      "GDPR",
      "CCPA",
      "sub-processors",
      "data rights",
    ],
    openGraph: {
      images: [
        {
          url: "/og-dpa.jpg",
          width: 1200,
          height: 630,
          alt: "Data Processing Agreement - ECODrIx",
        },
      ],
    },
  });
}

export default function DPAPage() {
  return <DataProcessingAgreement />;
}
