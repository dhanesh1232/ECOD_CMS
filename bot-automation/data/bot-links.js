import {
  FiSettings,
  FiUsers,
  FiHelpCircle,
  FiFileText,
  FiBook,
  FiLifeBuoy,
  FiCpu,
  FiCreditCard,
  FiLock,
  FiUser,
} from "react-icons/fi";
import {
  ChartBar,
  GlobeIcon,
  Key,
  PaintBucket,
  Plug,
  Puzzle,
  Settings,
  Users,
} from "lucide-react";
import {
  ArrowPathIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";

export const getNavItems = (slug) => [
  {
    id: "dashboard",
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z" />
      </svg>
    ),
    label: "Dashboard",
    href: `${slug}/`,
  },
  {
    id: "chatbots",
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M9 2h6v2h3a2 2 0 0 1 2 2v9a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V6a2 2 0 0 1 2-2h3V2z" />
        <circle cx="9" cy="10" r="1" />
        <circle cx="15" cy="10" r="1" />
        <path d="M8 16h8" strokeLinecap="round" />
      </svg>
    ),
    label: "My Chatbots",
    href: `${slug}/chatbots`,
  },
  {
    id: "analytics",
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M4 18V6m4 12V10m4 8v-4m4 4V8m4 10V4" />
      </svg>
    ),
    label: "Analytics",
    href: `${slug}/analytics`,
  },
  {
    id: "conversations",
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    label: "Conversations",
    href: `${slug}/conversations`,
  },
  {
    id: "template",
    icon: <FiFileText size={20} />,
    label: "Templates",
    href: `${slug}/template`,
  },
  {
    id: "contacts",
    icon: <FiUsers size={20} />,
    label: "Contacts",
    href: `${slug}/contacts`,
  },
  {
    id: "settings",
    icon: <FiSettings size={20} />,
    label: "Settings",
    href: `${slug}/settings`,
  },
  {
    id: "help",
    icon: <FiHelpCircle size={20} />,
    label: "Help Center",
    href: `${slug}/help`,
  },
];

const workspaceLinks = [
  {
    name: "Team Members",
    href: "/settings/workspace/team-members",
    icon: <Users className="w-4 h-4" />,
  },
  {
    name: "API Keys",
    href: "/settings/workspace/api-keys",
    icon: <Key className="w-4 h-4" />,
  },
  {
    name: "Usage Analytics",
    href: "/settings/workspace/usage",
    icon: <ChartBar className="w-4 h-4" />,
  },
  {
    name: "Integrations",
    href: "/settings/workspace/integrations",
    icon: <Puzzle className="w-4 h-4" />,
  },
  {
    name: "Webhooks",
    href: "/settings/workspace/webhooks",
    icon: <ArrowPathIcon className="w-4 h-4" />,
  },
  {
    name: "Custom Domains",
    href: "/settings/workspace/domains",
    icon: <GlobeIcon className="w-4 h-4" />,
  },
  {
    name: "Audit Logs",
    href: "/settings/workspace/audit-logs",
    icon: <ClipboardDocumentIcon className="w-4 h-4" />,
  },
];

// data/bot-links.js
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
        name: "Profile",
        href: "/settings/account/profile",
        icon: <FiUser className="w-4 h-4" />,
      },
      {
        name: "Password & Security",
        href: "/settings/account/security",
        icon: <FiLock className="w-4 h-4" />,
      },
      {
        name: "Billing & Plans",
        href: "/settings/account/billing",
        icon: <FiCreditCard className="w-4 h-4" />,
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
        name: "Appearance",
        href: "/settings/chatbot/appearance",
        icon: <PaintBucket className="w-4 h-4" />,
      },
      {
        name: "Behavior",
        href: "/settings/chatbot/behavior",
        icon: <FiSettings className="w-4 h-4" />,
      },
      {
        name: "Integrations",
        href: "/settings/chatbot/integrations",
        icon: <Plug className="w-4 h-4" />,
      },
      {
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
        name: "Documentation",
        href: "https://docs.yourchatbot.com",
        icon: <FiBook className="w-4 h-4" />,
        external: true,
      },
      {
        name: "Contact Support",
        href: "/settings/support",
        icon: <FiLifeBuoy className="w-4 h-4" />,
        external: true,
      },
    ],
  },
];
export const getFinalSettingsNav = (slug = "") => {
  return settingsNavItems.map((item) => {
    const updatedItem = { ...item };

    if (updatedItem.href) {
      updatedItem.href = `${slug}${updatedItem.href}`;
    }

    if (updatedItem.items) {
      updatedItem.items = updatedItem.items.map((subItem) => ({
        ...subItem,
        href: subItem.external ? subItem.href : `${slug}${subItem.href}`,
      }));
    }

    return updatedItem;
  });
};
