"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/router";

const SectionHeader = ({ text, add }) => {
  const router = useRouter();
  return (
    <div className="w-full px-2 py-1 flex items-center justify-between">
      <h1 className="text-xl md:text-2xl font-bold text-gray-600">{text}</h1>
      <button
        className="relative group"
        type="button"
        onClick={() => router.push(`/${add}/new`)}
      >
        <Plus size={24} />
        <span className="absolute -top-6 -left-2 inline-block bg-gray-600 text-white text-sm px-1 py-1 rounded opacity-0 group-hover:opacity-100 transition-all">
          Add
        </span>
      </button>
    </div>
  );
};

export default SectionHeader;
