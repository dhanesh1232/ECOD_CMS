"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import SEO from "../components/seo-update";
import EdItorHead from "../components/editor_header";

const InputData = dynamic(() => import("../components/input-fields"), {
  loading: () => <p>Loading...</p>,
});

const extractPlainText = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const NewPolicy = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [editSEO, setEditSEO] = useState(false);
  const [content, setContent] = useState("");
  const [formData, setFormData] = useState({
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    slug: "",
  });
  const [templateId, setTemplateId] = useState("");

  const handleTemplateChange = useCallback((e) => {
    setTemplateId(e.target.value);
  }, []);

  const handleTitle = useCallback((e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setFormData((prevFormData) => ({
      ...prevFormData,
      seo_title: newTitle,
      slug: newTitle.toLowerCase().replace(/ /g, "-"),
    }));
    setTemplateId(newTitle.toLowerCase().replace(/ /g, "-"));
  }, []);

  const handleContent = useCallback((newValue) => {
    setContent(newValue);
    setFormData((prevFormData) => ({
      ...prevFormData,
      seo_description: extractPlainText(newValue).substring(0, 150),
      seo_keywords: extractPlainText(newValue)
        .substring(10, 100)
        .replace(/ /g, ","),
    }));
  }, []);

  const handleSaveChanges = useCallback(async () => {
    setEditSEO(false);

    // Prepare the data to be saved
    const formatedData = {
      template_id: templateId, // Use template_id as the unique identifier
      title,
      content,
      seo_title: formData.seo_title,
      seo_description: formData.seo_description,
      seo_keywords: formData.seo_keywords,
      slug: formData.slug,
    };

    // Save the data to MongoDB via an API route
    try {
      const response = await fetch("/api/policies/policies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formatedData),
      });

      if (response.ok) {
        console.log("Policy saved successfully");
        // Navigate to the new path using template_id
        router.push(`/policies/${templateId}`);
      } else {
        console.error("Failed to save policy");
      }
    } catch (error) {
      console.error("Error saving policy:", error);
    }
  }, [formData, templateId, title, content, router]);

  const handleDiscardChanges = useCallback(() => {
    setEditSEO(false);
    setFormData({
      seo_title: "",
      seo_description: "",
      seo_keywords: "",
      slug: "",
    });
    setTemplateId("");
    setTitle("");
    setContent("");
  }, []);

  return (
    <div className="flex flex-col items-center sm:px-2 px-1 py-2">
      <EdItorHead
        handleSaveChanges={handleSaveChanges}
        handleDiscardChanges={handleDiscardChanges}
        nav="policies"
      />
      <hr className="border w-full my-2" />
      {/*Input Fields Actions*/}
      <div className="flex flex-col lg:flex-row w-full overflow-auto max-h-[600px] pb-14">
        <InputData
          title={title}
          content={content}
          changeTitleText={handleTitle}
          handleContentChange={handleContent}
        />
        <SEO
          seoData={formData}
          template={templateId}
          handleTemplate={handleTemplateChange}
          setSeoData={setFormData}
          editSEO={editSEO}
          setEditSEO={setEditSEO}
        />
      </div>
    </div>
  );
};

export default NewPolicy;
