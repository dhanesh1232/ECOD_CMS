import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { format, isBefore, setHours, setMinutes } from "date-fns";
import { useToast } from "./toast-provider";

export function TimePicker({
  value,
  onChange,
  className,
  referenceDate,
  disabled = false,
}) {
  const [hours, minutes] = value.split(":") || ["00", "00"];
  const [error, setError] = React.useState("");
  const toast = useToast();

  const handleHourChange = (newHour) => {
    const newTime = `${newHour}:${minutes}`;
    validateTime(newTime);
    onChange(newTime);
  };

  const handleMinuteChange = (newMinute) => {
    const newTime = `${hours}:${newMinute}`;
    validateTime(newTime);
    onChange(newTime);
  };

  const validateTime = (time) => {
    if (!referenceDate) return true;

    const [hours, minutes] = time.split(":");
    const selectedDateTime = new Date(referenceDate);
    selectedDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    const now = new Date();

    // Check if selected date is today
    const isToday =
      referenceDate.getDate() === now.getDate() &&
      referenceDate.getMonth() === now.getMonth() &&
      referenceDate.getFullYear() === now.getFullYear();

    if (isToday && isBefore(selectedDateTime, now)) {
      setError("Cannot select past time for today");
      toast({
        title: "Invalid Time",
        description: "Please select current or future time for today",
        variant: "destructive",
      });
      return false;
    }

    setError(null);
    return true;
  };

  // Generate time options with current time highlighted
  const generateHours = () => {
    const now = new Date();
    const currentHour = now.getHours();

    // Check if reference date is today
    const isToday =
      referenceDate &&
      referenceDate.getDate() === now.getDate() &&
      referenceDate.getMonth() === now.getMonth() &&
      referenceDate.getFullYear() === now.getFullYear();

    return Array.from({ length: 24 }, (_, i) => {
      const hour = i.toString().padStart(2, "0");
      const isPast = isToday && i < currentHour;

      return {
        value: hour,
        label: hour,
        disabled: isPast,
      };
    });
  };

  const generateMinutes = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const isToday =
      referenceDate &&
      referenceDate.getDate() === now.getDate() &&
      referenceDate.getMonth() === now.getMonth() &&
      referenceDate.getFullYear() === now.getFullYear();

    const isCurrentHour = isToday && parseInt(hours) === currentHour;

    return Array.from({ length: 60 }, (_, i) => {
      const minute = i.toString().padStart(2, "0");
      const isPast = isCurrentHour && i < currentMinute;

      return {
        value: minute,
        label: minute,
        disabled: isPast,
      };
    });
  };

  return (
    <div className="space-y-1">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-[110px] justify-start text-left font-normal",
              !value && "text-muted-foreground",
              error && "border-destructive text-destructive",
              className
            )}
          >
            <Clock className="mr-2 h-4 w-4" />
            {value ? value : "Select time"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2 text-gray-950 dark:text-gray-100">
          <div className="flex gap-2">
            <Select value={hours} onValueChange={handleHourChange}>
              <SelectTrigger className="w-[70px]">
                <span>{hours}</span>
              </SelectTrigger>
              <SelectContent className="max-h-[200px] overflow-y-auto">
                {generateHours().map((hour) => (
                  <SelectItem
                    key={hour.value}
                    value={hour.value}
                    disabled={hour.disabled}
                    className={
                      hour.disabled ? "text-muted-foreground opacity-50" : ""
                    }
                  >
                    {hour.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="flex items-center">:</span>
            <Select value={minutes} onValueChange={handleMinuteChange}>
              <SelectTrigger className="w-[70px]">
                <span>{minutes}</span>
              </SelectTrigger>
              <SelectContent className="max-h-[200px] overflow-y-auto">
                {generateMinutes().map((minute) => (
                  <SelectItem
                    key={minute.value}
                    value={minute.value}
                    disabled={minute.disabled}
                    className={
                      minute.disabled ? "text-muted-foreground opacity-50" : ""
                    }
                  >
                    {minute.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </PopoverContent>
      </Popover>
      {error && (
        <div className="flex items-center gap-1 text-destructive text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
