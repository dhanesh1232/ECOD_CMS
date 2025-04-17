"use client";
import {
  FiDatabase,
  FiPlus,
  FiSearch,
  FiFileText,
  FiFolder,
  FiChevronDown,
  FiEye,
  FiEdit,
  FiTrash2,
  FiSave,
  FiX,
  FiClock,
} from "react-icons/fi";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

// Sample data structure that matches a real-world API response
const sampleData = {
  categories: [
    {
      id: "cat_001",
      name: "Getting Started",
      slug: "getting-started",
      description: "Learn how to set up and use our platform",
      article_count: 5,
      created_at: "2023-05-10T08:30:00Z",
      updated_at: "2023-06-12T14:25:00Z",
    },
    {
      id: "cat_002",
      name: "Account Settings",
      slug: "account-settings",
      description: "Manage your account preferences",
      article_count: 3,
      created_at: "2023-05-12T10:15:00Z",
      updated_at: "2023-06-10T09:45:00Z",
    },
    {
      id: "cat_003",
      name: "Billing",
      slug: "billing",
      description: "Payment methods and subscription plans",
      article_count: 4,
      created_at: "2023-05-15T11:20:00Z",
      updated_at: "2023-06-15T16:30:00Z",
    },
    {
      id: "cat_004",
      name: "Integrations",
      slug: "integrations",
      description: "Connect with other platforms and services",
      article_count: 7,
      created_at: "2023-05-18T13:40:00Z",
      updated_at: "2023-06-14T11:10:00Z",
    },
  ],
  articles: [
    {
      id: "art_001",
      title: "How to create your first chatbot",
      slug: "create-first-chatbot",
      content: "## Getting Started\n\nTo create your first chatbot...",
      category_id: "cat_001",
      views: 1245,
      status: "published",
      author: "admin_001",
      created_at: "2023-05-20T09:15:00Z",
      updated_at: "2023-06-13T10:30:00Z",
      tags: ["beginner", "tutorial"],
    },
    {
      id: "art_002",
      title: "Connecting Facebook Messenger",
      slug: "facebook-messenger-integration",
      content: "## Facebook Integration\n\nConnect your Facebook page...",
      category_id: "cat_004",
      views: 876,
      status: "published",
      author: "admin_002",
      created_at: "2023-05-22T14:20:00Z",
      updated_at: "2023-06-08T15:45:00Z",
      tags: ["social", "integration"],
    },
    {
      id: "art_003",
      title: "Understanding billing cycles",
      slug: "billing-cycles-explained",
      content: "## Billing Overview\n\nOur billing cycles run monthly...",
      category_id: "cat_003",
      views: 543,
      status: "published",
      author: "admin_001",
      created_at: "2023-05-25T11:30:00Z",
      updated_at: "2023-06-12T12:15:00Z",
      tags: ["payments", "subscriptions"],
    },
    {
      id: "art_004",
      title: "Resetting your password",
      slug: "password-reset",
      content: "## Password Recovery\n\nIf you've forgotten your password...",
      category_id: "cat_002",
      views: 321,
      status: "published",
      author: "admin_003",
      created_at: "2023-05-28T16:45:00Z",
      updated_at: "2023-05-30T10:20:00Z",
      tags: ["security", "account"],
    },
    {
      id: "art_005",
      title: "Automation best practices",
      slug: "automation-best-practices",
      content:
        "## Automation Tips\n\nFollow these guidelines for effective automations...",
      category_id: "cat_001",
      views: 765,
      status: "draft",
      author: "admin_002",
      created_at: "2023-06-01T13:10:00Z",
      updated_at: "2023-06-10T14:55:00Z",
      tags: ["automation", "workflow"],
    },
  ],
};

