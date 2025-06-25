/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    reactRemoveProperties: { properties: ["^fdprocessedid$"] },
  },
  images: {
    domains: ["randomuser.me"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/api/portraits/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    REDIRECT_DOMAIN: process.env.REDIRECT_DOMAIN,
  },
};

export default nextConfig;
