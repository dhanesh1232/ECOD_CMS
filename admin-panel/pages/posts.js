import Head from "next/head";
import { useRouter } from "next/router";
import EditHeader from "./components/add_content_header";

const Posts = () => {
  const router = useRouter();
  const renderHeaderText = () => {
    const path = router.pathname.substring(1);
    return path.charAt(0).toUpperCase() + path.slice(1);
  };
  return (
    <>
      <Head>
        <title>{`${renderHeaderText()} | ECOD`}</title>
        <meta name="description" content="All the blog posts" />
      </Head>
      <div className="flex items-center flex-col justify-center">
        <h1 className="text-2xl font-bold text-center">{renderHeaderText()}</h1>
        <div className="w-full">
          <div className="w-full py-2 px-2 shadow-md">
            <EditHeader navPath={`/post/new`} backPath={`/`} />
            <hr />
            <div className="w-full py-2 px-0 flex items-center justify-center text-lg">
              <h1>Blog Post Cards</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Posts;
