import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/Layout/layout";
import { DarkModeProvider } from "@/context/context";
import { Analytics } from "@vercel/analytics/react";
import { ToastProvider } from "@/components/ui/toast-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "ECODrIx - WhatsApp Automation Bot for Businesses",
    template: "%s | ECODrIx",
  },
  description:
    "Automate your WhatsApp business communications with our powerful bot solution",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://ecodrix.com"
  ),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "ECODIfy - WhatsApp Automation Bot",
    description: "Automate your WhatsApp business communications",
    url: "https://ecodrix.com",
    siteName: "WhatsAuto",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WhatsAuto Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsAuto - WhatsApp Automation Bot",
    description: "Automate your WhatsApp business communications",
    images: ["/og-image.jpg"],
    creator: "@whatsauto",
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
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-js-focus-visible=""
      className={`focus-visible ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className={`antialiased`}>
        <DarkModeProvider>
          <ToastProvider>
            <Layout>
              {children}
              <Analytics />
              <SpeedInsights />
            </Layout>
          </ToastProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
