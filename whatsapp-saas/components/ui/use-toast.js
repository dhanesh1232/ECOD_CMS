"use client";

import { toast } from "sonner";

export function useToast() {
  return {
    toast: (title, options = {}) => {
      const { description, variant = "default" } = options;

      if (variant === "success") {
        toast.success(title, { description });
      } else if (variant === "error") {
        toast.error(title, { description });
      } else if (variant === "warning") {
        toast.warning(title, { description });
      } else {
        toast(title, { description });
      }
    },
  };
}
