import Head from "next/head";
import { useRouter } from "next/router";

const Products = () => {
  const router = useRouter();
  const renderHeaderText = () => {
    const path = router.pathname.substring(1);
    return path.charAt(0).toUpperCase() + path.slice(1);
  };
  return (
    <>
      <Head>
        <title>{`${renderHeaderText()} | ECOD`}</title>
        <meta name="description" content="Products design phase in ECOD" />
      </Head>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold text-center">{renderHeaderText()}</h1>
      </div>
    </>
  );
};

export default Products;
