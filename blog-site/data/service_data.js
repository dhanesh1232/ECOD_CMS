import {
  ContentMarketingSVG,
  PPCAdsSVG,
  SEOSVG,
  SocialMediaSVG,
} from "@/public/Assets/svg";

import {
  Palette,
  ShoppingCart,
  Zap,
  Smartphone,
  Mail,
  Rocket,
  Shield,
  BarChart2,
} from "lucide-react";

export const about_service = [
  {
    icon: "shopify",
    title: "Store Setup",
    description:
      "We'll set up your Shopify store from scratch, including custom domain, theme selection, and product uploads.",
    color: "text-green-600",
  },
  {
    icon: "react",
    title: "Frontend Development",
    description:
      "We'll build a user-friendly and engaging frontend using React, Tailwind CSS, and other frontend tools.",
    color: "text-blue-600",
  },
  {
    icon: "tools",
    title: "Maintenance",
    description:
      "Regular updates, security checks, and performance optimization to keep your store running smoothly.",
    color: "text-blue-600",
  },
  {
    icon: "headset",
    title: "Zero Knowledge? No Problem!",
    description:
      "No prior experience needed - we'll guide you through the process and help you grow your business",
    color: "text-blue-600",
  },
  {
    icon: "google",
    title: "Google My Business",
    description:
      "Enhance your local presence with optimized Google My Business listings.",
    color: "text-blue-600",
  },
  {
    icon: "search",
    title: "SEO Optimization",
    description:
      "Improve your search rankings and drive organic traffic to your website with expert SEO services.",
    color: "text-blue-600",
  },
  {
    icon: "paintBrush",
    title: "Logo & Graphic Design",
    description:
      "Stand out with professional branding, including logos, banners, and marketing materials.",
    color: "text-purple-600",
  },
  {
    icon: "google",
    title: "Meta & Google Ads",
    description:
      "Maximize your ROI with expertly managed advertising campaigns on Meta and Google.",
    color: "text-yellow-600",
  },
  {
    icon: "chartLine",
    title: "Performance Optimization",
    description:
      "We optimize your store for speed, SEO, and conversions to maximize your sales.",
    color: "text-yellow-600",
  },
  {
    icon: "bullHorn",
    title: "Digital Marketing",
    description:
      "Boost your brand with targeted marketing strategies, including Meta and Google Ads.",
    color: "text-red-600",
  },
  {
    icon: "code",
    title: "Web Development",
    description:
      "We create stunning, high-performance websites and e-commerce platforms tailored to your needs.",
    color: "text-blue-600",
  },
];
export const services_ecod = [
  { label: "Web Development", slug: "web-development" },
  { label: "Google | Meta Ads", slug: "google-meta-ads" },
  { label: "SEO", slug: "seo" },
  { label: "Social Media Marketing", slug: "social-media-marketing" },
  {
    label: "Shopify Optimization",
    slug: "shopify-optimization",
  },
  { label: "Content Marketing", slug: "content-marketing" },
  { label: "Email Marketing", slug: "email-marketing" },
];
export const eco_services = [
  {
    label: "Web Development",
    href: "/services/web-development",
    image_url: "/Images/web-development.jpg",
    description:
      "Build modern, responsive websites with the latest technologies.",
    icon: "💻",
    cta: "Get Started",
    color: "from-blue-500 to-blue-600",
    darkColor: "from-blue-400 to-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    emoji: "✨",
    stats: "98% Client Satisfaction",
    badge: "Popular",
  },
  {
    label: "Google | Meta Ads",
    href: "/services/google-meta-ads",
    image_url: "/Images/google-meta-ads.png",
    description: "Maximize your ROI with targeted PPC campaigns.",
    icon: "📢",
    cta: "Run Ads",
    color: "from-purple-500 to-purple-600",
    darkColor: "from-purple-400 to-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    emoji: "📈",
    stats: "3-5x ROI Average",
    badge: "Trending",
  },
  {
    label: "SEO Optimization",
    href: "/services/seo",
    image_url: "/Images/seo.jpg",
    description: "Boost your website's rankings and drive organic traffic.",
    icon: "🚀",
    cta: "Optimize Now",
    color: "from-green-500 to-green-600",
    darkColor: "from-green-400 to-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    emoji: "🔍",
    stats: "85% Traffic Increase",
    badge: "Essential",
  },
  {
    label: "Social Media Marketing",
    href: "/services/social-media-marketing",
    image_url: "/Images/social-media-marketing.jpg",
    description: "Grow your brand presence with engaging social campaigns.",
    icon: "📱",
    cta: "Get Social",
    color: "from-blue-500 to-blue-600",
    darkColor: "from-pink-400 to-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
    emoji: "👍",
    stats: "2M+ Impressions",
    badge: "Engaging",
  },
  {
    label: "Shopify Optimization",
    href: "/services/shopify-optimization",
    image_url: "/Images/shopify.jpg",
    description: "Custom Shopify themes for high-converting stores.",
    icon: "🛍️",
    cta: "Build Store",
    color: "from-blue-500 to-blue-600",
    darkColor: "from-pink-400 to-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
    emoji: "💰",
    stats: "40% Conversion Boost",
    badge: "Hot",
  },
  {
    label: "Content Marketing",
    href: "/services/content-marketing",
    image_url: "/Images/content-marketing.jpg",
    description: "Engage and convert customers with high-quality content.",
    icon: "✍️",
    cta: "Create Content",
    color: "from-amber-500 to-amber-600",
    darkColor: "from-amber-400 to-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    emoji: "📖",
    stats: "5x Engagement",
    badge: "Viral",
  },
  {
    label: "Email Marketing",
    href: "/services/email-marketing",
    image_url: "/Images/email-marketing.jpg",
    description: "Increase conversions with strategic email campaigns.",
    icon: "📧",
    cta: "Start Emailing",
    color: "from-purple-500 to-purple-600",
    darkColor: "from-purple-400 to-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    emoji: "✉️",
    stats: "30% Open Rate",
    badge: "Effective",
  },
]; //
export const shopify_services_data = [
  {
    icon: <Palette className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: "Custom Themes",
    link: "/shopify/custom-themes",
    description:
      "Stand out with unique, visually stunning themes tailored to your brand.",
    color: "from-blue-500 to-blue-600",
    darkColor: "from-blue-400 to-blue-500",
  },
  {
    icon: (
      <ShoppingCart className="w-8 h-8 text-purple-600 dark:text-purple-400" />
    ),
    title: "Store Setup",
    link: "/shopify/store-setup",
    description:
      "From product uploads to payment gateways, we handle every detail of your Shopify store setup.",
    color: "from-purple-500 to-purple-600",
    darkColor: "from-purple-400 to-purple-500",
  },
  {
    icon: <Zap className="w-8 h-8 text-green-600 dark:text-green-400" />,
    title: "One-Click Checkout",
    link: "/shopify/one-click-checkout",
    description:
      "Reduce cart abandonment and boost conversions with a seamless, one-click checkout experience.",
    color: "from-green-500 to-green-600",
    darkColor: "from-green-400 to-green-500",
  },
  {
    icon: <Smartphone className="w-8 h-8 text-red-600 dark:text-red-400" />,
    title: "Mobile Optimization",
    link: "/shopify/mobile-optimization",
    description:
      "Ensure flawless performance and user experience on all mobile devices.",
    color: "from-red-500 to-red-600",
    darkColor: "from-red-400 to-red-500",
  },
  {
    icon: <Rocket className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />,
    title: "Performance Boost",
    link: "/shopify/performance-optimization",
    description:
      "Speed up your store with advanced optimization techniques for better conversions.",
    color: "from-yellow-500 to-yellow-600",
    darkColor: "from-yellow-400 to-yellow-500",
  },
  {
    icon: <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
    title: "Security Enhancements",
    link: "/shopify/security",
    description:
      "Protect your store with advanced security measures and fraud prevention.",
    color: "from-indigo-500 to-indigo-600",
    darkColor: "from-indigo-400 to-indigo-500",
  },
  {
    icon: <BarChart2 className="w-8 h-8 text-pink-600 dark:text-pink-400" />,
    title: "SEO Optimization",
    link: "/shopify/seo",
    description:
      "Improve your search rankings and drive organic traffic to your store.",
    color: "from-pink-500 to-pink-600",
    darkColor: "from-pink-400 to-pink-500",
  },
  {
    icon: <Mail className="w-8 h-8 text-teal-600 dark:text-teal-400" />,
    title: "Email Marketing",
    link: "/shopify/email-marketing",
    description:
      "Convert visitors into customers with automated email campaigns and flows.",
    color: "from-teal-500 to-teal-600",
    darkColor: "from-teal-400 to-teal-500",
  },
]; //
export const services_list_ecod = {
  "web-development": [
    // ================== CORE WEB APPS ==================
    {
      id: 1,
      label: "Single-Page Applications (SPA)",
      description:
        "Fast, dynamic web apps built with React, Angular, or Vue.js for seamless user experiences.",
      deliverables: [
        "Production-ready frontend code (optimized JS/CSS)",
        "API integration (REST/GraphQL)",
        "Responsive UI components",
        "State management (Redux/Pinia)",
        "Lighthouse performance audit",
        "Git repository access + deployment guide",
      ],
      image_url: "",
      href: "single-page-applications",
      preview_link: "/demos/spa",
      category: "web-apps",
      pricing:
        "$8,000 – $30,000+ | Let’s tailor the scope to your performance needs.",
      projects: [], // Add project IDs later
    },
    {
      id: 2,
      label: "Progressive Web Apps (PWA)",
      description:
        "Offline-capable, installable web applications with native app features.",
      deliverables: [
        "Service worker setup (caching/offline mode)",
        "Web App Manifest (splash screen, icons)",
        "Push notification integration",
        "PWA optimization audit",
        "Cross-device testing report",
        "App store submission guidance (optional)",
      ],
      image_url: "",
      href: "progressive-web-apps",
      preview_link: "/demos/pwa",
      category: "web-apps",
      pricing: "$12,000 – $50,000 | Includes App Store optimization.",
      projects: [],
    },
    // ================== REAL-TIME APPS ==================
    {
      id: 3,
      label: "Real-Time Web Apps",
      description:
        "Interactive applications with live updates using WebSockets (e.g., chat, dashboards).",
      deliverables: [
        "WebSocket/SSE implementation",
        "Real-time database (Firebase/Supabase)",
        "Connection fallback handling",
        "Load stress testing report",
        "Data synchronization docs",
        "Scalability recommendations",
      ],
      image_url: "",
      href: "real-time-web-apps",
      preview_link: "/demos/realtime-chat",
      category: "real-time",
      pricing:
        "$15,000 – $60,000 | Price scales with concurrent user capacity.",
      projects: [],
    },
    {
      id: 4,
      label: "Live Auction Platforms",
      description: "Bid in real-time with WebSocket-powered auction systems.",
      deliverables: [
        "Countdown timers with bid extensions",
        "Auto-bid algorithms",
        "Fraud detection systems",
        "Escrow payment integration",
        "Email/SMS bid notifications",
        "Admin dashboard for moderation",
      ],
      image_url: "",
      href: "live-auction-platforms",
      preview_link: "/demos/auction",
      category: "real-time",
      pricing: "$25,000+ | Custom pricing for high-traffic auctions.",
      projects: [],
    },
    // ================== E-COMMERCE ==================
    {
      id: 5,
      label: "E-Commerce Marketplaces",
      description: "Multi-vendor platforms with secure payment processing.",
      deliverables: [
        "Vendor onboarding workflows",
        "Escrow payment system",
        "Product review/rating system",
        "AI-powered recommendations",
        "Tax/Shipping rule engine",
        "Fraud detection setup",
      ],
      image_url: "",
      href: "ecommerce-marketplaces",
      preview_link: "/demos/marketplace",
      category: "ecommerce",
      pricing: "$25,000 – $100,000+ | Revenue share models available.",
      projects: [],
    },
    {
      id: 6,
      label: "Custom E-Commerce Stores",
      description:
        "Branded online stores with unique UX tailored to your products.",
      deliverables: [
        "Headless commerce architecture",
        "AR product previews (WebXR)",
        "Subscription/recurring billing",
        "Abandoned cart recovery flows",
        "Loyalty program integration",
        "Custom checkout experiences",
      ],
      image_url: "",
      href: "custom-ecommerce-stores",
      preview_link: "/demos/ecom-store",
      category: "ecommerce",
      pricing:
        "$10,000 – $75,000 | No transaction fees – you own the platform.",
      projects: [],
    },
    // ================== REAL ESTATE ==================
    {
      id: 7,
      label: "Real Estate Platforms",
      description:
        "Property listing portals with advanced search, virtual tours, and CRM integration.",
      deliverables: [
        "Interactive property maps (Google Maps/Mapbox)",
        "3D virtual tours (Matterport/WebGL)",
        "Lead capture forms + CRM sync",
        "Mortgage calculator widget",
        "Agent/broker dashboards",
        "IDX/MLS API integration",
      ],
      image_url: "",
      href: "real-estate-platforms",
      preview_link: "/demos/realestate",
      category: "real-estate",
      pricing: "$20,000 – $80,000 | MLS integration fees vary by region.",
      projects: [],
    },
    {
      id: 8,
      label: "Vacation Rental Systems",
      description:
        "Airbnb-like platforms with booking calendars and dynamic pricing.",
      deliverables: [
        "Multi-calendar availability system",
        "Dynamic pricing algorithms",
        "Guest/owner portals",
        "Damage deposit handling",
        "Cleaning schedule coordination",
        "Review/rating system",
      ],
      image_url: "",
      href: "vacation-rental-systems",
      preview_link: "/demos/vacation-rental",
      category: "real-estate",
      pricing: "$18,000 – $70,000 | Commission-based pricing available.",
      projects: [],
    },
    // ================== INDUSTRY-SPECIFIC ==================
    {
      id: 9,
      label: "Healthcare Portals",
      description:
        "HIPAA-compliant platforms for telemedicine and patient management.",
      deliverables: [
        "Video consultation modules",
        "E-prescription integration",
        "HL7/FHIR API compliance",
        "Patient health records (PHR)",
        "Role-based access (Doctors/Patients)",
        "Appointment scheduling system",
      ],
      image_url: "",
      href: "healthcare-portals",
      preview_link: "/demos/telehealth",
      category: "healthcare",
      pricing: "$30,000+ | HIPAA compliance adds 15-20% to base cost.",
      projects: [],
    },
    {
      id: 10,
      label: "On-Demand Service Apps",
      description:
        "Uber-like platforms for local services (cleaning, repairs, etc.).",
      deliverables: [
        "Geolocation tracking",
        "Dynamic service area mapping",
        "Two-way rating system",
        "In-app chat/calling",
        "Automated payout system",
        "Background check integrations",
      ],
      image_url: "",
      href: "ondemand-service-apps",
      preview_link: "/demos/ondemand",
      category: "on-demand",
      pricing: "$35,000 – $120,000 | Includes driver/provider apps.",
      projects: [],
    },
    // ================== EMERGING TECH ==================
    {
      id: 11,
      label: "AI-Integrated Web Apps",
      description:
        "Applications enhanced with machine learning, chatbots, or computer vision APIs.",
      deliverables: [
        "Pre-trained model integration (TensorFlow.js)",
        "Custom API endpoints for AI processing",
        "Data annotation guidelines (if custom models)",
        "Ethical AI compliance checklist",
        "Model performance monitoring",
        "User feedback loop setup",
      ],
      image_url: "",
      href: "ai-integrated-web-apps",
      preview_link: "/demos/ai-chatbot",
      category: "ai",
      pricing:
        "$15,000 – $200,000+ | Depends on model complexity and data needs.",
      projects: [],
    },
    {
      id: 12,
      label: "Web3/Blockchain Apps",
      description:
        "Decentralized applications with wallet integration and smart contracts.",
      deliverables: [
        "Ethereum/Solana wallet connectivity",
        "NFT minting/display systems",
        "Tokenomics dashboard",
        "Smart contract development + auditing",
        "Gas optimization",
        "DAO governance interfaces",
      ],
      image_url: "",
      href: "web3-applications",
      preview_link: "/demos/web3",
      category: "web3",
      pricing: "$50,000+ | Smart contract auditing billed separately.",
      projects: [],
    },
  ],
  "google-meta-ads": [
    {
      id: 1,
      label: "Search Ads",
      description:
        "Text-based ads that appear when users search for specific keywords on Google.",
      how_it_works:
        "These ads appear at the top or bottom of search results. You bid on keywords relevant to your business, and your ad shows when users search those terms. Uses a pay-per-click (PPC) model.",
      business_implementation: {
        setup: [
          "Conduct keyword research using Google Keyword Planner",
          "Create tightly themed ad groups",
          "Write compelling ad copy with CTAs",
          "Set up conversion tracking",
        ],
        optimization: [
          "Negative keyword filtering",
          "A/B test different ad variations",
          "Implement ad extensions (call, location, etc.)",
          "Adjust bids based on performance data",
        ],
        best_for: [
          "Businesses with clear products/services",
          "Lead generation",
          "Local service providers",
          "E-commerce stores",
        ],
      },
      objectives: [
        "Drive traffic",
        "Generate leads",
        "Increase sales",
        "Brand awareness",
      ],
      platform: "Google",
      image_url: "",
      href: "search-ads",
      category: "google-meta-ads",
    },
    {
      id: 2,
      label: "Display Ads",
      description:
        "Visual banner ads shown across websites in Google's Display Network.",
      how_it_works:
        "Uses targeting options to show image/video ads on relevant websites. Can target by interests, demographics, or remarketing lists. Charges by impressions (CPM) or clicks (CPC).",
      business_implementation: {
        setup: [
          "Create responsive display ads with multiple assets",
          "Define target audiences (affinity, in-market, custom intent)",
          "Set frequency caps",
          "Upload customer email lists for matching",
        ],
        optimization: [
          "Exclude irrelevant placements",
          "Layer targeting options for precision",
          "Create separate campaigns for prospecting/remarketing",
          "Use dynamic remarketing for e-commerce",
        ],
        best_for: [
          "Brand awareness campaigns",
          "Visual products/services",
          "Remarketing to past visitors",
          "Consideration-stage marketing",
        ],
      },
      objectives: ["Brand visibility", "Remarketing", "Lead generation"],
      platform: "Google",
      image_url: "",
      href: "display-ads",
      category: "google-meta-ads",
    },
    {
      id: 3,
      label: "YouTube Ads",
      description: "Video advertising across YouTube's platform.",
      how_it_works:
        "Various formats including skippable in-stream ads, bumper ads, and discovery ads. Can target based on viewer demographics, interests, or specific video content.",
      business_implementation: {
        setup: [
          "Create engaging 15-30 second videos",
          "Choose between skippable/non-skippable formats",
          "Target by audience demographics or video topics",
          "Add end screens and CTAs",
        ],
        optimization: [
          "Analyze audience retention metrics",
          "Retarget viewers who watched certain percentages",
          "Test different thumbnail images",
          "Combine with Google Ads for full-funnel approach",
        ],
        best_for: [
          "Brand storytelling",
          "Product demonstrations",
          "Educational content",
          "High-consideration purchases",
        ],
      },
      objectives: ["Brand awareness", "Product consideration", "Conversions"],
      platform: "Google",
      image_url: "",
      href: "youtube-ads",
      category: "google-meta-ads",
    },
    {
      id: 4,
      label: "Shopping Ads",
      description:
        "Product listings that appear in Google Search results and the Shopping tab.",
      how_it_works:
        "Pulls product data from your Merchant Center feed to show images, prices, and store info directly in search results. Uses product IDs rather than keywords.",
      business_implementation: {
        setup: [
          "Create Google Merchant Center account",
          "Upload product feed with accurate data",
          "Connect to Google Ads account",
          "Set up product groups for bidding",
        ],
        optimization: [
          "Optimize product titles/descriptions",
          "Implement promotions and special offers",
          "Use negative keywords strategically",
          "Segment products by performance",
        ],
        best_for: [
          "E-commerce businesses",
          "Retailers with clear inventory",
          "Price-competitive products",
          "Visual products that benefit from images",
        ],
      },
      objectives: ["Product sales", "E-commerce conversions"],
      platform: "Google",
      image_url: "",
      href: "google-shopping-ads",
      category: "google-meta-ads",
    },
    {
      id: 5,
      label: "Performance Max",
      description:
        "Automated campaign type that uses Google's AI across all their properties.",
      how_it_works:
        "Uses machine learning to automatically serve ads across Search, Display, YouTube, Gmail, Discover, and Maps. Requires asset inputs and conversion goals.",
      business_implementation: {
        setup: [
          "Upload various creative assets (images, videos, text)",
          "Provide conversion goals and values",
          "Input audience signals (who might convert)",
          "Set budget and let Google optimize",
        ],
        optimization: [
          "Regularly refresh creative assets",
          "Analyze which asset combinations perform best",
          "Supplement with audience insights",
          "Compare against other campaign types",
        ],
        best_for: [
          "Businesses with conversion tracking",
          "Omnichannel marketing",
          "Limited marketing resources",
          "Testing new markets/products",
        ],
      },
      objectives: ["Maximize conversions", "Increase conversion value"],
      platform: "Google",
      image_url: "",
      href: "performance-max",
      category: "google-meta-ads",
    },
    {
      id: 6,
      label: "Discovery Ads",
      description: "Visually rich ads that appear in Google's discovery feeds.",
      how_it_works:
        "Appears in YouTube Home feed, Gmail promotions/social tabs, and Discover feed. Uses machine learning to show to interested users.",
      business_implementation: {
        setup: [
          "Create visually compelling images",
          "Write engaging headlines/descriptions",
          "Set audience targeting parameters",
          "Connect to conversion goals",
        ],
        optimization: [
          "Test different image styles/formats",
          "Analyze swipe-through rates",
          "Refine audience targeting",
          "Coordinate with Display campaigns",
        ],
        best_for: [
          "Mobile-first campaigns",
          "Visual products/services",
          "Content marketing",
          "App installs",
        ],
      },
      objectives: ["Drive consideration", "Generate leads"],
      platform: "Google",
      image_url: "",
      href: "discovery-ads",
      category: "google-meta-ads",
    },
    {
      id: 7,
      label: "Facebook Feed Ads",
      description:
        "Native advertisements that appear in users' main Facebook feed.",
      how_it_works:
        "Blends with organic content in the news feed. Can include images, videos, carousels, or slideshows. Highly targetable by demographics, interests, and behaviors.",
      business_implementation: {
        setup: [
          "Choose campaign objective matching goals",
          "Create eye-catching visuals",
          "Define detailed target audience",
          "Set budget and schedule",
        ],
        optimization: [
          "Test different creative formats",
          "Use dynamic creative optimization",
          "Analyze frequency metrics",
          "Retarget engaged users",
        ],
        best_for: [
          "Community-focused businesses",
          "Local services",
          "B2C products",
          "Content distribution",
        ],
      },
      objectives: ["Brand awareness", "Engagement", "Conversions"],
      platform: "Meta",
      image_url: "",
      href: "facebook-feed-ads",
      category: "google-meta-ads",
    },
    {
      id: 8,
      label: "Instagram Feed Ads",
      description: "Sponsored posts that appear in users' Instagram feeds.",
      how_it_works:
        "Seamlessly integrates with organic posts. Supports photos, videos, carousels, and collections. Leverages Instagram's visual-first platform.",
      business_implementation: {
        setup: [
          "Create visually stunning content",
          "Use vertical formats (4:5 aspect ratio)",
          "Include subtle branding elements",
          "Add shoppable tags if applicable",
        ],
        optimization: [
          "Monitor engagement metrics closely",
          "Test different caption styles",
          "Use branded hashtags strategically",
          "Coordinate with influencer content",
        ],
        best_for: [
          "Visual products (fashion, food, art)",
          "Lifestyle brands",
          "Younger demographics",
          "Aesthetic-driven businesses",
        ],
      },
      objectives: ["Brand awareness", "Engagement", "Product sales"],
      platform: "Meta",
      image_url: "",
      href: "instagram-feed-ads",
      category: "google-meta-ads",
    },
    {
      id: 9,
      label: "Stories Ads",
      description: "Full-screen vertical ads between users' Stories.",
      how_it_works:
        "Appears between organic Stories on Instagram and Facebook. Uses immersive 9:16 format with tap-forward navigation.",
      business_implementation: {
        setup: [
          "Create vertical video content (15s max)",
          "Design for sound-off viewing",
          "Include interactive elements (polls, questions)",
          "Use strong first-frame visuals",
        ],
        optimization: [
          "Analyze drop-off rates",
          "Test different CTA placements",
          "Use sequential storytelling",
          "Repurpose top-performing feed content",
        ],
        best_for: [
          "Time-sensitive promotions",
          "Behind-the-scenes content",
          "Product demonstrations",
          "Mobile-first audiences",
        ],
      },
      objectives: ["Brand awareness", "Engagement", "Lead generation"],
      platform: "Meta",
      image_url: "",
      href: "stories-ads",
      category: "google-meta-ads",
    },
    {
      id: 10,
      label: "Reels Ads",
      description: "Short-form video ads in Instagram's Reels platform.",
      how_it_works:
        "Appears between user-generated Reels content. 9:16 vertical format with up to 30 seconds runtime.",
      business_implementation: {
        setup: [
          "Create authentic, entertaining content",
          "Use trending audio when appropriate",
          "Include text overlays for silent viewing",
          "Hook viewers in first 3 seconds",
        ],
        optimization: [
          "Monitor watch time metrics",
          "Participate in relevant challenges",
          "Collaborate with creators",
          "Test different content styles",
        ],
        best_for: [
          "Brands targeting Gen Z",
          "Creative industries",
          "Viral content strategies",
          "Product showcases",
        ],
      },
      objectives: ["Brand awareness", "Video views", "Engagement"],
      platform: "Meta",
      image_url: "",
      href: "reels-ads",
      category: "google-meta-ads",
    },
    {
      id: 11,
      label: "Messenger Ads",
      description: "Ads that initiate conversations in Facebook Messenger.",
      how_it_works:
        "Appears in Messenger inbox or as sponsored messages. Opens chat dialog where businesses can automate responses.",
      business_implementation: {
        setup: [
          "Create welcome message flow",
          "Set up automated responses",
          "Design quick reply options",
          "Integrate with CRM if possible",
        ],
        optimization: [
          "Analyze response rates",
          "Test different opening messages",
          "Implement chatbot sequences",
          "Follow up within 24 hours",
        ],
        best_for: [
          "High-touch sales processes",
          "Customer support",
          "Appointment booking",
          "Personalized offers",
        ],
      },
      objectives: ["Conversations", "Lead generation", "Messages"],
      platform: "Meta",
      image_url: "",
      href: "messenger-ads",
      category: "google-meta-ads",
    },
    {
      id: 12,
      label: "Audience Network",
      description: "Ads shown on third-party apps and websites.",
      how_it_works:
        "Extends Facebook's targeting to off-platform placements. Includes native, banner, interstitial, and rewarded video formats.",
      business_implementation: {
        setup: [
          "Select Audience Network placements",
          "Create mobile-optimized creatives",
          "Set frequency caps",
          "Monitor brand safety settings",
        ],
        optimization: [
          "Exclude low-quality placements",
          "Analyze viewability metrics",
          "Test different ad formats",
          "Compare performance to on-platform",
        ],
        best_for: [
          "Mobile app installs",
          "Extended reach campaigns",
          "Performance marketing",
          "Brands with broad appeal",
        ],
      },
      objectives: ["Brand awareness", "Reach", "Conversions"],
      platform: "Meta",
      image_url: "",
      href: "audience-network",
      category: "google-meta-ads",
    },
    {
      id: 13,
      label: "Dynamic Product Ads",
      description: "Automatically promoted products based on user behavior.",
      how_it_works:
        "Uses your product catalog to show relevant items to users who viewed them or similar products. Automatically updates as inventory changes.",
      business_implementation: {
        setup: [
          "Upload product catalog",
          "Create product sets",
          "Set up dynamic creative",
          "Build remarketing audiences",
        ],
        optimization: [
          "Segment by product categories",
          "Test different audience windows",
          "Coordinate with email remarketing",
          "Analyze cross-sell opportunities",
        ],
        best_for: [
          "E-commerce with large inventories",
          "Retailers with frequent inventory changes",
          "Abandoned cart recovery",
          "Product recommendation strategies",
        ],
      },
      objectives: ["Catalog sales", "Product sales", "Retargeting"],
      platform: "Meta",
      image_url: "",
      href: "dynamic-product-ads",
      category: "google-meta-ads",
    },
    {
      id: 14,
      label: "Advantage+ Shopping",
      description:
        "AI-powered shopping campaigns that automate creative and targeting.",
      how_it_works:
        "Meta's automated system combines creative generation, placement selection, and audience targeting using machine learning.",
      business_implementation: {
        setup: [
          "Upload product catalog",
          "Provide multiple creative assets",
          "Set budget and optimization goal",
          "Let AI handle initial learning phase",
        ],
        optimization: [
          "Monitor creative combinations",
          "Supplement with audience insights",
          "Analyze new customer acquisition",
          "Compare against standard shopping campaigns",
        ],
        best_for: [
          "E-commerce businesses",
          "Brands with limited marketing resources",
          "Testing new products",
          "Scaling proven performers",
        ],
      },
      objectives: ["Catalog sales", "Product sales", "Store traffic"],
      platform: "Meta",
      image_url: "",
      href: "advantage-plus-shopping",
      category: "google-meta-ads",
    },
  ],
  seo: [
    {
      id: 11,
      label: "On-Page SEO",
      description:
        "Optimize your website's content and structure for better rankings.",
      how_it_works:
        "Analyzes and optimizes title tags, meta descriptions, headers, content, and internal linking structure to improve search engine visibility.",
      business_implementation: {
        setup: [
          "Conduct comprehensive content audit",
          "Optimize meta tags and headings",
          "Improve content structure and readability",
          "Implement schema markup",
        ],
        optimization: [
          "Monitor keyword rankings",
          "Update content regularly",
          "Optimize for featured snippets",
          "Improve internal linking strategy",
        ],
        best_for: [
          "Websites with existing content",
          "Businesses targeting specific keywords",
          "Content-heavy websites",
          "E-commerce product pages",
        ],
      },
      image_url: "",
      href: "on-page-seo",
      category: "seo",
    },
    {
      id: 12,
      label: "Off-Page SEO",
      description:
        "Build authority and backlinks to improve your site's visibility.",
      how_it_works:
        "Focuses on building high-quality backlinks and online presence through various digital channels to improve domain authority.",
      business_implementation: {
        setup: [
          "Identify authoritative websites in your niche",
          "Create link-worthy content",
          "Develop outreach strategy",
          "Build social media presence",
        ],
        optimization: [
          "Monitor backlink profile",
          "Disavow toxic backlinks",
          "Expand guest posting opportunities",
          "Leverage PR for media coverage",
        ],
        best_for: [
          "New websites needing authority",
          "Competitive industries",
          "Brands establishing online presence",
          "Local businesses expanding reach",
        ],
      },
      image_url: "",
      href: "off-page-seo",
      category: "seo",
    },
    {
      id: 13,
      label: "Technical SEO",
      description:
        "Enhance your website's technical performance for search engines.",
      how_it_works:
        "Improves website infrastructure including site speed, mobile-friendliness, indexing, and crawlability for better search engine performance.",
      business_implementation: {
        setup: [
          "Conduct technical audit",
          "Fix crawl errors",
          "Optimize robots.txt and XML sitemaps",
          "Implement proper redirects",
        ],
        optimization: [
          "Monitor site speed improvements",
          "Check mobile usability",
          "Optimize JavaScript rendering",
          "Improve URL structure",
        ],
        best_for: [
          "Websites with poor performance",
          "Large e-commerce sites",
          "Sites undergoing redesign",
          "Websites with indexing issues",
        ],
      },
      image_url: "",
      href: "technical-seo",
      category: "seo",
    },
    {
      id: 14,
      label: "Local SEO",
      description: "Boost your visibility in local search results.",
      how_it_works:
        "Optimizes your online presence for local searches through Google My Business optimization, local citations, and review management.",
      business_implementation: {
        setup: [
          "Claim and optimize Google My Business",
          "Ensure NAP consistency across directories",
          "Build local citations",
          "Encourage customer reviews",
        ],
        optimization: [
          "Monitor local rankings",
          "Respond to all reviews",
          "Post regular GMB updates",
          "Optimize for local keywords",
        ],
        best_for: [
          "Local brick-and-mortar businesses",
          "Service area businesses",
          "Multi-location businesses",
          "Restaurants and retail stores",
        ],
      },
      image_url: "",
      href: "local-seo",
      category: "seo",
    },
    {
      id: 15,
      label: "SEO Audits & Reporting",
      description:
        "Comprehensive audits and reports to track your SEO performance.",
      how_it_works:
        "Provides detailed analysis of your website's SEO health with actionable insights and regular performance tracking.",
      business_implementation: {
        setup: [
          "Implement tracking codes",
          "Set up Google Search Console",
          "Configure analytics dashboards",
          "Establish KPIs and benchmarks",
        ],
        optimization: [
          "Monthly performance analysis",
          "Competitor benchmarking",
          "Identify new opportunities",
          "Adjust strategy based on data",
        ],
        best_for: [
          "Businesses needing performance tracking",
          "Agencies managing multiple clients",
          "Websites with stagnant growth",
          "Companies investing in SEO long-term",
        ],
      },
      image_url: "",
      href: "seo-audits-reporting",
      category: "seo",
    },
  ],
  "social-media-marketing": [
    {
      id: 16,
      label: "Facebook & Instagram Ads",
      description:
        "Targeted ads to reach your audience on Facebook and Instagram.",
      how_it_works:
        "Leverages Meta's powerful targeting options to deliver highly relevant ads to your ideal customers across Facebook and Instagram platforms.",
      business_implementation: {
        setup: [
          "Define campaign objectives",
          "Create audience personas",
          "Develop ad creatives",
          "Set up conversion tracking",
        ],
        optimization: [
          "A/B test different creatives",
          "Refine audience targeting",
          "Adjust bids based on performance",
          "Scale winning ad sets",
        ],
        best_for: [
          "E-commerce businesses",
          "Local service providers",
          "App install campaigns",
          "Brand awareness campaigns",
        ],
      },
      image_url: "",
      href: "facebook-instagram-ads",
      category: "social-media-marketing",
    },
    {
      id: 17,
      label: "Content Creation",
      description: "Engaging content tailored for your social media platforms.",
      how_it_works:
        "Develops platform-specific content strategies and creatives designed to maximize engagement and brand awareness.",
      business_implementation: {
        setup: [
          "Audit existing content",
          "Develop content pillars",
          "Create content calendar",
          "Establish brand guidelines",
        ],
        optimization: [
          "Analyze engagement metrics",
          "Adjust content mix based on performance",
          "Incorporate trending topics",
          "Leverage user-generated content",
        ],
        best_for: [
          "Brands building social presence",
          "Businesses with visual products",
          "Content-driven marketing strategies",
          "Platform-specific branding",
        ],
      },
      image_url: "",
      href: "content-creation",
      category: "social-media-marketing",
    },
    {
      id: 18,
      label: "Influencer Marketing",
      description: "Leverage influencers to amplify your brand's reach.",
      how_it_works:
        "Identifies and partners with relevant influencers to promote your brand to their engaged audiences.",
      business_implementation: {
        setup: [
          "Identify relevant influencers",
          "Establish partnership criteria",
          "Develop campaign briefs",
          "Create tracking mechanisms",
        ],
        optimization: [
          "Monitor engagement rates",
          "Adjust influencer mix",
          "Negotiate performance-based deals",
          "Scale successful partnerships",
        ],
        best_for: [
          "Lifestyle brands",
          "Beauty and fashion products",
          "Consumer packaged goods",
          "Targeting niche audiences",
        ],
      },
      image_url: "",
      href: "influencer-marketing",
      category: "social-media-marketing",
    },
    {
      id: 19,
      label: "Community Management",
      description: "Build and engage with your online community.",
      how_it_works:
        "Manages all aspects of your social media presence including comments, messages, and engagement to build brand loyalty.",
      business_implementation: {
        setup: [
          "Establish brand voice guidelines",
          "Set up response protocols",
          "Create FAQ resources",
          "Implement monitoring tools",
        ],
        optimization: [
          "Analyze sentiment trends",
          "Identify brand advocates",
          "Develop engagement strategies",
          "Crisis management planning",
        ],
        best_for: [
          "Brands with active social following",
          "Customer service via social media",
          "Community-driven businesses",
          "High-touch customer relationships",
        ],
      },
      image_url: "",
      href: "community-management",
      category: "social-media-marketing",
    },
    {
      id: 20,
      label: "Social Media Strategy",
      description: "Data-driven strategies to grow your social media presence.",
      how_it_works:
        "Develops comprehensive social media roadmaps aligned with business goals, incorporating content, advertising, and engagement tactics.",
      business_implementation: {
        setup: [
          "Conduct competitive analysis",
          "Define SMART goals",
          "Select key platforms",
          "Establish KPIs",
        ],
        optimization: [
          "Monthly performance reviews",
          "Platform algorithm adjustments",
          "Content strategy refinements",
          "Budget reallocation",
        ],
        best_for: [
          "Businesses launching social presence",
          "Brands expanding to new platforms",
          "Companies with stagnant growth",
          "Integrated marketing strategies",
        ],
      },
      image_url: "",
      href: "social-media-strategy",
      category: "social-media-marketing",
    },
  ],
  "shopify-optimization": [
    {
      id: 21,
      label: "Custom Shopify Theme Design",
      description:
        "Unique and responsive Shopify themes tailored to your brand.",
      how_it_works:
        "Creates completely custom Shopify themes from scratch designed to reflect your brand identity while optimizing for conversions.",
      business_implementation: {
        setup: [
          "Conduct brand discovery",
          "Create design mockups",
          "Develop custom liquid templates",
          "Implement responsive design",
        ],
        optimization: [
          "User testing iterations",
          "Conversion rate optimization",
          "Performance benchmarking",
          "Ongoing maintenance",
        ],
        best_for: [
          "Brands needing unique storefronts",
          "High-volume e-commerce",
          "Businesses with strong brand identity",
          "Stores with specific functionality needs",
        ],
      },
      image_url: "",
      href: "custom-shopify-theme-design",
      category: "shopify-theme-development",
    },
    {
      id: 22,
      label: "Theme Customization",
      description: "Customize existing Shopify themes to fit your needs.",
      how_it_works:
        "Modifies pre-existing Shopify themes with custom code, features, and design elements to better suit your brand and business requirements.",
      business_implementation: {
        setup: [
          "Audit current theme limitations",
          "Plan customization scope",
          "Create child theme",
          "Implement custom features",
        ],
        optimization: [
          "A/B test custom elements",
          "Monitor performance impacts",
          "Iterate based on user feedback",
          "Ensure update compatibility",
        ],
        best_for: [
          "Businesses using premium themes",
          "Stores needing specific tweaks",
          "Brands with limited budgets",
          "Quick turnaround projects",
        ],
      },
      image_url: "",
      href: "theme-customization",
      category: "shopify-theme-development",
    },
    {
      id: 23,
      label: "Mobile-Optimized Themes",
      description: "Themes designed for seamless mobile experiences.",
      how_it_works:
        "Focuses on creating or modifying themes specifically optimized for mobile devices, which account for the majority of e-commerce traffic.",
      business_implementation: {
        setup: [
          "Analyze current mobile experience",
          "Implement mobile-first design",
          "Optimize touch interactions",
          "Streamline checkout flow",
        ],
        optimization: [
          "Monitor mobile conversion rates",
          "Test different mobile layouts",
          "Improve page speed on mobile",
          "Adapt to new mobile standards",
        ],
        best_for: [
          "Businesses with mobile-heavy traffic",
          "Stores with high cart abandonment",
          "Brands targeting younger demographics",
          "Markets with high mobile commerce adoption",
        ],
      },
      image_url: "",
      href: "mobile-optimized-themes",
      category: "shopify-theme-development",
    },
    {
      id: 24,
      label: "Speed Optimization",
      description: "Optimize your Shopify store for faster loading times.",
      how_it_works:
        "Identifies and resolves performance bottlenecks to dramatically improve page load times, which directly impacts conversion rates and SEO.",
      business_implementation: {
        setup: [
          "Run performance audit",
          "Optimize image assets",
          "Minify CSS/JavaScript",
          "Implement lazy loading",
        ],
        optimization: [
          "Monitor speed metrics",
          "Test third-party app impacts",
          "Implement CDN solutions",
          "Stay updated with Shopify performance features",
        ],
        best_for: [
          "Stores with slow load times",
          "International e-commerce",
          "Image-heavy product catalogs",
          "Businesses focused on SEO",
        ],
      },
      image_url: "",
      href: "speed-optimization",
      category: "shopify-theme-development",
    },
    {
      id: 25,
      label: "App Integration",
      description: "Integrate third-party apps to enhance your Shopify store.",
      how_it_works:
        "Carefully selects and implements Shopify apps that add functionality while maintaining site performance and user experience.",
      business_implementation: {
        setup: [
          "Audit business needs",
          "Research app options",
          "Test compatibility",
          "Implement with customizations",
        ],
        optimization: [
          "Monitor app performance",
          "Consolidate overlapping functionality",
          "Customize app interfaces",
          "Stay updated with new app releases",
        ],
        best_for: [
          "Stores needing specific features",
          "Businesses scaling operations",
          "Niche e-commerce requirements",
          "Advanced functionality needs",
        ],
      },
      image_url: "",
      href: "app-integration",
      category: "shopify-theme-development",
    },
  ],
  "content-marketing": [
    {
      id: 26,
      label: "Blog Writing",
      description: "High-quality blog posts to engage your audience.",
      how_it_works:
        "Develops strategic, well-researched blog content that establishes thought leadership and drives organic traffic.",
      business_implementation: {
        setup: [
          "Conduct keyword research",
          "Develop content calendar",
          "Establish brand voice guidelines",
          "Set up editorial workflow",
        ],
        optimization: [
          "Analyze engagement metrics",
          "Update evergreen content",
          "Expand on high-performing topics",
          "Repurpose top content",
        ],
        best_for: [
          "B2B companies",
          "Niche expertise businesses",
          "Content-driven marketing funnels",
          "Brands building authority",
        ],
      },
      image_url: "",
      href: "blog-writing",
      category: "content-marketing",
    },
    {
      id: 27,
      label: "SEO Content Writing",
      description:
        "Content optimized for search engines to drive organic traffic.",
      how_it_works:
        "Creates content specifically designed to rank for target keywords while maintaining readability and value for human readers.",
      business_implementation: {
        setup: [
          "Conduct comprehensive keyword research",
          "Analyze search intent",
          "Develop content clusters",
          "Implement on-page SEO best practices",
        ],
        optimization: [
          "Monitor ranking progress",
          "Update content based on algorithm changes",
          "Expand top-performing pieces",
          "Internal linking optimization",
        ],
        best_for: [
          "Websites focusing on organic growth",
          "Competitive industries",
          "Long-term marketing strategies",
          "Businesses with educational content needs",
        ],
      },
      image_url: "",
      href: "seo-content-writing",
      category: "content-marketing",
    },
    {
      id: 28,
      label: "Video Script Writing",
      description: "Engaging scripts for your video content.",
      how_it_works:
        "Develops compelling video scripts tailored to platform requirements and audience preferences to maximize engagement.",
      business_implementation: {
        setup: [
          "Define video objectives",
          "Research target audience preferences",
          "Develop script templates",
          "Establish brand tone guidelines",
        ],
        optimization: [
          "Analyze viewer retention data",
          "Test different hooks and CTAs",
          "Adapt to platform algorithm changes",
          "Repurpose top-performing scripts",
        ],
        best_for: [
          "YouTube channel growth",
          "Social media video content",
          "Explainer videos",
          "Product demonstration content",
        ],
      },
      image_url: "",
      href: "video-script-writing",
      category: "content-marketing",
    },
    {
      id: 29,
      label: "Copywriting",
      description: "Compelling copy to drive conversions and sales.",
      how_it_works:
        "Creates persuasive, benefit-driven copy for websites, ads, and marketing materials designed to convert readers into customers.",
      business_implementation: {
        setup: [
          "Conduct customer research",
          "Identify key pain points",
          "Develop unique value propositions",
          "Create messaging hierarchy",
        ],
        optimization: [
          "A/B test different copy variations",
          "Analyze conversion data",
          "Refine based on customer feedback",
          "Update for market trends",
        ],
        best_for: [
          "Landing pages",
          "Advertising campaigns",
          "Email marketing",
          "Product descriptions",
        ],
      },
      image_url: "",
      href: "copywriting",
      category: "content-marketing",
    },
    {
      id: 30,
      label: "Content Strategy",
      description: "Strategic planning to align content with business goals.",
      how_it_works:
        "Develops comprehensive content roadmaps that align with business objectives, audience needs, and distribution channels.",
      business_implementation: {
        setup: [
          "Conduct audience research",
          "Perform content audit",
          "Map customer journey",
          "Develop channel-specific strategies",
        ],
        optimization: [
          "Regular performance reviews",
          "Adjust based on analytics",
          "Incorporate new content formats",
          "Realign with business goals",
        ],
        best_for: [
          "Businesses launching content programs",
          "Brands with disjointed content",
          "Companies scaling content production",
          "Integrated marketing strategies",
        ],
      },
      image_url: "",
      href: "content-strategy",
      category: "content-marketing",
    },
  ],
  "email-marketing": [
    {
      id: 31,
      label: "Email Campaign Management",
      description: "End-to-end management of your email marketing campaigns.",
      how_it_works:
        "Handles all aspects of email marketing from strategy and design to execution, analysis, and optimization.",
      business_implementation: {
        setup: [
          "Select email marketing platform",
          "Segment email lists",
          "Develop campaign calendar",
          "Set up tracking and analytics",
        ],
        optimization: [
          "Analyze open/click rates",
          "Test send times and frequencies",
          "Refine segmentation",
          "Personalize content",
        ],
        best_for: [
          "E-commerce businesses",
          "Lead nurturing",
          "Customer retention",
          "Promotional campaigns",
        ],
      },
      image_url: "",
      href: "email-campaign-management",
      category: "email-marketing",
    },
    {
      id: 32,
      label: "Newsletter Design",
      description:
        "Professionally designed newsletters to engage your audience.",
      how_it_works:
        "Creates visually appealing, brand-consistent email templates optimized for various devices and email clients.",
      business_implementation: {
        setup: [
          "Establish brand guidelines",
          "Design responsive templates",
          "Create modular content blocks",
          "Test across email clients",
        ],
        optimization: [
          "Monitor engagement by design elements",
          "Simplify layouts based on performance",
          "Update visual trends",
          "Personalize design variations",
        ],
        best_for: [
          "Regular newsletter senders",
          "Content publishers",
          "B2B communications",
          "Brand awareness campaigns",
        ],
      },
      image_url: "",
      href: "newsletter-design",
      category: "email-marketing",
    },
    {
      id: 33,
      label: "Automated Email Sequences",
      description: "Automated email workflows to nurture leads and customers.",
      how_it_works:
        "Builds trigger-based email sequences that automatically send based on user actions or predefined schedules.",
      business_implementation: {
        setup: [
          "Map customer journey",
          "Identify trigger points",
          "Develop sequence content",
          "Set up automation rules",
        ],
        optimization: [
          "Analyze sequence performance",
          "Test different delay times",
          "Personalize based on behavior",
          "Prune underperforming emails",
        ],
        best_for: [
          "Lead nurturing",
          "Onboarding sequences",
          "Abandoned cart recovery",
          "Customer re-engagement",
        ],
      },
      image_url: "",
      href: "automated-email-sequences",
      category: "email-marketing",
    },
    {
      id: 34,
      label: "Personalized Email Marketing",
      description: "Personalized email campaigns to increase engagement.",
      how_it_works:
        "Leverages customer data to deliver highly relevant, individualized email content at scale.",
      business_implementation: {
        setup: [
          "Integrate CRM/data sources",
          "Define personalization rules",
          "Create dynamic content blocks",
          "Establish data hygiene processes",
        ],
        optimization: [
          "Test personalization levels",
          "Refine segmentation",
          "Incorporate real-time data",
          "Balance automation with human touch",
        ],
        best_for: [
          "Businesses with rich customer data",
          "E-commerce product recommendations",
          "Localized marketing",
          "Customer loyalty programs",
        ],
      },
      image_url: "",
      href: "personalized-email-marketing",
      category: "email-marketing",
    },
    {
      id: 35,
      label: "A/B Testing & Optimization",
      description: "Test and optimize your email campaigns for better results.",
      how_it_works:
        "Systematically tests different email elements to identify the highest performing variations and continuously improve results.",
      business_implementation: {
        setup: [
          "Identify key test variables",
          "Establish testing methodology",
          "Set up tracking for reliable data",
          "Determine sample sizes",
        ],
        optimization: [
          "Implement winning variations",
          "Explore new test hypotheses",
          "Segment test results",
          "Document learnings",
        ],
        best_for: [
          "Mature email programs",
          "High-volume senders",
          "Conversion-focused campaigns",
          "Data-driven marketing teams",
        ],
      },
      image_url: "",
      href: "ab-testing-optimization",
      category: "email-marketing",
    },
  ],
}; //update inside content using this two "eco_services | shopify_services_data"

