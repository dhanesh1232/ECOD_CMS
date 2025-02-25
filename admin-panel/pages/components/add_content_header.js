"use client";

import { MoveLeft, Plus } from "lucide-react";
import { useRouter } from "next/router";

const EditHeader = ({ navPath, backPath, saveButtons }) => {
  const router = useRouter();
  return (
    <div className="w-full justify-between flex items-center py-2 h-[50px]">
      {backPath && (
        <button
          className=""
          type="button"
          onClick={() => router.push(`${backPath}`)}
        >
          <MoveLeft />
        </button>
      )}
      {navPath && (
        <button
          type="button"
          className=""
          onClick={() => {
            router.push(`${navPath}`);
          }}
        >
          <Plus />
        </button>
      )}
      {saveButtons && (
        <div className="space-x-4">
          <button type="reset" className="text-white py-1 px-4 border rounded">
            Discard
          </button>
          <button
            type="reset"
            className="bg-blue-500 py-1 px-4 rounded outline-none focus:outline-none text-white"
          >
            Discard
          </button>
        </div>
      )}
    </div>
  );
};

export default EditHeader;
