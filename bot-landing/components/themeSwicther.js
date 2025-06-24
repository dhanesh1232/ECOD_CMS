"use client";

import { useDarkMode } from "@/context/context";
import { Moon, Sun } from "lucide-react";
import { Switch } from "./ui/swicth";

export default function ThemeSwitcher() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="flex items-center gap-2">
      <Switch
        isTheme={true}
        checked={darkMode}
        onCheckedChange={toggleDarkMode}
        thumbIcon={
          darkMode ? (
            <Moon className="h-4 w-4 text-gray-50" />
          ) : (
            <Sun className="h-4 w-4 text-gray-900" />
          )
        }
        aria-label="Toggle theme"
      />
    </div>
  );
}
