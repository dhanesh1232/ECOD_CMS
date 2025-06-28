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
  whatsapp: (
    <FaWhatsapp className="text-[#25D366] text-base md:text-lg lg:text-xl" />
  ),
  instagram: (
    <FaInstagram className="text-[#E1306C] text-base md:text-lg lg:text-xl" />
  ),
  facebook: (
    <FaFacebook className="text-[#1877F2] text-base md:text-lg lg:text-xl" />
  ),
  telegram: (
    <FaTelegram className="text-[#0088CC] text-base md:text-lg lg:text-xl" />
  ),
  web: (
    <Earth
      size={16}
      className="text-base md:text-lg lg:text-xl text-[#4285F4]"
    />
  ),
  sms: (
    <MessageSquare
      size={16}
      className="text-base md:text-lg lg:text-xl text-[#34B7F1]"
    />
  ),
  discord: (
    <FaDiscord className="text-base md:text-lg lg:text-xl text-[#5865F2]" />
  ),
  customsdk: (
    <Code
      size={16}
      className="text-base md:text-lg lg:text-xl text-[#5865F2]"
    />
  ),
  voice: <Mic className="text-base md:text-lg lg:text-xl text-[#9C27B0]" />,
  slack: <FaSlack className="text-blue-600 text-base md:text-lg lg:text-xl" />,
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
