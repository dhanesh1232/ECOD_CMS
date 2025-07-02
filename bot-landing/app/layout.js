import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DarkModeProvider } from "@/context/context";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

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
        alt: "ECODrIx Platform Screenshot",
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
    creator: "@ecodrix",
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
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    const mode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (mode === 'true' || (!mode && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
          `,
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-transparent text-gray-900 dark:text-gray-100`}
      >
        <DarkModeProvider>
          <div className="fixed inset-0 bg-white dark:bg-gray-800 -z-10" />
          <div className="h-full flex flex-col">
            <Header />
            <main className="flex-1 h-full overflow-x-hidden overflow-y-auto scrollbar-transparent">
              {children}
              <Footer />
            </main>
          </div>
        </DarkModeProvider>
      </body>
    </html>
  );
}
