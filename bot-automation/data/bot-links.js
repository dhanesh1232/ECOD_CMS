import {
  Settings,
  Users,
  LayoutDashboard,
  List,
  HeartPulse,
  Building2,
  Bot,
  BadgeDollarSign,
  CreditCard,
  Percent,
  Mail,
  Flag,
  LifeBuoy,
  Lightbulb,
  Code,
  Activity,
  Monitor,
  Layers,
  Landmark,
  Cpu,
  HelpCircle,
  Terminal,
  Home,
  Ticket, // for "All Coupons"
  LineChart, // cleaner alt to BarChart3
  BadgeCheck, // better than ShieldCheck
  ArchiveX, // better conveys "archived/disabled"
  SlidersHorizontal, // more admin-style for "Settings"
} from "lucide-react";
// Main navigation items
export const navLinks = [
  {
    id: "dashboard",
    icon: "dashboard",
    label: "Dashboard",
    href: `/dashboard`,
    exact: true,
  },
  {
    id: "chatbot",
    icon: "chatbot",
    label: "Chatbot",
    href: `/chatbot`,
    isParent: true,
    subPages: [
      {
        id: "bots",
        icon: "bot",
        label: "Bots",
        href: "/chatbot/bots",
        isParent: true,
        nestedPages: [
          {
            id: "bot-0",
            icon: "bot",
            label: "Bot 0",
            href: "/chatbot/bots/bot-0",
          },
          {
            id: "bot-1",
            icon: "bot",
            label: "Bot 1",
            href: "/chatbot/bots/bot-1",
          },
          {
            id: "bot-2",
            icon: "bot",
            label: "Bot 2",
            href: "/chatbot/bots/bot-2",
          },
        ],
      },
      {
        id: "bot-analytics",
        icon: "analytics",
        label: "Analytics",
        href: `/chatbot/analytics`,
      },
      {
        id: "conversations",
        icon: "conversation",
        label: "Conversations",
        href: `/chatbot/conversations`,
      },
      {
        id: "contacts",
        icon: "contacts",
        label: "Contacts",
        href: `/chatbot/contacts`,
      },
    ],
  },
  {
    id: "ads",
    label: "Ads Automation",
    icon: "megaphone",
    href: "/ads",
    isParent: true,
    subPages: [
      {
        id: "campaigns",
        label: "Campaigns",
        icon: "target",
        href: `/ads/campaigns`,
      },
      {
        id: "ad-creative",
        label: "Creative",
        href: "/ads/creative",
        icon: "ads_creative",
      },
      {
        id: "analytics",
        icon: "analytics",
        label: "Analytics",
        href: `/ads/analytics`,
      },
    ],
  },
  {
    id: "template",
    icon: "templates",
    label: "Templates",
    href: `/template`,
  },
  {
    id: "settings",
    icon: "settings",
    label: "Settings",
    href: `/settings`,
    isParent: true,
    subPages: [
      {
        id: "general",
        icon: "settings",
        label: "General",
        href: "/settings",
      },
      {
        id: "account",
        label: "Account",
        icon: "user",
        isParent: true,
        nestedPages: [
          {
            id: "profile",
            label: "Profile",
            href: "/settings/account/profile",
            icon: "user",
          },
          {
            id: "security",
            label: "Security",
            href: "/settings/account/security",
            icon: "lock",
          },
          {
            id: "notifications",
            label: "Notifications",
            href: "/settings/account/notifications",
            icon: "bell",
          },
        ],
      },
      {
        id: "workspace",
        label: "Workspace",
        icon: "users",
        isParent: true,
        nestedPages: [
          {
            id: "team-members",
            label: "Team Members",
            href: "/settings/workspace/team-members",
            icon: "users",
          },
          {
            id: "api-keys",
            label: "API Keys",
            href: "/settings/workspace/api-keys",
            icon: "key",
          },
          {
            id: "billing",
            label: "Billing",
            href: "/settings/workspace/billing",
            icon: "billing",
          },
          {
            id: "usage-analytics",
            label: "Usage Analytics",
            href: "/settings/workspace/usage",
            icon: "chart",
          },
          {
            id: "integrations",
            label: "Integrations",
            href: "/settings/workspace/integrations",
            icon: "puzzle",
          },
          {
            id: "webhooks",
            label: "Webhooks",
            href: "/settings/workspace/webhooks",
            icon: "arrow_path",
          },
          {
            id: "custom-domains",
            label: "Custom Domains",
            href: "/settings/workspace/domains",
            icon: "globe",
          },
          {
            id: "audit-logs",
            label: "Audit Logs",
            href: "/settings/workspace/audit-logs",
            icon: "clip_doc",
          },
        ],
      },
      {
        id: "chatbot",
        label: "Chatbot",
        icon: "cpu",
        isParent: true,
        nestedPages: [
          {
            id: "appearance",
            label: "Appearance",
            href: "/settings/chatbot/appearance",
            icon: "paint",
          },
          {
            id: "behavior",
            label: "Behavior",
            href: "/settings/chatbot/behavior",
            icon: "settings",
          },
          {
            id: "chatbot-integrations",
            label: "Integrations",
            href: "/settings/chatbot/integrations",
            icon: "plug",
          },
          {
            id: "training",
            label: "Training Data",
            href: "/settings/chatbot/training",
            icon: "cpu",
          },
        ],
      },
      {
        id: "support",
        label: "Support",
        icon: "lifebuoy",
        isParent: true,
        nestedPages: [
          {
            id: "documentation",
            label: "Documentation",
            href: "https://docs.yourchatbot.com",
            icon: "book",
            external: true,
          },
          {
            id: "support",
            label: "support",
            href: "/settings/support",
            icon: "lifebuoy",
            external: true,
          },
        ],
      },
    ],
  },
  {
    id: "help",
    icon: "help",
    label: "Help Center",
    href: `/help`,
  },
];

