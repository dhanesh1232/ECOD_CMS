import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { searchData } from "@/data/search-data";
import Link from "next/link";
import { Search } from "lucide-react";
import Image from "next/image";
import BackAndForward from "../components/Reusable/back-forw";

const SearchPage = () => {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchContent = (query, content) => {
    if (!query) return [];

    const lowerCaseQuery = query.toLowerCase();
    return content
      .filter((item) => {
        // Basic search in title and description
        const titleMatch = item.title.toLowerCase().includes(lowerCaseQuery);
        const descMatch = item.description
          .toLowerCase()
          .includes(lowerCaseQuery);

        // Search in content if available
        const contentMatch = item.content
          ? item.content.toLowerCase().includes(lowerCaseQuery)
          : false;

        // Search in keywords if available
        const keywordMatch = item.keywords
          ? item.keywords.toLowerCase().includes(lowerCaseQuery)
          : false;

        // Search in category if available
        const categoryMatch = item.category
          ? item.category.toLowerCase().includes(lowerCaseQuery)
          : false;

        // Search in parent service if available
        const parentMatch = item.parent_service
          ? item.parent_service.toLowerCase().includes(lowerCaseQuery)
          : false;

        return (
          titleMatch ||
          descMatch ||
          contentMatch ||
          keywordMatch ||
          categoryMatch ||
          parentMatch
        );
      })
      .sort((a, b) => {
        // Prioritize exact matches in title
        const aTitleExact = a.title.toLowerCase() === lowerCaseQuery;
        const bTitleExact = b.title.toLowerCase() === lowerCaseQuery;
        if (aTitleExact && !bTitleExact) return -1;
        if (!aTitleExact && bTitleExact) return 1;

        // Then prioritize title matches
        const aTitleMatch = a.title.toLowerCase().includes(lowerCaseQuery);
        const bTitleMatch = b.title.toLowerCase().includes(lowerCaseQuery);
        if (aTitleMatch && !bTitleMatch) return -1;
        if (!aTitleMatch && bTitleMatch) return 1;

        // Then prioritize service matches over sub-services and blogs
        const aIsService = a.type === "service";
        const bIsService = b.type === "service";
        if (aIsService && !bIsService) return -1;
        if (!aIsService && bIsService) return 1;

        // Then prioritize blogs over sub-services
        const aIsBlog = a.type === "blog";
        const bIsBlog = b.type === "blog";
        if (aIsBlog && !bIsBlog) return -1;
        if (!aIsBlog && bIsBlog) return 1;

        // Then prioritize description matches
        const aDescMatch = a.description.toLowerCase().includes(lowerCaseQuery);
        const bDescMatch = b.description.toLowerCase().includes(lowerCaseQuery);
        if (aDescMatch && !bDescMatch) return -1;
        if (!aDescMatch && bDescMatch) return 1;

        return 0;
      });
  };

  useEffect(() => {
    if (q) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        const searchResults = searchContent(q, searchData);
        setResults(searchResults);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [q]);

  // Group results by type for better organization
  const groupedResults = results.reduce((acc, result) => {
    const type = result.type === "sub-service" ? "service" : result.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(result);
    return acc;
  }, {});

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 min-h-screen">
      <BackAndForward forward="/contact" />
      <hr className="my-2 border-b" />
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <Search className="mr-2 h-6 w-6" />
          Search Results for {`"${q}"`}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {results.length} {results.length === 1 ? "result" : "results"} found
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-8">
          {Object.entries(groupedResults).map(([type, items]) => (
            <div key={type} className="space-y-4">
              <h2 className="text-xl font-semibold capitalize">
                {type === "sub-service"
                  ? "Services"
                  : type === "blog"
                    ? "Blog Posts"
                    : `${type}s`}
              </h2>
              <div
                className={`grid gap-4 ${type === "blog" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}
              >
                {items.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors ${type === "blog" ? "flex flex-col md:flex-row gap-4" : ""}`}
                  >
                    <Link href={result.url} className="block">
                      <div
                        className={`flex ${type === "blog" ? "items-start" : "items-start"}`}
                      >
                        {/* Blog image */}
                        {type === "blog" && result.image && (
                          <div className="w-full md:w-48 h-32 relative mb-4 md:mb-0">
                            <Image
                              src={result.image || "/images/default-blog.jpg"}
                              alt={result.title}
                              fill
                              className="rounded-lg object-cover"
                            />
                          </div>
                        )}

                        {/* Icon for services */}
                        {result.icon && !result.image && (
                          <div
                            className={`mr-3 p-2 rounded-full bg-${result.color?.replace("text-", "bg-")}/10`}
                          >
                            <span className={`text-xl ${result.color}`}>
                              {result.icon}
                            </span>
                          </div>
                        )}

                        <div className={type === "blog" ? "flex-1" : ""}>
                          <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline">
                            {result.title}
                          </h3>
                          {result.description && (
                            <p
                              className={`text-gray-600 dark:text-gray-400 ${type === "blog" ? "mt-2" : "mt-1"}`}
                            >
                              {result.description}
                            </p>
                          )}
                          {result.parent_service && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              Part of: {result.parent_service}
                            </p>
                          )}
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-md text-gray-600 dark:text-gray-300">
                              {type === "sub-service" ? "Service" : type}
                            </span>
                            {result.category && (
                              <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-md text-gray-600 dark:text-gray-300">
                                {result.category}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : q ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 text-gray-400 mb-4">
            <Search className="w-full h-full" />
          </div>
          <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300">
            No results found for {`"${q}"`}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Try different keywords or check for typos
          </p>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 text-gray-400 mb-4">
            <Search className="w-full h-full" />
          </div>
          <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300">
            Enter a search term to find content
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Search for pages, services, policies, or blog posts
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
