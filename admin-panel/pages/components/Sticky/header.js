"use client";

import { nav_links } from "@/data/nav_data";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const HeaderAdmin = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showClose, setShowClose] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    setShowClose(true);
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  /*Search Action */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "f") {
        e.preventDefault();
        setShowSearch(true);
      }
      if ((e.ctrlKey && e.key.toLowerCase() === "q") || e.key === "Escape") {
        e.preventDefault();
        setShowSearch(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <header className="relative bg-transparent">
      <div className="bg-transparent py-2 text-white px-2 flex justify-between">
        <button
          type="button"
          className="md:hidden"
          onClick={() => setShowMenu(!showMenu)}
        >
          <Menu />
        </button>
        <div className="md:w-[15%]">
          <h1 className="text-gray-600 font-extrabold text-2xl">ECOD</h1>
        </div>

        {/* Desktop Search Bar */}
        <div className="bg-gray-50 text-black md:w-4/5 lg:w-3/6 xl:w-2/4 items-center rounded hidden md:flex">
          <input
            type="search"
            ref={searchInputRef}
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-[90%] h-full rounded outline-none bg-transparent focus:outline-none focus:ring-0 px-2 text-lg py-2"
          />
          <button
            type="button"
            onClick={() => setShowSearch(false)}
            className="w-[10%] justify-center items-center border-l-2 h-full bg-transparent flex"
          >
            <Search color="black" />
          </button>
        </div>

        {/* Mobile Search Toggle Button */}
        <button
          type="button"
          onClick={() => {
            setShowSearch(true);
            setTimeout(() => searchInputRef.current?.focus(), 50);
          }}
          className="p-2 md:hidden rounded-md bg-blue-800 shadow-2xl ring-0 outline-none border-0"
        >
          <Search />
        </button>
      </div>

      {/* Mobile Search Box */}
      {showSearch && (
        <motion.div
          key={showSearch}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-gray-200 md:hidden absolute top-0 w-full bg-opacity-50 py-2 flex items-center justify-between px-4"
        >
          <div className="w-[90%] h-10 bg-gray-50 flex items-center rounded">
            <input
              type="search"
              ref={searchInputRef}
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-[90%] h-full rounded outline-none bg-transparent focus:outline-none focus:ring-0 px-2 text-lg"
            />
            <button
              type="button"
              onClick={() => setShowSearch(false)}
              className="w-[10%] justify-center items-center border-l-2 h-full bg-transparent flex"
            >
              <Search />
            </button>
          </div>
          <button
            type="button"
            className="text-white bg-gray-950 p-2 rounded"
            onClick={() => setShowSearch(false)}
          >
            <X />
          </button>
        </motion.div>
      )}
      {showMenu && (
        <div
          className="fixed bg-gray-300 z-10 top-0 bottom-0 left-0 right-0 opacity-50"
          onClick={() => setShowMenu(false)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setShowClose(false)}
        >
          {showClose && (
            <button
              className="absolute bg-gray-800 text-white p-2 rounded-full transition hover:bg-red-600"
              style={{ top: `${mousePos.y}px`, left: `${mousePos.x}px` }}
              onClick={() => setShowMenu(false)}
            >
              <X />
            </button>
          )}
        </div>
      )}
      {/* Mobile Menu */}
      {showMenu && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden fixed left-0 bottom-0 z-50 w-full rounded-t-2xl bg-white"
        >
          <button
            type="button"
            className="bg-gray-200 rounded-b-lg relative left-1/2 px-8 py-2"
            onClick={() => setShowMenu(false)}
          >
            <ChevronDown />
          </button>
          <ul className="w-full flex py-1 px-2 flex-col space-y-2 transition ease-in-out">
            {nav_links.map((links, ind) => {
              if (links.list) {
                return (
                  <div key={ind}>
                    <button
                      className="relative flex w-full gap-2 items-center px-5 py-2 font-medium text-gray-900  hover:bg-blue-400 transition-all ease-in-out duration-300 text-base rounded"
                      onClick={() => toggleDropdown(ind)}
                    >
                      {links.label}
                      <ChevronRight size={17} />
                    </button>
                    {openDropdown === ind && (
                      <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="rounded-t-2xl absolute z-50 h-full top-0 right-0 bottom-0 left-0 bg-white"
                      >
                        <button
                          type="button"
                          className="bg-gray-200 rounded-b-lg relative left-1/2 px-8 py-2"
                          onClick={() => setOpenDropdown(null)}
                        >
                          <ChevronDown />
                        </button>
                        <ul className="flex flex-col items-center space-y-2 overflow-auto">
                          {links.list.map((sublinks, subInd) => (
                            <a
                              key={subInd}
                              className="px-5 py-2 w-full hover:font-normal hover:bg-blue-400 transition-all ease-in-out duration-300 text-base rounded"
                              href={sublinks.href}
                              onClick={() => setShowMenu(false)}
                            >
                              {sublinks.label}
                            </a>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                );
              }
              return (
                <a
                  key={ind}
                  className="px-5 py-2 w-full hover:font-normal hover:bg-blue-400 transition-all ease-in-out duration-300 text-base rounded"
                  href={links.href}
                  onClick={() => setShowMenu(false)}
                >
                  {links.label}
                </a>
              );
            })}
          </ul>
        </motion.div>
      )}
    </header>
  );
};

export default HeaderAdmin;
