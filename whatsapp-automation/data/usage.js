import { Home, LayoutDashboard } from "lucide-react";
import { FaRobot } from "react-icons/fa";

import {
  FiLogOut,
  FiUser,
  FiSettings,
  FiMessageSquare,
  FiCode,
  FiBarChart2,
  FiZap,
  FiGlobe,
  FiUsers,
  FiHelpCircle,
  FiKey,
  FiCreditCard,
} from "react-icons/fi";
export const userMenuItems = [
  {
    icon: <FiUser className="mr-2" />,
    label: "Profile",
    action: "/settings?tab=profile",
  },
  {
    icon: <FiKey className="mr-2" />,
    label: "Change Password",
    action: "/settings?tab=security",
  },
  {
    icon: <FiSettings className="mr-2" />,
    label: "Settings",
    action: "/settings",
  },
  {
    icon: <FiLogOut className="mr-2" />,
    label: "Sign Out",
    action: "logout",
  },
];

export const chatbotMenuItems = [
  {
    icon: <Home size={16} className="mr-2" />,
    label: "Home",
    action: "/",
  },
  {
    icon: <LayoutDashboard className="mr-2" size={16} />,
    label: "Overview",
    action: "/dashboard",
  },
  {
    icon: <FiMessageSquare className="mr-2" />,
    label: "Conversations",
    action: "/conversations",
  },
  {
    icon: <FiCode className="mr-2" />,
    label: "Flows Builder",
    action: "/flows",
  },
  {
    icon: <FaRobot className="mr-2" />,
    label: "Chat Bot",
    action: "/chat",
  },
  {
    icon: <FiZap className="mr-2" />,
    label: "Automations",
    action: "/automations",
  },
  {
    icon: <FiGlobe className="mr-2" />,
    label: "Channels",
    action: "/channels",
  },
  {
    icon: <FiUsers className="mr-2" />,
    label: "Contacts",
    action: "/contacts",
  },
  {
    icon: <FiBarChart2 className="mr-2" />,
    label: "Analytics",
    action: "/analytics",
  },
  {
    icon: <FiUsers className="mr-2" />,
    label: "Integrations",
    action: "/integrations",
  },
  {
    icon: <FiCreditCard className="mr-2" />, // Billing
    label: "Billing",
    action: "/billing",
  },
  {
    icon: <FiCode className="mr-2" />, // API Access
    label: "API Access",
    action: "/api-access",
  },
  {
    icon: <FiHelpCircle className="mr-2" />, // Help Center
    label: "Help Center",
    action: "/help",
  },
];
