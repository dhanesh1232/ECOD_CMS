export default function NewChatbotModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-md space-y-4 shadow-xl">
        <h2 className="text-lg font-bold">Create New Chatbot</h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Chatbot Name"
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
          />

          <select className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700">
            <option value="">Select Platform</option>
            <option>Facebook</option>
            <option>Instagram</option>
            <option>WhatsApp</option>
            <option>Web</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
