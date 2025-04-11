"use client";
export default function WhatsAppConfiguration() {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3 className="text-lg font-medium mb-4">WhatsApp Configuration</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            WhatsApp Business Number
          </label>
          <input
            type="text"
            defaultValue="+1234567890"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Business Profile
          </label>
          <div className="mt-1 p-3 border rounded-md bg-gray-50">
            <p className="text-sm">Verified: Yes</p>
            <p className="text-sm">Business Name: My Business</p>
            <p className="text-sm">Category: Retail</p>
            <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
              Edit Business Profile
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
