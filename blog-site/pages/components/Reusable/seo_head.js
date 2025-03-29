import Head from "next/head";

const HeadSEO = ({
  title = "ECOD - Your Digital Growth Partner",
  description = "ECOD provides cutting-edge solutions for web development, SEO, and digital marketing to grow your business.",
  canonicalUrl = "https://ecoddigi.com",
  ogImage = "https://ecoddigital.com/images/default-og-image.jpg",
  twitterImage = "https://ecoddigital.com/images/default-twitter-image.jpg",
  schemaData = null,
  noIndex = false,
  additionalMetaTags = [],
}) => {
  return (
    <Head>
      {/* Page Title */}
      <title>{title}</title>

      {/* Meta Description */}
      <meta name="description" content={description} />

      {/* Robots Meta Tag */}
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />

      {/* Open Graph Meta Tags (for social media) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/Images/ECOD_.png" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Schema Markup (JSON-LD) */}
      {schemaData && (
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      )}
      {additionalMetaTags}
    </Head>
  );
};

export default HeadSEO;
