import React, { useState, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";
import Head from "next/head";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/router";

const theme_id = "theme_ecod";
const apiStatus = {
  initial: "INITIAL",
  inProgress: "INPROGRESS",
  success: "SUCCESS",
  failed: "FAILED",
};
const ThemeManager = () => {
  const [status, setStatus] = useState(apiStatus.initial);
  const router = useRouter();
  const [jsonData, setJsonData] = useState("");
  const [initialJsonData, setInitialJsonData] = useState("");
  const [hasChange, setHasChange] = useState(false);

  // Load JSON from MongoDB
  useEffect(() => {
    setStatus(apiStatus.inProgress);
    fetch(`/api/_settings/schema_theme?theme_id=${theme_id}`)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        setStatus(apiStatus.failed);
        return response.json();
      })
      .then((data) => {
        if (data && data.themeData) {
          const jsonString = JSON.stringify(data.themeData.data, null, 2);
          setStatus(apiStatus.success);
          setInitialJsonData(jsonString);
          setJsonData(jsonString); // Ensure editor is populated
        }
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }, [theme_id]);

  // Handle JSON editor changes
  function handleEditorChange(value) {
    setJsonData(value);
    setHasChange(value !== initialJsonData); // Compare against initial data
  }

  // Save Changes (POST to API)
  async function saveChanges() {
    try {
      const parsedData = JSON.parse(jsonData); // Validate JSON before saving

      const updatedObj = {
        data: parsedData,
        theme_id: theme_id,
      };

      const response = await fetch("/api/_settings/schema_theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedObj),
      });

      if (response.ok) {
        alert("Theme updated successfully!");
        setInitialJsonData(jsonData); // Update initial state after save
        setHasChange(false);
      } else {
        const errorData = await response.json();
        alert(`Failed to save theme: ${errorData.message}`);
      }
    } catch (error) {
      alert("Invalid JSON format. Please fix it before saving.");
    }
  }

  // Reset Changes (fetch fresh data from MongoDB)
  function resetChanges() {
    fetch(`/api/_settings/schema_theme?theme_id=${theme_id}`)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (data && data.themeData) {
          const jsonString = JSON.stringify(data.themeData.data, null, 2);
          setJsonData(jsonString);
          setHasChange(false);
        }
      })
      .catch((error) => console.error("Error resetting JSON:", error));
  }

  // Handle Ctrl + S for Save
  const handleKeyDown = useCallback(
    (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        saveChanges();
      }
    },
    [jsonData]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const renderApiStatus = () => {
    switch (status) {
      case apiStatus.inProgress:
        return (
          <>
            <div className="flex justify-center items-center h-screen">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </>
        );
      case apiStatus.success:
        return (
          <>
            <Editor
              height="500px"
              defaultLanguage="json"
              value={jsonData}
              onChange={handleEditorChange}
            />
          </>
        );
      case apiStatus.failed:
        return (
          <p className="text-red-500">
            Failed to update theme. Please check your network connection.
          </p>
        );
      default:
        return null;
    }
  };
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
        <div className="w-full flex justify-between items-center px-6 py-6">
          <button type="button" onClick={() => router.push("/settings")}>
            <MoveLeft />
          </button>
          <h1 className="text-lg lg:text-xl text-gray-800">Theme Settings</h1>
          <div className="space-x-4">
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

        <div className="border-t h-[550px] px-2 py-1">{renderApiStatus()}</div>
      </div>
    </>
  );
};

export default ThemeManager;
