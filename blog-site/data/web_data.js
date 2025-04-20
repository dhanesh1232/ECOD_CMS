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
// Offer data
export const offers = [
  // Web Development Offers
  {
    id: uuidv4(),
    title: "⚡ Web Performance Package",
    getDescription: function () {
      return `90+ PageSpeed score guaranteed or ${this.discount}% off your next month!`;
    },
    cta: "Optimize Now",
    bgColor: "bg-gradient-to-br from-blue-500/90 to-blue-600/90",
    borderColor: "border-blue-400/30",
    keywords: ["web development", "performance", "PageSpeed"],
    discount: Math.floor(Math.random() * 25) + 5, // 5-29%
    couponPrefix: "WEB",
    validityDays: 14,
    serviceSlug: "web-development",
  },
  {
    id: uuidv4(),
    title: "🌐 Website Launch Special",
    getDescription: function () {
      return `Free domain for 1 year + ${this.discount}% off development fees!`;
    },
    cta: "Start Project",
    bgColor: "bg-gradient-to-br from-indigo-500/90 to-indigo-600/90",
    borderColor: "border-indigo-400/30",
    keywords: ["web development", "website", "launch"],
    discount: Math.floor(Math.random() * 20) + 10, // 10-29%
    couponPrefix: "WEB",
    validityDays: 30,
    serviceSlug: "web-development",
  },

  // Google/Meta Ads Offers
  {
    id: uuidv4(),
    title: "📈 Google Ads Special",
    getDescription: function () {
      const credit = Math.floor(Math.random() * 300) + 200;
      return `$${credit} free ad credit + ${this.discount}% off first campaign!`;
    },
    cta: "Claim Credit",
    bgColor: "bg-gradient-to-br from-red-500/90 to-red-600/90",
    borderColor: "border-red-400/30",
    keywords: ["Google Ads", "PPC", "advertising"],
    discount: Math.floor(Math.random() * 15) + 10, // 10-24%
    couponPrefix: "ADS",
    validityDays: 5,
    serviceSlug: "google-meta-ads",
  },
  {
    id: uuidv4(),
    title: "📱 Meta Ads Pro Package",
    getDescription: function () {
      const months = Math.floor(Math.random() * 3) + 1;
      return `Free creative strategy + ${this.discount}% off first ${months} ${months > 1 ? "months" : "month"}!`;
    },
    cta: "Start Advertising",
    bgColor: "bg-gradient-to-br from-violet-500/90 to-violet-600/90",
    borderColor: "border-violet-400/30",
    keywords: ["Meta Ads", "Facebook Ads", "social media ads"],
    discount: Math.floor(Math.random() * 20) + 5, // 5-24%
    couponPrefix: "ADS",
    validityDays: 10,
    serviceSlug: "google-meta-ads",
  },

  // SEO Offers
  {
    id: uuidv4(),
    title: "🚀 SEO Optimization Package",
    getDescription: function () {
      return `Get a free SEO audit + ${this.discount}% off our premium ranking package!`;
    },
    cta: "Get Free Audit",
    bgColor: "bg-gradient-to-br from-amber-500/90 to-amber-600/90",
    borderColor: "border-amber-400/30",
    keywords: ["SEO", "search engine optimization", "ranking"],
    discount: Math.floor(Math.random() * 15) + 10, // 10-24%
    couponPrefix: "SEO",
    validityDays: 7,
    serviceSlug: "seo",
  },
  {
    id: uuidv4(),
    title: "🔍 Technical SEO Fixes",
    getDescription: function () {
      return `24-hour express service - ${this.discount}% discount this week only!`;
    },
    cta: "Fix My SEO",
    bgColor: "bg-gradient-to-br from-rose-500/90 to-rose-600/90",
    borderColor: "border-rose-400/30",
    keywords: ["technical SEO", "crawling", "indexing"],
    discount: Math.floor(Math.random() * 25) + 5, // 5-29%
    couponPrefix: "SEO",
    validityDays: 3,
    serviceSlug: "seo",
  },

  // Social Media Marketing Offers
  {
    id: uuidv4(),
    title: "📢 Social Media Starter Pack",
    getDescription: function () {
      return `Free content calendar + ${this.discount}% off first month of management!`;
    },
    cta: "Boost Engagement",
    bgColor: "bg-gradient-to-br from-pink-500/90 to-pink-600/90",
    borderColor: "border-pink-400/30",
    keywords: ["social media", "SMM", "engagement"],
    discount: Math.floor(Math.random() * 20) + 10, // 10-29%
    couponPrefix: "SMM",
    validityDays: 14,
    serviceSlug: "social-media-marketing",
  },
  {
    id: uuidv4(),
    title: "🎯 Influencer Campaign Package",
    getDescription: function () {
      return `Free influencer matching + ${this.discount}% off campaign setup!`;
    },
    cta: "Start Campaign",
    bgColor: "bg-gradient-to-br from-fuchsia-500/90 to-fuchsia-600/90",
    borderColor: "border-fuchsia-400/30",
    keywords: ["influencer", "social media", "campaign"],
    discount: Math.floor(Math.random() * 15) + 15, // 15-29%
    couponPrefix: "SMM",
    validityDays: 21,
    serviceSlug: "social-media-marketing",
  },

  // Shopify Offers
  {
    id: uuidv4(),
    title: "🛍️ Shopify Speed Boost",
    getDescription: function () {
      return `Free store speed optimization + ${this.discount}% off any Shopify plan!`;
    },
    cta: "Boost My Store",
    bgColor: "bg-gradient-to-br from-emerald-500/90 to-emerald-600/90",
    borderColor: "border-emerald-400/30",
    keywords: ["Shopify", "ecommerce", "store optimization"],
    discount: Math.floor(Math.random() * 20) + 5, // 5-24%
    couponPrefix: "SHOP",
    validityDays: 7,
    serviceSlug: "shopify-optimization",
  },
  {
    id: uuidv4(),
    title: "🔄 Shopify Migration Special",
    getDescription: function () {
      return `Free migration assistance + ${this.discount}% off first month!`;
    },
    cta: "Migrate Now",
    bgColor: "bg-gradient-to-br from-teal-500/90 to-teal-600/90",
    borderColor: "border-teal-400/30",
    keywords: ["Shopify", "migration", "ecommerce"],
    discount: Math.floor(Math.random() * 25) + 10, // 10-34%
    couponPrefix: "SHOP",
    validityDays: 14,
    serviceSlug: "shopify-optimization",
  },

  // Content Marketing Offers
  {
    id: uuidv4(),
    title: "✍️ Content Strategy Package",
    getDescription: function () {
      return `Free strategy session + ${this.discount}% off first 10 pieces of content!`;
    },
    cta: "Get Strategy",
    bgColor: "bg-gradient-to-br from-purple-500/90 to-purple-600/90",
    borderColor: "border-purple-400/30",
    keywords: ["content", "strategy", "blogging"],
    discount: Math.floor(Math.random() * 20) + 10, // 10-29%
    couponPrefix: "CONTENT",
    validityDays: 21,
    serviceSlug: "content-marketing",
  },
  {
    id: uuidv4(),
    title: "📝 Blog Writing Special",
    getDescription: function () {
      return `First blog post free + ${this.discount}% off ongoing content!`;
    },
    cta: "Start Blogging",
    bgColor: "bg-gradient-to-br from-lime-500/90 to-lime-600/90",
    borderColor: "border-lime-400/30",
    keywords: ["blog", "writing", "content"],
    discount: Math.floor(Math.random() * 15) + 15, // 15-29%
    couponPrefix: "CONTENT",
    validityDays: 30,
    serviceSlug: "content-marketing",
  },

  // Email Marketing Offers
  {
    id: uuidv4(),
    title: "📧 Email Campaign Starter",
    getDescription: function () {
      return `Free template design + ${this.discount}% off first campaign!`;
    },
    cta: "Launch Campaign",
    bgColor: "bg-gradient-to-br from-cyan-500/90 to-cyan-600/90",
    borderColor: "border-cyan-400/30",
    keywords: ["email", "campaign", "newsletter"],
    discount: Math.floor(Math.random() * 25) + 5, // 5-29%
    couponPrefix: "EMAIL",
    validityDays: 14,
    serviceSlug: "email-marketing",
  },
  {
    id: uuidv4(),
    title: "📊 Email Analytics Pro",
    getDescription: function () {
      return `Free analytics setup + ${this.discount}% off first 3 months!`;
    },
    cta: "Optimize Emails",
    bgColor: "bg-gradient-to-br from-sky-500/90 to-sky-600/90",
    borderColor: "border-sky-400/30",
    keywords: ["email", "analytics", "optimization"],
    discount: Math.floor(Math.random() * 20) + 10, // 10-29%
    couponPrefix: "EMAIL",
    validityDays: 21,
    serviceSlug: "email-marketing",
  },
];

export const generateCouponCode = (offer) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomPart = "";
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${offer.couponPrefix}ECOD${randomPart}`;
};

export const getRandomOffer = () => {
  const offer = offers[Math.floor(Math.random() * offers.length)];
  return {
    ...offer,
    description: offer.getDescription(),
    couponCode: generateCouponCode(offer),
    expiresAt: new Date(Date.now() + offer.validityDays * 24 * 60 * 60 * 1000),
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
