"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Mail, X, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useMediaQuery } from "@/hooks/mediaQuery";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../ui/toast";
import { Label } from "../ui/label";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { LandingPageAPIHandles } from "@/lib/client/api";
import { collectUserMetadata, getUTMParams } from "@/lib/client/metadata";
import { getCookie, setCookie } from "@/lib/client/cookies";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const NewsletterPop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFloatButton, setShowFloatButton] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    agreed: false,
  });
  const isMobile = useMediaQuery("(max-width: 768px)");
  const showToast = useToast();

  useEffect(() => {
    // Check if already subscribed
    const subscribed = localStorage.getItem("newsletterSubscribed");
    const popupDismissed = getCookie("newsletterPopupDismissed");
    console.log(subscribed, popupDismissed);
    if (subscribed) {
      setIsSubscribed(true);
      setShowFloatButton(false);
      return;
    }

    if (popupDismissed) {
      setShowFloatButton(true);
      return;
    }

    // Only show popup if not subscribed and not dismissed
    const timer = setTimeout(() => {
      setIsOpen(true);
      setShowFloatButton(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);
  const isValid = () => {
    const { name, agreed, email } = formData;

    if (!name || !agreed || !emailRegex.test(email)) {
      return false;
    }
    return true;
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowFloatButton(true);
    // Set cookie to expire in 1 day
    setCookie("newsletterPopupDismissed", "true", 1);
  };

  const handleFloatButtonClick = () => {
    setIsOpen(true);
    setShowFloatButton(false);
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const metadata = collectUserMetadata();
    const utm = getUTMParams();
    try {
      const response = await LandingPageAPIHandles.newsLetterUpdate({
        ...formData,
        source: "modal",
        metadata,
        ...utm,
        tags: ["early-access"],
      });

      if (!response.ok && response.status) {
        throw new Error("Subscription failed");
      }

      localStorage.setItem("newsletterSubscribed", "true");
      setIsSubscribed(true);
      setIsOpen(false);
      setShowFloatButton(false);

      showToast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
        variant: "success",
      });
    } catch (error) {
      showToast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) return null;

  return (
    <>
      <AnimatePresence>
        {showFloatButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="fixed left-6 bottom-6 z-[999]"
          >
            <Button
              variant="premium"
              onClick={handleFloatButtonClick}
              size={isMobile ? "icon" : "md"}
              className="rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <Mail className="h-5 w-5" />
              {!isMobile && <span className="ml-2">Subscribe</span>}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) handleClose();
          setIsOpen(open);
        }}
      >
        <DialogContent className="max-w-xs md:max-w-md p-6 rounded-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <DialogClose
              className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={handleClose}
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="sr-only">Close</span>
            </DialogClose>

            <DialogHeader>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/50"
              >
                <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <DialogTitle className="text-center text-2xl font-bold">
                  Stay Updated
                </DialogTitle>
                <DialogDescription className="text-center">
                  Join our newsletter for the latest updates.
                </DialogDescription>
              </motion.div>
            </DialogHeader>

            <motion.form
              onSubmit={handleSubmit}
              className="mt-6 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="space-y-2">
                <Label htmlFor="name" className="block font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="h-11"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="block font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="h-11"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="agreed"
                  checked={formData.agreed}
                  onCheckedChange={(checked) => {
                    setFormData({
                      ...formData,
                      agreed: checked,
                    });
                  }}
                />
                <Label htmlFor="agreed" className="ml-2 block text-sm">
                  I agree to the{" "}
                  <Link
                    href="/privacy-policy"
                    target="__blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700"
                size="lg"
                disabled={isLoading || !isValid()}
              >
                {isLoading ? (
                  "Subscribing..."
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Subscribe
                  </>
                )}
              </Button>
            </motion.form>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
};
