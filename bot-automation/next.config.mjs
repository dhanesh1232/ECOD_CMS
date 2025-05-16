/** @type {import('next').NextConfig} */
import { fileURLToPath } from "url";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { join } from "path";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  swcMinify: true,
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

  // Experimental features (updated for Next.js 15)
  experimental: {
    externalDir: true,
    scrollRestoration: true,
    workerThreads: true,
    // Removed deprecated options:
    // esmExternals: false,
    // legacyBrowsers: false,
    // newNextLinkBehavior: true,
    // cpus: 4,
    // disableOptimizedLoading: false
  },

  // Moved to root level
  outputFileTracingRoot: join(__dirname, "../../"),

  // Webpack customizations (simplified for serialization)
  webpack: (config, { dev, isServer, webpack }) => {
    // Basic performance optimizations
    config.snapshot = {
      managedPaths: [/^(.+?[\\/]node_modules[\\/])/],
      immutablePaths: [],
    };

    // Development-specific config
    if (dev) {
      config.cache = {
        type: "filesystem",
        buildDependencies: {
          config: [__filename],
        },
        cacheDirectory: join(__dirname, ".next/cache/webpack"),
      };
    }

    // Production optimizations
    if (!dev) {
      config.optimization = {
        splitChunks: {
          chunks: "all",
          maxSize: 244 * 1024,
          minSize: 20 * 1024,
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
            },
          },
        },
        minimize: true,
      };
    }

    // Bundle analyzer (optional)
    if (process.env.ANALYZE === "true") {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          openAnalyzer: false,
        })
      );
    }

    // Path aliases
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        "react-dom$": "react-dom/profiling",
        "@/components": join(__dirname, "src/components"),
        "@/lib": join(__dirname, "src/lib"),
        "@/styles": join(__dirname, "src/styles"),
      },
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".mjs"],
    };

    return config;
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version,
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },

  // Build-time error handling
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
