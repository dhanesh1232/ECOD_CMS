"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { MoveRight } from "lucide-react";

const SectionHeader = dynamic(() => import("./components/header-section"));

const PolicyComponent = () => {
  const router = useRouter();
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

  const formatedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

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
        <div className="w-full flex items-center justify-center flex-col">
          {policies.length > 0 ? (
            <table className="w-full border-collapse border border-gray-200 shadow-md">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Title
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Updated Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {policies.map((policy) => (
                  <tr
                    key={policy.template_id}
                    className="hover:bg-blue-50 transition"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      <Link
                        href={`/policies/${policy.template_id}`}
                        className="text-blue-600"
                      >
                        {policy.title}
                      </Link>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {formatedDate(policy.updated_date)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          router.push(`/policies/${policy.template_id}`)
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                      >
                        <MoveRight size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
