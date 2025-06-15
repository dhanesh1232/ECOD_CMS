// components/ui/command.js
import React, { createContext, useState, useContext } from "react";

const CommandContext = createContext({
  selected: "",
  setSelected: () => {},
});

export function Command({ children, className = "" }) {
  const [selected, setSelected] = useState("");

  return (
    <CommandContext.Provider value={{ selected, setSelected }}>
      <div className={`bg-white rounded-lg border shadow-md ${className}`}>
        {children}
      </div>
    </CommandContext.Provider>
  );
}

export function CommandList({ children }) {
  return <div className="p-1">{children}</div>;
}

export function CommandItem({ children, value }) {
  const { selected, setSelected } = useContext(CommandContext);

  return (
    <div
      className={`px-4 py-2 cursor-pointer ${
        selected === value ? "bg-gray-100" : ""
      }`}
      onClick={() => setSelected(value)}
    >
      {children}
    </div>
  );
}
