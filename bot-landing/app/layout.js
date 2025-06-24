import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DarkModeProvider } from "@/context/context";
import Header from "@/components/layout/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "ECODrIx – WhatsApp Automation Bot for Businesses",
    template: "%s | ECODrIx",
  },
  description:
    "Automate your WhatsApp business conversations, sales, and customer service with AI-powered bots, CRM integration, and lead workflows.",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "ECODrIx – Automate WhatsApp for Business",
    description:
      "Boost customer engagement, automate chats, and drive sales with ECODrIx, our all-in-one WhatsApp automation platform.",
    url: "https://ecodrix.com",
    siteName: "ECODrIx",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WhatsAuto Platform Screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ECODrIx – WhatsApp Automation Bot",
    description:
      "Smart automation for WhatsApp: chatbots, CRM, templates, broadcasts, and more.",
    creator: "@whatsauto",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      "your-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased overflow-hidden`}
      >
        <DarkModeProvider>
          <Header />
          <main className="h-full overflow-y-auto bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
            {children}
          </main>
        </DarkModeProvider>
      </body>
    </html>
  );
}
