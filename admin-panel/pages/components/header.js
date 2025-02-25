import { X, MenuIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userouter = useRouter();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  const getPathText = () => {
    switch (userouter.pathname) {
      case "/":
        return "Dashboard";
      case "/posts":
        return "Posts";
      case "/pages":
        return "Pages";
      case "/wild":
        return "Wild";
      case "/products":
        return "Products";
      case "/settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };
  return (
    <header className="relative transition-all ease-in-out duration-150 bg-blue-50">
      <div className="py-4 sm:py-6 sm:px-4 px-2">
        <div className="w-full justify-center items-center flex relative">
          <Link href="/" className="md:absolute md:left-0">
            <h1
              className="text-2xl md:text-4xl bg-gradient-to-bl from-blue-200 to-pink-200 bg-clip-text text-transparent font-bold stroke-black stroke-[1px]"
              style={{
                WebkitTextStroke: "1px black",
                WebkitTextFillColor: "transparent",
              }}
            >
              ECOD
            </h1>
          </Link>
          <button
            className="flex left-0 md:hidden absolute text-4xl transition-opacity ease-in-out duration-300"
            type="button"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X /> : <MenuIcon />}
          </button>
          <h1 className="hidden md:block md:text-2xl">{getPathText()}</h1>
        </div>
        <nav
          className={`absolute md:hidden left-0 top-14 sm:top-20 bg-white shadow-md w-full min-h-[95vh] bg-opacity-75 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ul className="flex flex-col pl-6 py-4 space-y-2">
            <Link
              href="/"
              className="text-lg hover:text-gray-500 transition-all duration-150 ease-in-out"
              onClick={() => {
                setIsMenuOpen(false);
              }}
            >
              Dashboard
            </Link>
            <Link
              href="/posts"
              className="text-lg hover:text-gray-500 transition-all duration-150 ease-in-out"
              onClick={() => {
                setIsMenuOpen(false);
              }}
            >
              Posts
            </Link>
            <Link
              href="/pages"
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className="text-lg hover:text-gray-500 transition-all duration-150 ease-in-out"
            >
              Pages
            </Link>
            <Link
              href="/products"
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className="text-lg hover:text-gray-500 transition-all duration-150 ease-in-out"
            >
              Prodcuts
            </Link>
            <Link
              href="/wild"
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className="text-lg hover:text-gray-500 transition-all duration-150 ease-in-out"
            >
              Wild
            </Link>
            <Link
              onClick={() => {
                setIsMenuOpen(false);
              }}
              href="/settings"
              className="text-lg hover:text-gray-500 transition-all duration-150 ease-in-out"
            >
              Settings
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}
