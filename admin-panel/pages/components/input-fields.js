import EnhancedEditor from "./Sticky/editor";

const InputData = ({ title, content, date, handleChange }) => {
  const formattedDate = date
    ? new Date(date).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];
  return (
    <div className="w-full lg:w-[70%] xl:w-3/4 flex flex-col space-y-2 border p-4 py-4 rounded-lg shadow-sm bg-white">
      {/* Title & Date Input */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col w-full sm:w-3/4">
          <label className="text-sm md:text-base font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="e.g. About Us, Sizing Chart, Faq's"
          />
        </div>
        <div className="flex flex-col w-full sm:w-1/4">
          <label className="text-sm md:text-base font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={formattedDate}
            onChange={(e) => handleChange("updated_date", e.target.value)}
            className="w-full px-4 py-2 text-base text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Content Editor */}
      <div className="flex flex-col">
        <label className="text-sm md:text-base font-medium text-gray-700 mb-1">
          Content
        </label>
        <EnhancedEditor content={content} handleChange={handleChange} />
      </div>
    </div>
  );
};

export default InputData;
