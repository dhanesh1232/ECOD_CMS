import { User } from "lucide-react";

export default function Header() {
  return (
    <div className="flex-1 flex justify-between items-center">
      {/* Empty div for spacing when menu button is visible */}
      <div className="md:hidden w-10"></div>

      <h2 className="text-lg font-semibold">Dashboard</h2>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <button
          className="p-2 rounded-full bg-blue-200 hover:bg-gray-100 relative"
          aria-label="Notifications"
        >
          <span>🔔</span>
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center space-x-2">
          <div className="hidden sm:block">
            <p className="text-sm font-medium">User Name</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer">
            <span>
              <User />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
