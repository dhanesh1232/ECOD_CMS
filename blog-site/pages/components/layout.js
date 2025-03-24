import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useState, useEffect } from "react";
import LoaderSpinner from "./Reusable/Spinner/spinner";
import PropTypes from "prop-types";
import StickyContactButton from "./contact-button";

const OfferButton = dynamic(() => import("./button-offer"));
const Footer = dynamic(() => import("./footer"));
const HeaderSection = dynamic(() => import("./header"));
const LowerContent = dynamic(() => import("./lower-content"), {
  ssr: false,
  loading: () => <LoaderSpinner />,
});
const Layout = ({ children }) => {
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");

    // Set a small timeout to ensure all dynamic imports have a chance to trigger their loading states
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, isMounted]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  if (!isMounted || isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <>
      <div
        className={`w-full flex flex-col relative ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
      >
        <HeaderSection theme={theme} toggleTheme={toggleTheme} />
        {/*margin required for main section what is height of header section */}
        <div
          className={`${router.pathname !== "/" ? "mt-16" : ""} z-0 flex flex-col md:flex-row flex-1 overflow-x-hidden`}
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
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
