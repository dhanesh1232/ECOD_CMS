import { ChevronDown, ChevronUp, MoveLeft } from "lucide-react";
import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { SketchPicker } from "react-color";
const fontFamilies = [
  // ✅ System & Web-Safe Fonts
  { name: "Default (System)", value: "system-ui" },
  { name: "Arial", value: "Arial, sans-serif" },
  { name: "Verdana", value: "Verdana, sans-serif" },
  { name: "Helvetica", value: "Helvetica, sans-serif" },
  { name: "Tahoma", value: "Tahoma, sans-serif" },
  { name: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
  { name: "Times New Roman", value: "'Times New Roman', serif" },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "Garamond", value: "'Garamond', serif" },
  { name: "Courier New", value: "'Courier New', monospace" },
  { name: "Lucida Console", value: "'Lucida Console', monospace" },

  // ✅ Popular Google Fonts
  { name: "Roboto", value: "'Roboto', sans-serif" },
  { name: "Open Sans", value: "'Open Sans', sans-serif" },
  { name: "Lato", value: "'Lato', sans-serif" },
  { name: "Montserrat", value: "'Montserrat', sans-serif" },
  { name: "Poppins", value: "'Poppins', sans-serif" },
  { name: "Nunito", value: "'Nunito', sans-serif" },
  { name: "Raleway", value: "'Raleway', sans-serif" },
  { name: "Oswald", value: "'Oswald', sans-serif" },
  { name: "Merriweather", value: "'Merriweather', serif" },
  { name: "Playfair Display", value: "'Playfair Display', serif" },
  { name: "Ubuntu", value: "'Ubuntu', sans-serif" },
  { name: "Inter", value: "'Inter', sans-serif" },
  { name: "PT Sans", value: "'PT Sans', sans-serif" },
  { name: "Fira Sans", value: "'Fira Sans', sans-serif" },
  { name: "Work Sans", value: "'Work Sans', sans-serif" },
  { name: "Dancing Script", value: "'Dancing Script', cursive" },
  { name: "Bebas Neue", value: "'Bebas Neue', cursive" },
  { name: "Comfortaa", value: "'Comfortaa', sans-serif" },
  { name: "Caveat", value: "'Caveat', cursive" },
  { name: "Pacifico", value: "'Pacifico', cursive" },
  { name: "Anton", value: "'Anton', sans-serif" },
  { name: "Lobster", value: "'Lobster', cursive" },
  { name: "Barlow", value: "'Barlow', sans-serif" },
  { name: "Rubik", value: "'Rubik', sans-serif" },
  { name: "Teko", value: "'Teko', sans-serif" },
  { name: "Josefin Sans", value: "'Josefin Sans', sans-serif" },
  { name: "Quicksand", value: "'Quicksand', sans-serif" },
  { name: "Cinzel", value: "'Cinzel', serif" },
  { name: "Karla", value: "'Karla', sans-serif" },
  { name: "Zilla Slab", value: "'Zilla Slab', serif" },
  { name: "Bitter", value: "'Bitter', serif" },
  { name: "IBM Plex Sans", value: "'IBM Plex Sans', sans-serif" },
  { name: "IBM Plex Serif", value: "'IBM Plex Serif', serif" },
  { name: "IBM Plex Mono", value: "'IBM Plex Mono', monospace" },
  { name: "Source Sans Pro", value: "'Source Sans Pro', sans-serif" },
  { name: "Source Serif Pro", value: "'Source Serif Pro', serif" },
  { name: "Source Code Pro", value: "'Source Code Pro', monospace" },
  { name: "Exo", value: "'Exo', sans-serif" },
  { name: "DM Sans", value: "'DM Sans', sans-serif" },
  { name: "DM Serif Display", value: "'DM Serif Display', serif" },
  { name: "Amatic SC", value: "'Amatic SC', cursive" },
  { name: "Special Elite", value: "'Special Elite', cursive" },
  { name: "Press Start 2P", value: "'Press Start 2P', cursive" },
];
const theme_id = "theme_ecod";
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY;