export const SUPER_ADMIN_NAV = [
  {
    label: "Home",
    icon: <Home className="w-5 h-5" />,
    href: "/admin",
    id: "home",
  },
  {
    label: "Platform",
    id: "platform",
    isParent: true,
    icon: <Monitor className="w-5 h-5" />,
    subPages: [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: <LayoutDashboard className="w-5 h-5" />,
      },
      {
        label: "Activity Logs",
        href: "/admin/dashboard/logs",
        icon: <List className="w-5 h-5" />,
      },
      {
        label: "Health Monitor",
        href: "/admin/dashboard/health",
        icon: <HeartPulse className="w-5 h-5" />,
      },
    ],
  },
  {
    label: "Tenants",
    id: "tenants",
    isParent: true,
    icon: <Layers className="w-5 h-5" />,
    subPages: [
      {
        label: "All Workspaces",
        href: "/admin/workspaces",
        icon: <Building2 className="w-5 h-5" />,
      },
      {
        label: "All Users",
        href: "/admin/users",
        icon: <Users className="w-5 h-5" />,
      },
      {
        label: "Chatbots",
        href: "/admin/chatbots",
        icon: <Bot className="w-5 h-5" />,
      },
    ],
  },
  {
    label: "Monetization",
    id: "monetization",
    isParent: true,
    icon: <Landmark className="w-5 h-5" />,
    subPages: [
      {
        label: "Plans & Pricing",
        href: "/admin/plans",
        icon: <BadgeDollarSign className="w-5 h-5" />,
      },
      {
        label: "Subscriptions",
        href: "/admin/subscriptions",
        icon: <CreditCard className="w-5 h-5" />,
      },
      {
        label: "Coupons",
        href: "/admin/coupons",
        icon: <Percent className="w-5 h-5" />,
      },
    ],
  },
  {
    label: "System",
    id: "system",
    isParent: true,
    icon: <Cpu className="w-5 h-5" />,
    subPages: [
      {
        label: "Settings",
        href: "/admin/settings",
        icon: <Settings className="w-5 h-5" />,
      },
      {
        label: "Email Templates",
        href: "/admin/settings/emails",
        icon: <Mail className="w-5 h-5" />,
      },
      {
        label: "Feature Flags",
        href: "/admin/settings/flags",
        icon: <Flag className="w-5 h-5" />,
      },
    ],
  },
  {
    label: "Support",
    id: "support",
    isParent: true,
    icon: <HelpCircle className="w-5 h-5" />,
    subPages: [
      {
        label: "Tickets",
        href: "/admin/support/tickets",
        icon: <LifeBuoy className="w-5 h-5" />,
      },
      {
        label: "Feature Requests",
        href: "/admin/features",
        icon: <Lightbulb className="w-5 h-5" />,
      },
    ],
  },
  {
    label: "Developer",
    id: "developer",
    isParent: true,
    icon: <Terminal className="w-5 h-5" />,
    subPages: [
      {
        label: "API Usage",
        href: "/admin/developer/api-usage",
        icon: <Code className="w-5 h-5" />,
      },
      {
        label: "Webhook Logs",
        href: "/admin/developer/integrations/logs",
        icon: <Activity className="w-5 h-5" />,
      },
    ],
  },
];

export const SUPER_ADMIN_COUPON_NAVS = [
  {
    id: "all",
    title: "All Coupons",
    icon: <Ticket className="w-4 h-4" />,
    href: "/admin/coupons",
  },
  {
    id: "analytics",
    title: "Usage Analytics",
    icon: <LineChart className="w-4 h-4" />,
    href: "/admin/coupons/analytics",
  },
  {
    id: "rules",
    title: "Coupon Rules",
    icon: <BadgeCheck className="w-4 h-4" />,
    href: "/admin/coupons/rules",
  },
  {
    id: "archived",
    title: "Archived",
    icon: <ArchiveX className="w-4 h-4" />,
    href: "/admin/coupons/archived",
  },
  {
    id: "settings",
    title: "Settings",
    icon: <SlidersHorizontal className="w-4 h-4" />,
    href: "/admin/coupons/settings",
  },
];

export const BillingNav = [
  {
    id: "current-plan",
    label: "Current Plan",
  },
  {
    id: "add-on",
    label: "Add ons",
  },
  {
    id: "billing",
    label: "Billing",
  },
  {
    id: "history-invoice",
    label: "Invoice",
  },
];
