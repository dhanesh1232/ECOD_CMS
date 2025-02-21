import Head from "next/head";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();
  const renderHeaderText = () => {
    const path = router.pathname.substring(1);
    return path.charAt(0).toUpperCase() + path.slice(1);
  };
  return (
    <>
      <Head>
        <title>{`${renderHeaderText() || "Dashboard"} | ECOD`}</title>
        <meta name="description" content="Dashboard Page" />
      </Head>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold text-center">
          {renderHeaderText() || "Dashboard"}
        </h1>
      </div>
    </>
  );
};

export default Dashboard;
