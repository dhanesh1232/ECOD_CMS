import "../styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoaderSpinner from "./components/Reusable/Spinner/spinner";

// Dynamic import for Layout with no loading component (we'll handle loading globally)
const Layout = dynamic(() => import("./components/layout"), { ssr: false });

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [routeChanging, setRouteChanging] = useState(false);

  // Handle initial load
  useEffect(() => {
    const handleLoad = () => setIsLoading(false);

    // If page is already loaded when this runs
    if (document.readyState === "complete") {
      setIsLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // Handle route changes
  useEffect(() => {
    const handleStart = (url) => {
      // Only show loader if we're changing to a different page
      if (url !== router.asPath) {
        setRouteChanging(true);
      }
    };
    const handleComplete = () => setRouteChanging(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.asPath]);

  return (
    <>
      <Head>
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#000000"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>

      {/* Global Loader - shows during initial load and route changes */}
      {(isLoading || routeChanging) && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black">
          <LoaderSpinner />
        </div>
      )}

      {/* Main Content - hidden while loading to prevent layout shifts */}
      <div
        style={{
          visibility: isLoading || routeChanging ? "hidden" : "visible",
        }}
      >
        <Layout>
          <Component {...pageProps} />
          <SpeedInsights />
          <Analytics />
        </Layout>
      </div>
    </>
  );
}
