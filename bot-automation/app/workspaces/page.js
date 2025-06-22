import { Button } from "@/components/ui/button";

export default function CreateWorkspace() {
  return (
    <div className="h-full w-full bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 py-4 px-6">
      <Button variant="outline" size="lg">
        Back
      </Button>
      <div className="flex flex-col items-center justify-center space-y-4 h-full">
        <h1>Create Workspace</h1>
      </div>
    </div>
  );
}
