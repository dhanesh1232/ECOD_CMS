/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  fastRefresh: true,
  experimental: {
    optimizeCss: false,
    // Add these experimental flags:
    swcMinify: true, // Faster minification
    esmExternals: false, // Faster module loading
    externalDir: true, // Better external dependency handling
    // Optional: try these if still slow
    modularizeImports: {
      // Optimizes named imports
      lodash: {
        transform: "lodash/{{member}}",
      },
    },
  },
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000, // Check for changes every second
      aggregateTimeout: 200, // Delay before rebuilding
    };
    return config;
  },
};

export default nextConfig;
