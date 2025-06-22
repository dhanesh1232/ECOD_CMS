// components/CommandStyleSearch.js
"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Command, CommandList, CommandItem } from "@/components/ui/command";
import { Search, X } from "lucide-react";
import { useMediaQuery } from "@/hooks/mediaQuery";

const SEARCH_TYPES = [
  { label: "Chatbots", value: "chatbot" },
  { label: "Conversations", value: "conversation" },
  { label: "Contacts", value: "contact" },
  { label: "Templates", value: "template" },
];

export default function CommandStyleSearch() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState(null);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const isLg = useMediaQuery("(min-width: 1024px)");
  const inputRef = useRef(null);
  const formRef = useRef(null);

  const handleTypeSelect = useCallback((type) => {
    setMode(type.value);
    setInput("");
    setIsCommandOpen(false);
    inputRef.current?.focus();
  }, []);

  const showTypeSuggestions = input === "/" || isCommandOpen;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mode) return;
    console.log(`Search for "${input}" in ${mode}`);
    // Reset after search
    setInput("");
    setMode(null);
    if (!isLg) setIsMobileSearchOpen(false);
  };

  const handleMobileSearchToggle = useCallback(() => {
    setIsMobileSearchOpen((prev) => !prev);
    if (!isMobileSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isMobileSearchOpen]);

  const handleCloseMobileSearch = useCallback(() => {
    setIsMobileSearchOpen(false);
    setInput("");
    setMode(null);
    setIsCommandOpen(false);
  }, []);

  const handleClickOutside = useCallback(
    (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        handleCloseMobileSearch();
      }
    },
    [handleCloseMobileSearch]
  );

  const handleKeyDown = useCallback(
    (e) => {
      // Ctrl+K to focus the search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        if (!isLg) setIsMobileSearchOpen(true);
      }
      // Esc to unfocus
      else if (e.key === "Escape") {
        if (isCommandOpen) {
          setIsCommandOpen(false);
        } else {
          inputRef.current?.blur();
          if (!isLg) handleCloseMobileSearch();
        }
      }
      // Open command menu when typing /
      else if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsCommandOpen(true);
      }
    },
    [isCommandOpen, isLg, handleCloseMobileSearch]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (!isLg) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isLg, handleClickOutside]);

  useEffect(() => {
    if (mode && !isLg) {
      setIsMobileSearchOpen(false);
    }
  }, [mode, isLg]);

  if (!isLg && !isMobileSearchOpen) {
    return (
      <button
        onClick={handleMobileSearchToggle}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Open search"
      >
        <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <span className="sr-only">Search (Ctrl+K)</span>
      </button>
    );
  }

  return (
    <div ref={formRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`relative flex items-center transition-all duration-200 ${
            !isLg && isMobileSearchOpen
              ? "absolute left-0 right-0 bg-white dark:bg-gray-800 z-20"
              : "w-96"
          }`}
        >
          <Input
            ref={inputRef}
            placeholder={
              mode
                ? `Search in ${mode}...`
                : `Type '/' to search by category or Ctrl+K to focus`
            }
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setIsCommandOpen(e.target.value === "/");
            }}
            onFocus={() => setIsCommandOpen(input === "/")}
            onBlur={() => setTimeout(() => setIsCommandOpen(false), 200)}
            className={`${
              isLg ? "w-96" : "w-full pr-10"
            } bg-white dark:bg-gray-800 py-0 border-gray-300 dark:border-gray-600 focus:border-gray-400 dark:focus:border-gray-500 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400`}
            aria-haspopup="listbox"
            aria-expanded={showTypeSuggestions}
            aria-controls="search-commands"
          />
          {!isLg && isMobileSearchOpen && (
            <button
              type="button"
              onClick={handleCloseMobileSearch}
              className="absolute right-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          )}
          {isLg && (
            <kbd className="absolute right-2 pointer-events-none hidden lg:flex items-center gap-1 px-1.5 py-0.5 text-xs rounded border bg-muted opacity-70">
              <span className="text-xs">⌘</span>K
            </kbd>
          )}
        </div>

        {showTypeSuggestions && (
          <Command
            id="search-commands"
            className="absolute z-30 mt-1 w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md rounded-md"
            role="listbox"
          >
            <CommandList>
              {SEARCH_TYPES.map((type) => (
                <CommandItem
                  key={type.value}
                  onSelect={() => handleTypeSelect(type)}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                  role="option"
                >
                  /{type.label.toLowerCase()}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        )}
      </form>
    </div>
  );
}
