/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["apod.nasa.gov", "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
