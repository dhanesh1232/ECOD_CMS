import { X } from "lucide-react";

export default function Sidebar({ onClose }) {
  const navItems = [
    { name: "Dashboard", icon: "📊", href: "/dashboard" },
    { name: "Messages", icon: "💬", href: "/messages" },
    { name: "Contacts", icon: "👥", href: "/contact" },
    { name: "Templates", icon: "📝", href: "/template" },
    { name: "Analytics", icon: "📈", href: "/analytics" },
    { name: "Settings", icon: "⚙️", href: "/settings" },
  ];

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="mb-8 flex items-center space-x-2 justify-between">
        <h1 className="text-xl font-bold">WhatsApp SaaS</h1>
        <button
          type="button"
          onClick={() => {
            onClose();
          }}
          className="block md:hidden p-2 text-gray-500 hover:text-gray-700"
        >
          <X />
        </button>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span className="text-sm md:text-base">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile close button (visible only on small screens) */}
      <button className="lg:hidden mt-auto p-2 text-gray-500 hover:text-gray-700">
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
