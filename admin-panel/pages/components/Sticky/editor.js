import { Editor } from "@tinymce/tinymce-react";

const EnhancedEditor = ({ content, handleChange }) => {
  return (
    <div className="w-full">
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API}
        value={content}
        onEditorChange={(e) => handleChange("content", e)}
        init={{
          height: 450,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "wordcount",
            "emoticons",
            "codesample",
            "directionality",
          ],
          toolbar:
            "undo redo | formatselect blocks | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor removeformat | charmap emoticons | link image media table | codesample code | fullscreen preview | help",
          toolbar_mode: "sliding",
          content_style: `
            body { 
              font-family: Arial, sans-serif; 
              font-size: 14px; 
              height: 220px; 
              overflow-y: auto;
            }
          `,
          branding: false,
          images_upload_url: "/api/upload-image",
          automatic_uploads: true,
          file_picker_types: "image media",
          paste_data_images: true,
          media_live_embeds: true,
          templates: [
            {
              title: "Simple Paragraph",
              description: "A basic paragraph template.",
              content: "<p>This is a simple paragraph.</p>",
            },
            {
              title: "Two Columns",
              description: "A two-column layout.",
              content:
                '<div style="display: flex;"><div style="flex: 1;">Left Column</div><div style="flex: 1;">Right Column</div></div>',
            },
          ],
          codesample_languages: [
            { text: "HTML/XML", value: "markup" },
            { text: "JavaScript", value: "javascript" },
            { text: "CSS", value: "css" },
            { text: "PHP", value: "php" },
            { text: "Python", value: "python" },
            { text: "Java", value: "java" },
            { text: "C++", value: "cpp" },
          ],
          emoticons_database: "emojis",
          directionality: "ltr",
          autoresize_bottom_margin: 20,
        }}
      />
    </div>
  );
};

export default EnhancedEditor;
