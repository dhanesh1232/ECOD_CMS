import Link from "next/link";
import { settingsNavItems } from "@/data/bot-links";

export default function SettingsBreadcrumb({ pathname }) {
  const getBreadcrumb = () => {
    if (pathname === "/settings") {
      return { category: "General" };
    }

    const parts = pathname.split("/");
    if (parts.length < 3) return { category: "Settings" };

    const sectionId = parts[2];
    const itemSlug = parts[3];

    const section = settingsNavItems.find((s) => s.id === sectionId);
    if (!section) return { category: "Settings" };

    const item = section.items?.find(
      (i) => i.href.split("/").pop() === itemSlug
    );

    return {
      category: section.category,
      item: item?.name,
    };
  };

  const breadcrumb = getBreadcrumb();

  return (
    <div className="text-sm text-gray-600 dark:text-gray-400">
      <Link href="/settings">
        <span className="hover:text-indigo-600 dark:hover:text-indigo-300 cursor-pointer">
          Settings
        </span>
      </Link>
      {breadcrumb.category && breadcrumb.category !== "General" && (
        <>
          <span className="mx-2">/</span>
          <span className="hover:text-indigo-600 dark:hover:text-indigo-300 cursor-pointer capitalize">
            {breadcrumb.category}
          </span>
        </>
      )}
      {breadcrumb.item && (
        <>
          <span className="mx-2">/</span>
          <span className="capitalize text-gray-800 dark:text-gray-200">
            {breadcrumb.item}
          </span>
        </>
      )}
    </div>
  );
}
