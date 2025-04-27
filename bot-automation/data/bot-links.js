import {
  FiMessageSquare,
  FiSettings,
  FiUsers,
  FiPieChart,
  FiHelpCircle,
  FiHome,
  FiFileText,
  FiBook,
  FiLifeBuoy,
  FiCpu,
  FiBarChart2,
  FiKey,
  FiCreditCard,
  FiLock,
  FiUser,
} from "react-icons/fi";
import { AiOutlineRobot } from "react-icons/ai";
import { PaintBucket, Plug } from "lucide-react";
const user = {
  name: "John Doe",
  role: "Admin",
  initials: "JD",
  avatar: null,
};

export const navItems = [
  { id: "home", icon: <FiHome size={20} />, label: "Home", href: "/" },
  {
    id: "dashboard",
    icon: <FiPieChart size={20} />,
    label: "Dashboard",
    href: "/dashboard",
    badge: 5,
  },
  {
    id: "chatbots",
    icon: <AiOutlineRobot size={20} />,
    label: "My Chatbots",
    href: "/chatbots",
  },
  {
    id: "conversations",
    icon: <FiMessageSquare size={20} />,
    label: "Conversations",
    href: "/conversations",
    badge: 12,
  },
  {
    id: "templates",
    icon: <FiFileText size={20} />,
    label: "Templates",
    href: "/templates",
  },
  {
    id: "contacts",
    icon: <FiUsers size={20} />,
    label: "Contacts",
    href: "/contacts",
  },
  {
    id: "settings",
    icon: <FiSettings size={20} />,
    label: "Settings",
    href: "/settings",
  },
  {
    id: "help",
    icon: <FiHelpCircle size={20} />,
    label: "Help Center",
    href: "/help",
  },
];

export const settingsNavItems = [
  {
    id: "account",
    category: "Account",
    icon: <FiUser className="w-4 h-4" />,
    items: [
      {
        name: "Profile",
        href: "/settings/profile",
        icon: <FiUser className="w-4 h-4" />,
      },
      {
        name: "Password & Security",
        href: "/settings/security",
        icon: <FiLock className="w-4 h-4" />,
      },
      {
        name: "Billing & Plans",
        href: "/settings/billing",
        icon: <FiCreditCard className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "workspace",
    category: "Workspace",
    icon: <FiUsers className="w-4 h-4" />,
    items: [
      {
        name: "Team Members",
        href: "/settings/team",
        icon: <FiUsers className="w-4 h-4" />,
      },
      {
        name: "API Keys",
        href: "/settings/api",
        icon: <FiKey className="w-4 h-4" />,
      },
      {
        name: "Usage Analytics",
        href: "/settings/analytics",
        icon: <FiBarChart2 className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "chatbot",
    category: "Chatbot",
    icon: <FiCpu className="w-4 h-4" />,
    items: [
      {
        name: "Appearance",
        href: "/settings/appearance",
        icon: <PaintBucket className="w-4 h-4" />,
      },
      {
        name: "Behavior",
        href: "/settings/behavior",
        icon: <FiSettings className="w-4 h-4" />,
      },
      {
        name: "Integrations",
        href: "/settings/integrations",
        icon: <Plug className="w-4 h-4" />,
      },
      {
        name: "Training Data",
        href: "/settings/training",
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
      },
    ],
  },
];
