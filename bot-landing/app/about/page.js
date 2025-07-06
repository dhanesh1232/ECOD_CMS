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
export default function AboutPage() {
  return (
    <div className="flex py-12 items-center justify-center">
      <h1>About Page</h1>
    </div>
  );
}
