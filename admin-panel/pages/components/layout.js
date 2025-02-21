import Sidebar from "./sidebar";
import Header from "./header";

export default function Layout({ children }) {
  return (
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
  );
}
