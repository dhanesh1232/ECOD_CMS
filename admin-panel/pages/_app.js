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

function AuthGuard({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;

  const isAuthPage =
    router.pathname === "/admin/login" || router.pathname === "/admin/register";

  if (!session && !isAuthPage) {
    router.push("/admin/login");
    return null;
  }

  return children;
}
