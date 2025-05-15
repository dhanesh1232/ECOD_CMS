/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  experimental: {
    optimizeCss: false, // Disable CSS optimization (not recommended)
  },
};

export default nextConfig;
