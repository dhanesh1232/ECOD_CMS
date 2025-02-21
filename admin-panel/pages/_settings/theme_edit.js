import React, { useState, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";
import Head from "next/head";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/router";

const ThemeManager = () => {
  const router = useRouter();
  const [jsonData, setJsonData] = useState("");
  const [hasChange, setHasChange] = useState(false);

  // Load JSON from public folder
  useEffect(() => {
    fetch("/JSON/schema__json.json")
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => setJsonData(JSON.stringify(data, null, 2)))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  // Handle JSON editor changes
  function handleEditorChange(value) {
    setJsonData(value);
    setHasChange(true);
  }

  // Save Changes (POST to API)
  async function saveChanges() {
    try {
      JSON.parse(jsonData); // Validate JSON before saving

      const response = await fetch("/api/_settings/schema_theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: jsonData }),
      });

      if (response.ok) {
        alert("Theme updated successfully!");
        setHasChange(false);
      } else {
        alert("Failed to save theme.");
      }
    } catch (error) {
      alert("Invalid JSON format. Please fix it before saving.");
    }
  }

  // Reset Changes
  function resetChanges() {
    fetch("/JSON/schema__json.json")
      .then((response) => response.json())
      .then((data) => {
        setJsonData(JSON.stringify(data, null, 2));
        setHasChange(false);
      })
      .catch((error) => console.error("Error resetting JSON:", error));
  }

  // Handle Ctrl + S for Save
  const handleKeyDown = useCallback(
    (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault(); // Prevent browser save dialog
        saveChanges();
      }
    },
    [jsonData]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <Head>
        <title>Theme Manager</title>
        <meta
          name="description"
          content="A theme manager for your Next.js app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex w-full flex-col rounded-md border-2">
        <div className="w-full flex justify-between items-center px-2">
          <button type="button" onClick={() => router.push("/settings")}>
            <MoveLeft />
          </button>
          <h1>Theme Settings</h1>
          <div className="space-x-4 py-2">
            {hasChange && (
              <>
                <button
                  onClick={resetChanges}
                  className="py-1 px-4 bg-transparent border-black border rounded"
                >
                  Reset
                </button>
                <button
                  onClick={saveChanges}
                  className="py-1 px-4 bg-blue-500 text-white border rounded"
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>

        <div className="border-t h-[550px] px-2 py-1">
          <Editor
            height="500px"
            defaultLanguage="json"
            value={jsonData}
            onChange={handleEditorChange}
          />
        </div>
      </div>
    </>
  );
};

export default ThemeManager;
