/** @type {import('next').NextConfig} */
const nextConfig = {
  darkMode: "class", // Enables class-based dark mode (add 'dark' class to HTML)
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
