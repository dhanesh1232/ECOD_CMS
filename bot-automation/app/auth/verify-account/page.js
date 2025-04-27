"use client";
import { motion } from "framer-motion";
import AIFormWrapper from "@/components/auth/wrapper";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useEffect, useCallback } from "react";
import Logo from "@/components/logo";
import { decryptData } from "@/utils/encryption";

const VerifyAccount = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState({
    email: "",
    code: "",
  });

  const [isVerify, setIsVerify] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    const email = searchParams.get("email");
    const code = searchParams.get("code");
    if (email && code) {
      const enCode = decryptData(decodeURIComponent(code));
      const enMail = decryptData(decodeURIComponent(email));
      setState({
        code: enCode,
        email: enMail,
      });
    } else {
      router.push("/auth/register");
    }
  }, [searchParams, router]);

  const handleVerify = useCallback(async () => {
    const { email, code } = state;
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
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/auth/login");
      } else {
        setError(data.message || "Verification failed");

        // Handle specific error cases
        if (data.errorType === "PHONE_EXISTS") {
          router.push("/auth/login");
        } else if (data.errorType === "DUPLICATE_KEY") {
          router.push(`/auth/login`);
        }
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsVerify(false);
    }
  }, [state, router]);

  useEffect(() => {
    if (state.code?.length === 6) {
      setOtp(state.code.split(""));
    }
  }, [state]);

  useEffect(() => {
    if (state.code && state.email) {
      handleVerify();
    }
  }, [state, handleVerify]);
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
