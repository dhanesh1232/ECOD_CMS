"use client";

import { useState, useRef, useEffect } from "react";
import { SketchPicker } from "react-color";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Palette } from "lucide-react";

export const ColorPicker = ({ color, onChange }) => {
  const [open, setOpen] = useState(false);
  const [localColor, setLocalColor] = useState(color);
  const [isDragging, setIsDragging] = useState(false);
  const pickerRef = useRef(null);

  // Sync local color with prop
  useEffect(() => {
    setLocalColor(color);
  }, [color]);

  const handleChange = (color) => {
    setLocalColor(color.hex);
    if (!isDragging) {
      onChange(color.hex);
    }
  };

  const handleChangeComplete = (color) => {
    onChange(color.hex);
    setIsDragging(false);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onChange(localColor);
    }
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[220px] justify-between px-3 font-normal hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
        >
          <div className="flex items-center">
            <motion.div
              className="h-5 w-5 rounded-full mr-3 border border-gray-300 dark:border-gray-600 shadow-sm"
              style={{ backgroundColor: color }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
            <span className="text-sm font-mono font-medium text-gray-700 dark:text-gray-300">
              {color.toUpperCase()}
            </span>
          </div>
          <Palette className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        ref={pickerRef}
        className="w-auto p-0 border-gray-200 dark:border-gray-700 shadow-xl rounded-lg overflow-hidden bg-white dark:bg-gray-900"
        align="start"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="relative">
          <SketchPicker
            color={localColor}
            onChange={handleChange}
            onChangeComplete={handleChangeComplete}
            disableAlpha={true}
            presetColors={[
              "#4F46E5",
              "#7C3AED",
              "#EC4899",
              "#F43F5E",
              "#EF4444",
              "#F97316",
              "#F59E0B",
              "#10B981",
              "#06B6D4",
              "#0EA5E9",
              "#3B82F6",
              "#64748B",
              "#000000",
              "#FFFFFF",
            ]}
            styles={{
              default: {
                picker: {
                  boxShadow: "none",
                  fontFamily: "inherit",
                  width: "240px",
                  padding: "12px 12px 6px",
                  background: "transparent",
                },
                saturation: {
                  borderRadius: "6px",
                  marginBottom: "12px",
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.05)",
                },
                hue: {
                  height: "12px",
                  borderRadius: "6px",
                  position: "relative",
                  marginBottom: "12px",
                },
                color: {
                  borderRadius: "6px",
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.05)",
                },
                activeColor: {
                  boxShadow: "0 0 0 2px var(--color)",
                },
              },
            }}
          />
          <div className="px-3 pb-3 pt-1 border-t border-gray-100 dark:border-gray-800">
            <Button size="sm" className="w-full" onClick={() => setOpen(false)}>
              <Check className="h-4 w-4 mr-2" />
              Apply Color
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
