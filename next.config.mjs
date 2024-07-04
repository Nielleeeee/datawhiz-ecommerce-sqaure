/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.chec.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
