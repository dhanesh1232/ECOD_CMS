import {
  FiBarChart2,
  FiCode,
  FiGithub,
  FiGlobe,
  FiLinkedin,
  FiMail,
  FiShoppingCart,
  FiTwitter,
} from "react-icons/fi";
import {
  SiCss3,
  SiExpress,
  SiGoogleads,
  SiHtml5,
  SiJavascript,
  SiMeta,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiShopify,
} from "react-icons/si";

export const testimonials = [
  {
    name: "John Doe",
    role: "CEO, TechCorp",
    quote:
      "Their team transformed our website into a high-performing platform. Highly recommended!",
    image: "",
    rating: 4,
  },
  {
    name: "Jane Smith",
    role: "Founder, EcoStore",
    quote:
      "The Shopify solutions they provided helped us double our sales in just 3 months.",
    image: "",
    rating: 5,
  },
  {
    name: "Alex Johnson",
    role: "Marketing Manager, BrightIdeas",
    quote:
      "Their SEO strategies brought us to the top of Google rankings. Amazing results!",
    image: "",
    rating: 4.5,
  },
  {
    name: "Michael Brown",
    role: "Director, FashionWave",
    quote:
      "Their social media marketing campaign skyrocketed our brand awareness!",
    image: "",
    rating: 4.7,
  },
  {
    name: "Emma Wilson",
    role: "E-Commerce Specialist, TrendyShop",
    quote:
      "Best Shopify theme customization service! Our conversions improved significantly.",
    image: "",
    rating: 4.8,
  },
];
export const home_about = {
  who_we_are: {
    title: "Who We Are",
    description:
      "ECOD is a full-service digital agency specializing in web development, e-commerce solutions, and digital marketing. Founded in 2024, we help businesses of all sizes establish a powerful online presence and achieve measurable growth.",
    mission:
      "To empower businesses with innovative, scalable, and results-driven digital solutions.",
    vision:
      "To be the most trusted digital partner for startups and enterprises worldwide.",
  },
  timeline: [
    {
      year: "2023",
      event: "Founded in Tirupati, India",
      description:
        "Started as a small web development team with a focus on Shopify and WordPress.",
    },
    {
      year: "2023",
      event: "Expanded to Digital Marketing",
      description: "Launched SEO, PPC, and social media marketing services.",
    },
    {
      year: "2024",
      event: "50+ Clients Served",
      description:
        "Worked with e-commerce brands, startups, and SMEs across 3 countries.",
    },
    {
      year: "2025",
      event: "Global Remote Team",
      description: "Expanded to a fully remote team of 10+ experts worldwide.",
    },
  ],
  values: [
    {
      title: "Transparency",
      icon: "🔍",
      description:
        "No hidden fees or surprises. We keep clients informed at every step.",
    },
    {
      title: "Innovation",
      icon: "💡",
      description:
        "We embrace cutting-edge tech to future-proof your business.",
    },
    {
      title: "Results-Driven",
      icon: "📈",
      description: "We measure success by your ROI, not just deliverables.",
    },
    {
      title: "Client-Centric",
      icon: "🤝",
      description:
        "Your goals are our priorities. We listen first, then execute.",
    },
  ],
  stats: [
    {
      value: "50+",
      label: "Projects Delivered",
    },
    {
      value: "93%",
      label: "Client Retention Rate",
    },
    {
      value: "4.5/5",
      label: "Average Client Rating",
    },
    {
      value: "40%",
      label: "Avg. Traffic Growth (SEO Clients)",
    },
  ],
  differentiators: [
    {
      title: "100% Focused Attention",
      icon: "🎯", // Or use icons from libraries like FontAwesome
      description:
        "As a solo practitioner, your project gets my undivided attention—no outsourcing or junior teams.",
    },
    {
      title: "Budget-Friendly",
      icon: "💰",
      description:
        "Lower overhead costs mean competitive pricing without compromising quality.",
    },
    {
      title: "Fast & Flexible",
      icon: "⚡",
      description:
        "Quick turnaround times and adaptable workflows tailored to your needs.",
    },
    {
      title: "Transparent Process",
      icon: "🔍",
      description: "Clear communication, regular updates, and no hidden fees.",
    },
  ],
  skills: [
    {
      category: "Development",
      items: ["Shopify", "WordPress", "React", "Next.js", "HTML/CSS"],
    },
    {
      category: "Digital Marketing",
      items: ["SEO", "Google Ads", "Meta Ads", "Social Media Marketing"],
    },
    {
      category: "Tools",
      items: ["Figma", "Google Analytics", "Canva"],
    },
  ],
  process: [
    {
      step: "1. Discover",
      description: "Free consultation to understand your goals and challenges.",
    },
    {
      step: "2. Plan",
      description: "Tailored proposal with timelines and deliverables.",
    },
    {
      step: "3. Execute",
      description: "Build, optimize, or market—with regular check-ins.",
    },
    {
      step: "4. Deliver & Support",
      description: "Launch + post-project support (e.g., 30-day bug fixes).",
    },
  ],
  vision: {
    title: "Where I’m Headed",
    goals: [
      "To build long-term partnerships, not just one-off projects.",
      "To specialize in [your niche, e.g., eco-friendly e-commerce stores].",
      "To eventually grow into a small, curated team of experts.",
    ],
  },
  cta: {
    title: "Let’s Build Something Great",
    subtitle:
      "I’m currently accepting Some new projects this month. Reach out to discuss yours!",
    buttons: {
      button_one: {
        text: "Get a Free Quote",
      },
      button_two: {
        text: "See My Skills",
        link: "/portfolio",
      },
    },
  },
};

