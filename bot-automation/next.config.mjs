/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Railway deployment
  output: "standalone",

  // Image Optimization (updated with safer defaults)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
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

  // Performance optimizations
  optimizeFonts: false, // Disabled as it's deprecated in newer Next.js versions
  excludeDefaultMomentLocales: true,

  // Build-time error handling
  typescript: {
    ignoreBuildErrors: true, // Temporary for debugging
  },
  eslint: {
    ignoreDuringBuilds: true, // Temporary for debugging
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

// Security headers configuration
const securityHeaders = [
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
];

export default nextConfig;
