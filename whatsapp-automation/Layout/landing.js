"use client";
import FooterSection from "@/components/landing/footer";
import Navigation from "@/components/landing/header";
import { usePathname, useRouter } from "next/navigation";

const Landing = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  if (
    pathname.includes("/register") ||
    pathname.includes("/login") ||
    pathname.includes("/forgot-password")
  ) {
    return children;
  }
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <FooterSection />
    </>
  );
};
export default Landing;
