import { FiUsers, FiCheck, FiX, FiArrowRight } from "react-icons/fi";

export default function IntegrationsPage() {
  const integrations = [
    {
      id: 1,
      name: "Zapier",
      connected: true,
      icon: "zapier",
      description: "Connect with 5000+ apps",
    },
    {
      id: 2,
      name: "Slack",
      connected: false,
      icon: "slack",
      description: "Get notifications in Slack",
    },
    {
      id: 3,
      name: "Google Sheets",
      connected: true,
      icon: "sheets",
      description: "Sync data with Google Sheets",
    },
    {
      id: 4,
      name: "HubSpot",
      connected: false,
      icon: "hubspot",
      description: "CRM integration",
    },
    {
      id: 5,
      name: "Shopify",
      connected: false,
      icon: "shopify",
      description: "E-commerce integration",
    },
    {
      id: 6,
      name: "Stripe",
      connected: true,
      icon: "stripe",
      description: "Payment processing",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FiUsers className="mr-2" /> Integrations
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="bg-white rounded-lg shadow overflow-hidden border"
          >
            <div className="p-6">
              <div className="flex items-start mb-4">
                <div
                  className={`p-3 rounded-lg mr-4 ${
                    integration.icon === "zapier"
                      ? "bg-blue-100 text-blue-600"
                      : integration.icon === "slack"
                      ? "bg-purple-100 text-purple-600"
                      : integration.icon === "sheets"
                      ? "bg-green-100 text-green-600"
                      : integration.icon === "hubspot"
                      ? "bg-orange-100 text-orange-600"
                      : integration.icon === "shopify"
                      ? "bg-green-100 text-green-800"
                      : "bg-indigo-100 text-indigo-600"
                  }`}
                >
                  {integration.icon === "zapier" && <ZapierIcon size={24} />}
                  {integration.icon === "slack" && <SlackIcon size={24} />}
                  {integration.icon === "sheets" && <SheetsIcon size={24} />}
                  {integration.icon === "hubspot" && <HubspotIcon size={24} />}
                  {integration.icon === "shopify" && <ShopifyIcon size={24} />}
                  {integration.icon === "stripe" && <StripeIcon size={24} />}
                </div>
                <div>
                  <h3 className="font-medium text-lg">{integration.name}</h3>
                  <p className="text-sm text-gray-500">
                    {integration.description}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <span
                  className={`flex items-center text-sm ${
                    integration.connected ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {integration.connected ? (
                    <>
                      <FiCheck className="mr-1" /> Connected
                    </>
                  ) : (
                    <>
                      <FiX className="mr-1" /> Not connected
                    </>
                  )}
                </span>
                <button
                  className={`flex items-center px-4 py-2 rounded-lg text-sm ${
                    integration.connected
                      ? "border text-gray-700"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {integration.connected ? "Manage" : "Connect"}
                  {!integration.connected && <FiArrowRight className="ml-2" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* API Section */}
      <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="font-medium">API Access</h2>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-medium">API Keys</h3>
              <p className="text-sm text-gray-500">
                Manage your API keys for integration
              </p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Generate New Key
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Production Key</p>
                <p className="text-sm text-gray-500">Last used 2 hours ago</p>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Copy
                </button>
                <button className="text-red-600 hover:text-red-800 text-sm">
                  Revoke
                </button>
              </div>
            </div>
            <div className="mt-2 p-3 bg-white rounded border text-sm font-mono overflow-x-auto">
              sk_live_51Jd...W3i
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Placeholder icons
const ZapierIcon = ({ size }) => (
  <div style={{ width: size, height: size }}>Z</div>
);
const SlackIcon = ({ size }) => (
  <div style={{ width: size, height: size }}>S</div>
);
const SheetsIcon = ({ size }) => (
  <div style={{ width: size, height: size }}>G</div>
);
const HubspotIcon = ({ size }) => (
  <div style={{ width: size, height: size }}>H</div>
);
const ShopifyIcon = ({ size }) => (
  <div style={{ width: size, height: size }}>S</div>
);
const StripeIcon = ({ size }) => (
  <div style={{ width: size, height: size }}>S</div>
);
