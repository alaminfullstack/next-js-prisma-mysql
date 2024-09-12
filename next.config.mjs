/** @type {import('next').NextConfig} */
const nextConfig = {
  // Other configurations can go here
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },
};

export default nextConfig;
