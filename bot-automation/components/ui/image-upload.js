"use client";
import PropTypes from "prop-types";
import imageCompression from "browser-image-compression";
import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./button";
import Image from "next/image";
import { Trash, Upload, Image as ImageIcon } from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import { useToast } from "./toast-provider";

export const ImageUpload = ({ value, onChange }) => {
  const [preview, setPreview] = useState(value);
  const [loading, setLoading] = useState(false);
  const showToast = useToast();
  const toastRef = useRef(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setLoading(true);
        try {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result;
            if (!result.startsWith("data:image")) {
              if (!toastRef.current) {
                showToast({
                  title: "Format",
                  description: "Invalid image format",
                  variant: "destructive",
                });
                toastRef.current = true;
              }
            }
            setPreview(result);
            onChange(result);
            setLoading(false);
          };
          reader.readAsDataURL(file);
        } catch (e) {
          setLoading(false);
          if (!toastRef.current) {
            showToast({ description: e || "Upload error", variant: "warning" });
            toastRef.current = true;
          }
        }
      }
    },
    [onChange, showToast]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
  });

  const handleChangeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    open();
  };

  const handleRemoveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPreview(null);
    onChange(null);
  };

  return (
    <>
      <div className="space-y-2">
        {loading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <FaSpinner className="animate-spin h-8 w-8 text-white" />
          </div>
        )}
        {preview ? (
          <div className="relative group">
            {/* Use regular img tag for base64 images */}
            {preview.startsWith("data:image") ? (
              <img
                src={preview}
                alt="Preview"
                className="rounded-lg w-full h-48 object-cover"
              />
            ) : (
              <Image
                src={preview}
                alt="Preview"
                className="rounded-lg w-full h-48 object-cover"
                width={192}
                height={192}
              />
            )}

            <div className="absolute inset-0 bg-black/50 focus:outline-none focus:ring-0 ring-0 outline-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center  justify-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleChangeClick}
                className="flex items-center gap-1 z-10" // Add z-10 to ensure button is clickable
              >
                <input {...getInputProps()} />
                <ImageIcon className="h-4 w-4" />
                Change
              </Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={handleRemoveClick}
                className="flex items-center gap-1 z-10" // Add z-10 to ensure button is clickable
              >
                <Trash className="h-4 w-4" />
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
    ${isDragActive ? "border-primary bg-muted" : "border-muted-foreground"}`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {isDragActive
                  ? "Drop image here"
                  : "Drag image or click to upload"}
              </p>
            </div>
          </div>
        )}
      </div>
      <span className="text-xs text-gray-500 font-bold">
        Image MAX size 10MB*
      </span>
    </>
  );
};

// Add prop types
ImageUpload.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
