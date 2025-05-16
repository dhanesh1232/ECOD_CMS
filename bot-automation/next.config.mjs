/** @type {import('next').NextConfig} */
import { fileURLToPath } from "url";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { join } from "path";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://*.googleapis.com https://*.google.com; frame-src 'self' https://accounts.google.com;",
          },
        ],
      },
    ];
  },
  // Image Optimization
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "source.unsplash.com",
      // Add other domains as needed
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

  // Performance optimizations
  optimizeFonts: true,
  optimizeImages: true,
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

  // Experimental features
  experimental: {
    esmExternals: false,
    externalDir: true,
    disableOptimizedLoading: false,
    scrollRestoration: true,
    legacyBrowsers: false,
    newNextLinkBehavior: true,
    workerThreads: true,
    cpus: 4,
    outputFileTracingRoot: join(__dirname, "../../"),
  },

  // Webpack customizations
  webpack: (config, { dev, isServer, webpack }) => {
    // Improve build performance
    config.snapshot = {
      ...(config.snapshot || {}),
      managedPaths: [/^(.+?[\\/]node_modules[\\/])/],
      immutablePaths: [/^(.+?[\\/]node_modules[\\/])/],
    };

    // Faster rebuilds in development
    if (dev && !isServer) {
      config.cache = {
        type: "filesystem",
        buildDependencies: {
          config: [__filename],
        },
        cacheDirectory: join(__dirname, ".next/cache/webpack"),
      };
    }

    // Add these optimizations
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        "react-dom$": "react-dom/profiling",
        "@/components": join(__dirname, "src/components"),
        "@/lib": join(__dirname, "src/lib"),
        "@/styles": join(__dirname, "src/styles"),
        // Add other aliases as needed
      },
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".mjs"],
      fallback: {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      },
    };

    // Bundle analyzer for both client and server
    if (process.env.ANALYZE === "true") {
      const analyzerMode = process.env.ANALYZE_MODE || "static";
      const analyzerPort = process.env.ANALYZE_PORT || 8888;

      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode,
          analyzerPort: isServer ? analyzerPort : analyzerPort + 1,
          openAnalyzer: true,
          generateStatsFile: true,
          statsFilename: isServer
            ? "./analyze/server-stats.json"
            : "./analyze/client-stats.json",
          reportFilename: isServer
            ? "./analyze/server.html"
            : "./analyze/client.html",
        })
      );
    }

    // Only for production builds
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          maxSize: 244 * 1024, // 244KB
          minSize: 20 * 1024, // 20KB
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
            },
          },
        },
        minimize: true,
        minimizer: [
          new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 5,
          }),
        ],
      };
    }

    return config;
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version,
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
};

export default nextConfig;
