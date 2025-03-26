import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useState, useEffect, useMemo } from "react";
import Head from "next/head";
import LoaderSpinner from "./Reusable/Spinner/spinner";
import PropTypes from "prop-types";
import StickyContactButton from "./contact-button";

// Dynamic imports with custom loading components
const OfferButton = dynamic(() => import("./button-offer"), {
  loading: () => null,
  ssr: false,
});
const Footer = dynamic(() => import("./footer"), {
  loading: () => <div className="h-20 bg-gray-100 dark:bg-gray-900 w-full" />,
});
const HeaderSection = dynamic(() => import("./header"), {
  ssr: false,
  loading: () => <div className="h-16 bg-white dark:bg-gray-800 w-full" />,
});
const LowerContent = dynamic(() => import("./lower-content"), {
  ssr: false,
  loading: () => <LoaderSpinner />,
});

const Layout = ({ children }) => {
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [routeChanging, setRouteChanging] = useState(false);

  // Memoize route-based layout values
  const { isHomePage, layoutClasses } = useMemo(() => {
    const isHome = router.pathname === "/";
    return {
      isHomePage: isHome,
      layoutClasses: isHome ? "" : "mt-16",
    };
  }, [router.pathname]);

  // Handle route changes
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

  // Initialize theme and mounted state
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

    // Check if page is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      // Fallback timeout
      const timer = setTimeout(handleLoad, 1000);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(timer);
      };
    }
  }, []);

  // Update theme when it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, isMounted]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  // Show loader if:
  // 1. The app isn't mounted yet
  // 2. Initial loading is in progress
  // 3. Route is changing
  if (!isMounted || isLoading || routeChanging) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <Head>
          <title>Loading...</title>
        </Head>
        <LoaderSpinner size="lg" />
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
        className={`min-h-screen w-full flex flex-col relative transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gray-900 text-gray-100"
            : "bg-white text-gray-900"
        }`}
      >
        <HeaderSection theme={theme} toggleTheme={toggleTheme} />

        <div
          className={`${layoutClasses} z-0 flex flex-col md:flex-row flex-1 overflow-x-hidden overflow-y-hidden`}
        >
          {!isHomePage && (
            <aside className="hidden lg:block lg:w-[12.5%] sticky top-16 h-[calc(100vh-4rem)]" />
          )}

          <main
            id="main-content"
            className="flex-1 flex flex-col items-center w-full lg:w-3/4"
          >
            {children}
            <LowerContent />
          </main>

          {!isHomePage && (
            <aside className="hidden lg:block lg:w-[12.5%] sticky top-16 h-[calc(100vh-4rem)]" />
          )}
        </div>

        <Footer />
        <OfferButton />
        <StickyContactButton />
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
