import { useState } from "react";
import EditHeader from "../components/add_content_header";
import InputEditor from "../components/input_editor";
import SEOEditor from "../components/seo_editor";
import TemplateId from "../components/template_id";

const { default: Head } = require("next/head");

const ProcuctNewPage = () => {
  /*State Initial Values */
  const [productTitle, setProductTitle] = useState("");
  const [productContent, setProductContent] = useState("");

  /*Handle Input Changes */
  const handleTitleChange = (e) => {
    setProductTitle(e.target.value);
    console.log(e.target.value);
  };
  const handleContentChange = (e) => {
    setProductContent(e);
    console.log(e);
  };
  /*Show Save/Cancel Buttons */
  const showButtons = productTitle != "" || productContent != "";
  return (
    <>
      <Head>
        <title>New Wild Page</title>
        <meta name="description" content="A new wild page for ECOD" />
      </Head>
      <div className="w-full flex lg:flex-row flex-col space-y-5 space-x-0 lg:space-y-0 lg:space-x-5">
        <div className="w-full bg-gray-400 py-2 px-2 shadow-md">
          <EditHeader backPath={`/products`} saveButtons={showButtons} />
          <hr />
          <div className="w-full py-2 px-0 flex items-center justify-center">
            <InputEditor
              onChangeTitle={handleTitleChange}
              onChangeContent={handleContentChange}
            />
          </div>
        </div>
        <div className="w-full flex-col lg:w-2/5 bg-gray-500 py-6 px-2 flex items-center justify-center">
          <SEOEditor />
          <TemplateId />
        </div>
      </div>
    </>
  );
};

export default ProcuctNewPage;
