/**
 * Formats a number as currency with localization support
 * @param {number} value - The amount to format
 * @param {string} [currency='INR'] - Currency code (INR, USD, EUR, etc.)
 * @param {string} [locale='en-IN'] - Locale string
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = "INR", locale = undefined) => {
  if (isNaN(value)) return "";

  // Default locales for common currencies
  const localeMap = {
    INR: "en-IN",
    USD: "en-US",
    EUR: "de-DE",
    GBP: "en-GB",
  };

  const selectedLocale = locale || localeMap[currency] || "en-US";

  try {
    return new Intl.NumberFormat(selectedLocale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch (error) {
    console.error("Currency formatting error:", error);
    // Fallback formatting
    return `${currency} ${value.toFixed(2)}`;
  }
};

/**
 * Formats a percentage value
 * @param {number} value - The percentage value (0-100)
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value) => {
  if (isNaN(value)) return "";
  return `${value.toFixed(2)}%`;
};

/**
 * Formats a date in a consistent way
 * @param {Date|string} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    console.error("Date formatting error:", error);
    return "";
  }
};
