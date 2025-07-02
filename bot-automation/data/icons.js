import {
  Mic,
  Code,
  MessageSquare,
  Earth,
  Server,
  Cpu,
  Users,
  Target,
  LayoutTemplate,
  FileText,
  CreditCard,
  Mail,
  Zap,
  GitMerge,
  MessageCircle,
  HardDrive,
  Globe,
  Rocket,
} from "lucide-react";
import {
  FaSlack,
  FaDiscord,
  FaTelegram,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

export const iconMap = {
  whatsapp: <FaWhatsapp style={{ color: "#25d365" }} className="text-base" />,
  instagram: <FaInstagram style={{ color: "#E1306C" }} className="text-base" />,
  facebook: <FaFacebook style={{ color: "#1877F2" }} className="text-base" />,
  telegram: <FaTelegram style={{ color: "#0088CC" }} className="text-base" />,
  web: <Earth style={{ color: "#4285F4" }} className="text-base" size={16} />,
  sms: (
    <MessageSquare
      style={{ color: "#34B7F1" }}
      className="text-base"
      size={16}
    />
  ),
  discord: <FaDiscord style={{ color: "#5865F2" }} className="text-base" />,
  customsdk: (
    <Code style={{ color: "#5865F2" }} className="text-base" size={16} />
  ),
  voice: <Mic style={{ color: "#9C27B0" }} className="text-base" />,
  slack: <FaSlack style={{ color: "#4A154B" }} className="text-base" />,
};

export const limitIcons = {
  chatbots: (
    <MessageCircle className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
  ),
  messages: (
    <MessageSquare className="h-5 w-5 text-blue-500 dark:text-blue-400" />
  ),
  members: <Users className="h-5 w-5 text-amber-500 dark:text-amber-400" />,
  storage: (
    <HardDrive className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
  ),
  conversations: (
    <MessageCircle className="h-5 w-5 text-purple-500 dark:text-purple-400" />
  ),
  integrations: (
    <GitMerge className="h-5 w-5 text-rose-500 dark:text-rose-400" />
  ),
  automationRules: (
    <Zap className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
  ),
  dripCampaigns: <Mail className="h-5 w-5 text-sky-500 dark:text-sky-400" />,
  adCredits: (
    <CreditCard className="h-5 w-5 text-green-500 dark:text-green-400" />
  ),
  exports: <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400" />,
  landingPages: (
    <LayoutTemplate className="h-5 w-5 text-teal-500 dark:text-teal-400" />
  ),
  adCampaigns: <Target className="h-5 w-5 text-red-500 dark:text-red-400" />,
  teamRoles: <Users className="h-5 w-5 text-pink-500 dark:text-pink-400" />,
  aiModelTraining: (
    <Cpu className="h-5 w-5 text-violet-500 dark:text-violet-400" />
  ),
  apiCalls: <Code className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
  dedicatedConcurrency: (
    <Server className="h-5 w-5 text-blue-500 dark:text-blue-400" />
  ),
};
// Feature category icons with dark mode support
export const categoryIcons = {
  chatbotAutomation: (
    <MessageCircle className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
  ),
  adsAutomation: (
    <Target className="h-5 w-5 text-rose-500 dark:text-rose-400" />
  ),
  seoTools: <Globe className="h-5 w-5 text-blue-500 dark:text-blue-400" />,
  landingBuilder: (
    <LayoutTemplate className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
  ),
  crmAndDripCampaigns: (
    <Mail className="h-5 w-5 text-amber-500 dark:text-amber-400" />
  ),
  aiAgent: <Cpu className="h-5 w-5 text-purple-500 dark:text-purple-400" />,
  growthFeatures: <Rocket className="h-5 w-5 text-sky-500 dark:text-sky-400" />,
  enterpriseFeatures: (
    <Server className="h-5 w-5 text-gray-500 dark:text-gray-400" />
  ),
};
