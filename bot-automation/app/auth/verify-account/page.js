"use client";
import { motion } from "framer-motion";
import AIFormWrapper from "@/components/auth/wrapper";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import Logo from "@/components/logo";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/toast-provider";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const VerifyAccount = () => {
  const showToast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("idle"); // 'idle' | 'verifying' | 'success' | 'error'
  const toastRef = useRef(false);
  const verificationAttempted = useRef(false);

  // Handle verification logic
  const handleVerify = useCallback(
    async (email, code) => {
      if (!code || !email) {
        setVerificationStatus("error");
        if (!toastRef.current) {
          showToast({
            title: "Error",
            description: "Verification link is incomplete",
            variant: "destructive",
          });
          toastRef.current = true;
        }
        return;
      }

      try {
        setIsVerifying(true);
        setVerificationStatus("verifying");

        const result = await signIn("credentials", {
          iv: encodeURIComponent(email),
          verifyToken: encodeURIComponent(code),
          redirect: false,
          callbackUrl: "/",
        });

        if (result?.error) {
          console.error("Verification error:", result.error);
          setVerificationStatus("error");
          if (!toastRef.current) {
            showToast({
              title: "Verification Failed",
              description: result.error.includes("Invalid")
                ? "The verification link is invalid or expired. Please request a new one."
                : result.error,
              variant: "destructive",
            });
            toastRef.current = true;
          }
        } else {
          console.log(result);
          setVerificationStatus("success");
          // Small delay to show success state before redirect
          await new Promise((resolve) => setTimeout(resolve, 1500));
          router.push(result?.url || "/");
        }
      } catch (err) {
        console.error("Verification exception:", err);
        setVerificationStatus("error");
        if (!toastRef.current) {
          showToast({
            title: "Verification Error",
            description:
              err.message || "Something went wrong. Please try again.",
            variant: "destructive",
          });
          toastRef.current = true;
        }
      } finally {
        setIsVerifying(false);
      }
    },
    [showToast, router]
  );

  // Handle URL parameters and initial verification
  useEffect(() => {
    const email = searchParams.get("email");
    const code = searchParams.get("code");

    // Prevent multiple verification attempts
    if (verificationAttempted.current) return;

    if (email && code) {
      verificationAttempted.current = true;
      try {
        const decodedEmail = decodeURIComponent(email);
        const decodedCode = decodeURIComponent(code);
        handleVerify(decodedEmail, decodedCode);
      } catch (error) {
        console.error("URL decoding error:", error);
        setVerificationStatus("error");
        if (!toastRef.current) {
          showToast({
            title: "Invalid Link",
            description: "The verification link is malformed.",
            variant: "destructive",
          });
          toastRef.current = true;
        }
        router.push("/auth/register");
      }
    } else {
      setVerificationStatus("error");
      if (!toastRef.current) {
        showToast({
          title: "Missing Information",
          description: "The verification link is incomplete.",
          variant: "destructive",
        });
        toastRef.current = true;
      }
      router.push("/auth/register");
    }
  }, [searchParams, showToast, router, handleVerify]);

  return (
    <AIFormWrapper>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Logo hide={true} size="lg" />
        </motion.div>

        <div className="w-full max-w-md px-4">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-lg">
            {verificationStatus === "verifying" && (
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Loader2 className="h-12 w-12 text-indigo-500 animate-spin" />
                  <div className="absolute inset-0 rounded-full border-2 border-indigo-500/30 animate-ping"></div>
                </div>
                <h2 className="text-2xl font-bold text-white text-center">
                  Verifying Your Account
                </h2>
                <p className="text-gray-400 text-center">
                  Please wait while we verify your details...
                </p>
              </div>
            )}

            {verificationStatus === "success" && (
              <div className="flex flex-col items-center space-y-4">
                <div className="p-3 rounded-full bg-green-500/20">
                  <CheckCircle2 className="h-10 w-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-white text-center">
                  Verification Complete!
                </h2>
                <p className="text-gray-400 text-center">
                  Redirecting you to your dashboard...
                </p>
                <div className="w-full pt-4">
                  <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div className="animate-progress h-full bg-indigo-500"></div>
                  </div>
                </div>
              </div>
            )}

            {verificationStatus === "error" && (
              <div className="flex flex-col items-center space-y-4">
                <div className="p-3 rounded-full bg-red-500/20">
                  <AlertCircle className="h-10 w-10 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-white text-center">
                  Verification Failed
                </h2>
                <p className="text-gray-400 text-center">
                  {`We couldn't verify your account. Please try again.`}
                </p>
                <div className="flex flex-col w-full gap-3 pt-4">
                  <Button
                    onClick={() => router.push("/auth/register")}
                    variant="outline"
                    className="w-full"
                  >
                    Return to Registration
                  </Button>
                  <Button
                    onClick={() => {
                      const email = searchParams.get("email");
                      const code = searchParams.get("code");
                      if (email && code) {
                        handleVerify(
                          decodeURIComponent(email),
                          decodeURIComponent(code)
                        );
                      }
                    }}
                    variant="primary"
                    className="w-full"
                    disabled={isVerifying}
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Try Again"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 1.5s ease-out forwards;
        }
      `}</style>
    </AIFormWrapper>
  );
};

export default VerifyAccount;
