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
} from "lucide-react";
import {
  ArrowPathIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import {
  AnalyticsIcon,
  ChatBotAI,
  SettingsIcon,
  ContactsIcon,
  ConversationsIcon,
  DashboardIcon,
  HelpIcon,
  TemplatesIcon,
  CampaignsIcon,
  CreativeIcon,
  AdsAnalyticsIcon,
  BotIcon,
} from "@/public/Images/svg_ecod";

// Main navigation items
export const navLinks = [
  {
    id: "dashboard",
    icon: <DashboardIcon primaryColor="#A5B4FC" secondaryColor="#6366F1" />,
    label: "Dashboard",
    href: `/dashboard`,
    exact: true,
  },
  {
    id: "chatbot",
    icon: <ChatBotAI primaryColor="#A5B4FC" secondaryColor="#6366F1" />,
    label: "Chatbot",
    href: `/chatbot`,
    isParent: true,
    subPages: [
      {
        id: "bots",
        icon: <BotIcon primaryColor="#A5B4FC" secondaryColor="#6366F1" />,
        label: "Bots",
        href: "/chatbot/bots",
      },
      {
        id: "bot-analytics",
        icon: <AnalyticsIcon primaryColor="#A5B4FC" secondaryColor="#6366F1" />,
        label: "Analytics",
        href: `/chatbot/analytics`,
      },
      {
        id: "conversations",
        icon: (
          <ConversationsIcon primaryColor="#A5B4FC" secondaryColor="#6366F1" />
        ),
        label: "Conversations",
        href: `/chatbot/conversations`,
      },
      {
        id: "contacts",
        icon: <ContactsIcon primaryColor="#A5B4FC" secondaryColor="#6366F1" />,
        label: "Contacts",
        href: `/chatbot/contacts`,
      },
    ],
  },
  {
    id: "ads",
    label: "Ads Automation",
    icon: <Megaphone size={20} />,
    href: "/ads",
    isParent: true,
    subPages: [
      {
        id: "campaigns",
        label: "Campaigns",
        icon: <Target size={20} />,
        href: `/ads/campaigns`,
      },
      {
        id: "ad-creative",
        label: "Creative",
        href: "/ads/creative",
        icon: <CreativeIcon primaryColor="#A5B4FC" secondaryColor="#6366F1" />,
      },
      {
        id: "analytics",
        icon: (
          <AdsAnalyticsIcon primaryColor="#A5B4FC" secondaryColor="#6366F1" />
        ),
        label: "Analytics",
        href: `/ads/analytics`,
      },
    ],
  },
  {
    id: "template",
    icon: <TemplatesIcon primaryColor="#A5B4FC" secondaryColor="#6366F1" />,
    label: "Templates",
    href: `/template`,
  },

  {
    id: "settings",
    icon: <SettingsIcon primaryColor="#A5B4FC" secondaryColor="#6366F1" />,
    label: "Settings",
    href: `/settings`,
  },
  {
    id: "help",
    icon: <HelpIcon primaryColor="#A5B4FC" secondaryColor="#6366F1" />,
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
        id: "contact-support",
        name: "Contact Support",
        href: "/settings/support",
        icon: <FiLifeBuoy className="w-4 h-4" />,
        external: true,
      },
    ],
  },
];
