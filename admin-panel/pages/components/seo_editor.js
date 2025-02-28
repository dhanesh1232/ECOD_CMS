"use client";

import { Pen, X } from "lucide-react";

const SEOEditor = ({
  seoEditor,
  setSeoEditor,
  seoTitle,
  setSeoTitle,
  seoDescription,
  setSeoDescription,
  seoSlug,
  onSlugChange,
}) => {
  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]*>?/gm, "");
  };

  return (
    <div className="w-full shadow-md py-4 px-2">
      <div className="flex w-full items-center justify-between border-b border-black pb-2">
        <h2 className="font-bold">SEO Optimization</h2>
        {(seoDescription || seoTitle) && (
          <button
            className="hover:text-blue-500"
            type="button"
            onClick={() => setSeoEditor(!seoEditor)}
          >
            {seoEditor ? <X size={14} /> : <Pen size={14} />}
          </button>
        )}
      </div>

      {/* SEO Content */}
      <div className="mt-4">
        {seoEditor ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm">SEO Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="p-1 rounded w-full border focus:ring-0 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm">SEO Description</label>
              <textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="p-1 rounded w-full border focus:ring-0 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm">Slug</label>
              <input
                type="text"
                value={seoSlug}
                onChange={onSlugChange}
                className="p-1 rounded w-full border focus:ring-0 focus:outline-none"
              />
            </div>
          </div>
        ) : (
          (seoTitle || seoDescription) && (
            <div className="w-full space-y-2">
              {seoTitle && (
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-black">SEO Title:</h3>
                  <p>{seoTitle}</p>
                </div>
              )}
              {seoDescription && (
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-black">
                    SEO Description:
                  </h3>
                  <p>{stripHtmlTags(seoDescription)}</p>
                </div>
              )}
              {seoSlug && (
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-black">Slug:</h3>
                  <p className="text-blue-500 hover:cursor-pointer">
                    {`${process.env.NEXT_PUBLIC_BASIC_URL}/page/${seoSlug}`}
                  </p>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SEOEditor;
