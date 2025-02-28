"use client";

import { useState } from "react";
import Head from "next/head";
import EditHeader from "../components/add_content_header";
import InputEditor from "../components/input_editor";
import SEOEditor from "../components/seo_editor";
import TemplateId from "../components/template_id";

const WildNewPage = () => {
  // State for page content
  const [wildTitle, setWildTitle] = useState("");
  const [wildContent, setWildContent] = useState("");

  // State for SEO settings
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoSlug, setSeoSlug] = useState("");
  const [editSEO, setSEOEdit] = useState(false);

  // State for template selection
  const [templateId, setTemplateId] = useState("");

  // Generate slug from title
  const generateSlug = (input) => {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Handle title change
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setWildTitle(newTitle);
    setSeoTitle(newTitle);
    setSeoSlug(generateSlug(newTitle));
    setTemplateId(generateSlug(newTitle));
  };

  // Handle content change
  const handleContentChange = (content) => {
    setWildContent(content);
    setSeoDescription(content.substring(0, 150));
  };

  // Handle SEO slug change
  const handleSlugChange = (e) => {
    setSeoSlug(generateSlug(e.target.value)); // Allow manual slug editing
  };

  // Handle template ID change
  const handleTemplateIdChange = (e) => {
    setTemplateId(e.target.value);
  };

  // Show save/cancel buttons conditionally
  const showButtons =
    wildTitle !== "" ||
    wildContent !== "" ||
    seoTitle !== "" ||
    seoDescription !== "" ||
    seoSlug !== "";

  return (
    <>
      <Head>
        <title>New Wild Page</title>
        <meta name="description" content="A new wild page for ECOD" />
      </Head>
      <div className="w-full flex flex-col lg:flex-row lg:space-x-5 space-y-5 lg:space-y-0">
        {/* Left Section: Input Editor */}
        <div className="w-full lg:w-3/5 xl:w-[70%] bg-gray-400 py-2 px-2 shadow-md">
          <EditHeader backPath="/wild" saveButtons={showButtons} />
          <hr />
          <div className="w-full py-2 px-0 flex items-center justify-center">
            <InputEditor
              title={wildTitle}
              content={wildContent}
              onChangeTitle={handleTitleChange}
              onChangeContent={handleContentChange}
            />
          </div>
        </div>

        {/* Right Section: SEO Editor and Template ID */}
        <div className="w-full lg:w-2/5 xl:w-[30%] flex flex-col items-center justify-start">
          <SEOEditor
            seoEditor={editSEO}
            setSeoEditor={setSEOEdit}
            seoTitle={seoTitle}
            setSeoTitle={setSeoTitle}
            seoDescription={seoDescription}
            setSeoDescription={setSeoDescription}
            seoSlug={seoSlug}
            onSlugChange={handleSlugChange}
          />
          <TemplateId
            templateId={templateId}
            onTemplateIdChange={handleTemplateIdChange}
          />
        </div>
      </div>
    </>
  );
};

export default WildNewPage;
