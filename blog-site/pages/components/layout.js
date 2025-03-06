import dynamic from "next/dynamic";

const OfferButton = dynamic(() => import("./button-offer"));
const Footer = dynamic(() => import("./footer"));
const HeaderSection = dynamic(() => import("./header"));
const LowerContent = dynamic(() => import("./lower-content"));
const Layout = ({ children }) => {
  return (
    <div className="h-screen w-full flex flex-col relative">
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
  );
};

export default Layout;
