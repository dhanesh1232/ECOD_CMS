/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    reactRemoveProperties: { properties: ["^fdprocessedid$"] },
  },
};

export default nextConfig;
