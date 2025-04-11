export default function AccountSettings() {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3 className="text-lg font-medium mb-4">Account Information</h3>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            defaultValue="John Doe"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            defaultValue="john@example.com"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Timezone
          </label>
          <select
            defaultValue="(GMT-05:00) Eastern Time (US & Canada)"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="(GMT-12:00) International Date Line West">
              (GMT-12:00) International Date Line West
            </option>
            <option value="(GMT-05:00) Eastern Time (US & Canada)">
              (GMT-05:00) Eastern Time (US & Canada)
            </option>
            <option value="(GMT+00:00) Greenwich Mean Time">
              (GMT+00:00) Greenwich Mean Time
            </option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
