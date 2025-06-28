import {
  FiSettings,
  FiUsers,
  FiBook,
  FiLifeBuoy,
  FiCpu,
  FiCreditCard,
  FiLock,
  FiUser,
} from "react-icons/fi";
import {
  Bell,
  ChartBar,
  GlobeIcon,
  Key,
  Megaphone,
  PaintBucket,
  Plug,
  Puzzle,
  Settings,
  Target,
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
import {
  ArrowPathIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";

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
  },
  {
    id: "help",
    icon: "help",
    label: "Help Center",
    href: `/help`,
  },
];

// Workspace links configuration
const workspaceLinks = [
  {
    id: "team-members",
    name: "Team Members",
    href: "/settings/workspace/team-members",
    icon: <Users className="w-4 h-4" />,
  },
  {
    id: "api-keys",
    name: "API Keys",
    href: "/settings/workspace/api-keys",
    icon: <Key className="w-4 h-4" />,
  },
  {
    id: "billing",
    name: "Billing & Plans",
    href: "/settings/workspace/billing",
    icon: <FiCreditCard className="w-4 h-4" />,
  },
  {
    id: "usage-analytics",
    name: "Usage Analytics",
    href: "/settings/workspace/usage",
    icon: <ChartBar className="w-4 h-4" />,
  },
  {
    id: "integrations",
    name: "Integrations",
    href: "/settings/workspace/integrations",
    icon: <Puzzle className="w-4 h-4" />,
  },
  {
    id: "webhooks",
    name: "Webhooks",
    href: "/settings/workspace/webhooks",
    icon: <ArrowPathIcon className="w-4 h-4" />,
  },
  {
    id: "custom-domains",
    name: "Custom Domains",
    href: "/settings/workspace/domains",
    icon: <GlobeIcon className="w-4 h-4" />,
  },
  {
    id: "audit-logs",
    name: "Audit Logs",
    href: "/settings/workspace/audit-logs",
    icon: <ClipboardDocumentIcon className="w-4 h-4" />,
  },
];

// Settings navigation configuration
export const settingsNavItems = [
  {
    id: "general",
    category: "General",
    href: "/settings",
    icon: <Settings className="w-4 h-4" />,
  },
  {
    id: "account",
    category: "Account",
    icon: <FiUser className="w-4 h-4" />,
    items: [
      {
        id: "profile",
        name: "Profile",
        href: "/settings/account/profile",
        icon: <FiUser className="w-4 h-4" />,
      },
      {
        id: "security",
        name: "Security",
        href: "/settings/account/security",
        icon: <FiLock className="w-4 h-4" />,
      },
      {
        id: "notifications",
        name: "Notifications",
        href: "/settings/account/notifications",
        icon: <Bell className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "workspace",
    category: "Workspace",
    icon: <FiUsers className="w-4 h-4" />,
    items: [...workspaceLinks],
  },
  {
    id: "chatbot",
    category: "Chatbot",
    icon: <FiCpu className="w-4 h-4" />,
    items: [
      {
        id: "appearance",
        name: "Appearance",
        href: "/settings/chatbot/appearance",
        icon: <PaintBucket className="w-4 h-4" />,
      },
      {
        id: "behavior",
        name: "Behavior",
        href: "/settings/chatbot/behavior",
        icon: <FiSettings className="w-4 h-4" />,
      },
      {
        id: "chatbot-integrations",
        name: "Integrations",
        href: "/settings/chatbot/integrations",
        icon: <Plug className="w-4 h-4" />,
      },
      {
        id: "training",
        name: "Training Data",
        href: "/settings/chatbot/training",
        icon: <FiCpu className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "support",
    category: "Support",
    icon: <FiLifeBuoy className="w-4 h-4" />,
    items: [
      {
        id: "documentation",
        name: "Documentation",
        href: "https://docs.yourchatbot.com",
        icon: <FiBook className="w-4 h-4" />,
        external: true,
      },
      {
        id: "support",
        name: "support",
        href: "/settings/support",
        icon: <FiLifeBuoy className="w-4 h-4" />,
        external: true,
      },
    ],
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