export default function KnowledgeBasePage() {
  const [categories, setCategories] = useState(sampleData.categories);
  const [articles, setArticles] = useState(sampleData.articles);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOption, setSortOption] = useState("recently-updated");
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [editorContent, setEditorContent] = useState("");

  // Format time to relative (e.g., "2 days ago")
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // Filter articles based on search and category
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || article.category_id === selectedCategory.id;
    return matchesSearch && matchesCategory;
  });

  // Sort articles based on selected option
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortOption === "recently-updated") {
      return new Date(b.updated_at) - new Date(a.updated_at);
    } else if (sortOption === "most-viewed") {
      return b.views - a.views;
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  // Handle article selection for editing
  const handleEditArticle = (article) => {
    setCurrentArticle(article);
    setEditorContent(article.content);
    setIsEditing(true);
  };

  // Handle new article creation
  const handleNewArticle = () => {
    setCurrentArticle({
      id: null,
      title: "",
      content: "",
      category_id: selectedCategory?.id || null,
      tags: [],
    });
    setEditorContent("");
    setIsEditing(true);
  };

  // Save article (create or update)
  const handleSaveArticle = () => {
    if (currentArticle.id) {
      // Update existing article
      setArticles(
        articles.map((art) =>
          art.id === currentArticle.id
            ? {
                ...art,
                title: currentArticle.title,
                content: editorContent,
                updated_at: new Date().toISOString(),
              }
            : art
        )
      );
    } else {
      // Create new article
      const newArticle = {
        id: `art_${Math.random().toString(36).substr(2, 9)}`,
        title: currentArticle.title,
        content: editorContent,
        category_id: currentArticle.category_id,
        views: 0,
        status: "draft",
        author: "current_user",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: [],
      };
      setArticles([...articles, newArticle]);
    }
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <FiDatabase className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Knowledge Base
            </h1>
          </div>
          <button
            onClick={handleNewArticle}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg transition-colors"
          >
            <FiPlus className="mr-2" /> New Article
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search knowledge base..."
              className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg w-full bg-white dark:bg-gray-800 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <select
              className="text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="recently-updated">Recently updated</option>
              <option value="most-viewed">Most viewed</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-medium text-gray-800 dark:text-white">
                  Categories
                </h2>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                <div
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                    !selectedCategory ? "bg-blue-50 dark:bg-blue-900/30" : ""
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  <div className="flex items-center">
                    <FiFolder className="mr-2 text-blue-500" />
                    <span className="font-medium">All Categories</span>
                  </div>
                </div>
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                      selectedCategory?.id === category.id
                        ? "bg-blue-50 dark:bg-blue-900/30"
                        : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FiFolder className="mr-2 text-blue-500" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                        {category.article_count}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                      {category.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Articles List or Editor */}
          <div className="lg:col-span-3">
            {isEditing ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium text-gray-800 dark:text-white">
                    {currentArticle.id ? "Edit Article" : "New Article"}
                  </h2>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FiX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Article title"
                  className="w-full text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 focus:outline-none bg-transparent text-gray-800 dark:text-white"
                  value={currentArticle?.title || ""}
                  onChange={(e) =>
                    setCurrentArticle({
                      ...currentArticle,
                      title: e.target.value,
                    })
                  }
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <select
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                    value={currentArticle?.category_id || ""}
                    onChange={(e) =>
                      setCurrentArticle({
                        ...currentArticle,
                        category_id: e.target.value,
                      })
                    }
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-4">
                  <div className="flex border-b border-gray-200 dark:border-gray-700">
                    <button className="px-4 py-2 text-sm font-medium border-b-2 border-blue-500 text-blue-600 dark:text-blue-400">
                      Edit
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Preview
                    </button>
                  </div>
                  <textarea
                    className="w-full h-96 p-4 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    placeholder="Write your article content here (Markdown supported)..."
                    value={editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveArticle}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg transition-colors"
                  >
                    <FiSave className="inline mr-2" />
                    {currentArticle.id ? "Update Article" : "Publish Article"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="font-medium text-gray-800 dark:text-white">
                    {selectedCategory
                      ? `${selectedCategory.name} Articles`
                      : "All Articles"}
                  </h2>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {sortedArticles.length} articles
                  </div>
                </div>

                {sortedArticles.length > 0 ? (
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {sortedArticles.map((article) => {
                      const category = categories.find(
                        (cat) => cat.id === article.category_id
                      );
                      return (
                        <div
                          key={article.id}
                          className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                          onClick={() => handleEditArticle(article)}
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-gray-800 dark:text-white">
                              {article.title}
                            </h3>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <FiEye className="mr-1" size={14} />
                              {article.views.toLocaleString()}
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <FiFolder className="mr-1" size={14} />
                              {category?.name || "Uncategorized"}
                              {article.status === "draft" && (
                                <span className="ml-2 px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">
                                  Draft
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-500">
                              Updated {formatRelativeTime(article.updated_at)}
                            </div>
                          </div>
                          <div className="mt-2 flex gap-1">
                            {article.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <FiFileText className="mx-auto text-gray-400 dark:text-gray-500 text-4xl mb-2" />
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
                      No articles found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {searchQuery
                        ? "Try a different search query"
                        : "Create a new article to get started"}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
