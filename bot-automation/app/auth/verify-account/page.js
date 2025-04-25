"use client";
import { motion } from "framer-motion";
import AIFormWrapper from "@/components/auth/wrapper";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useEffect, useCallback } from "react";
import Logo from "@/components/logo";

const VerifyAccount = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const code = searchParams.get("code");

  const [isVerify, setIsVerify] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState(null);
  const inputRefs = useRef([]);

  const handleVerify = useCallback(async () => {
    if (!code || !email) {
      setError("Verification link is incomplete");
      return;
    }

    try {
      setIsVerify(true);
      setError(null);

      const res = await fetch("/api/auth/verify-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, email }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store verification success in session storage
        sessionStorage.setItem("accountVerified", "true");
        router.push("/auth/login?verified=true");
      } else {
        setError(data.message || "Verification failed");

        // Handle specific error cases
        if (data.errorType === "PHONE_EXISTS") {
          router.push("/auth/signup?error=phone_exists");
        } else if (data.errorType === "DUPLICATE_KEY") {
          router.push(`/auth/login?email=${encodeURIComponent(email)}`);
        }
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsVerify(false);
    }
  }, [code, email, router]);

  useEffect(() => {
    if (code?.length === 6) {
      setOtp(code.split(""));
    }
  }, [code]);

  useEffect(() => {
    if (code && email) {
      handleVerify();
    }
  }, [code, email, handleVerify]);
  const handleResend = () => {};
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
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div>
            <label className="text-white text-sm">Email</label>
            <input
              readOnly
              value={email || ""}
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
              onClick={() => handleResend()}
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
