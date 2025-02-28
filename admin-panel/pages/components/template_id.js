"use client";

import { Pen, X } from "lucide-react";
import { useState } from "react";

const TemplateId = ({ templateId, onTemplateIdChange }) => {
  const [editTemplate, setEditTemplate] = useState(false);

  return (
    <div className="shadow-md w-full py-6 px-2 mt-4">
      <div className="flex w-full items-center justify-between border-b border-black pb-2">
        <h2 className="font-bold">Page Template</h2>
        {templateId && (
          <button
            className="hover:text-blue-500"
            type="button"
            onClick={() => setEditTemplate(!editTemplate)}
          >
            {editTemplate ? <X /> : <Pen size={14} />}
          </button>
        )}
      </div>

      {editTemplate ? (
        <div className="mt-4">
          <label className="text-sm">Template ID</label>
          <input
            type="text"
            value={templateId}
            onChange={onTemplateIdChange}
            className="p-1 rounded w-full border focus:ring-0 focus:outline-none"
          />
        </div>
      ) : (
        templateId && (
          <div className="mt-4">
            <h3 className="text-sm font-bold text-black">Template ID:</h3>
            <p>{templateId}</p>
          </div>
        )
      )}
    </div>
  );
};

export default TemplateId;