// Portfolio Data

export const services = [
  {
    title: "Web Development",
    description: "Custom web apps with React, Next.js, and modern frameworks",
    icon: <SiReact className="text-4xl text-blue-600 dark:text-blue-400" />,
  },
  {
    title: "Shopify Development",
    description: "Custom store setups, theme development and app integrations",
    icon: <SiShopify className="text-4xl text-blue-600 dark:text-blue-400" />,
  },
  {
    title: "Email Marketing",
    description: "Convert more customers with strategic email campaigns",
    icon: <FiMail className="text-4xl text-blue-600 dark:text-blue-400" />,
  },
  {
    title: "Google Ads",
    description: "Drive targeted traffic with optimized Google ad campaigns",
    icon: <SiGoogleads className="text-4xl text-blue-600 dark:text-blue-400" />,
  },
  {
    title: "Meta Ads",
    description: "Facebook & Instagram advertising that converts",
    icon: <SiMeta className="text-4xl text-blue-600 dark:text-blue-400" />,
  },
  {
    title: "API Development",
    description: "RESTful API services with Node.js, Express and MongoDB",
    icon: <SiNodedotjs className="text-4xl text-blue-600 dark:text-blue-400" />,
  },
];

export const skills = [
  { name: "React", level: 90, icon: <SiReact className="text-2xl" /> },
  { name: "Next.js", level: 85, icon: <SiNextdotjs className="text-2xl" /> },
  { name: "Shopify", level: 88, icon: <SiShopify className="text-2xl" /> },
  {
    name: "Email Marketing",
    level: 80,
    icon: <FiMail className="text-2xl" />,
  },
  {
    name: "Google Ads",
    level: 75,
    icon: <SiGoogleads className="text-2xl" />,
  },
  { name: "Meta Ads", level: 78, icon: <SiMeta className="text-2xl" /> },
  { name: "Node.js", level: 85, icon: <SiNodedotjs className="text-2xl" /> },
  { name: "Express.js", level: 75, icon: <SiExpress className="text-2xl" /> },
  { name: "MongoDB", level: 80, icon: <SiMongodb className="text-2xl" /> },
  {
    name: "JavaScript",
    level: 95,
    icon: <SiJavascript className="text-2xl" />,
  },
  { name: "HTML5", level: 90, icon: <SiHtml5 className="text-2xl" /> },
  { name: "CSS3", level: 90, icon: <SiCss3 className="text-2xl" /> },
];

