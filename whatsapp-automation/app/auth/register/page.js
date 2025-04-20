"use client";
import FormPage from "@/components/profile/form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Register = () => {
  return <FormPage />;
};

export default Register;
