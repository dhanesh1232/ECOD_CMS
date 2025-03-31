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
      year: "2020",
      event: "Founded in Tirupati, India",
      description:
        "Started as a small web development team with a focus on Shopify and WordPress.",
    },
    {
      year: "2021",
      event: "Expanded to Digital Marketing",
      description: "Launched SEO, PPC, and social media marketing services.",
    },
    {
      year: "2022",
      event: "50+ Clients Served",
      description:
        "Worked with e-commerce brands, startups, and SMEs across 5 countries.",
    },
    {
      year: "2023",
      event: "Award-Winning Projects",
      description: "Recognized as 'Top Shopify Developers' by Clutch.co.",
    },
    {
      year: "2024",
      event: "Global Remote Team",
      description: "Expanded to a fully remote team of 20+ experts worldwide.",
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
    buttons: [
      {
        text: "Get a Free Quote",
        link: "/contact",
      },
      {
        text: "See My Skills",
        link: "#expertise",
      },
    ],
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

// Social links
export const socialLinks = [
  {
    icon: <FiGithub />,
    label: "GitHub",
    link: "https://github.com/yourusername",
  },
  {
    icon: <FiLinkedin />,
    label: "LinkedIn",
    link: "https://linkedin.com/in/yourprofile",
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
    company: "Tech Solutions Inc.",
    duration: "2021 - Present",
    description:
      "Developed and maintained web applications using React, Node.js, and MongoDB. Led a team of 3 developers to deliver e-commerce solutions.",
    icon: <FiCode className="text-blue-500" />,
  },
  {
    id: 2,
    role: "Digital Marketing Specialist",
    company: "Digital Growth Agency",
    duration: "2019 - 2021",
    description:
      "Managed Google and Facebook ad campaigns with $50k+ monthly budget. Increased client ROI by 35% through data-driven optimizations.",
    icon: <FiBarChart2 className="text-blue-500" />,
  },
  {
    id: 3,
    role: "Web Developer Intern",
    company: "WebCraft Studios",
    duration: "2018 - 2019",
    description:
      "Built responsive websites for small businesses. Learned fundamentals of web development and digital marketing.",
    icon: <FiGlobe className="text-blue-500" />,
  },
];
