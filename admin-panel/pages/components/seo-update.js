const SEO = ({
  seoData,
  setSeoData,
  template,
  handleTemplate,
  setEditSEO,
  editSEO,
}) => {
  return (
    <div className="w-full py-2 my-4 lg:my-0 lg:py-0 lg:w-[30%] xl:w-1/4 flex px-2 gap-2 sm:flex-row flex-col lg:flex-col lg:justify-around bg-gray-100 lg:ml-1 justify-between shadow-xl border rounded-md">
      <div className="flex flex-col w-full sm:w-2/4 lg:w-full bg-white p-2 rounded shadow-lg">
        <div className="flex items-center justify-between w-full border-b py-1">
          <h2>Search Engine Listing</h2>
          <button className="text-sm" onClick={() => setEditSEO(true)}>
            Edit
          </button>
        </div>
        <div className="flex flex-col mt-1 space-y-2">
          <div className="flex flex-col mt-1">
            <label htmlFor="SEO_SLUG" className="text-sm text-gray-700">
              Slug
            </label>
            {editSEO ? (
              <div className="flex w-full items-center gap-1">
                <p className="text-gray-400">
                  {process.env.NEXT_PUBLIC_BASIC_URL}/
                </p>
                <input
                  className="border p-1 rounded text-sm bg-white w-full outline-none focus:ring-0"
                  type="text"
                  id="SEO_SLUG"
                  name="SEO_SLUG"
                  value={seoData.slug}
                  placeholder="page slug"
                  onChange={(e) =>
                    setSeoData({ ...seoData, slug: e.target.value })
                  }
                />
              </div>
            ) : (
              <p className="text-sm text-gray-500 hover:text-blue-500">
                <span>{process.env.NEXT_PUBLIC_BASIC_URL}/</span>
                {seoData.slug}
              </p>
            )}
          </div>
          <div className="flex flex-col mt-1">
            <label htmlFor="SEO_TITLE" className="text-sm text-gray-700">
              Title
            </label>
            {editSEO ? (
              <input
                className="border p-1 rounded text-sm bg-white w-full"
                type="text"
                id="SEO_TITLE"
                name="SEO_TITLE"
                value={seoData.seo_title}
                placeholder="SEO Title"
                onChange={(e) =>
                  setSeoData({ ...seoData, seo_title: e.target.value })
                }
              />
            ) : (
              <p className="text-sm text-gray-500">{seoData.seo_title}</p>
            )}
          </div>
          <div className="flex flex-col mt-1">
            <label htmlFor="SEO_DESCRIPTION" className="text-sm text-gray-700">
              Description
            </label>
            {editSEO ? (
              <textarea
                className="border p-1 rounded bg-white text-sm w-full"
                id="SEO_DESCRIPTION"
                name="SEO_DESCRIPTION"
                value={seoData.seo_description}
                placeholder="SEO Description"
                rows={5}
                onChange={(e) =>
                  setSeoData({ ...seoData, seo_description: e.target.value })
                }
              />
            ) : (
              <p className="text-sm text-gray-500">{seoData.seo_description}</p>
            )}
          </div>
          <div className="flex flex-col mt-1">
            <label htmlFor="SEO_KEYWORDS" className="text-sm text-gray-700">
              SEO Keywords
            </label>
            {editSEO ? (
              <textarea
                className="border p-1 rounded bg-white text-sm w-full"
                id="SEO_KEYWORDS"
                name="SEO_KEYWORDS"
                placeholder="Keywords specify keywords comma-separated"
                value={seoData.seo_keywords}
                rows={5}
                onChange={(e) =>
                  setSeoData({ ...seoData, seo_keywords: e.target.value })
                }
              />
            ) : (
              <p className="text-sm flex text-gray-500 flex-wrap break-all">
                {seoData.seo_keywords}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full sm:w-2/5 lg:w-full gap-1 py-4 bg-white p-2 rounded shadow-lg">
        <label htmlFor="TEMPLATE_ID">Template Id</label>
        <input
          type="text"
          className="border rounded p-1 focus:ring-0 outline-none pl-2"
          id="TEMPLATE_ID"
          placeholder="Add template...."
          value={template}
          onChange={(e) => handleTemplate(e)}
        />
      </div>
    </div>
  );
};

export default SEO;
