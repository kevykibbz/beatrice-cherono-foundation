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
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
    minimumCacheTTL: 60,
  },
  async headers() {
    return [
      {
        source: '/_next/static/css/(.*)',
        headers: [
          {
            key: 'Link',
            value: '</_next/static/css/[name].css>; rel=preload; as=style',
          },
        ],
      },
    ];
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
