"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const SectionHeader = dynamic(() => import("./components/header-section"));

const PolicyComponent = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch("/api/policies/policies");
        if (!response.ok) {
          throw new Error("Failed to fetch policies");
        }
        const data = await response.json();
        setPolicies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  if (loading) {
    return <p>Loading policies...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Head>
        <title>Privacy Policy</title>
        <meta name="description" content="Policies" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Policies" />
        <meta property="og:description" content="ECOD Policies" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_BASIC_URL}/policy`}
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Policies" />
        <meta name="twitter:description" content="ECOD Policies" />
        <meta name="twitter:image" content="/og-image.jpg" />
      </Head>
      <div className="flex items-center justify-center pt-1 flex-col">
        <SectionHeader text={"Policies"} add="policies" />
        <hr className="border w-full" />
        <div className="w-full flex items-center justify-center mt-2 flex-col">
          {policies.length > 0 ? (
            <ul className="w-full">
              {policies.map((policy) => (
                <li
                  key={policy.template_id}
                  className="w-full flex items-center justify-between border-b py-2 px-2"
                >
                  <h2>{policy.title}</h2>
                  <p>{policy.seo_description.slice(0, 15)}</p>
                  <a href={`/policies/${policy.template_id}`}>Read More</a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No policies found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PolicyComponent;
PolicyComponent.auth = true; // Ensure this is handled by your authentication system
