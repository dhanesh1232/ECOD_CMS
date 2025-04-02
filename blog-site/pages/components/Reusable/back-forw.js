"use client";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

const BackAndForward = ({
  back = "/",
  forward = "/about-us",
  backClassName = "text-gray-900 dark:text-gray-200 flex items-center gap-2 hover:text-gray-600 dark:hover:text-gray-400",
  className = "px-6 py-1 sm:py-2 border border-green-500 text-green-500 font-medium rounded-lg shadow-md hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-110 focus:ring-2 focus:ring-green-400",
}) => {
  const router = useRouter();
  const [routerPath, setRouterPath] = useState(forward);
  const [navText, setNavText] = useState("About Us");
  const [backPath, setBackPath] = useState(back);
  const [navBack, setNavBack] = useState("Home");

  useEffect(() => {
    switch (forward) {
      case "/contact":
        setNavText("Contact");
        setRouterPath("/contact");
        break;
      case "/blogs":
        setNavText("Blogs");
        setRouterPath("/blogs/digital-marketing");
        break;
      case "/services/web-development":
        setNavText("Services");
        setRouterPath("/services/web-development");
        break;
      default:
        setNavText("About Us");
        setRouterPath(forward);
    }
  }, [forward]);

  useEffect(() => {
    if (back === "/") {
      setNavBack("Home");
      setBackPath("/");
    } else if (back === "/services") {
      setNavBack("Back to Services");
      setBackPath("/services");
    } else {
      setNavBack("Back to Latest");
      setBackPath("/blogs");
    }
  }, [back]);

  return (
    <div className="flex items-center justify-between relative border-b pb-2">
      {/* Back Button */}
      <Link
        href={backPath}
        className={`transition-all transform ease-in-out duration-300 ${backClassName}`}
        aria-label={`Go back to ${navBack}`}
        aria-hidden={true}
      >
        <MoveLeft size={20} />
        <span className="text-sm sm:text-base md:text-xl font-medium">
          {navBack}
        </span>
      </Link>

      {/* Forward Button */}
      <button
        type="button"
        className={`transition-all transform ease-in-out duration-300 ${className}`}
        onClick={() => router.push(routerPath)}
        aria-label={`Navigate to ${navText}`}
      >
        {navText}
      </button>
    </div>
  );
};

export default BackAndForward;
