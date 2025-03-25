import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useState, useEffect } from "react";
import LoaderSpinner from "./Reusable/Spinner/spinner";
import PropTypes from "prop-types";
import StickyContactButton from "./contact-button";

// Dynamic imports with custom loading components
const OfferButton = dynamic(() => import("./button-offer"), {
  loading: () => null,
});
const Footer = dynamic(() => import("./footer"), {
  loading: () => null,
});
const HeaderSection = dynamic(() => import("./header"), {
  ssr: false,
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

  // Handle route changes
  useEffect(() => {
    const handleStart = () => setRouteChanging(true);
    const handleComplete = () => setRouteChanging(false);

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
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");

    // Set a timeout to ensure initial loading state is shown
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
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
      <div className="w-full h-screen flex items-center justify-center">
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <div
      className={`w-full flex flex-col relative ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <HeaderSection theme={theme} toggleTheme={toggleTheme} />

      <div
        className={`${router.pathname !== "/" ? "mt-16" : ""} z-0 flex flex-col md:flex-row flex-1 overflow-x-hidden overflow-y-hidden`}
      >
        {router.pathname !== "/" && (
          <aside className="hidden lg:block lg:w-[12.5%]"></aside>
        )}

        <main className="flex-1 flex flex-col items-center w-full lg:w-3/4 justify-center">
          {children}
          <LowerContent />
        </main>

        {router.pathname !== "/" && (
          <aside className="hidden lg:block lg:w-[12.5%]"></aside>
        )}
      </div>

      <Footer />
      <OfferButton />
      <StickyContactButton />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
