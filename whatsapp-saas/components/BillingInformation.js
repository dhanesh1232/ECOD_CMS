"use client";

export default function BillingInformation() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Billing Information</h3>
      <div className="space-y-4">
        <div className="p-3 border rounded-md bg-gray-50">
          <p className="font-medium">Current Plan: Professional</p>
          <p className="text-sm text-gray-600">
            $29/month - 5,000 messages included
          </p>
          <p className="text-sm text-gray-600">
            Next billing date: May 15, 2023
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Payment Method
          </label>
          <div className="mt-1 p-3 border rounded-md bg-gray-50">
            <p className="text-sm">Visa ending in 4242</p>
            <p className="text-sm">Expires 04/2025</p>
            <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
              Update Payment Method
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Billing History
          </label>
          <div className="mt-1 space-y-2">
            <div className="flex justify-between p-2 border-b">
              <span className="text-sm">April 15, 2023</span>
              <span className="text-sm">$29.00</span>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                Invoice
              </a>
            </div>
            <div className="flex justify-between p-2 border-b">
              <span className="text-sm">March 15, 2023</span>
              <span className="text-sm">$29.00</span>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                Invoice
              </a>
            </div>
          </div>
        </div>

        <button className="w-full bg-red-100 text-red-700 py-2 px-4 rounded-md hover:bg-red-200">
          Cancel Subscription
        </button>
      </div>
    </div>
  );
}
