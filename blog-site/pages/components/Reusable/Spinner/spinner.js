export default function LoaderSpinner({
  size = "h-8 w-8",
  color = "border-blue-500",
  thickness = "border-2",
}) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full ${size} ${thickness} ${color} border-t-transparent`}
      ></div>
    </div>
  );
}
