import ContactPage from "@/components/contact/__page";
import { metadataForPath } from "@/lib/seo";

export async function generateMetadata() {
  return metadataForPath("/contact", {
    title: "Contact",
    description: "Contact our AI-powered business automation platform",
    keywords: ["about", "company", "history", "contact", "info", "location"],
    openGraph: {
      images: [
        {
          url: "/og-contact.jpg",
          width: 1200,
          height: 630,
          alt: "Contact ECODrIx",
        },
      ],
    },
  });
}
export default function Contact() {
  return <ContactPage />;
}
