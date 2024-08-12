/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "items-images-sandbox.s3.us-west-2.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "items-images-production.s3.us-west-2.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
