import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const SidebarAdmin = dynamic(() => import("./Sticky/sidebar"));
const HeaderAdmin = dynamic(() => import("./Sticky/header"));

export default function Layout({ children }) {
  const router = useRouter();

  // Exclude layout for auth pages and 404 page
  const noLayoutPages = ["/admin/login", "/admin/register", "/404"];
  if (noLayoutPages.includes(router.pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="h-screen fixed top-0 left-0 inset-0 bg-black overflow-hidden">
      <HeaderAdmin />
      <div className="flex items-center bg-gray-200 rounded-t-lg h-full">
        <SidebarAdmin />
        <main className="bg-gray-50 rounded-t-lg h-full w-full md:w-3/4 lg:w-4/5">
          {children}
        </main>
      </div>
    </div>
  );
}
