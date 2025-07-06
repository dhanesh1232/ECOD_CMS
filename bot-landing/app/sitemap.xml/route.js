// app/sitemap.xml/route.js

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ecodrix.com";

  const routes = [
    "", // homepage
    "/pricing",
    "/features",
    "/contact",
    "/about",
    // Add other important routes here
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${routes
          .map(
            (route) => `
          <url>
            <loc>${baseUrl}${route}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
          </url>`
          )
          .join("")}
      </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
