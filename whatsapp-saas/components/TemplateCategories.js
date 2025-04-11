"use client";
export default function TemplateCategories() {
  const categories = [
    { name: "All Templates", count: 24 },
    { name: "Utility", count: 12 },
    { name: "Marketing", count: 6 },
    { name: "Authentication", count: 3 },
    { name: "Transaction", count: 3 },
  ];

  return (
    <div>
      <h3 className="font-medium mb-3">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <span>{category.name}</span>
            <span className="text-xs bg-gray-200 rounded-full px-2 py-1">
              {category.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
