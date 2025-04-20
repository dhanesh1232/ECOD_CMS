"use client";
import FormPage from "@/components/profile/form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return <FormPage />;
};

export default LoginPage;
