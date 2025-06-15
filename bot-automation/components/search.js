// components/CommandStyleSearch.js
"use client";
import { useState, useEffect, useRef } from "react";
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
  const isLg = useMediaQuery("(min-width: 1024px)");
  const inputRef = useRef(null);
  const formRef = useRef(null);

  const handleTypeSelect = (type) => {
    setMode(type.value);
    setInput("");
    if (!isLg) {
      inputRef.current?.focus();
    }
  };

  const showTypeSuggestions = input === "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mode) return;
    console.log(`Search for "${input}" in ${mode}`);
  };

  const handleMobileSearchToggle = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    if (!isMobileSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const handleClickOutside = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      setIsMobileSearchOpen(false);
    }
  };

  useEffect(() => {
    if (!isLg) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isLg]);

  useEffect(() => {
    if (mode && !isLg) {
      setIsMobileSearchOpen(false);
    }
  }, [mode, isLg]);

  const handleCloseMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setInput("");
    setMode(null);
  };

  if (!isLg && !isMobileSearchOpen) {
    return (
      <button
        onClick={handleMobileSearchToggle}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Open search"
      >
        <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
    );
  }

  return (
    <div ref={formRef} className={`relative ${isLg ? "w-full" : "w-full"}`}>
      <div
        className={`relative flex items-center transition-all duration-200 ${
          !isLg && isMobileSearchOpen
            ? "absolute left-0 right-0 bg-white dark:bg-gray-800 z-20"
            : ""
        }`}
      >
        <Input
          ref={inputRef}
          placeholder={
            mode ? `Search in ${mode}...` : `Type '/' to search by category`
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`${
            isLg ? "w-full" : "w-full pr-10"
          } bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-gray-400 dark:focus:border-gray-500 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400`}
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
      </div>

      {showTypeSuggestions && (
        <Command className="absolute z-30 mt-1 w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md rounded-md">
          <CommandList>
            {SEARCH_TYPES.map((type) => (
              <CommandItem
                key={type.value}
                onSelect={() => handleTypeSelect(type)}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                /{type.label.toLowerCase()}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      )}
    </div>
  );
}
