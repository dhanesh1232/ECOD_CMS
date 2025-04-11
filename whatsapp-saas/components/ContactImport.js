"use client";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner"; // Import from sonner directly
import { Progress } from "@/components/ui/progress";
import { Loader2, FileUp, Users, Plus } from "lucide-react";

export default function ContactImport() {
  const [isOpen, setIsOpen] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [importType, setImportType] = useState(null);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  // Example usage:
  const handleSuccess = () => {
    toast.success("Contacts imported successfully!");
  };

  const handleError = () => {
    toast.error("Failed to import contacts");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImport = (type) => {
    setImportType(type);
    setIsImporting(true);
    setImportProgress(0);

    // Simulate import progress
    const interval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          toast.success(`${type} contacts imported successfully!`);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    setIsOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      toast.error("Please upload a CSV file");
      return;
    }

    handleImport("CSV");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main Import Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isImporting}
        className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm ${
          isImporting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isImporting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
        <span>{isImporting ? "Importing..." : "Import Contacts"}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          <button
            onClick={() => {
              fileInputRef.current.click();
              setIsOpen(false);
            }}
            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FileUp className="mr-2 h-4 w-4" />
            CSV Import
          </button>
          <button
            onClick={() => handleImport("Google Contacts")}
            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Users className="mr-2 h-4 w-4" />
            Google Contacts
          </button>
          <button
            onClick={() => handleImport("Manual Entry")}
            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Users className="mr-2 h-4 w-4" />
            Manual Entry
          </button>
        </div>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv"
        className="hidden"
      />

      {/* Progress Indicator */}
      {isImporting && (
        <div className="absolute left-0 right-0 -bottom-8">
          <div className="text-xs mb-1 text-gray-500">
            Importing {importType} ({importProgress}%)
          </div>
          <Progress value={importProgress} className="h-2" />
        </div>
      )}
    </div>
  );
}
