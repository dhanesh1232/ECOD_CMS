"use client";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe, Loader2 } from "lucide-react";
import { UserServices } from "@/lib/client/user";
import { useToast } from "./ui/toast-provider";
import { cn } from "@/lib/utils";
import { Virtuoso } from "react-virtuoso";
import { Input } from "./ui/input";

const ITEMS_PER_PAGE = 50;

const TimezoneSelect = ({ value = "UTC", onValueChange, className }) => {
  const [timezones, setTimezones] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadedCount, setLoadedCount] = useState(ITEMS_PER_PAGE);
  const searchInputRef = useRef(null);
  const contentRef = useRef(null);
  const toastRef = useRef(false);
  const showToast = useToast();

  const fetchTimezones = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await UserServices.getTimezone();

      if (response.status && response.status !== 200) {
        if (!toastRef.current) {
          showToast({
            description: "Failed to load timezones. Please try again later.",
            variant: "warning",
          });
          toastRef.current = true;
        }
        return;
      }

      if (Array.isArray(response)) {
        // Ensure UTC is always in the list (Etc/UTC is the IANA timezone for UTC)
        const hasUTC = response.some(
          (tz) => tz.value === "Etc/UTC" || tz.value === "UTC"
        );
        if (!hasUTC) {
          response.unshift({
            value: "UTC",
            label: "UTC (Coordinated Universal Time)",
            offsetFormatted: "UTC+00:00",
            currentTime: "",
            isDST: false,
          });
        }
        setTimezones(response);
      }
    } catch (error) {
      if (!toastRef.current) {
        showToast({
          description: "Failed to load timezones. Please try again later.",
          variant: "warning",
        });
        toastRef.current = true;
      }
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  const filteredTimezones = useMemo(() => {
    if (!searchTerm) return timezones;
    const term = searchTerm.toLowerCase();
    return timezones.filter(
      (tz) =>
        tz.label.toLowerCase().includes(term) ||
        tz.value.toLowerCase().includes(term) ||
        tz.offsetFormatted.toLowerCase().includes(term)
    );
  }, [timezones, searchTerm]);

  const visibleTimezones = useMemo(() => {
    return filteredTimezones.slice(0, loadedCount);
  }, [filteredTimezones, loadedCount]);

  const loadMore = useCallback(() => {
    if (isLoadingMore || visibleTimezones.length >= filteredTimezones.length) {
      return;
    }
    setIsLoadingMore(true);
    setTimeout(() => {
      setLoadedCount((prev) => prev + ITEMS_PER_PAGE);
      setIsLoadingMore(false);
    }, 200);
  }, [filteredTimezones.length, isLoadingMore, visibleTimezones.length]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setLoadedCount(ITEMS_PER_PAGE);
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (open) {
      setSearchTerm("");
      setLoadedCount(ITEMS_PER_PAGE);
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.target === searchInputRef.current) {
      e.stopPropagation();
    }
  };

  useEffect(() => {
    if (!timezones.length) {
      fetchTimezones();
    }
  }, [timezones.length, fetchTimezones]);

  const selectedTimezone = useMemo(() => {
    const exactMatch = timezones.find((tz) => tz.value === value);
    if (exactMatch) return exactMatch;
    if (value === "UTC") {
      return (
        timezones.find((tz) => tz.value === "Etc/UTC") || {
          value: "UTC",
          label: "UTC (Coordinated Universal Time)",
          offsetFormatted: "UTC+00:00",
          currentTime: "",
          isDST: false,
        }
      );
    }

    // Default fallback
    return {
      value: "UTC",
      label: "UTC (Coordinated Universal Time)",
      offsetFormatted: "UTC+00:00",
      currentTime: "",
      isDST: false,
    };
  }, [timezones, value]);

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      onOpenChange={handleOpenChange}
    >
      <SelectTrigger className={cn("min-w-[240px]", className)}>
        <SelectValue>
          <div className="flex items-center gap-2 truncate">
            <Globe className="h-4 w-4 shrink-0" />
            <span className="truncate">
              {selectedTimezone?.label || "UTC (Coordinated Universal Time)"}
            </span>
          </div>
        </SelectValue>
      </SelectTrigger>

      <SelectContent
        ref={contentRef}
        className="max-h-[40vh] w-[var(--radix-select-trigger-width)] p-0"
        onKeyDown={handleKeyDown}
      >
        <div className="sticky top-0 z-10 bg-background p-2 border-b">
          <div className="relative">
            <Input
              ref={searchInputRef}
              type="search"
              placeholder="Search timezones..."
              className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="py-4 text-center">
            <Loader2 className="mx-auto h-6 w-6 animate-spin" />
          </div>
        ) : filteredTimezones.length === 0 ? (
          <div className="py-3 text-center text-muted-foreground">
            {searchTerm
              ? "No matching timezones found"
              : "No timezones available"}
          </div>
        ) : (
          <div className="scrollbar-transparent">
            <Virtuoso
              style={{ height: "calc(40vh - 60px)" }}
              data={visibleTimezones}
              endReached={loadMore}
              overscan={10}
              itemContent={(index, tz) => (
                <SelectItem
                  key={tz.value}
                  value={tz.value}
                  textValue={tz.label}
                >
                  <div className="flex items-center justify-between gap-4 overflow-hidden">
                    <div className="flex-1 truncate">
                      <div className="font-medium truncate">{tz.label}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        <span className="mr-1">{tz.value}</span>
                        {tz.offsetFormatted}
                        {tz.isDST && <span className="ml-1">(DST)</span>}
                      </div>
                    </div>
                  </div>
                </SelectItem>
              )}
            />
          </div>
        )}

        {isLoadingMore && (
          <div className="flex justify-center p-2">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        )}
      </SelectContent>
    </Select>
  );
};

export default TimezoneSelect;
