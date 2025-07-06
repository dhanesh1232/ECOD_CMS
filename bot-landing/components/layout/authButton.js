"use client";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const domain = process.env.REDIRECT_DOMAIN || "https://app.ecodrix.com";

export const AuthButton = ({ className, fullWidth = false, authState }) => {
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
    <div className={`flex items-center gap-2 ${className}`}>
      {authState.user ? (
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
            size="sm"
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
            size="sm"
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
      )}
    </div>
  );
};
