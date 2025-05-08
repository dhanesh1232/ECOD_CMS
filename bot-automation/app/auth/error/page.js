"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams?.error || "UnknownError";

  const errorMessages = {
    AccessDenied: "You don't have permission to sign in.",
    SignInFailed: "Sign-in attempt failed. Please check your credentials.",
    AccountNotActive: "Your account is not active. Please contact support.",
    UnknownError: "An unexpected error occurred. Please try again.",
  };

  const message = errorMessages[error] || errorMessages.UnknownError;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-semibold text-red-600 mb-4">
          Authentication Error
        </h1>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={() => router.push("/auth/login")}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl transition"
        >
          Return to Login
        </button>
      </div>
    </div>
  );
}