export const projects = [
  {
    title: "E-commerce Platform",
    description:
      "Built a custom e-commerce solution with React, Next.js and MongoDB",
    tags: ["React", "Next.js", "MongoDB"],
    link: "https://github.com/yourusername/ecommerce-project",
    liveLink: "https://ecom-demo.yoursite.com",
    icon: <FiShoppingCart className="text-5xl text-blue-500" />,
    metrics: "↑ 40% revenue growth",
  },
  {
    title: "Shopify Store",
    description: "Custom Shopify theme development for fashion retailer",
    tags: ["Shopify", "Liquid", "JavaScript"],
    link: "https://github.com/yourusername/shopify-project",
    icon: <SiShopify className="text-5xl text-blue-500" />,
    metrics: "↑ 25% conversion rate",
  },
  {
    title: "Email Campaign",
    description: "Converted 15% more leads with strategic email sequences",
    tags: ["Email Marketing", "Automation"],
    link: "#",
    icon: <FiMail className="text-5xl text-blue-500" />,
    metrics: "↑ 15% lead conversion",
  },
  {
    title: "Google Ads Strategy",
    description: "Reduced CAC by 30% with optimized Google Ads campaigns",
    tags: ["Google Ads", "PPC", "Conversion Tracking"],
    link: "#",
    icon: <SiGoogleads className="text-5xl text-blue-500" />,
    metrics: "↓ 30% customer acquisition cost",
  },
  {
    title: "Meta Ads Campaign",
    description: "Increased ROAS by 3x with targeted Facebook/Instagram ads",
    tags: ["Meta Ads", "Facebook", "Instagram"],
    link: "#",
    icon: <SiMeta className="text-5xl text-blue-500" />,
    metrics: "3x return on ad spend",
  },
  {
    title: "SAAS Dashboard",
    description: "Analytics dashboard for subscription business",
    tags: ["React", "Express.js", "Node.js"],
    link: "https://github.com/yourusername/saas-dashboard",
    liveLink: "https://saas-demo.yoursite.com",
    icon: <FiBarChart2 className="text-5xl text-blue-500" />,
    metrics: "50% faster insights",
  },
];

export const testimonials_port = [
  {
    quote:
      "Dhanesh delivered our e-commerce platform ahead of schedule and under budget. The results exceeded our expectations!",
    name: "Sarah Johnson",
    role: "CEO at RetailCo",
    avatar: "",
  },
  {
    quote:
      "The marketing campaigns Dhanesh created tripled our conversion rates in just 3 months. Highly recommended!",
    name: "Michael Chen",
    role: "Marketing Director at TechStart",
    avatar: "",
  },
];

export const navItems = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

import { v4 as uuidv4 } from "uuid";

