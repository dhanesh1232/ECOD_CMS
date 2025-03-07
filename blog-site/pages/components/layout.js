import dynamic from "next/dynamic";
import Head from "next/head";

const OfferButton = dynamic(() => import("./button-offer"));
const Footer = dynamic(() => import("./footer"));
const HeaderSection = dynamic(() => import("./header"));
const LowerContent = dynamic(() => import("./lower-content"));
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <div className="h-screen w-full flex flex-col relative overflow-auto">
        <HeaderSection />
        <div className="flex flex-col md:flex-row flex-1">
          <aside className="hidden md:block md:w-[12.5%] lg:w-[10%]"></aside>

          <main className="flex-1 flex flex-col items-center md:w-3/4 justify-center">
            {children}
            <LowerContent />
          </main>
          <aside className="hidden md:block md:w-[12.5%] lg:w-[10%]"></aside>
        </div>
        <Footer />
        <OfferButton />
      </div>
    </>
  );
};

export default Layout;
