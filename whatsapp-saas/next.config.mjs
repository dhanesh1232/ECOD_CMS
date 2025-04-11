/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true, // 308 permanent redirect
      },
    ];
  },
};

export default nextConfig;
