// utils/dataHelpers.js
export const generateLiveData = () => {
  const now = new Date();
  const currentMonth = now.toLocaleString("default", { month: "short" });
  const currentYear = now.getFullYear();
  const dateKey = `${currentMonth} ${currentYear}`;

  // Simulate daily fluctuations (±5%)
  const dailyFluctuation = 1 + (Math.random() * 0.1 - 0.05);

  return {
    pieData: [
      {
        name: "Meta Ads",
        value: Math.round(487 * dailyFluctuation),
        fill: "#1877F2",
        trend: `${Math.round(Math.random() * 5 + 6)}%`,
        cost: Math.round(2450 * dailyFluctuation),
        conversions: Math.round(92 * dailyFluctuation),
        roi: (3.8 * dailyFluctuation).toFixed(1),
        lastUpdated: new Date().toISOString(),
      },
      {
        name: "Google Ads",
        value: Math.round(402 * dailyFluctuation),
        fill: "#4285F4",
        trend: `${Math.round(Math.random() * 3 + 4)}%`,
        cost: Math.round(3100 * dailyFluctuation),
        conversions: Math.round(87 * dailyFluctuation),
        roi: (2.9 * dailyFluctuation).toFixed(1),
        lastUpdated: new Date().toISOString(),
      },
      {
        name: "Organic Traffic",
        value: Math.round(387 * dailyFluctuation),
        fill: "#0F9D58",
        trend: `${Math.round(Math.random() * 7 + 9)}%`,
        cost: Math.round(1800 * dailyFluctuation),
        conversions: Math.round(105 * dailyFluctuation),
        roi: (5.1 * dailyFluctuation).toFixed(1),
        lastUpdated: new Date().toISOString(),
      },
      {
        name: "Email",
        value: Math.round(215 * dailyFluctuation),
        fill: "#EA4335",
        trend: `${Math.round(Math.random() * 2 + 2)}%`,
        cost: Math.round(950 * dailyFluctuation),
        conversions: Math.round(48 * dailyFluctuation),
        roi: (4.3 * dailyFluctuation).toFixed(1),
        lastUpdated: new Date().toISOString(),
      },
      {
        name: "Social Media",
        value: Math.round(278 * dailyFluctuation),
        fill: "#E1306C",
        trend: `${Math.round(Math.random() * 10 + 15)}%`,
        cost: Math.round(1200 * dailyFluctuation),
        conversions: Math.round(63 * dailyFluctuation),
        roi: (4.9 * dailyFluctuation).toFixed(1),
        lastUpdated: new Date().toISOString(),
      },
    ],
    radarData: [
      {
        subject: "Meta Ads",
        current: Math.round(137 * dailyFluctuation),
        benchmark: 118,
        target: 150,
        trend: `${Math.round(Math.random() * 5 + 10)}%`,
        efficiency: (0.92 * dailyFluctuation).toFixed(2),
        quarter: `Q${Math.floor(now.getMonth() / 3) + 1} ${currentYear}`,
      },
      {
        subject: "Google Ads",
        current: Math.round(142 * dailyFluctuation),
        benchmark: 125,
        target: 150,
        trend: `${Math.round(Math.random() * 3 + 7)}%`,
        efficiency: (0.88 * dailyFluctuation).toFixed(2),
        quarter: `Q${Math.floor(now.getMonth() / 3) + 1} ${currentYear}`,
      },
      {
        subject: "SEO",
        current: Math.round(128 * dailyFluctuation),
        benchmark: 105,
        target: 150,
        trend: `${Math.round(Math.random() * 7 + 12)}%`,
        efficiency: (0.95 * dailyFluctuation).toFixed(2),
        quarter: `Q${Math.floor(now.getMonth() / 3) + 1} ${currentYear}`,
      },
      {
        subject: "Social Media",
        current: Math.round(113 * dailyFluctuation),
        benchmark: 98,
        target: 150,
        trend: `${Math.round(Math.random() * 10 + 18)}%`,
        efficiency: (0.85 * dailyFluctuation).toFixed(2),
        quarter: `Q${Math.floor(now.getMonth() / 3) + 1} ${currentYear}`,
      },
      {
        subject: "Email",
        current: Math.round(104 * dailyFluctuation),
        benchmark: 92,
        target: 150,
        trend: `${Math.round(Math.random() * 2 + 4)}%`,
        efficiency: (0.78 * dailyFluctuation).toFixed(2),
        quarter: `Q${Math.floor(now.getMonth() / 3) + 1} ${currentYear}`,
      },
      {
        subject: "Content Marketing",
        current: Math.round(121 * dailyFluctuation),
        benchmark: 87,
        target: 150,
        trend: `${Math.round(Math.random() * 8 + 15)}%`,
        efficiency: (0.91 * dailyFluctuation).toFixed(2),
        quarter: `Q${Math.floor(now.getMonth() / 3) + 1} ${currentYear}`,
      },
    ],
    metadata: {
      generatedAt: new Date().toISOString(),
      dataVersion: "2.1",
      currency: "USD",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  };
};

// data/shopify.js
export const { pieData, radarData } = generateLiveData();

export const salesData = [
  { month: "Jun", sales: 500 },
  { month: "Jul", sales: 800 },
  { month: "Aug", sales: 1200 },
  { month: "Sep", sales: 1500 },
  { month: "Oct", sales: 1800 },
  { month: "Nov", sales: 2200 },
  { month: "Dec", sales: 3000 },
];

export const conversionData = [
  { month: "Jun", rate: 1.5 },
  { month: "Jul", rate: 2.0 },
  { month: "Aug", rate: 2.5 },
  { month: "Sep", rate: 3.0 },
  { month: "Oct", rate: 3.5 },
  { month: "Nov", rate: 4.0 },
  { month: "Dec", rate: 4.5 },
];

export const experties_data = [
  {
    image_url: "",
    name: "Dhanesh",
    role: "Shopify Developer & E-Commerce Consultant",
    description:
      "Specializing in Shopify development, Dhanesh helps businesses build high-converting online stores, optimize performance, and integrate advanced e-commerce solutions.",
    rating: 4.8, // Star rating (out of 5)
    expertise_percentage: 95, // Expertise level (0-100%)
    social: [
      { icon: "twitter", slug: "https://twitter.com/dhane_sharma" },
      { icon: "instagram", slug: "https://www.instagram.com/dhane_sharma/" },
      { icon: "facebook", slug: "https://www.facebook.com/dhane.sharma" },
      {
        icon: "linkedin",
        slug: "https://www.linkedin.com/in/dhane-sharma-9b79731b8/",
      },
    ],
  },
  {
    image_url: "",
    name: "John Doe",
    role: "SEO Specialist & Digital Growth Strategist",
    description:
      "John is an SEO expert with a deep understanding of search engine algorithms, content optimization, and technical SEO strategies to drive organic traffic and business growth.",
    rating: 4.7,
    expertise_percentage: 92,
    social: [
      { icon: "twitter", slug: "https://twitter.com/johndoe" },
      { icon: "instagram", slug: "https://www.instagram.com/johndoe/" },
      { icon: "facebook", slug: "https://www.facebook.com/john.doe" },
      {
        icon: "linkedin",
        slug: "https://www.linkedin.com/in/john-doe-1989b91b",
      },
    ],
  },
  {
    image_url: "",
    name: "Jane Smith",
    role: "Digital Marketing Expert & Branding Strategist",
    description:
      "Jane specializes in digital marketing strategies, including social media campaigns, PPC ads, and brand development to enhance online presence and customer engagement.",
    rating: 4.9,
    expertise_percentage: 97,
    social: [
      { icon: "twitter", slug: "https://twitter.com/janesmith" },
      { icon: "instagram", slug: "https://www.instagram.com/janesmith/" },
      { icon: "facebook", slug: "https://www.facebook.com/janesmith" },
      {
        icon: "linkedin",
        slug: "https://www.linkedin.com/in/janesmith-1989b91b",
      },
    ],
  },
  {
    image_url: "",
    name: "Alex Johnson",
    role: "E-Commerce Strategist & Conversion Optimization Specialist",
    description:
      "Alex focuses on developing and optimizing e-commerce strategies, improving conversion rates, and implementing data-driven marketing techniques for online businesses.",
    rating: 4.6,
    expertise_percentage: 90,
    social: [
      { icon: "twitter", slug: "https://twitter.com/alexjohnson" },
      { icon: "instagram", slug: "https://www.instagram.com/alexjohnson/" },
      { icon: "facebook", slug: "https://www.facebook.com/alex.johnson" },
      {
        icon: "linkedin",
        slug: "https://www.linkedin.com/in/alex-johnson-1989b91b",
      },
    ],
  },
  {
    image_url: "",
    name: "Emma Wilson",
    role: "E-Commerce Specialist & UX/UI Consultant",
    description:
      "Emma provides expertise in e-commerce management and UX/UI design, ensuring seamless user experiences, improved customer retention, and high-performing websites.",
    rating: 4.8,
    expertise_percentage: 94,
    social: [
      { icon: "twitter", slug: "https://twitter.com/emmawilson" },
      { icon: "instagram", slug: "https://www.instagram.com/emmawilson/" },
      { icon: "facebook", slug: "https://www.facebook.com/emma.wilson" },
      {
        icon: "linkedin",
        slug: "https://www.linkedin.com/in/emma-wilson-1989b91b",
      },
    ],
  },
  {
    image_url: "",
    name: "ECOD",
    role: "Customer Support Specialist & Client Relations Expert",
    description:
      "ECOD excels in customer support services, ensuring seamless communication, problem resolution, and customer satisfaction for e-commerce and digital businesses.",
    rating: 4.5,
    expertise_percentage: 88,
    social: [
      { icon: "twitter", slug: "https://twitter.com/ecod_digital" },
      { icon: "instagram", slug: "https://www.instagram.com/ecod_digital/" },
      { icon: "facebook", slug: "https://www.facebook.com/ecoddigital" },
      {
        icon: "linkedin",
        slug: "https://www.linkedin.com/company/ecod-digital/",
      },
    ],
  },
];

export const shopifyServicesContent = {
  "custom-themes": {
    title: "Custom Shopify Theme Development",
    seoTitle: "Bespoke Shopify Themes | Mobile-Optimized & Conversion-Focused",
    description: "Tailored store designs that convert visitors into customers",
    seoDescription:
      "Professional custom Shopify themes with strategic UX, mobile optimization, and 90+ Lighthouse scores. 30-day support included.",
    keywords: [
      "custom shopify themes",
      "shopify design",
      "conversion-focused themes",
    ],
    icon: "/icons/theme-design.svg",
    heroImage: "/images/custom-themes-hero.jpg",
    content: [
      {
        sectionTitle: "Why Custom Themes Outperform Templates",
        sectionContent: {
          introduction:
            "While Shopify offers quality pre-built themes, they often lack the strategic design elements that drive conversions.",
          features: [
            {
              title: "Psychological Triggers",
              description:
                "Color psychology and visual hierarchy optimized for conversions",
              icon: "/icons/psychology.svg",
            },
            {
              title: "Mobile-First Design",
              description:
                "Responsive designs that adapt perfectly to all devices",
              icon: "/icons/mobile.svg",
            },
            {
              title: "Strategic Placement",
              description:
                "Optimized positioning of trust signals and conversion elements",
              icon: "/icons/placement.svg",
            },
          ],
        },
        stats: [
          { value: "47%", label: "Average increase in mobile conversions" },
          { value: "1.8s", label: "Average load time (vs 3.5s for templates)" },
          { value: "22%", label: "Higher average order value" },
        ],
        caseStudy: {
          client: "Fashion Retailer",
          results: [
            "47% increase in mobile conversions",
            "Bounce rate reduced by 32%",
          ],
          solution: "Thumb-friendly navigation + quick-view functionality",
          image: "/images/case-study-fashion.jpg",
        },
      },
      {
        sectionTitle: "Our Theme Development Process",
        processSteps: [
          {
            name: "Discovery",
            icon: "/icons/discovery.svg",
            details: "2-hour workshop to map your customer journey",
            duration: "1-2 days",
          },
          {
            name: "Prototyping",
            icon: "/icons/prototype.svg",
            details: "Interactive Figma mockups with real content",
            duration: "3-5 days",
          },
        ],
        technicalSpecs: {
          foundation: "Shopify's Dawn theme",
          components: [
            "Custom Liquid templates",
            "WebP image optimization",
            "Dynamic AJAX cart",
          ],
          performance: {
            target: "<2s load time",
            metrics: ["90+ Lighthouse score", "Core Web Vitals optimized"],
          },
        },
      },
    ],
    pricing: {
      packages: [
        {
          name: "Starter",
          price: "$4,500",
          includes: [
            "5 template pages",
            "Basic customization",
            "Mobile-responsive design",
          ],
          bestFor: "New stores with standard needs",
        },
      ],
    },
  },
  "store-setup": {
    title: "Complete Shopify Store Setup",
    seoTitle: "Professional Shopify Store Setup | Done in 72 Hours",
    description: "Launch-ready Shopify stores in 72 hours or less",
    seoDescription:
      "End-to-end Shopify configuration with product imports, payment gateways, and migration services. 100% satisfaction guarantee.",
    keywords: ["shopify setup", "store migration", "ecommerce launch"],
    icon: "/icons/store-setup.svg",
    heroImage: "/images/store-setup-hero.jpg",
    content: [
      {
        sectionTitle: "End-to-End Store Configuration",
        checklist: [
          {
            category: "Products",
            items: [
              {
                name: "Product catalog setup",
                details: "Collections, tags, variants with inventory tracking",
                icon: "/icons/products.svg",
              },
            ],
          },
          {
            category: "Payments",
            items: [
              {
                name: "Payment gateways",
                details: "Shopify Payments, Stripe, PayPal configuration",
                icon: "/icons/payment.svg",
              },
            ],
          },
        ],
        timeline: {
          phases: [
            {
              name: "Phase 1: Core Setup",
              duration: "24 hours",
              tasks: ["Basic configuration", "Theme installation"],
            },
            {
              name: "Phase 2: Testing",
              duration: "48 hours",
              tasks: ["Functionality checks", "Payment testing"],
            },
          ],
          guarantee: "72-hour completion guarantee",
        },
      },
      {
        sectionTitle: "Migration Services",
        migrationOptions: [
          {
            platform: "WooCommerce",
            icon: "/icons/woocommerce.svg",
            preserved: [
              { item: "Products", icon: "/icons/product.svg" },
              { item: "Customers", icon: "/icons/customer.svg" },
              { item: "SEO URLs", icon: "/icons/seo.svg" },
            ],
          },
        ],
        warning: {
          text: "DIY migrations risk data loss",
          solution: "We use Shopify's API with validation checks",
          icon: "/icons/warning.svg",
        },
      },
    ],
  },
  "one-click-checkout": {
    title: "Checkout Optimization",
    seoTitle: "Shopify Checkout Optimization | Reduce Abandonment by 40%",
    description: "Reduce cart abandonment and increase conversions",
    seoDescription:
      "Professional checkout optimization with Shop Pay, address autocomplete and trust signals. 30-day performance guarantee.",
    keywords: ["shopify checkout", "cart abandonment", "conversion rate"],
    icon: "/icons/checkout.svg",
    heroImage: "/images/checkout-hero.jpg",
    content: [
      {
        sectionTitle: "The Psychology of Streamlined Checkout",
        optimizationStats: [
          { value: "25-40%", label: "Reduction in abandonment" },
          { value: "20%", label: "Faster checkout time" },
          { value: "15-30%", label: "Higher completion rate" },
        ],
        techniques: [
          {
            name: "Shop Pay",
            impact: "1.2s average load time",
            icon: "/icons/shop-pay.svg",
          },
          {
            name: "Address autocomplete",
            impact: "Reduces errors by 62%",
            icon: "/icons/address.svg",
          },
        ],
      },
    ],
  },
  "mobile-optimization": {
    title: "Mobile Commerce Optimization",
    seoTitle: "Mobile Shopify Optimization | Dominate Mobile Traffic",
    description: "Dominate the 68% of traffic coming from mobile devices",
    seoDescription:
      "Thumb-friendly mobile optimization with AMP support and device-specific loading. 45-day performance guarantee.",
    keywords: ["mobile shopify", "responsive design", "mobile conversions"],
    icon: "/icons/mobile.svg",
    heroImage: "/images/mobile-hero.jpg",
    content: [
      {
        sectionTitle: "Mobile-First Design Principles",
        caseStudy: {
          client: "Beauty Brand",
          results: [
            { metric: "Bounce rate", before: "72%", after: "41%" },
            { metric: "Pages/session", before: "2.1", after: "3.8" },
            { metric: "Conversions", change: "+89%" },
          ],
          techniques: [
            {
              name: "Floating action buttons",
              icon: "/icons/tap.svg",
            },
            {
              name: "Swipeable galleries",
              icon: "/icons/swipe.svg",
            },
          ],
        },
      },
    ],
  },
  "performance-optimization": {
    title: "Store Performance Tuning",
    seoTitle: "Shopify Speed Optimization | 90+ Lighthouse Scores",
    description: "Lightning-fast loading speeds for higher conversions",
    seoDescription:
      "Professional Shopify performance optimization with WebP, CDN and critical CSS. 60-day performance guarantee.",
    keywords: ["shopify speed", "page load time", "core web vitals"],
    icon: "/icons/performance.svg",
    heroImage: "/images/performance-hero.jpg",
    content: [
      {
        sectionTitle: "Why Speed Matters",
        speedImpact: [
          { stat: "53%", description: "of visitors abandon sites loading >3s" },
          {
            stat: "+1.2%",
            description: "conversion increase per 0.1s improvement",
          },
        ],
        techniques: [
          {
            name: "Critical CSS inlining",
            icon: "/icons/css.svg",
          },
          {
            name: "JavaScript bundle splitting",
            icon: "/icons/js.svg",
          },
        ],
      },
    ],
  },
  security: {
    title: "Ecommerce Security",
    seoTitle: "Shopify Security | PCI Compliance & Fraud Prevention",
    description: "Protect your store and customer data",
    seoDescription:
      "Complete Shopify security with SSL, 2FA, and fraud prevention systems. Ongoing monitoring included.",
    keywords: ["shopify security", "pci compliance", "fraud prevention"],
    icon: "/icons/security.svg",
    heroImage: "/images/security-hero.jpg",
    content: [
      {
        sectionTitle: "Comprehensive Security Framework",
        features: [
          {
            name: "SSL configuration",
            detail: "256-bit encryption",
            icon: "/icons/ssl.svg",
          },
          {
            name: "Fraud analysis",
            detail: "Real-time order scoring",
            icon: "/icons/fraud.svg",
          },
        ],
      },
    ],
  },
  seo: {
    title: "Shopify SEO",
    seoTitle: "Shopify SEO Services | Rank Higher in Search",
    description: "Rank higher and attract organic traffic",
    seoDescription:
      "Professional Shopify SEO with technical audits, content optimization and schema markup. Monthly reporting included.",
    keywords: ["shopify seo", "product schema", "ecommerce seo"],
    icon: "/icons/seo.svg",
    heroImage: "/images/seo-hero.jpg",
    content: [
      {
        sectionTitle: "Technical SEO Foundation",
        quickWins: [
          {
            name: "Fix duplicate meta tags",
            impact: "High",
            icon: "/icons/tag.svg",
          },
          {
            name: "Add alt text to images",
            impact: "Medium",
            icon: "/icons/image.svg",
          },
        ],
        tools: [
          {
            name: "Google Search Console",
            icon: "/icons/google.svg",
          },
          {
            name: "Ahrefs",
            icon: "/icons/ahrefs.svg",
          },
        ],
      },
    ],
  },
  "email-marketing": {
    title: "Email Marketing Automation",
    seoTitle: "Shopify Email Marketing | Automated Revenue Streams",
    description: "Convert visitors into repeat customers",
    seoDescription:
      "Automated Shopify email flows for welcome series, abandoned carts and win-back campaigns. Performance tracking included.",
    keywords: ["shopify email", "abandoned cart", "email automation"],
    icon: "/icons/email.svg",
    heroImage: "/images/email-hero.jpg",
    content: [
      {
        sectionTitle: "Revenue-Generating Email Flows",
        flows: [
          {
            type: "Welcome series",
            roi: "5-8x",
            icon: "/icons/welcome.svg",
          },
          {
            type: "Abandoned cart",
            recovery: "25-40%",
            icon: "/icons/cart.svg",
          },
        ],
        features: [
          {
            name: "Purchase behavior segmentation",
            icon: "/icons/segmentation.svg",
          },
          {
            name: "Dynamic product recommendations",
            icon: "/icons/recommendations.svg",
          },
        ],
      },
    ],
  },
};
