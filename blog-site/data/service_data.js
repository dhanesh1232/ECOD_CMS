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
      category: "web-apps",
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
      category: "web-apps",
    },
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
      category: "web-apps",
    },
    {
      id: 4,
      label: "Enterprise Web Applications",
      description:
        "Scalable, secure business solutions with complex workflows and integrations.",
      deliverables: [
        "Role-based access control (RBAC)",
        "Audit logging system",
        "API gateway setup",
        "Database schema + migration scripts",
        "CI/CD pipeline (AWS/Azure)",
        "Disaster recovery plan",
      ],
      image_url: "",
      href: "enterprise-web-apps",
      category: "web-apps",
    },
    {
      id: 5,
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
      category: "web-apps",
    },
  ],
  "google-meta-ads": [
    {
      id: 6,
      label: "Search Ads",
      description: "Targeted search ads to reach your audience on Google.",
      image_url: "",
      href: "search-ads",
      category: "google-ads",
    },
    {
      id: 7,
      label: "Display Ads",
      description:
        "Visually appealing display ads to increase brand visibility.",
      image_url: "",
      href: "display-ads",
      category: "google-ads",
    },
    {
      id: 8,
      label: "Remarketing",
      description: "Re-engage visitors and convert them into customers.",
      image_url: "",
      href: "remarketing",
      category: "google-ads",
    },
    {
      id: 9,
      label: "YouTube Ads",
      description: "Video ads to capture attention on YouTube.",
      image_url: "",
      href: "youtube-ads",
      category: "google-ads",
    },
    {
      id: 10,
      label: "Google Shopping Ads",
      description: "Promote your products directly on Google Shopping.",
      image_url: "",
      href: "google-shopping-ads",
      category: "google-ads",
    },
    {
      id: 11,
      label: "Facebook Ads",
      description: "Run high-performing ad campaigns on Facebook.",
      image_url: "",
      href: "facebook-ads",
      category: "meta-ads",
    },
    {
      id: 12,
      label: "Instagram Ads",
      description: "Target your audience with visually engaging Instagram ads.",
      image_url: "",
      href: "instagram-ads",
      category: "meta-ads",
    },
    {
      id: 13,
      label: "Messenger Ads",
      description: "Directly connect with customers using Messenger ads.",
      image_url: "",
      href: "messenger-ads",
      category: "meta-ads",
    },
    {
      id: 14,
      label: "Audience Targeting",
      description:
        "Reach the right audience with advanced targeting strategies.",
      image_url: "",
      href: "audience-targeting",
      category: "meta-ads",
    },
  ],
  seo: [
    {
      id: 11,
      label: "On-Page SEO",
      description:
        "Optimize your website's content and structure for better rankings.",
      image_url: "",
      href: "on-page-seo",
      category: "seo",
    },
    {
      id: 12,
      label: "Off-Page SEO",
      description:
        "Build authority and backlinks to improve your site's visibility.",
      image_url: "",
      href: "off-page-seo",
      category: "seo",
    },
    {
      id: 13,
      label: "Technical SEO",
      description:
        "Enhance your website's technical performance for search engines.",
      image_url: "",
      href: "technical-seo",
      category: "seo",
    },
    {
      id: 14,
      label: "Local SEO",
      description: "Boost your visibility in local search results.",
      image_url: "",
      href: "local-seo",
      category: "seo",
    },
    {
      id: 15,
      label: "SEO Audits & Reporting",
      description:
        "Comprehensive audits and reports to track your SEO performance.",
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
      image_url: "",
      href: "facebook-instagram-ads",
      category: "social-media-marketing",
    },
    {
      id: 17,
      label: "Content Creation",
      description: "Engaging content tailored for your social media platforms.",
      image_url: "",
      href: "content-creation",
      category: "social-media-marketing",
    },
    {
      id: 18,
      label: "Influencer Marketing",
      description: "Leverage influencers to amplify your brand's reach.",
      image_url: "",
      href: "influencer-marketing",
      category: "social-media-marketing",
    },
    {
      id: 19,
      label: "Community Management",
      description: "Build and engage with your online community.",
      image_url: "",
      href: "community-management",
      category: "social-media-marketing",
    },
    {
      id: 20,
      label: "Social Media Strategy",
      description: "Data-driven strategies to grow your social media presence.",
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
      image_url: "",
      href: "custom-shopify-theme-design",
      category: "shopify-theme-development",
    },
    {
      id: 22,
      label: "Theme Customization",
      description: "Customize existing Shopify themes to fit your needs.",
      image_url: "",
      href: "theme-customization",
      category: "shopify-theme-development",
    },
    {
      id: 23,
      label: "Mobile-Optimized Themes",
      description: "Themes designed for seamless mobile experiences.",
      image_url: "",
      href: "mobile-optimized-themes",
      category: "shopify-theme-development",
    },
    {
      id: 24,
      label: "Speed Optimization",
      description: "Optimize your Shopify store for faster loading times.",
      image_url: "",
      href: "speed-optimization",
      category: "shopify-theme-development",
    },
    {
      id: 25,
      label: "App Integration",
      description: "Integrate third-party apps to enhance your Shopify store.",
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
      image_url: "",
      href: "blog-writing",
      category: "content-marketing",
    },
    {
      id: 27,
      label: "SEO Content Writing",
      description:
        "Content optimized for search engines to drive organic traffic.",
      image_url: "",
      href: "seo-content-writing",
      category: "content-marketing",
    },
    {
      id: 28,
      label: "Video Script Writing",
      description: "Engaging scripts for your video content.",
      image_url: "",
      href: "video-script-writing",
      category: "content-marketing",
    },
    {
      id: 29,
      label: "Copywriting",
      description: "Compelling copy to drive conversions and sales.",
      image_url: "",
      href: "copywriting",
      category: "content-marketing",
    },
    {
      id: 30,
      label: "Content Strategy",
      description: "Strategic planning to align content with business goals.",
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
      image_url: "",
      href: "email-campaign-management",
      category: "email-marketing",
    },
    {
      id: 32,
      label: "Newsletter Design",
      description:
        "Professionally designed newsletters to engage your audience.",
      image_url: "",
      href: "newsletter-design",
      category: "email-marketing",
    },
    {
      id: 33,
      label: "Automated Email Sequences",
      description: "Automated email workflows to nurture leads and customers.",
      image_url: "",
      href: "automated-email-sequences",
      category: "email-marketing",
    },
    {
      id: 34,
      label: "Personalized Email Marketing",
      description: "Personalized email campaigns to increase engagement.",
      image_url: "",
      href: "personalized-email-marketing",
      category: "email-marketing",
    },
    {
      id: 35,
      label: "A/B Testing & Optimization",
      description: "Test and optimize your email campaigns for better results.",
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
