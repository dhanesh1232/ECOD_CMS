import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

const menuItems = [
  { label: "Dashboard", href: "/" },
  { label: "Posts", href: "/posts" },
  {
    label: "Pages",
    href: "/pages/policy",
    subpages: [
      { label: "Policy", href: "/pages/policy" },
      { label: "Information", href: "/pages/info" },
      { label: "Blogs", href: "/pages/blogs" },
    ],
  },
  { label: "Products", href: "/products" },
  { label: "Wild", href: "/wild" },
  { label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const activeMenu = menuItems.find(
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

  return (
    <div className="w-1/5 lg:w-[15%] shadow-lg min-h-screen hidden md:block relative">
      <ul className="flex flex-col pl-6 py-4 space-y-2 absolute top-10">
        {menuItems.map((item) => (
          <li key={item.label} className="relative">
            <div className="flex items-center w-full justify-between">
              <Link
                href={item.href}
                className={`block text-gray-700 hover:text-blue-600 w-full ${
                  router.pathname === item.href ? "font-bold text-blue-600" : ""
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
    </div>
  );
}
