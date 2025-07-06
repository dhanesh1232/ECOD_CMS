const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ecodrix.com";
const SITE_NAME = "ECODrIx";
export const defaultMeta = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
  title: {
    default:
      "ECODrIx – All-in-One AI Platform for Marketing, CRM, and Customer Support",
    template: "%s | ECODrIx – AI Automation & CRM SaaS Platform",
  },
  description:
    "ECODrIx is an all-in-one AI-powered SaaS platform offering multichannel automation, CRM integration, marketing campaigns, customer support, real-time conversations, analytics, and intelligent workflows for growing businesses.",
  keywords: [
    "AI chatbot platform",
    "CRM automation",
    "customer support software",
    "sales automation",
    "marketing campaigns",
    "lead generation",
    "business automation SaaS",
    "WhatsApp chatbot",
    "Instagram automation",
    "Facebook Messenger bot",
    "web chat widget",
    "multi-channel engagement",
    "real-time chat",
    "workflow automation",
    "conversation analytics",
    "broadcast messages",
    "message templates",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "hi-IN": "/hi",
      "te-IN": "/te",
    },
  },
  openGraph: {
    title: "ECODrIx – AI Chatbots, CRM, Campaigns & Automation for Businesses",
    description:
      "Run your business smarter with ECODrIx. Automate conversations, manage leads via CRM, launch marketing broadcasts, analyze insights, and support customers across WhatsApp, Instagram, Facebook, and Web.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: SITE_NAME || "ECODrIx AI Platform Screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ECODrIx – AI Chatbot, CRM, and Marketing Automation Platform",
    description:
      "Boost customer engagement and automate business workflows with ECODrIx — an all-in-one AI-powered platform for CRM, campaigns, chatbots, and support.",
    creator: "@ecodrix",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  category: "business",
  applicationName: "ECODrIx",
  creator: "ECODrIx Team",
  publisher: "ECODrIx Technologies Pvt. Ltd.",
};

function getSafe(obj, prop, fallback = undefined) {
  return obj && prop in obj ? obj[prop] : fallback;
}
export function generateMetadata(config = {}) {
  // Safely extract all properties with fallbacks
  const title = getSafe(config, "title", defaultMeta.title.default);
  const description = getSafe(config, "description", defaultMeta.description);
  const keywords = getSafe(config, "keywords", []);
  const alternates = getSafe(config, "alternates", {});
  const openGraph = getSafe(config, "openGraph", {});
  const twitter = getSafe(config, "twitter", {});
  const robots = getSafe(config, "robots", {});

  // Handle title (string or object)
  const titleString =
    typeof title === "object" ? getSafe(title, "default", "") : String(title);
  const fullTitle = titleString.includes(SITE_NAME)
    ? titleString
    : `${titleString} | ${SITE_NAME}`;

  // Handle keywords
  const fullKeywords = [
    ...(Array.isArray(defaultMeta.keywords) ? defaultMeta.keywords : []),
    ...(Array.isArray(keywords) ? keywords : []),
  ].filter(Boolean);

  // Handle canonical URL
  const canonicalUrl = getSafe(alternates, "canonical", SITE_URL);

  // Handle images safely
  const defaultOgImages = getSafe(defaultMeta, "openGraph", {}).images || [];
  const ogImages = getSafe(openGraph, "images", defaultOgImages);
  const twitterImages = getSafe(
    twitter,
    "images",
    ogImages.map((img) => ({
      url: getSafe(img, "url", ""),
      alt: getSafe(img, "alt", SITE_NAME),
    }))
  );

  return {
    ...defaultMeta,
    title: {
      default: fullTitle,
      template: getSafe(defaultMeta.title, "template", `%s | ${SITE_NAME}`),
    },
    description: description,
    keywords: fullKeywords.length ? fullKeywords : undefined,
    alternates: {
      ...getSafe(defaultMeta, "alternates", {}),
      canonical: canonicalUrl,
      ...alternates,
    },
    openGraph: {
      ...getSafe(defaultMeta, "openGraph", {}),
      title: fullTitle,
      description,
      ...openGraph,
      images: Array.isArray(ogImages) ? ogImages : [],
    },
    twitter: {
      ...getSafe(defaultMeta, "twitter", {}),
      title: fullTitle,
      description,
      ...twitter,
      images: Array.isArray(twitterImages) ? twitterImages : [],
    },
    robots: {
      ...getSafe(defaultMeta, "robots", {}),
      ...robots,
    },
    metadataBase: new URL(SITE_URL),
  };
}

export function metadataForPath(path, config = {}) {
  return generateMetadata({
    alternates: {
      canonical: `${SITE_URL}${path}`,
    },
    openGraph: {
      url: `${SITE_URL}${path}`,
    },
    ...config,
  });
}
