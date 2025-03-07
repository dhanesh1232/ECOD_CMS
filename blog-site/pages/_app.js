import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("./components/layout"));
export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
        <SpeedInsights />
        <Analytics />
      </Layout>
    </>
  );
}
