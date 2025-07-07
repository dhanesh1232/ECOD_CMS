import PrivacyPolicy from "@/components/legal/__privacy-policy";
import { metadataForPath } from "@/lib/seo";

export async function generateMetadata() {
  return metadataForPath("/legal/privacy-policy", {
    title: "Privacy Policy",
    description:
      "Understand how ECODrIx collects, uses, and protects your personal data across our AI-powered platform.",
    keywords: [
      "privacy",
      "data protection",
      "user information",
      "GDPR",
      "security",
      "data usage",
    ],
    openGraph: {
      images: [
        {
          url: "/og-privacy.jpg",
          width: 1200,
          height: 630,
          alt: "Privacy Policy - ECODrIx",
        },
      ],
    },
  });
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
