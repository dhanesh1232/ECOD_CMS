import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/landing/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "WhatsAuto - WhatsApp Automation Bot for Businesses",
  description:
    "Automate your WhatsApp business communications with our powerful bot solution",
  openGraph: {
    title: "WhatsAuto - WhatsApp Automation Bot",
    description: "Automate your WhatsApp business communications",
    url: "https://yourdomain.com",
    siteName: "WhatsAuto",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsAuto - WhatsApp Automation Bot",
    description: "Automate your WhatsApp business communications",
    images: ["https://yourdomain.com/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
  s;
}
