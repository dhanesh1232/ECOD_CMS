"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/toast";
import { useMediaQuery } from "@/hooks/mediaQuery";
import { Loader } from "lucide-react";
import { collectUserMetadata, getUTMParams } from "@/lib/client/metadata";
import { LandingPageAPIHandles } from "@/lib/client/api";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const NewsletterSection = () => {
  const isMobile = useMediaQuery("(max-width:640px)");
  const [sending, setSending] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const showToast = useToast();
  const toastRef = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      toastRef.current = false;
    }, 10000);
  });

  useEffect(() => {
    const subscribed = localStorage.getItem("newsletterSubscribed");
    if (subscribed) {
      setIsSubscribed(true);
      return;
    }
  }, []);

  const isValid = (mail) => emailRegex.test(mail);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const metadata = collectUserMetadata();
    const utm = getUTMParams();
    try {
      setSending(true);
      const news = await LandingPageAPIHandles.newsLetterUpdate({
        email,
        source: "landing-page",
        metadata,
        ...utm,
        tags: ["early-access"],
      });

      if (news.status && !news.ok) {
        throw new Error("Subscription failed");
      }

      localStorage.setItem("newsletterSubscribed", "true");
      setIsSubscribed(true);
      showToast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
        variant: "success",
      });
    } catch (err) {
      if (!toastRef.current) {
        showToast({
          title: "Failed",
          description: err.message || "Failed to subscribe",
          variant: "destructive",
        });
      }
    } finally {
      setSending(false);
    }
  };
  if (isSubscribed) {
    return (
      <section className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {`You're successfully subscribed to ECODrIx updates!`}
          </div>
          <h3 className="mt-6 text-xl font-medium text-gray-700 dark:text-gray-300">
            Thank you for joining our community
          </h3>
        </div>
      </section>
    );
  }
  return (
    <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join our newsletter for product updates, growth tips, and AI
              chatbot best practices.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center sm:flex-row gap-4 justify-center"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full"
                size={isMobile ? "sm" : "md"}
              />
              <Button
                type="submit"
                disabled={!email || !isValid(email) || sending}
                variant={isValid(email) ? "success" : "outline-success"}
                size={isMobile ? "sm" : "md"}
              >
                {sending ? (
                  <Loader className="animate-spin" size={16} />
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
              We respect your inbox. No spam ever.
            </p>
          </>
        </div>
      </div>
    </section>
  );
};
