import { LayoutDashboard } from "lucide-react";

import {
  FiLogOut,
  FiUser,
  FiSettings,
  FiMessageSquare,
  FiCode,
  FiDatabase,
  FiBarChart2,
  FiZap,
  FiGlobe,
  FiUsers,
  FiHelpCircle,
} from "react-icons/fi";
export const userMenuItems = [
  {
    icon: <FiUser className="mr-2" />,
    label: "Profile",
    action: "/dashboard/profile",
  },
  {
    icon: <FiSettings className="mr-2" />,
    label: "Settings",
    action: "/dashboard/settings",
  },
  {
    icon: <FiLogOut className="mr-2" />,
    label: "Sign Out",
    action: "logout",
  },
];

export const chatbotMenuItems = [
  {
    icon: <LayoutDashboard className="mr-2" size={16} />,
    label: "Dashboard",
    action: "/dashboard",
  },
  {
    icon: <FiMessageSquare className="mr-2" />,
    label: "Conversations",
    action: "/dashboard/conversations",
  },
  {
    icon: <FiCode className="mr-2" />,
    label: "Flows Builder",
    action: "/dashboard/flows",
  },
  {
    icon: <FiDatabase className="mr-2" />,
    label: "Knowledge Base",
    action: "/dashboard/knowledge-base",
  },
  {
    icon: <FiBarChart2 className="mr-2" />,
    label: "Analytics",
    action: "/dashboard/analytics",
  },
  {
    icon: <FiZap className="mr-2" />,
    label: "Automations",
    action: "/dashboard/automations",
  },
  {
    icon: <FiGlobe className="mr-2" />,
    label: "Channels",
    action: "/dashboard/channels",
  },
  {
    icon: <FiUsers className="mr-2" />,
    label: "Contacts",
    action: "/dashboard/contacts",
  },
  {
    icon: <FiSettings className="mr-2" />,
    label: "Settings",
    action: "/dashboard/settings",
  },
  {
    icon: <FiHelpCircle className="mr-2" />,
    label: "Help Center",
    action: "/dashboard/help",
  },
];
