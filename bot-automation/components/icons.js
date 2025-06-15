import {
  AnalyticsIcon,
  BotIcon,
  ChatBotAI,
  ContactsIcon,
  ConversationsIcon,
  CreativeIcon,
  DashboardIcon,
  HelpIcon,
  SettingsIcon,
  TemplatesIcon,
} from "@/public/Images/svg_ecod";
import { Megaphone, Target } from "lucide-react";

export const Icons = {
  bot: <BotIcon primaryColor="#A5B4FC" secondaryColor="#6366F1" />,
  analytics: <AnalyticsIcon primaryColor="#A5B4FC" secondaryColor="#6366F1" />,
  chatbot: <ChatBotAI primaryColor="#A5B4FC" secondaryColor="#6366F1" />,
  dashboard: <DashboardIcon primaryColor="#A5B4FC" secondaryColor="#6366F1" />,
  conversation: (
    <ConversationsIcon primaryColor="#A5B4FC" secondaryColor="#6366F1" />
  ),
  contacts: <ContactsIcon primaryColor="#A5B4FC" secondaryColor="#6366F1" />,
  megaphone: <Megaphone size={20} />,
  ads_creative: (
    <CreativeIcon primaryColor="#A5B4FC" secondaryColor="#6366F1" />
  ),
  templates: <TemplatesIcon primaryColor="#A5B4FC" secondaryColor="#6366F1" />,
  settings: <SettingsIcon primaryColor="#A5B4FC" secondaryColor="#6366F1" />,
  help: <HelpIcon primaryColor="#A5B4FC" secondaryColor="#6366F1" />,
  target: <Target size={20} />,
};
