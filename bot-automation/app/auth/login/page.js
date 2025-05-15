"use client";
import dynamic from "next/dynamic";
const FormComponent = dynamic(() => import("@/components/auth/form"), {
  ssr: false,
});
export default function Login() {
  return <FormComponent />;
}
