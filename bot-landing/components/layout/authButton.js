"use client";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { LeadsForm } from "./leads_form";

const domain = process.env.REDIRECT_DOMAIN || "https://app.ecodrix.com";
const isLive = process.env.NEXT_PUBLIC_LIVE === "true";
export const AuthButton = ({
  className,
  isHeader = false,
  fullWidth = false,
  authState,
  size = "sm",
}) => {
  if (authState.loading) {
    return (
      <div
        className={`flex lg:flex-row flex-col items-center gap-2 ${className}`}
      >
        <Skeleton className={`h-9 w-full lg:w-20 rounded-md`} />
        <Skeleton className={`h-9 w-full lg:w-20 rounded-md`} />
      </div>
    );
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      {isLive ? (
        authState.user ? (
          <Button
            size="sm"
            variant="outline-primary"
            className={`flex items-center gap-1 ${fullWidth && "w-full"}`}
            asChild
          >
            <Link
              href={`${domain}/${authState.user.workspaceSlug}/dashboard`}
              className="flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LayoutDashboard className="h-4 w-4 mr-1" />
              Dashboard
            </Link>
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              size={size}
              className={`flex items-center gap-1 ${fullWidth && "w-full"}`}
              asChild
            >
              <Link
                href={`${domain}/auth/login`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Login
              </Link>
            </Button>
            <Button
              variant="premium"
              size={size}
              className={`flex items-center gap-1 ${fullWidth && "w-full"}`}
              asChild
            >
              <Link
                href={`${domain}/auth/register`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                Get Started <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </>
        )
      ) : (
        <LeadsForm
          buttonText={isLive ? "Get Started" : "Notify Me"}
          icon={ArrowRight}
          variant="ocean"
          iconPosition="right"
          aria-label="Notify me about the launch"
          className={`px-4 ${
            isHeader ? "py-1.5" : "py-2"
          } rounded-lg font-semibold transition-all backdrop-blur-sm flex items-center justify-center`}
        />
      )}
    </div>
  );
};
