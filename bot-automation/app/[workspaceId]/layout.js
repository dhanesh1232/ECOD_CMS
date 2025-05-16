import dbConnect from "@/config/dbconnect";

export default async function WorkspaceLayout({ children, params }) {
  await dbConnect();
  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden">
      {children}
    </div>
  );
}
