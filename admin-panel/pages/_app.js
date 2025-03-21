import "@/styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "./components/layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <AuthGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthGuard>
    </SessionProvider>
  );
}

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
};
function AuthGuard({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <LoadingSpinner />;

  const isAuthPage =
    router.pathname === "/admin/login" || router.pathname === "/admin/register";

  if (!session && !isAuthPage) {
    router.push("/admin/login");
    return null;
  }

  return children;
}
