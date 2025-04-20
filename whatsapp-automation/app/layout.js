import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/Layout/condition";
import { DarkModeProvider } from "@/context/context";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata = {
  title: {
    default: "WhatsAuto - WhatsApp Automation Bot for Businesses",
    template: "%s | WhatsAuto",
  },
  description:
    "Automate your WhatsApp business communications with our powerful bot solution",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"
  ),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "WhatsAuto - WhatsApp Automation Bot",
    description: "Automate your WhatsApp business communications",
    url: "https://yourdomain.com",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-950 transition-colors duration-200`}
        suppressHydrationWarning
      >
        <DarkModeProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <Layout>
              {children}
              <Analytics />
            </Layout>
          </Suspense>
        </DarkModeProvider>
      </body>
    </html>
  );
}
