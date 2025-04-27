import {
  FiMessageSquare,
  FiSettings,
  FiUsers,
  FiPieChart,
  FiHelpCircle,
  FiHome,
  FiFileText,
} from "react-icons/fi";
import { AiOutlineRobot } from "react-icons/ai";
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
