import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useState, useEffect, useMemo } from "react";
import Head from "next/head";
import LoaderSpinner from "./Reusable/Spinner/spinner";
import PropTypes from "prop-types";
import StickyContactButton from "./contact-button";
import PortfolioPage from "../portfolio";
import CookiePopup from "./cookies";
import ContactModel from "./contact-model";

const OfferButton = dynamic(() => import("./button-offer"), { ssr: false });
const Footer = dynamic(() => import("./footer"), { ssr: false });
const HeaderSection = dynamic(() => import("./header"), { ssr: false });
const LowerContent = dynamic(() => import("./lower-content"), { ssr: false });

const loadingFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

const Layout = ({ children }) => {
  const router = useRouter();
  const { category } = router.query;
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [routeChanging, setRouteChanging] = useState(false);

  const [titleFrame, setTitleFrame] = useState(0);
  const isPortfolioPage = router.pathname === "/portfolio";
  const isPreviewPage = router.pathname === "/preview";
  const isServiceWebPage = category === "web-development";
  const { isHomePage, layoutClasses } = useMemo(() => {
    const isHome = router.pathname === "/";
    return {
      isHomePage: isHome,
      layoutClasses: isHome ? "" : "mt-16",
    };
  }, [router.pathname]);

  // Enhanced visitor tracking
  useEffect(() => {
    if (!isMounted) return;

    const trackVisit = async () => {
      try {
        const response = await fetch("/api/log", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: router.pathname,
            referrer: document.referrer || "direct",
          }),
        });
        console.log(await response.json());
        if (!response.ok) {
          throw new Error("Failed to track visit");
        }
      } catch (error) {
        console.error("Visit tracking error:", error);
      }
    };

    // Track only once per page load
    const timeoutId = setTimeout(trackVisit, 1000);

    return () => clearTimeout(timeoutId);
  }, [router.pathname, isMounted]);

  // Route change handlers
  useEffect(() => {
    const handleStart = () => {
      setRouteChanging(true);
      window.scrollTo(0, 0);
    };
    const handleComplete = () => {
      setRouteChanging(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  // Theme and mount initialization
  useEffect(() => {
    setIsMounted(true);
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");

    const handleLoad = () => setIsLoading(false);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      const timer = setTimeout(handleLoad, 1000);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(timer);
      };
    }
  }, []);

  // Theme persistence
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, isMounted]);

  // Loading animations
  useEffect(() => {
    if (!isMounted || isLoading || routeChanging) {
      const interval = setInterval(() => {
        setTitleFrame((prev) => (prev + 1) % loadingFrames.length);
      }, 200);

      return () => clearInterval(interval);
    } else {
      document.title = "ECOD";
    }
  }, [isMounted, isLoading, routeChanging]);

  useEffect(() => {
    if (!isMounted || isLoading || routeChanging) {
      document.title = `Loading ${loadingFrames[titleFrame]}`;
    }
  }, [titleFrame, isMounted, isLoading, routeChanging]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  if (!isMounted || isLoading || routeChanging) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <Head>
          <title>Loading {loadingFrames[titleFrame]}</title>
        </Head>
        <LoaderSpinner size="lg" />
      </div>
    );
  }

  if (isPortfolioPage) {
    return (
      <div className="min-h-screen w-full">
        <Head>
          <title>Dhanesh | Portfolio</title>
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <PortfolioPage theme={theme} toggleTheme={toggleTheme} />
      </div>
    );
  }

  return (
    <>
      <Head>
        <meta
          name="theme-color"
          content={theme === "dark" ? "#000000" : "#ffffff"}
        />
      </Head>
      <div
        data-testid="root"
        className={`w-full flex flex-col relative transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gray-900 text-gray-100"
            : "bg-white text-gray-900"
        }`}
      >
        <HeaderSection theme={theme} toggleTheme={toggleTheme} />

        <div
          className={`${layoutClasses} z-0 flex flex-col md:flex-row flex-1 overflow-x-hidden`}
        >
          {/* Left sidebar - hidden on home and preview pages */}
          {!isHomePage && !isPreviewPage && !isServiceWebPage && (
            <aside className="hidden lg:block lg:w-[12.5%] sticky top-16 h-[calc(100vh-4rem)]" />
          )}

          {/* Main content - full width on preview page */}
          <main
            id="main-content"
            className={`flex-1 flex flex-col items-center ${
              isPreviewPage || isServiceWebPage ? "w-full" : "w-full lg:w-3/4"
            }`}
          >
            {children}
            {!isPreviewPage && <LowerContent />}
          </main>

          {/* Right sidebar - hidden on home and preview pages */}
          {!isHomePage && !isPreviewPage && !isServiceWebPage && (
            <aside className="hidden lg:block lg:w-[12.5%] sticky top-16 h-[calc(100vh-4rem)]" />
          )}
        </div>
        <>
          <Footer />
          <OfferButton />
          <StickyContactButton />
          <CookiePopup />
          <ContactModel />
        </>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