export const allCategories = [
  {
    key: "MetaAds",
    name: "Meta Ads",
    color: "#1D4ED8",
    category: "google-meta-ads",
  },
  {
    key: "GoogleAds",
    name: "Google Ads",
    color: "#F97316",
    category: "google-meta-ads",
  },
  { key: "SEO", name: "SEO", color: "#10B981", category: "seo" },
  {
    key: "ContentMarketing",
    name: "Content Marketing",
    color: "#8B5CF6",
    category: "content-marketing",
  },
  {
    key: "EmailMarketing",
    name: "Email Marketing",
    color: "#EF4444",
    category: "email-marketing",
  },
  {
    key: "WebDevelopment",
    name: "Web Development",
    color: "#3B82F6",
    category: "web-development",
  },
  {
    key: "SocialMedia",
    name: "Social Media Marketing",
    color: "#F59E0B",
    category: "social-media-marketing",
  },
  {
    key: "EcomSolutions",
    name: "E-commerce Solutions",
    color: "#6366F1",
    category: "shopify-theme-development",
  },
];
export const adPerformanceData = [
  {
    name: "Mar 24",
    MetaAds: 500,
    GoogleAds: 600,
    SEO: 300,
    ContentMarketing: 250,
    EmailMarketing: 200,
    WebDevelopment: 400,
    SocialMedia: 350,
    EcomSolutions: 450,
  },
  {
    name: "Apr 24",
    MetaAds: 400,
    GoogleAds: 450,
    SEO: 350,
    ContentMarketing: 270,
    EmailMarketing: 220,
    WebDevelopment: 420,
    SocialMedia: 370,
    EcomSolutions: 460,
  },
  {
    name: "May 24",
    MetaAds: 700,
    GoogleAds: 500,
    SEO: 400,
    ContentMarketing: 300,
    EmailMarketing: 250,
    WebDevelopment: 440,
    SocialMedia: 390,
    EcomSolutions: 480,
  },
  {
    name: "Jun 24",
    MetaAds: 600,
    GoogleAds: 550,
    SEO: 500,
    ContentMarketing: 350,
    EmailMarketing: 280,
    WebDevelopment: 460,
    SocialMedia: 420,
    EcomSolutions: 500,
  },
  {
    name: "Jul 24",
    MetaAds: 750,
    GoogleAds: 900,
    SEO: 600,
    ContentMarketing: 400,
    EmailMarketing: 320,
    WebDevelopment: 500,
    SocialMedia: 460,
    EcomSolutions: 550,
  },
  {
    name: "Aug 24",
    MetaAds: 1000,
    GoogleAds: 850,
    SEO: 750,
    ContentMarketing: 450,
    EmailMarketing: 350,
    WebDevelopment: 550,
    SocialMedia: 500,
    EcomSolutions: 600,
  },
  {
    name: "Sep 24",
    MetaAds: 1250,
    GoogleAds: 950,
    SEO: 900,
    ContentMarketing: 500,
    EmailMarketing: 400,
    WebDevelopment: 600,
    SocialMedia: 550,
    EcomSolutions: 650,
  },
  {
    name: "Oct 24",
    MetaAds: 1100,
    GoogleAds: 1200,
    SEO: 1100,
    ContentMarketing: 600,
    EmailMarketing: 450,
    WebDevelopment: 700,
    SocialMedia: 600,
    EcomSolutions: 700,
  },
  {
    name: "Nov 24",
    MetaAds: 1300,
    GoogleAds: 1000,
    SEO: 1300,
    ContentMarketing: 700,
    EmailMarketing: 500,
    WebDevelopment: 750,
    SocialMedia: 650,
    EcomSolutions: 750,
  },
  {
    name: "Dec 24",
    MetaAds: 1850,
    GoogleAds: 1100,
    SEO: 1550,
    ContentMarketing: 800,
    EmailMarketing: 550,
    WebDevelopment: 800,
    SocialMedia: 700,
    EcomSolutions: 800,
  },
  {
    name: "Jan 25",
    MetaAds: 1700,
    GoogleAds: 1650,
    SEO: 1800,
    ContentMarketing: 850,
    EmailMarketing: 600,
    WebDevelopment: 850,
    SocialMedia: 750,
    EcomSolutions: 850,
  },
  {
    name: "Feb 25",
    MetaAds: 2300,
    GoogleAds: 2000,
    SEO: 2100,
    ContentMarketing: 900,
    EmailMarketing: 650,
    WebDevelopment: 900,
    SocialMedia: 800,
    EcomSolutions: 900,
  },
];
// Data for the line chart
export const data = [
  { month: "Jun", SEO: 20, PPC: 5, SMM: 10 },
  { month: "Jul", SEO: 65, PPC: 45, SMM: 45 },
  { month: "Aug", SEO: 70, PPC: 70, SMM: 50 },
  { month: "Sep", SEO: 105, PPC: 120, SMM: 95 },
  { month: "Oct", SEO: 120, PPC: 140, SMM: 110 },
  { month: "Nov", SEO: 135, PPC: 160, SMM: 125 },
  { month: "Dec", SEO: 150, PPC: 180, SMM: 140 },
];

