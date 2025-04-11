"use client";

export default function ExportAnalytics() {
  return (
    <div className="relative">
      <button className="flex items-center space-x-1 bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-50">
        <span>📊</span>
        <span>Export</span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden">
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          PDF Report
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          CSV Data
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Excel Sheet
        </a>
      </div>
    </div>
  );
}
