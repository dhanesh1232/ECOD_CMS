"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import SEO from "../components/seo-update";
import { stopWords } from "@/data/seo_data";
import EditorHead from "../components/editor_header";

const InputData = dynamic(() => import("../components/input-fields"), {
  loading: () => (
    <div className="flex justify-center items-center py-4">
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-500"></div>
    </div>
  ),
});

// Helper function to extract plain text from HTML
const extractPlainText = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

// Shopify-like keyword extraction
const extractKeywords = (text) => {
  const cleanedText = text.replace(/[^\w\s]/gi, "").toLowerCase();
  const words = cleanedText.split(/\s+/);
  const filteredWords = words.filter(
    (word) => word.length > 2 && !stopWords.has(word)
  );
  const wordFrequency = {};
  filteredWords.forEach((word) => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  });
  const sortedKeywords = Object.keys(wordFrequency).sort(
    (a, b) => wordFrequency[b] - wordFrequency[a]
  );
  return sortedKeywords.slice(0, 10).join(", ");
};

// Main component
const NewPolicy = () => {
  const router = useRouter();
  const [editSEO, setEditSEO] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [initialData, setInitialData] = useState({
    title: "",
    content: "",
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    slug: "",
    template_id: "",
    updated_date: new Date().toISOString().split("T")[0],
  });
  const [formData, setFormData] = useState(initialData);

  const handleChange = (field, value) => {
    console.log(field, value);
    setFormData((prevFormData) => {
      let updatedFormData = { ...prevFormData, [field]: value };

      if (field === "title") {
        if (
          !prevFormData.seo_title ||
          prevFormData.seo_title === prevFormData.title
        ) {
          updatedFormData.seo_title = value;
        }
        updatedFormData.slug = value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "");
        updatedFormData.template_id = `${updatedFormData.slug}`;
      }

      if (field === "content") {
        const plainText = extractPlainText(value);
        updatedFormData.seo_description = plainText.slice(0, 150).trim();
        updatedFormData.seo_keywords = extractKeywords(plainText);
      }

      setIsEditing(
        JSON.stringify(updatedFormData) !== JSON.stringify(initialData)
      );
      return updatedFormData;
    });
  };

  const handleSaveChanges = useCallback(async () => {
    setEditSEO(false);
    const formattedData = {
      template_id: formData.template_id,
      title: formData.title,
      content: formData.content,
      seo_title: formData.seo_title,
      seo_description: formData.seo_description,
      seo_keywords: formData.seo_keywords,
      slug: formData.slug,
      updated_date: formData.updated_date,
    };

    try {
      const response = await fetch("/api/policies/policies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        console.log("Policy saved successfully");
        router.push(`/policies/${formData.template_id}`);
      } else {
        console.error("Failed to save policy");
      }
    } catch (error) {
      console.error("Error saving policy:", error);
    }
  }, [formData, router]);

  const handleDiscardChanges = useCallback(() => {
    setEditSEO(false);
    setFormData(initialData);
    setIsEditing(false);
  }, [initialData]);

  return (
    <div className="flex flex-col items-center sm:px-2 px-1 py-2">
      <EditorHead
        title="New Policy"
        handleSaveChanges={handleSaveChanges}
        handleDiscardChanges={handleDiscardChanges}
        nav="policies"
        show_button={isEditing}
      />
      <hr className="border w-full my-2" />
      <div className="flex flex-col lg:flex-row w-full overflow-auto max-h-[600px] pb-14">
        <InputData
          title={formData.title}
          content={formData.content}
          handleChange={handleChange}
          date={formData.updated_date}
        />
        <SEO
          seoData={formData}
          template={formData.template_id}
          handleChange={handleChange}
          editSEO={editSEO}
          setEditSEO={setEditSEO}
        />
      </div>
    </div>
  );
};

export default NewPolicy;