export const data_traffic = [
  { name: "Jan", traffic: 5000, revenue: 10000 },
  { name: "Feb", traffic: 8000, revenue: 15000 },
  { name: "Mar", traffic: 12000, revenue: 25000 },
  { name: "Apr", traffic: 10000, revenue: 22000 },
  { name: "May", traffic: 15000, revenue: 35000 },
  { name: "Jun", traffic: 20000, revenue: 50000 },
];

/*Online traffic Growth */
export const growth_traffic_data = {
  SEO: [
    { month: "Jun", value: 120 },
    { month: "Jul", value: 100 },
    { month: "Aug", value: 90 },
    { month: "Sep", value: 150 },
    { month: "Oct", value: 180 },
    { month: "Nov", value: 130 },
    { month: "Dec", value: 160 },
    { month: "Jan", value: 170 },
    { month: "Feb", value: 150 },
    { month: "Mar", value: 140 },
  ],
  "Social Media": [
    { month: "Jun", value: 80 },
    { month: "Jul", value: 110 },
    { month: "Aug", value: 140 },
    { month: "Sep", value: 160 },
    { month: "Oct", value: 150 },
    { month: "Nov", value: 100 },
    { month: "Dec", value: 120 },
    { month: "Jan", value: 100 },
    { month: "Feb", value: 130 },
    { month: "Mar", value: 170 },
  ],
  "PPC Ads": [
    { month: "Jun", value: 120 },
    { month: "Jul", value: 140 },
    { month: "Aug", value: 170 },
    { month: "Sep", value: 200 },
    { month: "Oct", value: 230 },
    { month: "Nov", value: 200 },
    { month: "Dec", value: 160 },
    { month: "Jan", value: 140 },
    { month: "Feb", value: 160 },
    { month: "Mar", value: 200 },
  ],
  "Content Marketing": [
    { month: "Jun", value: 70 },
    { month: "Jul", value: 90 },
    { month: "Aug", value: 110 },
    { month: "Sep", value: 130 },
    { month: "Oct", value: 150 },
    { month: "Nov", value: 170 },
    { month: "Dec", value: 190 },
    { month: "Jan", value: 90 },
    { month: "Feb", value: 110 },
    { month: "Mar", value: 130 },
  ],
};

