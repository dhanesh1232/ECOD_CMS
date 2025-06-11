"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select...",
}) {
  const [open, setOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState(selected || []);

  useEffect(() => {
    if (selected) {
      setInternalSelected(selected);
    }
  }, [selected]);

  const handleSelect = (value) => {
    const newSelected = internalSelected.includes(value)
      ? internalSelected.filter((item) => item !== value)
      : [...internalSelected, value];

    setInternalSelected(newSelected);
    if (onChange) {
      onChange(newSelected);
    }
  };

  const selectedLabels = internalSelected.map((value) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : value;
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          {selectedLabels?.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selectedLabels.map((label, index) => (
                <Badge key={index} variant="secondary">
                  {label}
                </Badge>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] bg-gray-50 opacity-100 dark:bg-gray-800 p-0"
        align="start"
      >
        <div className="space-y-2 p-2">
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`option-${option.value}`}
                checked={internalSelected.includes(option.value)}
                onCheckedChange={() => handleSelect(option.value)}
                className="checked:text-gray-900 dark:checked:text-gray-200"
              />
              <Label
                className="text-gray-900 dark:text-gray-100"
                htmlFor={`option-${option.value}`}
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
