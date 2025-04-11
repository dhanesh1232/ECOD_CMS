import TemplateList from "@/components/TemplateList";
import NewTemplateButton from "@/components/NewTemplateButton";
import TemplateCategories from "@/components/TemplateCategories";

export default function Templates() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Message Templates</h1>
        <NewTemplateButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow">
          <TemplateCategories />
        </div>
        <div className="lg:col-span-3 bg-white p-4 rounded-lg shadow">
          <TemplateList />
        </div>
      </div>
    </div>
  );
}