export const benefits_data = [
  {
    icon: <SEOSVG height={36} width={36} color="#FFFFFF" />,
    title: "SEO",
    description:
      "Rank higher on search engines and drive organic traffic. Our SEO strategies ensure your website is optimized for visibility and performance.",
    svgTips:
      "Ensure the SVG is lightweight and uses semantic tags for better SEO. Add a `<title>` and `<desc>` for accessibility.",
  },
  {
    icon: <SocialMediaSVG height={36} width={36} color="#FFFFFF" />,
    title: "Social Media",
    description:
      "Engage your audience and build a loyal community. We create compelling social media strategies to boost your brand presence.",
    svgTips:
      "Use vibrant colors and scalable designs for social media platforms. Add hover effects for interactivity.",
  },
  {
    icon: <PPCAdsSVG height={36} width={36} color="#FFFFFF" />,
    title: "PPC Ads",
    description:
      "Get instant results with targeted ad campaigns. Our PPC experts maximize ROI through data-driven ad strategies.",
    svgTips:
      "Keep the design simple and focused. Use dynamic colors to match branding and ad themes.",
  },
  {
    icon: <ContentMarketingSVG height={36} width={36} color="#FFFFFF" />,
    title: "Content Marketing",
    description:
      "Attract and convert customers with valuable content. We craft content that resonates with your audience and drives conversions.",
    svgTips:
      "Use icons that represent content types (e.g., blogs, videos). Ensure the SVG is responsive for all devices.",
  },
];

export const customer_budget_range = [
  { label: "$0 - $50", value: "0-50" },
  { label: "$50 - $100", value: "50-100" },
  { label: "$100 - $200", value: "100-200" },
  { label: "$200 - $500", value: "200-500" },
  { label: "$500 - $1000", value: "500-1000" },
  { label: "$1000 - $2000", value: "1000-2000" },
  { label: "$2000 - $5000", value: "2000-5000" },
  { label: "$5000 - $10000", value: "5000-10000" },
  { label: "$10000+", value: "10000+" },
  { label: "Custom", value: "custom" },
  { label: "Not sure", value: "not-sure" },
];

export const customer_porject_timeline = [
  { label: "1 Day", value: "1-day" },
  { label: "2 Days", value: "2-days" },
  { label: "1 Week", value: "1-week" },
  { label: "2 Weeks", value: "2-weeks" },
  { label: "4 Weeks", value: "4-weeks" },
  { label: "1 Month", value: "1-month" },
  { label: "3 Months", value: "3-months" },
  { label: "6 Months", value: "6-months" },
  { label: "9 Months", value: "9-months" },
  { label: "12 Months", value: "12-months" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Custom", value: "custom" },
  { label: "Not sure", value: "not-sure" },
];
