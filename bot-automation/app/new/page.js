"use client";

import React, { useRouter } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { FaWhatsapp } from "react-icons/fa";
import { FiFacebook, FiGlobe, FiInstagram } from "react-icons/fi";
const chatbotPlatforms = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    description: "Automate WhatsApp messages with Twilio",
    icon: <FaWhatsapp className="w-6 h-6 text-green-600" />,
    route: "/create-bot/whatsapp",
    comingSoon: false,
    color: "bg-green-100", // Light background for contrast
  },
  {
    id: "web",
    name: "Website Bot",
    description: "Add a chatbot to your website",
    icon: <FiGlobe className="w-6 h-6 text-purple-600" />,
    route: "/create-bot/web",
    comingSoon: false,
    color: "bg-purple-100", // Changed from 700 to 100
  },
  {
    id: "facebook",
    name: "Facebook Messenger",
    description: "Build a chatbot for your Facebook Page",
    icon: <FiFacebook className="w-6 h-6 text-blue-600" />,
    route: "/create-bot/facebook",
    comingSoon: true,
    color: "bg-blue-100", // Changed from 700 to 100
  },
  {
    id: "instagram",
    name: "Instagram DM",
    description: "Engage users on Instagram Direct Messages",
    icon: <FiInstagram className="w-6 h-6 text-pink-600" />,
    route: "/create-bot/instagram",
    comingSoon: true,
    color: "bg-pink-100", // Changed from 800 to 100
  },
];

export default function NewBot() {
  const router = useRouter();

  const handleNavigate = useCallback(
    async (bot) => {
      console.log(bot);
      const res = await fetch("/api/bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: bot.id,
          id: bot.id,
        }),
      });
      //router.push(route);
    },
    [router]
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <header className="mb-12 text-center space-y-3">
        <h1 className="text-4xl font-bold text-gray-900">Create New Bot</h1>
        <p className="text-gray-600 text-lg">
          Choose your preferred platform to start building
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chatbotPlatforms.map((bot) => (
          <article
            key={bot.id}
            role="button"
            tabIndex={0}
            onClick={() => !bot.comingSoon && handleNavigate(bot)}
            onKeyDown={(e) =>
              !bot.comingSoon && e.key === "Enter" && handleNavigate(bot.route)
            }
            className={cn(
              "group relative bg-white",
              "border border-gray-200",
              "rounded-2xl p-6 transition-all",
              "active:scale-[98%]",
              "duration-200 ease-in-out",
              bot.comingSoon
                ? "cursor-not-allowed opacity-75 focus:outline-none focus:ring-0"
                : "cursor-pointer hover:shadow-md hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            )}
            aria-disabled={bot.comingSoon}
          >
            {bot.comingSoon && (
              <div className="absolute top-0 right-0 translate-x-2 -translate-y-2">
                <span className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full shadow-sm">
                  Coming Soon
                </span>
              </div>
            )}

            <div className="flex flex-col gap-5">
              {/* Fixed icon container with proper bg color */}
              <div
                className={cn(
                  "w-12 h-12 flex items-center justify-center rounded-xl",
                  bot.color, // This now properly applies the background color
                  !bot.comingSoon && "transition-transform duration-200",
                  !bot.comingSoon && "group-hover:scale-105"
                )}
              >
                {bot.icon}
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {bot.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {bot.description}
                </p>
              </div>
            </div>

            {!bot.comingSoon && (
              <svg
                className="w-5 h-5 text-gray-400 absolute top-6 right-6 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 -translate-x-1 group-hover:translate-x-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
