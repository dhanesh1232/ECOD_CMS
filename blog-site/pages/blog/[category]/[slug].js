import { useRouter } from "next/router";
import Head from "next/head";

const BlogPost = () => {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) {
    return <p className="text-center text-gray-600">No blog post found.</p>;
  }

  // Format slug into a proper title
  const formattedTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <Head>
        <title>{formattedTitle} | ECOD</title>
        <meta
          name="description"
          content={`Read about ${formattedTitle} on ECOD.`}
        />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-3xl font-bold text-center">{formattedTitle}</h1>
        <p className="text-lg text-gray-600 text-center mt-2">
          A detailed blog post about {formattedTitle}.
        </p>
      </div>
    </>
  );
};

export default BlogPost;
