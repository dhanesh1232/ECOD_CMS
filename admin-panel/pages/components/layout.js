import Sidebar from "./sidebar";
import Header from "./header";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta
          property="twitter:image"
          content="Twitter link preview image URL"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Twitter link preview title" />
        <meta
          property="twitter:description"
          content="Twitter link preview description"
        />
        <meta property="og:image" content="Link preview image URL" />
        <meta property="og:site_name" content="Link preview site name" />
        <meta property="og:title" content="Link preview title" />
        <meta property="og:description" content="Link preview description" />
        <meta property="og:url" content="Canonical link preview URL" />
      </Head>
      <div className="flex h-screen bg-white">
        <div className="flex-1 flex flex-col overflow-hidden transition-all ease-in-out duration-300">
          <Header />
          <div className="flex-1 overflow-hidden flex items-center">
            <Sidebar />
            <main className="flex-1 overflow-auto px-4 py-2 h-full w-full">
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
