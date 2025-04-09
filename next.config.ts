import {withSentryConfig} from "@sentry/nextjs";
import type { NextConfig } from "next";
require('dd-trace').init()

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
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      '@prisma/client',
      '@heroicons/react',
      'react-icons'
    ]
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
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  webpack(config,{ dev, isServer }) {
    if (!config.module) {
      config.module = { rules: [] };
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    if (!dev) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
        name: `${isServer ? 'server' : 'client'}-${dev ? 'dev' : 'prod'}`,
      };
    }

    // Disable source maps in production
    if (!dev) {
      config.devtool = false;
    }

    return config;
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  disableLogger: true,
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);