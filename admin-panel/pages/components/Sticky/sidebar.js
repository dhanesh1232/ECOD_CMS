import { useState } from "react";
import { nav_links } from "@/data/nav_data";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

const SidebarAdmin = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="md:flex flex-col hidden md:w-1/4 lg:w-1/5 h-full px-2 py-2">
      <ul className="space-y-2">
        {nav_links.map((link, ind) => (
          <li key={ind}>
            {link.list ? (
              <>
                <button
                  type="button"
                  className="flex items-center justify-between text-gray-700 w-full p-2 hover:text-white hover:bg-blue-600 rounded transition ease-in-out duration-150"
                  onClick={() => toggleDropdown(ind)}
                  aria-expanded={openDropdown === ind}
                >
                  <span>{link.label}</span>
                  {openDropdown === ind ? <ChevronUp /> : <ChevronDown />}
                </button>
                {openDropdown === ind && (
                  <ul className="ml-4 bg-blue-200 mt-1 space-y-1 rounded p-1">
                    {link.list.map((subLink, subInd) => (
                      <Link
                        key={subInd}
                        href={`${subLink.href}`}
                        onClick={() => setOpenDropdown(null)}
                        className="block text-gray-600 w-full p-2 hover:text-white hover:bg-blue-500 rounded transition"
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link
                href={`${link.href}`}
                className="block text-gray-700 w-full p-2 hover:text-white hover:bg-blue-600 rounded transition ease-in-out duration-150"
                onClick={() => setOpenDropdown(null)}
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarAdmin;
