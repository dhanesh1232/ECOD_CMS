import { useState } from "react";
import EditHeader from "../components/add_content_header";
import InputEditor from "../components/input_editor";
import SEOEditor from "../components/seo_editor";

const { default: Head } = require("next/head");

const WildNewPage = () => {
  /*State Initial Values */
  const [wildTitle, setWildTitle] = useState("");
  const [wildContent, setWildContent] = useState("");

  /*Handle Input Changes */
  const handleTitleChange = (e) => {
    setWildTitle(e.target.value);
    console.log(e.target.value);
  };
  const handleContentChange = (e) => {
    setWildContent(e);
    console.log(e);
  };
  /*Show Save/Cancel Buttons */
  const showButtons = wildTitle != "" || wildContent != "";
  return (
    <>
      <Head>
        <title>New Wild Page</title>
        <meta name="description" content="A new wild page for ECOD" />
      </Head>
      <div className="w-full flex lg:flex-row flex-col space-y-5 space-x-0 lg:space-y-0 lg:space-x-5">
        <div className="w-full bg-gray-400 py-2 px-2 shadow-md">
          <EditHeader backPath={`/wild`} saveButtons={showButtons} />
          <hr />
          <div className="w-full py-2 px-0 flex items-center justify-center">
            <InputEditor
              onChangeTitle={handleTitleChange}
              onChangeContent={handleContentChange}
            />
          </div>
        </div>
        <div className="w-full lg:w-2/5 bg-gray-500 py-6 px-2 flex items-center justify-center">
          <SEOEditor />
        </div>
      </div>
    </>
  );
};

export default WildNewPage;
