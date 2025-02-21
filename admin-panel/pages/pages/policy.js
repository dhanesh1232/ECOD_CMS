"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import Head from "next/head";
import Link from "next/link";

const BASIC_URL = process.env.NEXT_PUBLIC_BASIC_URL;

const PolicyManagement = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const convertDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };
  return (
    <>
      <Head>
        <title>Policy Management System | ECOD</title>
        <meta
          name="description"
          content="Policy edit page for Policy Management System"
        />
      </Head>

      <div className="flex flex-col items-center">
        <h1 className="text-gray-800 text-lg md:text-xl lg:text-3xl">
          Policy Edit Page
        </h1>

        <div className="w-full shadow-md py-4 px-2">
          <div className="border-b border-gray-500">
            <div className="flex justify-between w-full py-2 px-1">
              <h1 className="text-base md:text-lg lg:text-xl text-gray-600">
                Policy Pages
              </h1>
              <button
                type="button"
                className="hover:text-blue-500"
                onClick={() => router.push("/pages/policy/new")}
              >
                <Plus />
              </button>
            </div>
          </div>

          <div className="py-2">
            <h1 className="text-base md:text-lg lg:text-2xl text-gray-400 text-center">
              Loading policies...
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default PolicyManagement;
