import CookiePolicy from "@/components/legal/__cookies-policy";
import { metadataForPath } from "@/lib/seo";

export async function generateMetadata() {
  return metadataForPath("/legal/cookie-policy", {
    title: "Cookie Policy",
    description:
      "Learn how ECODrIx uses cookies and similar technologies to improve your experience on our platform.",
    keywords: [
      "cookies",
      "tracking",
      "cookie usage",
      "cookie consent",
      "user behavior",
    ],
    openGraph: {
      images: [
        {
          url: "/og-cookie.jpg",
          width: 1200,
          height: 630,
          alt: "Cookie Policy - ECODrIx",
        },
      ],
    },
  });
}
// app/cookie-policy/page.jsx
export default function CookiePolicyPage() {
  return <CookiePolicy />;
}
