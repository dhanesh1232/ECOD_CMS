import HeaderAdmin from "./Sticky/header";
import SidebarAdmin from "./Sticky/sidebar";

export default function Layout({ children }) {
  return (
    <>
      <div className="h-screen fixed top-0 left-0 inset-0 bg-black overflow-hidden">
        <HeaderAdmin />
        <div className="flex items-center bg-gray-50 rounded-t-lg h-full">
          <SidebarAdmin />
          <main className="bg-gray-400 rounded-t-lg h-full w-full md:w-3/4 lg:w-4/5">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
