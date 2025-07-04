// app/cookie-policy/page.jsx
export default function CookiePolicyPage() {
  return (
    <main className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        This website uses cookies to enhance the user experience, analyze
        traffic, and deliver personalized content.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">
        Types of Cookies We Use
      </h2>
      <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
        <li>
          <strong>Essential Cookies:</strong> Required for website functionality
          (e.g., login).
        </li>
        <li>
          <strong>Analytics Cookies:</strong> Help us understand usage patterns
          (e.g., Google Analytics).
        </li>
        <li>
          <strong>Marketing Cookies:</strong> Used for advertising and
          personalization.
        </li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">Managing Cookies</h2>
      <p className="text-gray-600 dark:text-gray-300">
        You can manage or disable cookies in your browser settings at any time.
      </p>
    </main>
  );
}
