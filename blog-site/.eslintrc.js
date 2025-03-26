module.exports = {
  parser: "@typescript-eslint/parser", // Use this instead of custom parser
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      js: true,
    },
  },
};