const CustomizePage = () => {
  const router = useRouter();
  const [themeData, setThemeData] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fonts, setFonts] = useState([]);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [activeColorKey, setActiveColorKey] = useState(null);
  const colorPickerRef = useRef(null);

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target)
      ) {
        setColorPickerVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch Google Fonts
  const fetchGoogleFonts = useCallback(async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`
      );
      const data = await res.json();
      if (!data.items) throw new Error("No fonts found in the response.");

      return data.items.map((font) => ({
        name: font.family,
        value: `'${font.family}', ${font.category}`,
      }));
    } catch (error) {
      console.error("Error fetching Google Fonts:", error);
      return [];
    }
  }, [API_KEY]);

  useEffect(() => {
    const fetchFonts = async () => {
      const fontList = await fetchGoogleFonts();
      setFonts([...fontFamilies, ...fontList]);
    };
    fetchFonts();
  }, [fetchGoogleFonts]);

  // Deep clone function
  const deepClone = useCallback((obj) => {
    return JSON.parse(JSON.stringify(obj));
  }, []);

  // Fetch theme data
  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const response = await fetch(
          `/api/_settings/schema_theme?theme_id=${theme_id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data?.themeData) {
          setThemeData(data.themeData.data);
          setEditedData(deepClone(data.themeData.data));
        }
      } catch (error) {
        console.error("Error loading theme settings:", error);
        setError("Failed to load theme settings. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchThemeData();
  }, [deepClone]);

  // Toggle section visibility
  const toggleSection = useCallback((sectionKey) => {
    setOpenSections((prev) => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  }, []);

  // Handle input changes
  const handleInputChange = useCallback(
    (section, key, value, isNested = false, subSection = null) => {
      setEditedData((prev) => {
        const updatedData = deepClone(prev);
        if (isNested) {
          if (!updatedData[section]) updatedData[section] = {};
          if (!updatedData[section][subSection])
            updatedData[section][subSection] = {};
          updatedData[section][subSection][key] = value;
        } else {
          updatedData[section][key] = value;
        }
        return updatedData;
      });
    },
    [deepClone]
  );

  // Check if there are changes
  const hasChanges = useCallback(() => {
    return JSON.stringify(themeData) !== JSON.stringify(editedData);
  }, [themeData, editedData]);

  // Save changes
  const saveChanges = useCallback(async () => {
    try {
      const response = await fetch("/api/_settings/schema_theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: editedData, theme_id }),
      });

      if (response.ok) {
        alert("Theme updated successfully!");
        router.reload();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save theme.");
      }
    } catch (error) {
      alert(`Error saving theme settings: ${error.message}`);
    }
  }, [editedData, router]);

  // Keyboard shortcut for saving changes
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        saveChanges();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [saveChanges]);

  // Reset changes
  const resetChanges = useCallback(() => {
    setEditedData(deepClone(themeData));
  }, [themeData, deepClone]);

  // Handle color click to show the color picker
  const handleColorClick = (
    section,
    key,
    isNested = false,
    subSection = null
  ) => {
    setActiveColorKey({ section, key, isNested, subSection });
    setColorPickerVisible(true);
  };

  // Handle color change from the color picker
  const handleColorChange = (color) => {
    if (activeColorKey) {
      const { section, key, isNested, subSection } = activeColorKey;
      handleInputChange(section, key, color.hex, isNested, subSection);
    }
  };

  // Render input field
  const renderInputField = useCallback(
    (section, key, value, isNested = false, subSection = null) => {
      const handleChange = (e) => {
        let newValue = e.target.value;

        if (value.startsWith("#")) {
          newValue = `#${newValue.replace(/#/g, "")}`;
        }

        if (value.endsWith("px")) {
          newValue = newValue.replace(/px/g, "") + "px";
        }

        handleInputChange(section, key, newValue, isNested, subSection);
      };

      return (
        <div key={key} className="flex items-center gap-4 mt-1">
          <label className="capitalize text-black w-40">
            {key.replace("_", " ")}:
          </label>
          <div className="relative flex items-center">
            {value.startsWith("#") && (
              <span className="text-gray-600 absolute left-2">#</span>
            )}

            {!key.includes("shadow") && (
              <input
                type="text"
                value={(isNested
                  ? editedData?.[section]?.[subSection]?.[key]
                  : editedData?.[section]?.[key]
                )
                  ?.replace(/^#/, "")
                  ?.replace(/px$/, "")}
                onChange={handleChange}
                className={`border p-1 w-52 pl-${
                  value.startsWith("#") ? "6" : "2"
                }`}
              />
            )}

            {key.includes("font_family") && (
              <select
                value={
                  isNested
                    ? editedData?.[section]?.[subSection]?.[key] || ""
                    : editedData?.[section]?.[key] || ""
                }
                onChange={handleChange}
                style={{
                  fontFamily:
                    editedData?.[section]?.[key] || "Arial, sans-serif",
                }}
                className="border p-1 w-40"
              >
                <option value="">Select...</option>
                {fonts.map((font, ind) => (
                  <option key={font.name + ind} value={font.value}>
                    {font.name}
                  </option>
                ))}
              </select>
            )}

            {value.endsWith("px") && (
              <span className="text-gray-600 absolute right-2">px</span>
            )}
          </div>

          {value.startsWith("#") && (
            <div className="relative">
              <div
                className="w-10 h-10 border rounded cursor-pointer"
                style={{ backgroundColor: value }}
                onClick={() =>
                  handleColorClick(section, key, isNested, subSection)
                }
              />
              {colorPickerVisible &&
                activeColorKey?.section === section &&
                activeColorKey?.key === key && (
                  <div className="absolute z-10 mt-2" ref={colorPickerRef}>
                    <SketchPicker
                      color={
                        isNested
                          ? editedData?.[section]?.[subSection]?.[key]
                          : editedData?.[section]?.[key]
                      }
                      onChangeComplete={handleColorChange}
                    />
                  </div>
                )}
            </div>
          )}
        </div>
      );
    },
    [editedData, handleInputChange, fonts, colorPickerVisible, activeColorKey]
  );

  // Render section header inside section
  const renderSection = useCallback(
    (sectionKey, sectionValue) => (
      <div className="w-full mb-6 border-b pb-2" key={sectionKey}>
        <div className="w-full flex items-center justify-between">
          <button
            type="button"
            className="w-full flex items-center justify-between"
            onClick={() => toggleSection(sectionKey)}
            aria-expanded={openSections[sectionKey]}
          >
            <h3 className="capitalize text-lg text-gray-400">
              {sectionKey.replace("_", " ")}
            </h3>
            <span>
              {openSections[sectionKey] ? <ChevronUp /> : <ChevronDown />}
            </span>
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
                  <h4 className="text-md font-semibold capitalize text-gray-600 mb-1">
                    {innerKey.replace("_", " ")}
                  </h4>
                  {Object.entries(innerValue).map(([subKey, subValue]) =>
                    renderInputField(
                      sectionKey,
                      subKey,
                      subValue,
                      true,
                      innerKey
                    )
                  )}
                </div>
              ) : (
                renderInputField(sectionKey, innerKey, innerValue)
              )
            )}
          </div>
        )}
      </div>
    ),
    [openSections, toggleSection, renderInputField]
  );

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-600">Loading theme settings...</p>
        </div>
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen px-4">
      <button type="button" onClick={() => router.push("/settings")}>
        <MoveLeft />
      </button>

      <div className="border py-2 rounded">
        <h1 className="px-2 text-base md:text-xl text-gray-800 font-bold py-2">
          Customize Theme Settings
        </h1>
        <hr className="divide-1 mb-4" />
        <div className="p-2">
          {Object.entries(themeData).map(([sectionKey, sectionValue]) =>
            renderSection(sectionKey, sectionValue)
          )}
        </div>
      </div>
      {/*If changes are made then it will automatically display on webpage*/}
      {hasChanges() && (
        <div className="mt-4 flex gap-4">
          <button
            onClick={saveChanges}
            className="px-4 py-2 bg-blue-600 text-white rounded"
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
