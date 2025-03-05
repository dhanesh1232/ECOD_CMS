import Footer from "./footer";
import HeaderSection from "./header";
import LowerContent from "./lower-content";

const Layout = ({ children }) => {
  return (
    <div className="h-screen w-full flex flex-col">
      <HeaderSection />

      <div className="flex flex-col md:flex-row flex-1">
        <aside className="hidden md:block md:w-[12.5%] lg:w-[10%]"></aside>

        <main className="flex-1 flex flex-col items-center justify-center">
          {children}
          <LowerContent />
        </main>
        <aside className="hidden md:block md:w-[12.5%] lg:w-[10%]"></aside>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
