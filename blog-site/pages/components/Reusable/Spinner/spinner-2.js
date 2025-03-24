export default function DotsLoader() {
  return (
    <div className="flex space-x-2 justify-center items-center">
      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
    </div>
  );
}
