import { MoveLeft } from "lucide-react";
import { useRouter } from "next/router";

const EdItorHead = ({ nav, handleSaveChanges, handleDiscardChanges }) => {
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
        <h3 className="text-lg text-gray-800 font-semibold">Add Page</h3>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <button
          type="reset"
          onClick={handleDiscardChanges}
          className="bg-gray-300 text-black p-1 px-4 rounded-md shadow-current hover:bg-gray-400 transition ease-in-out duration-150"
        >
          Discard
        </button>
        <button
          type="button"
          onClick={handleSaveChanges}
          className="bg-black backdrop-blur-lg text-white p-1 px-4 rounded-md shadow-inner hover:bg-black/80 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};
export default EdItorHead;
