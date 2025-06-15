"use client";

import { Switch } from "@/components/ui/switch"; // your custom Switch component
import { useDarkMode } from "@/context/context";
import { Moon, Sun } from "lucide-react"; // or wherever you place the hook

export default function ThemeSwitcher() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={darkMode}
        onCheckedChange={toggleDarkMode}
        thumbIcon={
          darkMode ? (
            <Moon className="h-4 w-4 text-gray-800" />
          ) : (
            <Sun className="h-4 w-4 text-yellow-400" />
          )
        }
        title="Toggle Theme"
      />
    </div>
  );
}
