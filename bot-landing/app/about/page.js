import AboutPage from "@/components/about/__page";
import { metadataForPath } from "@/lib/seo";

export async function generateMetadata() {
  return metadataForPath("/about", {
    title: "About ECODrIx",
    description: "Learn about our AI-powered business automation platform",
    keywords: ["about", "company", "history"],
    openGraph: {
      images: [
        {
          url: "/og-about.jpg",
          width: 1200,
          height: 630,
          alt: "About ECODrIx",
        },
      ],
    },
  });
}
export default function About() {
  return <AboutPage />;
}
