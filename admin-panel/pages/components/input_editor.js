import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);
const EDITOR_API = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;
const InputEditor = ({ onChangeTitle, onChangeContent }) => {
  const handleEditorChange = (content) => {
    onChangeContent(content);
  };
  return (
    <div className="w-full space-y-2">
      <div className="flex flex-col">
        <label
          htmlFor="TITLE"
          className="text-base md:text-lg text-white"
          aria-placeholder="E.g Wild, Pages, Policies...."
        >
          Title
        </label>
        <input
          placeholder="E.g Wild, Pages, Policies...."
          type="text"
          onChange={(e) => onChangeTitle(e)}
          id="TITLE"
          className="p-2 focus:outline-none rounded"
        />
      </div>
      <div className="">
        <label htmlFor="CONTENT" className="text-base md:text-lg text-white">
          Content
        </label>
        <Editor
          apiKey={EDITOR_API}
          initialValue=""
          init={{
            height: 500,
            menubar: true,
            plugins: ["image"],
            toolbar:
              "undo redo blocks | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help",
          }}
          onEditorChange={handleEditorChange}
        />
      </div>
    </div>
  );
};

export default InputEditor;
