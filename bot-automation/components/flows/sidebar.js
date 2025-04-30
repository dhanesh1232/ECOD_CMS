import { useCallback } from "react";
import { useReactFlow } from "reactflow";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const { setNodes } = useReactFlow();

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const addNode = useCallback(() => {
    const newNode = {
      id: `${Date.now()}`,
      type: "custom",
      data: { label: "New Node", description: "Description" },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  return (
    <div className="w-64 bg-gray-100 p-4 border-r border-gray-200">
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Nodes</h2>
        <div
          className="bg-white p-2 rounded border border-blue-200 cursor-move hover:bg-blue-50"
          onDragStart={(event) => onDragStart(event, "custom")}
          draggable
        >
          Custom Node
        </div>
      </div>
      <button
        onClick={addNode}
        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        <PlusIcon className="w-5 h-5" />
        Add Node
      </button>
    </div>
  );
}
