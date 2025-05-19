"use client";
import { motion } from "framer-motion";
import AIFormWrapper from "@/components/auth/wrapper";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useEffect, useCallback } from "react";
import Logo from "@/components/logo";
import { decryptData } from "@/utils/encryption";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/toast-provider";

const VerifyAccount = () => {
  const showToast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState({
    email: "",
    code: "",
  });
  const [isVerify, setIsVerify] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const toastShownRef = useRef(false); // Track if toast has been shown

  // Handle URL parameters and initial verification
  useEffect(() => {
    const email = searchParams.get("email");
    const code = searchParams.get("code");

    if (email && code) {
      try {
        const enCode = decryptData(decodeURIComponent(code));
        const enMail = decryptData(decodeURIComponent(email));
        setState({
          code: enCode,
          email: enMail,
        });
      } catch (error) {
        if (!toastShownRef.current) {
          showToast({
            title: "Error",
            description: "Invalid verification link",
            variant: "destructive",
          });
          toastShownRef.current = true;
          router.push("/auth/register");
        }
      }
    } else if (!toastShownRef.current) {
      showToast({
        title: "Error",
        description: "Verification link is incomplete",
        variant: "destructive",
      });
      toastShownRef.current = true;
      router.push("/auth/register");
    }
  }, [searchParams, showToast, router]);

  // Handle verification logic
  const handleVerify = useCallback(async () => {
    if (!state.code || !state.email) {
      if (!toastShownRef.current) {
        showToast({
          title: "Error",
          description: "Verification link is incomplete",
          variant: "destructive",
        });
        toastShownRef.current = true;
      }
      return;
    }

    try {
      setIsVerify(true);
      const res = await fetch("/api/auth/verify-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: state.email, code: state.code }),
      });

      const data = await res.json();

      if (res.ok) {
        if (!toastShownRef.current) {
          showToast({
            title: "Success",
            description: data.message || "Account verified successfully",
            variant: "success",
          });
          toastShownRef.current = true;
        }

        const options = {
          email: data?.user?.email,
          password: decryptData(data?.user?.password),
          callbackUrl: "/", // Add default redirect
        };
        await signIn("credentials", options);
      } else {
        if (!toastShownRef.current) {
          let description = data.message || "Verification failed";
          let redirectPath = "/auth/register";

          if (data.errorType === "PHONE_EXISTS") {
            description = "Phone number already exists";
            redirectPath = "/auth/login";
          } else if (data.errorType === "DUPLICATE_KEY") {
            description = `${data.field} already in use`;
            redirectPath = "/auth/login";
          }

          showToast({
            title: "Error",
            description,
            variant: "destructive",
          });
          toastShownRef.current = true;
          router.push(redirectPath);
        }
      }
    } catch (err) {
      if (!toastShownRef.current) {
        showToast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
        toastShownRef.current = true;
      }
    } finally {
      setIsVerify(false);
    }
  }, [showToast, state, router]);

  // Update OTP display when code changes
  useEffect(() => {
    if (state.code?.length === 6) {
      setOtp(state.code.split(""));
    }
  }, [state.code]);

  // Auto-verify when code and email are available
  useEffect(() => {
    if (state.code && state.email) {
      handleVerify();
    }
  }, [state.code, state.email, handleVerify]);

  // Handle resend verification
  const handleResend = async () => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: state.email }),
      });

      if (!toastShownRef.current) {
        showToast({
          title: res.ok ? "Success" : "Error",
          description: res.ok
            ? "Confirmation email sent. Please check your inbox and spam folder."
            : "Failed to resend confirmation email.",
          variant: res.ok ? "success" : "warning",
        });
        toastShownRef.current = true;
      }
    } catch (error) {
      if (!toastShownRef.current) {
        showToast({
          title: "Error",
          description: "Failed to resend confirmation email.",
          variant: "warning",
        });
        toastShownRef.current = true;
      }
    }
  };

  return (
    <AIFormWrapper>
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="my-1"
        >
          <Logo hide={true} size="md" />
        </motion.div>

        <div className="w-full space-y-4 max-w-md">
          <div>
            <label className="text-white text-sm">Email</label>
            <input
              readOnly
              value={state.email || ""}
              className="rounded w-full p-2 text-blue-500 bg-gray-100 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 outline-none"
            />
          </div>

          <div>
            <label className="text-white text-sm">Verification Code</label>
            <div className="flex justify-between gap-1 sm:gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  readOnly
                  aria-label={`Verification digit ${idx + 1}`}
                  className="sm:w-10 w-8 h-10 sm:h-12 text-center text-base sm:text-xl rounded bg-gray-100 dark:bg-gray-700 text-blue-500 dark:text-white border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-400"
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            disabled={isVerify}
            onClick={handleVerify}
            className={`w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded transition ${
              isVerify ? "cursor-not-allowed opacity-85" : ""
            }`}
          >
            {isVerify ? "Verifying..." : "Verify Account"}
          </button>

          <p className="text-sm text-gray-300 text-center">
            {`Didn't receive a code?`}{" "}
            <button
              onClick={handleResend}
              className="text-indigo-300 hover:text-indigo-200"
            >
              Resend verification
            </button>
          </p>
        </div>
      </div>
    </AIFormWrapper>
  );
};

export default VerifyAccount;