const offers = [
  // ========================
  // WEB DEVELOPMENT OFFERS
  // ========================
  {
    id: uuidv4(),
    title: "🚀 Premium Website Package",
    getDescription: function () {
      return `Full-stack development with ${this.discount}% OFF + FREE 1-year hosting ($${this.value} value)`;
    },
    keywords: ["web development", "full-stack", "hosting"],
    discount: 20,
    value: 300,
    couponPrefix: "WEBPRO",
    validityDays: 30,
    serviceSlug: "web-development",
    badge: "BEST VALUE",
    features: [
      "Next.js/React Frontend",
      "Node.js Backend",
      "Responsive Design",
      "1 Year Hosting Included",
    ],
    urgency: "Only 3 spots left this month",
  },
  {
    id: uuidv4(),
    title: "⚡ Lightning Fast Optimization",
    getDescription: function () {
      return `90+ PageSpeed score or ${this.discount}% refund + FREE CDN setup`;
    },
    cta: "Speed Up My Site",
    keywords: ["performance", "optimization", "PageSpeed"],
    discount: 15,
    couponPrefix: "SPEED",
    validityDays: 14,
    serviceSlug: "web-development",
    guarantee: true,
    beforeAfter: true,
  },

  // ========================
  // SEO OFFERS
  // ========================
  {
    id: uuidv4(),
    title: "🔍 Comprehensive SEO Audit",
    getDescription: function () {
      return `FREE technical audit ($${this.auditValue} value) + ${this.discount}% OFF full optimization`;
    },
    cta: "Get Free Audit",
    keywords: ["SEO", "audit", "ranking"],
    discount: Math.floor(Math.random() * 15) + 15,
    auditValue: 499,
    couponPrefix: "SEO",
    validityDays: 7,
    serviceSlug: "seo",
    includes: [
      "Technical Analysis",
      "Keyword Research",
      "Competitor Report",
      "Action Plan",
    ],
    exampleReport: true,
  },
  {
    id: uuidv4(),
    title: "📈 SEO Growth Package",
    getDescription: function () {
      return `3-month strategy with ${this.discount}% OFF + FREE content optimization`;
    },
    cta: "Rank Higher",
    keywords: ["SEO", "content", "ranking"],
    discount: 20,
    couponPrefix: "SEOGROW",
    validityDays: 21,
    serviceSlug: "seo",
    duration: "3 months",
    caseStudy: "See 245% traffic increase case study",
  },

  // ========================
  // GOOGLE/META ADS OFFERS
  // ========================
  {
    id: uuidv4(),
    title: "📢 Google Ads Performance",
    getDescription: function () {
      return `$${this.adCredit} ad credit + ${this.discount}% OFF management fees`;
    },
    cta: "Claim Offer",
    keywords: ["Google Ads", "PPC", "advertising"],
    discount: 15,
    adCredit: 500,
    couponPrefix: "GOOGLE",
    validityDays: 5,
    serviceSlug: "google-meta-ads",
    highlight: "LIMITED TIME",
    platform: "Google Ads",
  },
  {
    id: uuidv4(),
    title: "📱 Meta Ads Pro Package",
    getDescription: function () {
      return `FREE creative strategy + ${this.discount}% OFF first campaign`;
    },
    cta: "Boost Sales",
    keywords: ["Meta Ads", "Facebook", "Instagram"],
    discount: 18,
    couponPrefix: "META",
    validityDays: 10,
    serviceSlug: "google-meta-ads",
    includes: [
      "Audience Targeting",
      "Ad Creative Design",
      "Performance Tracking",
    ],
    platform: "Meta",
  },

  // ========================
  // WHATSAPP AUTOMATION OFFERS
  // ========================
  {
    id: uuidv4(),
    title: "💬 WhatsApp Business Setup",
    getDescription: function () {
      return `Complete WhatsApp API setup with ${this.discount}% OFF + FREE template messages`;
    },
    cta: "Automate Now",
    keywords: ["WhatsApp", "automation", "chatbot"],
    discount: 25,
    couponPrefix: "WA",
    validityDays: 14,
    serviceSlug: "whatsapp-automation",
    features: [
      "API Integration",
      "5 Free Message Templates",
      "Auto-Reply Setup",
      "CRM Connection",
    ],
    integration: "Works with Shopify, WooCommerce",
  },
  {
    id: uuidv4(),
    title: "🤖 Advanced WhatsApp Flows",
    getDescription: function () {
      return `Complex chatbot flows with ${this.discount}% OFF + FREE 1-month support`;
    },
    cta: "Build Flow",
    keywords: ["WhatsApp", "chatbot", "automation"],
    discount: 20,
    couponPrefix: "WABOT",
    validityDays: 21,
    serviceSlug: "whatsapp-automation",
    includes: [
      "Multi-level Menu System",
      "Payment Integration",
      "Multilingual Support",
      "Analytics Dashboard",
    ],
    useCases: ["Order Tracking", "Customer Support", "Appointments"],
  },
  {
    id: uuidv4(),
    title: "📊 WhatsApp Marketing Blast",
    getDescription: function () {
      return `Send ${this.messageCount} messages with ${this.discount}% OFF + FREE contact segmentation`;
    },
    cta: "Start Campaign",
    keywords: ["WhatsApp", "marketing", "broadcast"],
    discount: 15,
    messageCount: 5000,
    couponPrefix: "WABLAST",
    validityDays: 7,
    serviceSlug: "whatsapp-automation",
    compliance: "100% WhatsApp Policy Compliant",
    targeting: "Geo, Behavior, Purchase History",
  },
];

