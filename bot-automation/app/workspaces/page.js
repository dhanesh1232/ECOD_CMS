"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreateWorkspace() {
  const { data: session } = useSession();
  const router = useRouter();
  const handleExit = () => {
    console.log(session);
    if (session.user.workspaceSlug) {
      router.push(`/${session.user.workspaceSlug}/dashboard`);
    } else {
      router.push("/");
    }
  };
  return (
    <div className="h-full w-full bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 py-4 px-6">
      <Button variant="outline" size="lg" onClick={handleExit}>
        Back
      </Button>
      <div className="flex flex-col items-center justify-center space-y-4 h-full">
        <h1>Create Workspace</h1>
      </div>
    </div>
  );
}
