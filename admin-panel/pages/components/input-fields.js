import { Editor } from "@tinymce/tinymce-react";

const InputData = ({
  title,
  content,
  changeTitleText,
  handleContentChange,
}) => {
  return (
    <div className="w-full lg:w-[70%] xl:w-3/4 flex flex-col space-y-2 border p-1 rounded-md">
      {/* Title Input */}
      <div className="flex flex-col">
        <label className="text-base text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={changeTitleText}
          className="text-base px-4 py-1 rounded-md focus:outline-none border"
          placeholder="e.g. About Us, Sizing Chart, FAQ"
        />
      </div>

      {/* Content Editor */}
      <div className="flex flex-col">
        <label className="text-base text-gray-700">Content</label>
        <div className="w-full">
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API}
            value={content}
            onEditorChange={handleContentChange}
            init={{
              height: 400,
              menubar: false,
              plugins: ["lists", "link", "autolink"],
              toolbar:
                "undo redo | formatselect | bold italic | bullist numlist | link",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InputData;
