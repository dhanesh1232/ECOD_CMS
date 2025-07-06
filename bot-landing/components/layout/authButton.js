"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect } from "react";
const domain = process.env.REDIRECT_DOMAIN || "https://app.ecodrix.com";

export const AuthButton = ({ className, fullWidth = false }) => {
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/user", {
        credentials: "include",
      });
      const value = await res.json();
      console.log(value);
    };
    fetchData();
  });
  return (
    <div className={className}>
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
    </div>
  );
};
