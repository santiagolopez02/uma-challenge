/** @type {import('next').NextConfig} */
import TerserPlugin from "terser-webpack-plugin";

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
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              ecma: 2015,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            output: {
              ecma: 2015,
              comments: false,
              ascii_only: true,
            },
            mangle: {
              safari10: true,
            },
          },
        })
      );
    }
    return config;
  },
};

export default nextConfig;
