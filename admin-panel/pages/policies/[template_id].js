import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const PolicyPage = () => {
  const router = useRouter();
  const { template_id } = router.query;
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (template_id) {
      fetch(`/api/policies/${template_id}`)
        .then((response) => response.json())
        .then((data) => {
          setPolicy(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching policy:", error);
          setLoading(false);
        });
    }
  }, [template_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!policy) {
    return <p>Policy not found</p>;
  }

  return (
    <div className="px-4 py-2">
      <h1 className="text-2xl text-center">{policy.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: policy.content }} />
      <p>SEO Title: {policy.seo_title}</p>
      <p>SEO Description: {policy.seo_description}</p>
      <p>SEO Keywords: {policy.seo_keywords}</p>
      <p>Slug: {policy.slug}</p>
    </div>
  );
};

export default PolicyPage;
