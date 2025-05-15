import dbConnect from "@/config/dbconnect";

export default async function WorkspaceLayout({ children, params }) {
  await dbConnect();
  return <>{children}</>;
}
