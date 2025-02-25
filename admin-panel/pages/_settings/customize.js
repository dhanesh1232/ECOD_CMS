import { ChevronDown, ChevronUp, MoveLeft } from "lucide-react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const theme_id = "theme_ecod";

const CustomizePage = () => {
  const router = useRouter();
  const [themeData, setThemeData] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const response = await fetch(
          `/api/_settings/schema_theme?theme_id=${theme_id}`
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        if (data?.themeData) {
          setThemeData(data.themeData.data);
          setEditedData(JSON.parse(JSON.stringify(data.themeData.data))); // Deep copy
        }
      } catch (error) {
        console.error("Error loading theme settings:", error);
      }
    };

    fetchThemeData();
  }, []);

  if (!themeData || !editedData) return <p>Loading theme settings...</p>;

  const toggleSection = (sectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const handleInputChange = (section, key, value) => {
    setEditedData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
    setHasChanges(true);
  };

  const handleNestedChange = (section, subSection, key, value) => {
    setEditedData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSection]: { ...prev[section][subSection], [key]: value },
      },
    }));
    setHasChanges(true);
  };

  const saveChanges = async () => {
    try {
      const response = await fetch("/api/_settings/schema_theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: editedData, theme_id }),
      });

      if (response.ok) {
        alert("Theme updated successfully!");
        setHasChanges(false);
      } else {
        const errorData = await response.json();
        alert(`Failed to save theme: ${errorData.message}`);
      }
    } catch (error) {
      alert("Error saving theme settings.");
    }
  };

  const resetChanges = async () => {
    try {
      const response = await fetch(
        `/api/_settings/schema_theme?theme_id=${theme_id}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      if (data?.themeData) {
        setEditedData(JSON.parse(JSON.stringify(data.themeData.data)));
        setHasChanges(false);
      }
    } catch (error) {
      console.error("Error resetting theme settings:", error);
    }
  };

  const renderInputField = (
    section,
    key,
    value,
    isNested = false,
    subSection = null
  ) => {
    const handleChange = (e) => {
      const newValue = e.target.value;
      if (isNested) {
        handleNestedChange(section, subSection, key, newValue);
      } else {
        handleInputChange(section, key, newValue);
      }
    };

    return (
      <div key={key} className="flex items-center gap-2">
        <label className="capitalize text-black w-40">
          {key.replace("_", " ")}:
        </label>
        {typeof value === "string" && value.startsWith("#") ? (
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={value}
              onChange={handleChange}
              className="w-10 h-6 border rounded"
            />
            <input
              type="text"
              value={value}
              onChange={handleChange}
              className="border p-1 w-20 text-center"
            />
          </div>
        ) : key.includes("shadow") ? (
          <input
            type="text"
            value={value}
            onChange={handleChange}
            className="border p-1 w-40"
            placeholder="e.g. 2px 4px 6px rgba(0,0,0,0.2)"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={handleChange}
            className="border p-1 w-40"
          />
        )}
      </div>
    );
  };

  const renderSection = (sectionKey, sectionValue) => (
    <div className="w-full mb-6 border-b pb-2" key={sectionKey}>
      <h2 className="text-xl font-bold text-gray-700 mb-2">
        {sectionKey.replace("_", " ")}
      </h2>
      <div className="w-full flex items-center justify-between">
        <h3 className="capitalize text-lg text-gray-400">
          {sectionKey.replace("_", " ")}
        </h3>
        <button type="button" onClick={() => toggleSection(sectionKey)}>
          {openSections[sectionKey] ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>
      {openSections[sectionKey] && (
        <div className="flex flex-col w-full mt-2">
          {Object.entries(sectionValue).map(([innerKey, innerValue]) =>
            typeof innerValue === "object" ? (
              <div
                key={innerKey}
                className="w-full border p-2 mb-2 bg-gray-50 rounded"
              >
                <h4 className="text-md font-semibold text-gray-600 mb-1">
                  {innerKey.replace("_", " ")}
                </h4>
                {Object.entries(innerValue).map(([subKey, subValue]) =>
                  renderInputField(sectionKey, subKey, subValue, true, innerKey)
                )}
              </div>
            ) : (
              renderInputField(sectionKey, innerKey, innerValue)
            )
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen px-4">
      <button type="button" onClick={() => router.push("/settings")}>
        <MoveLeft />
      </button>

      <div className="border py-2">
        <h1 className="px-2 text-base md:text-xl text-gray-800 font-bold">
          Customize Theme Settings
        </h1>
        <hr className="divide-1 mb-4" />
        <div className="p-2">
          {Object.entries(themeData).map(([sectionKey, sectionValue]) =>
            renderSection(sectionKey, sectionValue)
          )}
        </div>
      </div>

      {hasChanges && (
        <div className="mt-4 flex gap-4">
          <button
            onClick={saveChanges}
            className="px-4 py-2 bg-green-600 text-white rounded"
            disabled={!hasChanges}
          >
            Save Changes
          </button>
          <button
            onClick={resetChanges}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomizePage;
