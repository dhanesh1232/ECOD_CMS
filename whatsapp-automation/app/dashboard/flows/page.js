"use client";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  FiPlus,
  FiSave,
  FiDownload,
  FiShare2,
  FiChevronDown,
  FiChevronRight,
  FiFolder,
  FiFolderPlus,
  FiTrash2,
  FiSettings,
  FiCopy,
} from "react-icons/fi";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const nodeTypes = {
  trigger: {
    bg: "bg-purple-100 dark:bg-purple-900",
    text: "text-purple-800 dark:text-purple-200",
  },
  action: {
    bg: "bg-blue-100 dark:bg-blue-900",
    text: "text-blue-800 dark:text-blue-200",
  },
  condition: {
    bg: "bg-yellow-100 dark:bg-yellow-900",
    text: "text-yellow-800 dark:text-yellow-200",
  },
  output: {
    bg: "bg-green-100 dark:bg-green-900",
    text: "text-green-800 dark:text-green-200",
  },
};

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Trigger: New Message", type: "trigger" },
    type: "input",
    className: `${nodeTypes.trigger.bg} ${nodeTypes.trigger.text} p-3 rounded-lg border-2 border-white dark:border-gray-800 shadow-md`,
  },
  {
    id: "2",
    position: { x: 0, y: 100 },
    data: { label: "Check Intent", type: "condition" },
    className: `${nodeTypes.condition.bg} ${nodeTypes.condition.text} p-3 rounded-lg border-2 border-white dark:border-gray-800 shadow-md`,
  },
  {
    id: "3",
    position: { x: 0, y: 200 },
    data: { label: "Send Response", type: "action" },
    className: `${nodeTypes.action.bg} ${nodeTypes.action.text} p-3 rounded-lg border-2 border-white dark:border-gray-800 shadow-md`,
  },
  {
    id: "4",
    position: { x: 200, y: 200 },
    data: { label: "Escalate to Human", type: "output" },
    className: `${nodeTypes.output.bg} ${nodeTypes.output.text} p-3 rounded-lg border-2 border-white dark:border-gray-800 shadow-md`,
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
];

const flowTemplates = [
  { id: "welcome", name: "Welcome Flow", description: "Greet new customers" },
  {
    id: "support",
    name: "Support Flow",
    description: "Handle customer queries",
  },
  {
    id: "feedback",
    name: "Feedback Flow",
    description: "Collect customer feedback",
  },
];

const campaigns = [
  {
    id: "summer-sale",
    name: "Summer Sale",
    status: "active",
    flows: ["welcome", "support"],
  },
  {
    id: "product-launch",
    name: "Product Launch",
    status: "draft",
    flows: ["welcome"],
  },
];

export default function FlowsBuilderPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [flowName, setFlowName] = useState("New Flow");
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeTab, setActiveTab] = useState("flows");
  const [showTemplates, setShowTemplates] = useState(false);
  const [showCampaigns, setShowCampaigns] = useState(false);
  const router = useRouter();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const createNewFlow = () => {
    // Implementation for new flow creation
    setNodes(initialNodes);
    setEdges(initialEdges);
    setFlowName("New Flow");
    setSelectedNode(null);
  };

  const saveFlow = () => {
    // Implementation for saving flow
    alert(`Flow "${flowName}" saved successfully!`);
  };

  const publishFlow = () => {
    // Implementation for publishing flow
    alert(`Flow "${flowName}" published successfully!`);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={flowName}
            onChange={(e) => setFlowName(e.target.value)}
            className="text-xl font-bold border bg-transparent focus:outline-none text-gray-800 dark:text-white"
            placeholder="Flow name"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={saveFlow}
            className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-200 transition-colors"
          >
            <FiSave className="mr-2" /> Save
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-200 transition-colors">
            <FiDownload className="mr-2" /> Export
          </button>
          <button
            onClick={publishFlow}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg transition-colors"
          >
            <FiShare2 className="mr-2" /> Publish
          </button>
        </div>
      </div>

      {/* Main Flow Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab("flows")}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === "flows"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Flows
            </button>
            <button
              onClick={() => setActiveTab("campaigns")}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === "campaigns"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Campaigns
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "flows" ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    Your Flows
                  </h3>
                  <button
                    onClick={createNewFlow}
                    className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <FiPlus />
                  </button>
                </div>

                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="flex items-center w-full py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-2"
                >
                  {showTemplates ? (
                    <FiChevronDown className="mr-2" />
                  ) : (
                    <FiChevronRight className="mr-2" />
                  )}
                  Templates
                </button>

                {showTemplates && (
                  <div className="ml-4 mt-1 space-y-2">
                    {flowTemplates.map((template) => (
                      <div
                        key={template.id}
                        className="p-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <div className="font-medium text-gray-800 dark:text-gray-200">
                          {template.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {template.description}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 space-y-2">
                  <div className="flex items-center p-2 bg-gray-100 dark:bg-gray-700 rounded">
                    <FiFolder className="text-blue-500 mr-2" />
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      Main Flows
                    </span>
                  </div>
                  <div className="ml-6 p-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    Welcome Flow
                  </div>
                  <div className="ml-6 p-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    Support Flow
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    Campaigns
                  </h3>
                  <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    <FiFolderPlus />
                  </button>
                </div>

                <div className="space-y-3">
                  {campaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">
                          {campaign.name}
                        </h4>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            campaign.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {campaign.flows.length} flow
                        {campaign.flows.length !== 1 ? "s" : ""} attached
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <button className="text-xs p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                          <FiSettings size={14} />
                        </button>
                        <button className="text-xs p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                          <FiCopy size={14} />
                        </button>
                        <button className="text-xs p-1 text-red-500 hover:text-red-700">
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Flow Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            fitView
            className="bg-gray-50 dark:bg-gray-900"
          >
            <Controls className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700" />
            <Background
              variant="dots"
              gap={16}
              size={1}
              color="#e5e7eb"
              className="opacity-30 dark:opacity-10"
            />
            <Panel position="top-right" className="space-x-2">
              <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm shadow-sm">
                Zoom to Fit
              </button>
              <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm shadow-sm">
                Clear All
              </button>
            </Panel>
          </ReactFlow>
        </div>

        {/* Properties Panel */}
        <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-800 dark:text-gray-200">
              {selectedNode ? "Node Properties" : "Flow Properties"}
            </h3>
          </div>

          <div className="p-4 space-y-4">
            {selectedNode ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Node Type
                  </label>
                  <div className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                    {selectedNode.data.type}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedNode.data.label}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-800"
                  />
                </div>

                {selectedNode.data.type === "action" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Action Content
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-800"
                      rows={4}
                      placeholder="Enter action content..."
                    />
                  </div>
                )}

                {selectedNode.data.type === "condition" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Condition Logic
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-800">
                      <option>Equals</option>
                      <option>Contains</option>
                      <option>Starts With</option>
                      <option>Ends With</option>
                    </select>
                  </div>
                )}

                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg text-sm transition-colors">
                  Save Node
                </button>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Flow Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-800"
                    rows={3}
                    placeholder="Describe this flow..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tags
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-800"
                    placeholder="Add tags separated by commas"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-800">
                    <option>Draft</option>
                    <option>Active</option>
                    <option>Archived</option>
                  </select>
                </div>

                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg text-sm transition-colors">
                  Save Flow Settings
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
