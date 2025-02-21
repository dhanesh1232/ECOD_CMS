import React, { useState, useEffect } from "react";

const CustomizePage = () => {
  const [themeData, setThemeData] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Fetch JSON Data
  useEffect(() => {
    fetch("/JSON/schema__json.json")
      .then((response) => response.json())
      .then((data) => {
        setThemeData(data);
        setEditedData(JSON.parse(JSON.stringify(data))); // Deep copy for editing
      })
      .catch((error) => console.error("Error loading theme settings:", error));
  }, []);

  if (!themeData || !editedData) return <p>Loading theme settings...</p>;

  const handleChange = (section, key, value) => {
    setEditedData((prevData) => {
      const updatedData = { ...prevData };
      updatedData[section][key] = value;
      return updatedData;
    });
    setHasChanges(true);
  };

  // Save changes to API
  const saveChanges = async () => {
    try {
      const response = await fetch("/api/_settings/schema_theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: editedData }),
      });

      if (response.ok) {
        alert("Theme updated successfully!");
        setThemeData(editedData);
        setHasChanges(false);
      } else {
        alert("Failed to save theme.");
      }
    } catch (error) {
      alert("Error saving theme settings.");
    }
  };

  // Reset Changes
  const resetChanges = () => {
    setEditedData(JSON.parse(JSON.stringify(themeData))); // Restore original data
    setHasChanges(false);
  };

  return (
    <div
      className="p-6 min-h-screen"
      style={{
        backgroundColor: editedData.settings.background_color,
        color: editedData.settings.text_color,
        fontFamily: editedData.settings.font_family,
      }}
    >
      <h1 className="text-3xl font-bold">{editedData.theme.name}</h1>
      <p>
        <strong>Author:</strong> {editedData.theme.theme_author}
      </p>

      {/* Colors */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Colors</h2>
        {[
          "primary_color",
          "secondary_color",
          "accent_color",
          "background_color",
          "text_color",
        ].map((colorKey) => (
          <div key={colorKey} className="flex items-center space-x-2">
            <label>{colorKey.replace("_", " ")}:</label>
            <input
              type="color"
              value={editedData.settings[colorKey]}
              onChange={(e) =>
                handleChange("settings", colorKey, e.target.value)
              }
            />
            <span>{editedData.settings[colorKey]}</span>
          </div>
        ))}
      </div>

      {/* Typography */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Typography</h2>
        <label>Heading Font:</label>
        <input
          type="text"
          value={editedData.settings.typography.heading_font}
          onChange={(e) =>
            handleChange("settings", "typography", {
              ...editedData.settings.typography,
              heading_font: e.target.value,
            })
          }
        />
        <label>Body Font:</label>
        <input
          type="text"
          value={editedData.settings.typography.body_font}
          onChange={(e) =>
            handleChange("settings", "typography", {
              ...editedData.settings.typography,
              body_font: e.target.value,
            })
          }
        />
      </div>

      {/* Button Styles */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Button Styles</h2>
        <label>Background Color:</label>
        <input
          type="color"
          value={editedData.settings.button.background_color}
          onChange={(e) =>
            handleChange("settings", "button", {
              ...editedData.settings.button,
              background_color: e.target.value,
            })
          }
        />
        <label>Border Radius:</label>
        <input
          type="text"
          value={editedData.settings.button.border_radius}
          onChange={(e) =>
            handleChange("settings", "button", {
              ...editedData.settings.button,
              border_radius: e.target.value,
            })
          }
        />
      </div>

      {/* Save & Reset Buttons */}
      {hasChanges && (
        <div className="mt-6 space-x-4">
          <button
            onClick={resetChanges}
            className="py-2 px-4 bg-gray-300 rounded"
          >
            Reset
          </button>
          <button
            onClick={saveChanges}
            className="py-2 px-4 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomizePage;
