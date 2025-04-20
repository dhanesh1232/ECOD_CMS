import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {
  createContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from "react";
import Head from "next/head";
import LoaderSpinner from "@/components/Reusable/Spinner/spinner";
import PropTypes from "prop-types";
import PortfolioPage from "../pages/portfolio";
import PageNotFound from "@/pages/404";
import OverlayPages from "@/components/Overlay/overy-pages";

// Create context for theme and loading states
export const AppContext = createContext({
  theme: "light",
  toggleTheme: () => {},
  isLoading: true,
  routeChanging: false,
});

// Dynamic imports for better code splitting
const Footer = dynamic(() => import("@/components/footer"), { ssr: false });
const HeaderSection = dynamic(() => import("@/components/header"), {
  ssr: false,
});

// Animation frames for loading indicator
const loadingFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

const Layout = ({ children }) => {
  const router = useRouter();
  const { category } = router.query;

  // State management
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [routeChanging, setRouteChanging] = useState(false);
  const [titleFrame, setTitleFrame] = useState(0);

  // Memoized route checks
  const {
    isPortfolioPage,
    isPreviewPage,
    isServiceWebPage,
    isNotFound,
    isHomePage,
    layoutClasses,
  } = useMemo(
    () => ({
      isPortfolioPage: router.pathname === "/portfolio",
      isPreviewPage: router.pathname === "/preview",
      isServiceWebPage: category === "web-development",
      isNotFound: router.pathname === "/404",
      isHomePage: router.pathname === "/",
      layoutClasses: router.pathname === "/" ? "" : "mt-16",
    }),
    [router.pathname, category]
  );

  // Route change handlers with performance optimization
  useEffect(() => {
    const handleRouteChange = (type) => {
      const handlers = {
        start: () => {
          setRouteChanging(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
        complete: () => setRouteChanging(false),
        error: () => setRouteChanging(false),
      };
      return handlers[type];
    };

    router.events.on("routeChangeStart", handleRouteChange("start"));
    router.events.on("routeChangeComplete", handleRouteChange("complete"));
    router.events.on("routeChangeError", handleRouteChange("error"));

    return () => {
      router.events.off("routeChangeStart", handleRouteChange("start"));
      router.events.off("routeChangeComplete", handleRouteChange("complete"));
      router.events.off("routeChangeError", handleRouteChange("error"));
    };
  }, [router.events]);

  // Theme and mount initialization with system preference detection
  useEffect(() => {
    setIsMounted(true);

    // Get saved theme or detect system preference
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");

    // Handle page load with fallback timeout
    const handleLoad = () => setIsLoading(false);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      const timer = setTimeout(() => {
        handleLoad();
        window.removeEventListener("load", handleLoad);
      }, 1500);

      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(timer);
      };
    }
  }, []);

  // Theme persistence with localStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, isMounted]);

  // Loading animations with cleanup
  useEffect(() => {
    if (!isMounted || isLoading || routeChanging) {
      const interval = setInterval(() => {
        setTitleFrame((prev) => (prev + 1) % loadingFrames.length);
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isMounted, isLoading, routeChanging]);

  // Dynamic document title updates
  useEffect(() => {
    if (!isMounted || isLoading || routeChanging) {
      document.title = `Loading ${loadingFrames[titleFrame]}`;
    } else {
      document.title = "ECOD";
    }
  }, [titleFrame, isMounted, isLoading, routeChanging]);

  // Memoized theme toggle function
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  // Early returns for special pages
  if (!isMounted || isLoading || routeChanging) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white/50 dark:bg-gray-900/50">
        <Head>
          <title>Loading {loadingFrames[titleFrame]}</title>
          <meta
            name="theme-color"
            content={theme === "dark" ? "#000000" : "#ffffff"}
          />
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

  if (isNotFound) {
    return <PageNotFound />;
  }

  // Context value for app-wide state
  const contextValue = {
    theme,
    toggleTheme,
    isLoading,
    routeChanging,
  };

  return (
    <AppContext.Provider value={contextValue}>
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
          className={`${layoutClasses} z-0 flex flex-col md:flex-row bg-gray-50 flex-1 overflow-x-hidden`}
        >
          {/* Left sidebar - conditionally rendered */}
          {!isHomePage && !isPreviewPage && !isServiceWebPage && (
            <aside className="hidden lg:block lg:w-[12.5%] sticky top-16 h-[calc(100vh-4rem)]" />
          )}

          {/* Main content area */}
          <main
            id="main-content"
            className={`flex-1 flex flex-col items-center ${
              isPreviewPage || isServiceWebPage ? "w-full" : "w-full lg:w-3/4"
            }`}
          >
            {children}
          </main>

          {/* Right sidebar - conditionally rendered */}
          {!isHomePage && !isPreviewPage && !isServiceWebPage && (
            <aside className="hidden lg:block lg:w-[12.5%] sticky top-16 h-[calc(100vh-4rem)]" />
          )}
        </div>

        <Footer />
        <OverlayPages />
      </div>
    </AppContext.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
