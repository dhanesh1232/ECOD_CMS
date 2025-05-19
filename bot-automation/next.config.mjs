/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image Optimization
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "source.unsplash.com",
    ],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp"],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Core Next.js optimizations
  reactStrictMode: true,
  compress: true,
  productionBrowserSourceMaps: false,
  staticPageGenerationTimeout: 1000,
  crossOrigin: "anonymous",
  // Performance optimizations (moved from experimental)
  optimizeFonts: true,
  excludeDefaultMomentLocales: true,
  // Security headers
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "origin-when-cross-origin",
        },
      ],
    },
  ],
};

export default nextConfig;
