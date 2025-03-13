import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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