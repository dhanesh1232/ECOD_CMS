import { MoveLeft } from "lucide-react";
import { useRouter } from "next/router";

const EditorHead = ({
  nav,
  title,
  show_button,
  handleSaveChanges,
  handleDiscardChanges,
  delete_button,
  handleDelete,
}) => {
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <button
          className="hover:bg-gray-300 rounded hover:shadow-inner p-2"
          onClick={() => router.push(`/${nav}`)}
        >
          <MoveLeft size={18} />
        </button>
        <h3 className="text-lg text-gray-800 font-semibold">{title}</h3>
      </div>

      <div className="flex items-center justify-center space-x-2">
        {delete_button && (
          <button
            onClick={handleDelete}
            className="bg-red-600 focus:ring-2 focus:ring-red-700 hover:bg-red-500 transition transform ease-in-out duration-150 text-white px-4 rounded-md hover:shadow-inner p-1.5"
          >
            Delete
          </button>
        )}
        {show_button && (
          <button
            type="reset"
            onClick={handleDiscardChanges}
            className="bg-gray-300 text-black py-1.5 px-4 rounded-md shadow-current hover:bg-gray-400 transition ease-in-out duration-150"
          >
            Discard
          </button>
        )}
        {show_button && (
          <button
            type="button"
            onClick={handleSaveChanges}
            className="bg-black backdrop-blur-lg text-white py-1.5 px-4 rounded-md shadow-inner hover:bg-black/80 transition"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};
export default EditorHead;
