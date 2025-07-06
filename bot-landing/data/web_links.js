import {
  Bot,
  Megaphone,
  Brain,
  FileText,
  LineChart,
  Search,
  Rocket,
  Building2,
  Monitor,
  ShoppingCart,
  BookText,
  PenLine,
  Mic,
} from "lucide-react";

export const navItems = [
  { name: "Home", href: "/" },

  {
    name: "Features",
    href: "/features",
    submenu: [
      {
        name: "Chatbot",
        href: "/features/chatbot",
        icon: Bot,
        upcoming: false,
        description:
          "Multi-channel chatbot automation with visual flow builder, multilingual support (up to 15 languages), file attachments, templates, and custom flows. Available across all plans with increasing limits.",
      },
      {
        name: "Ads Automation",
        href: "/features/ads",
        icon: Megaphone,
        upcoming: true,
        description:
          "AI-powered ad copy generation, targeting, budget management, auto-publishing, and audience segmentation. Ads credits and advanced features scale with plan tier.",
      },
      {
        name: "AI Tools",
        href: "/features/ai",
        icon: Brain,
        upcoming: true,
        description:
          "Advanced AI agents with response tuning, model training, and custom model support. Enterprise plan includes full control and customization.",
      },
      {
        name: "Landing Page Builder",
        href: "/features/landing-pages",
        icon: FileText,
        upcoming: true,
        description:
          "Create high-converting landing pages using drag-and-drop editor, templates, and integrated forms. Available from Free to Enterprise tiers.",
      },
      {
        name: "CRM & Drip Campaigns",
        href: "/features/crm",
        icon: LineChart,
        upcoming: true,
        description:
          "Lead scoring, visitor tracking, CRM sync, email sequences, and behavioral triggers. Full automation in Pro and higher plans.",
      },
      {
        name: "SEO Tools",
        href: "/features/seo",
        icon: Search,
        upcoming: true,
        description:
          "Keyword research, long-tail keywords, and daily updates for content optimization. Available from Starter plan upward.",
      },
      {
        name: "Growth Tools",
        href: "/features/growth",
        icon: Rocket,
        upcoming: true,
        description:
          "Analytics dashboard, custom branding, team collaboration, dynamic content, webinar integrations, and more. Most features available from Pro tier.",
      },
      {
        name: "Enterprise Features",
        href: "/features/enterprise",
        icon: Building2,
        upcoming: true,
        description:
          "SSO, white-labeling, audit logs, data residency, HIPAA compliance, custom datacenter, and SLA-backed uptime. Designed for high-scale enterprises.",
      },
    ],
  },

  {
    name: "Pricing",
    href: "/pricing",
  },

  {
    name: "Use Cases",
    href: "/use-cases",
    submenu: [
      {
        name: "SaaS Companies",
        href: "/use-cases/saas",
        icon: Monitor,
        upcoming: true,
        description:
          "SaaS growth powered by automation, AI support agents, and campaign-ready CRM.",
      },
      {
        name: "E-commerce",
        href: "/use-cases/ecommerce",
        icon: ShoppingCart,
        upcoming: true,
        description:
          "Recover carts, upsell instantly, and automate product Q&A with AI chatbots.",
      },
      {
        name: "Agencies",
        href: "/use-cases/agencies",
        icon: Building2,
        upcoming: true,
        description:
          "Manage clients, white-label tools, and run marketing campaigns at scale.",
      },
    ],
  },

  {
    name: "Resources",
    href: "/resources",
    submenu: [
      {
        name: "Documentation",
        href: "/docs",
        icon: BookText,
        upcoming: true,
        description:
          "Developer guides, setup tutorials, and API references for full integration.",
      },
      {
        name: "Blog",
        href: "/blog",
        icon: PenLine,
        upcoming: false,
        description: "Product updates, AI tips, use cases, and industry news.",
      },
      {
        name: "Webinars",
        href: "/webinars",
        icon: Mic,
        upcoming: true,
        description:
          "Learn directly from our experts through live sessions and demos.",
      },
    ],
  },
];
