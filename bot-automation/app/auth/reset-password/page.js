"use client";
import dynamic from "next/dynamic";
const FormComponent = dynamic(() => import("@/components/auth/form"), {
  ssr: false,
});
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    if (!token && !email) {
      router.push("/auth/login");
    }
  });

  return <FormComponent />;
}
