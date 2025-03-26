"use client";

import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { searchData } from "@/data/search-data";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";
import Image from "next/image";
import BackAndForward from "../components/Reusable/back-forw";

const SearchPage = () => {
  const router = useRouter();
  const { q } = router.query;
  const [isLoading, setIsLoading] = useState(false);

  // Memoized search function for performance
  const searchContent = useMemo(() => {
    return (query, content) => {
      if (!query) return [];

      const lowerCaseQuery = query.toLowerCase();
      return content
        .filter((item) => {
          // Combine all searchable fields
          const searchFields = [
            item.title,
            item.description,
            item.content || "",
            item.keywords || "",
            item.category || "",
            item.parent_service || "",
          ]
            .join(" ")
            .toLowerCase();

          return searchFields.includes(lowerCaseQuery);
        })
        .sort((a, b) => {
          // Prioritization logic
          const aTitleExact = a.title.toLowerCase() === lowerCaseQuery;
          const bTitleExact = b.title.toLowerCase() === lowerCaseQuery;
          if (aTitleExact !== bTitleExact) return aTitleExact ? -1 : 1;

          const aTitleMatch = a.title.toLowerCase().includes(lowerCaseQuery);
          const bTitleMatch = b.title.toLowerCase().includes(lowerCaseQuery);
          if (aTitleMatch !== bTitleMatch) return aTitleMatch ? -1 : 1;

          const typePriority = { service: 0, blog: 1, "sub-service": 2 };
          return typePriority[a.type] - typePriority[b.type];
        });
    };
  }, []);

  // Memoized results to prevent unnecessary re-renders
  const results = useMemo(() => {
    return q ? searchContent(q, searchData) : [];
  }, [q, searchContent]);

  // Group results by type
  const groupedResults = useMemo(() => {
    return results.reduce((acc, result) => {
      const type = result.type === "sub-service" ? "service" : result.type;
      if (!acc[type]) acc[type] = [];
      acc[type].push(result);
      return acc;
    }, {});
  }, [results]);

  useEffect(() => {
    if (q) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [q]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <BackAndForward forward="/contact" />
      <hr className="my-4 border-gray-200 dark:border-gray-700" />

      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center text-gray-900 dark:text-white">
          <Search className="mr-3 h-6 w-6 text-blue-600 dark:text-blue-400" />
          {q ? `Search Results for "${q}"` : "Search Our Content"}
        </h1>
        {q && (
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Found {results.length} {results.length === 1 ? "result" : "results"}
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-10">
          {Object.entries(groupedResults).map(([type, items]) => (
            <div key={type} className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 capitalize">
                {type === "blog"
                  ? "Blog Posts"
                  : `${type.charAt(0).toUpperCase() + type.slice(1)}s`}
              </h2>
              <div
                className={`grid gap-6 ${type === "blog" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}
              >
                {items.map((result, index) => (
                  <Link
                    key={index}
                    href={result.url}
                    className="group block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500"
                  >
                    <div
                      className={`h-full flex ${type === "blog" ? "flex-col" : "flex-col"}`}
                    >
                      {/* Image for blog posts */}
                      {type === "blog" && (
                        <div className="relative h-48 w-full">
                          <Image
                            src={result.image || "/images/default-blog.jpg"}
                            alt={result.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={index < 3}
                          />
                        </div>
                      )}

                      {/* Icon for services */}
                      {!type.includes("blog") && result.icon && (
                        <div className="p-4 pb-0">
                          <div
                            className={`inline-flex p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30`}
                          >
                            <span
                              className={`text-2xl ${result.color || "text-blue-600 dark:text-blue-400"}`}
                            >
                              {result.icon}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="p-5 flex-1">
                        <h3 className="text-lg capitalize font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {result.title}
                        </h3>
                        {result.description && (
                          <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-2">
                            {result.description}
                          </p>
                        )}
                        {result.parent_service && (
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Part of: {result.parent_service}
                          </p>
                        )}
                        <div className="mt-4 flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                            {type === "sub-service" ? "Service" : type}
                          </span>
                          {result.category && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                              {result.category}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : q ? (
        <div className="text-center py-16">
          <div className="mx-auto w-20 h-20 text-gray-400 dark:text-gray-500 mb-6">
            <Search className="w-full h-full" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
            No results found for{" "}
            <span className="font-semibold">{`"${q}"`}</span>
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-md mx-auto">
            Try different keywords or check your spelling. You can search for
            services, blog posts, or documentation.
          </p>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="mx-auto w-20 h-20 text-gray-400 dark:text-gray-500 mb-6">
            <Search className="w-full h-full" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
            What are you looking for?
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-md mx-auto">
            Search our services, blog posts, and documentation to find what you
            need.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