// Enhanced coupon generator with expiry date encoded
const generateCouponCode = (offer) => {
  const serviceMap = {
    "web-development": "DEV",
    seo: "SEO",
    "google-meta-ads": "ADS",
    "whatsapp-automation": "WA",
  };

  const prefix = serviceMap[offer.serviceSlug] || "OFFER";
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);

  const expiryDay = String(
    new Date(Date.now() + offer.validityDays * 24 * 60 * 60 * 1000).getDate()
  ).padStart(2, "0");
  const expiryMonth = String(
    new Date(Date.now() + offer.validityDays * 24 * 60 * 60 * 1000).getMonth() +
      1
  ).padStart(2, "0");

  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomPart = "";

  for (let i = 0; i < 3; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `${prefix}${month}${day}-${expiryMonth}${expiryDay}-${randomPart}`;
};

// Smart offer selector with popularity weighting
export const getRandomOffer = (serviceFilter = null) => {
  const filteredOffers = serviceFilter
    ? offers.filter((offer) => offer.serviceSlug === serviceFilter)
    : offers;

  if (filteredOffers.length === 0) return null;

  // Add weighting based on urgency and discount
  const weightedOffers = filteredOffers.map((offer) => {
    let weight = 1;
    if (offer.validityDays <= 7) weight *= 2; // Urgent offers
    if (offer.discount >= 20) weight *= 1.5; // High discounts
    if (offer.badge) weight *= 1.3; // Badged offers
    return { ...offer, weight };
  });

  // Calculate total weight
  const totalWeight = weightedOffers.reduce(
    (sum, offer) => sum + offer.weight,
    0
  );

  // Select random offer with weighting
  let random = Math.random() * totalWeight;
  let selectedOffer;
  for (const offer of weightedOffers) {
    if (random < offer.weight) {
      selectedOffer = offer;
      break;
    }
    random -= offer.weight;
  }

  return {
    ...selectedOffer,
    description: selectedOffer.getDescription(),
    couponCode: generateCouponCode(selectedOffer),
    expiresAt: new Date(
      Date.now() + selectedOffer.validityDays * 24 * 60 * 60 * 1000
    ),
    isNew: selectedOffer.validityDays <= 7,
    isPopular: selectedOffer.weight > 1.5,
    discount: String(selectedOffer.discount),
  };
};

export const contact_data = {
  name: "Dhanesh M",
  email: "dhaneshreddy980@gmail.com",
  linked_id: "https://www.linkedin.com/in/mekalthuru-dhanesh-5baa9323b/",
  git_hub: "https://github.com/dhanesh1232",
  x: "",
};
// Social links
export const socialLinks = [
  {
    icon: <FiGithub />,
    label: "GitHub",
    link: `${contact_data.git_hub}`,
  },
  {
    icon: <FiLinkedin />,
    label: "LinkedIn",
    link: `${contact_data.linked_id}`,
  },
  {
    icon: <FiTwitter />,
    label: "Twitter",
    link: "https://twitter.com/yourhandle",
  },
];
export const experiences = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "Freelance Project",
    duration: "2022 - Present",
    description:
      "Led development of scalable web applications using React, Node.js, and MongoDB. Delivered complete e-commerce platforms, integrated secure payment systems, and optimized performance for SEO and mobile responsiveness.",
    icon: <FiCode className="text-blue-500" />,
  },
  {
    id: 2,
    role: "Digital Marketing Specialist",
    company: "Freelance/Contract Work",
    duration: "2021 - 2022",
    description:
      "Managed high-budget Google and Facebook ad campaigns with over $50k in monthly spend. Increased client ROI by 35% through strategic targeting, creative optimization, and performance tracking. Also supported email marketing and funnel optimization.",
    icon: <FiBarChart2 className="text-blue-500" />,
  },
  {
    id: 3,
    role: "Web Developer Intern",
    company: "Volunteer Project",
    duration: "2022 - 2023",
    description:
      "Contributed to building responsive websites for non-profit and small local businesses. Developed skills in HTML, CSS, JavaScript, and WordPress. Gained foundational experience in both web development and digital marketing.",
    icon: <FiGlobe className="text-blue-500" />,
  },
];
