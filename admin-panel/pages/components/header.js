import { X, MenuIcon, ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
const nav_list = [
  { label: "Dashboard", href: "/" },
  { label: "Posts", href: "/posts" },
  {
    label: "Pages",
    href: "/pages",
    subpages: [
      { label: "Policy", href: "/pages/policy" },
      { label: "About", href: "/pages/about" },
      { label: "Contact", href: "/pages/contact" },
    ],
  },
  { label: "Wild", href: "/wild" },
  { label: "Products", href: "/products" },
  { label: "Settings", href: "/settings" },
];
export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event) => {
    // Update the hover position
    setHoverPosition({ x: event.clientX, y: event.clientY });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // Hide the button when the mouse leaves the area
    setIsHovered(false);
  };

  useEffect(() => {
    const activeMenu = nav_list.find(
      (item) =>
        item.subpages &&
        item.subpages.some((sub) => router.pathname.startsWith(sub.href))
    );

    if (activeMenu) {
      setOpenMenu(activeMenu.label);
    } else {
      setOpenMenu(null);
    }
  }, [router.pathname]);

  const toggleMenu = (label) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  const toggleHungerMenu = () => {
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
    switch (router.pathname) {
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="relative transition-all ease-in-out duration-150 bg-blue-50 z-50">
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
            className="flex left-0 md:hidden absolute text-4xl outline-none transition-opacity ease-in-out duration-300 hover:bg-gray-500 hover:text-white bg-opacity-20 p-2 rounded"
            type="button"
            onClick={toggleHungerMenu}
          >
            {isMenuOpen ? null : <MenuIcon />}
          </button>
          <h1 className="hidden md:block md:text-2xl">{getPathText()}</h1>
        </div>
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-0"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {isHovered && (
              <button
                className="absolute -top-16 left-1/2 outline-none -translate-x-1/2 bg-white shadow-2xl p-4 rounded-full z-50 duration-150 transition-transform ease-in-out opacity-95 hover:bg-gray-700 hover:text-white"
                style={{
                  position: "fixed",
                  left: hoverPosition.x,
                  top: hoverPosition.y,
                  transform: "translate(-50%, -50%)",
                  zIndex: 1000,
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                <X />
              </button>
            )}
          </div>
        )}
        <nav
          className={`absolute md:hidden left-0 top-36 sm:top-20 bg-white shadow-md w-full min-h-[95vh] bg-opacity-100 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen
              ? "translate-y-0 rounded-t-3xl opacity-100"
              : "translate-y-full opacity-0"
          }`}
          style={{
            boxShadow: isMenuOpen ? "0px -4px 10px rgba(0, 0, 0, 0.1)" : "none",
          }}
        >
          {isMenuOpen && (
            <button
              className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white shadow-2xl p-4 rounded-full z-50 duration-150 outline-none transition-transform ease-in-out opacity-95 hover:bg-gray-700 hover:text-white"
              type="button"
              onClick={() => setIsMenuOpen(false)}
            >
              <X />
            </button>
          )}

          <ul className="flex flex-col pl-6 py-0 space-y-2 absolute top-4 w-full items-center">
            {nav_list.map((item) => (
              <li key={item.label} className="relative">
                <div className="flex items-center w-full justify-between">
                  <Link
                    href={item.href}
                    className={`block text-gray-700 hover:text-blue-600 text-lg md:text-xl w-full ${
                      router.pathname === item.href
                        ? "font-bold text-blue-600"
                        : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.subpages && (
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className="ml-2 focus:outline-none"
                    >
                      {openMenu === item.label ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>
                  )}
                </div>

                {/* Submenu (Dropdown) */}
                {item.subpages && openMenu === item.label && (
                  <ul className="pl-6 pr-4 mt-2 space-y-1 bg-gray-50 rounded-md p-2">
                    {item.subpages.map((sub) => (
                      <li key={sub.label}>
                        <Link
                          href={sub.href}
                          className={`block text-gray-600 hover:text-blue-500 ${
                            router.pathname === sub.href
                              ? "font-bold text-blue-600"
                              : ""
                          }`}
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
