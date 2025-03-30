import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost:3000",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "beatricecheronomellyfoundation.org",
        pathname: "**",
      },
    ],
    minimumCacheTTL: 60,
  },
  webpack(config) {
    if (!config.module) {
      config.module = { rules: [] };
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
