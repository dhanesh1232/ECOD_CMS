"use client";
const { Search } = require("lucide-react");

const SearchComponent = ({ searchValue, filterSearch }) => (
  <div className="flex justify-center mb-6">
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
      <input
        type="text"
        placeholder="Search blogs or services or Our Latest Updates..."
        value={searchValue}
        onChange={(e) => {
          filterSearch(e.target.value);
        }}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 outline-none rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-900 dark:text-white transition-colors duration-300"
      />
    </div>
  </div>
);

export default SearchComponent;
