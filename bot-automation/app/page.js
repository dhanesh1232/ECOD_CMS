"use client";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const params = useParams();
  const workspaceId = params.workspaceId;
  const { data: session } = useSession();
  if (!session) {
    router.push("/auth/login");
  } else {
    router.push(`/${workspaceId}`);
  }
  return <h1>Redirect to Home</h1>;
};
export default Home;
