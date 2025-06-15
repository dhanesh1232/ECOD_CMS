import { Badge } from "@/components/ui/badge";
import { Clock, Check, X, Archive, Pause } from "lucide-react";

/**
 * StatusBadge component for displaying coupon status with consistent styling
 * @param {Object} props
 * @param {string} props.status - Coupon status (active, upcoming, expired, archived, paused)
 * @param {string} [props.size] - Size of the badge (sm, md, lg)
 * @returns {JSX.Element}
 */
export const StatusBadge = ({ status, size = "md" }) => {
  const statusConfig = {
    active: {
      label: "Active",
      variant: "success",
      icon: <Check className="h-3 w-3" />,
    },
    upcoming: {
      label: "Upcoming",
      variant: "info",
      icon: <Clock className="h-3 w-3" />,
    },
    expired: {
      label: "Expired",
      variant: "secondary",
      icon: <X className="h-3 w-3" />,
    },
    archived: {
      label: "Archived",
      variant: "warning",
      icon: <Archive className="h-3 w-3" />,
    },
    paused: {
      label: "Paused",
      variant: "destructive",
      icon: <Pause className="h-3 w-3" />,
    },
  };

  const config = statusConfig[status] || {
    label: "Unknown",
    variant: "default",
    icon: null,
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  return (
    <Badge
      variant={config.variant}
      className={`capitalize flex items-center gap-1 ${sizeClasses[size]}`}
    >
      {config.icon}
      {config.label}
    </Badge>
  );
};
