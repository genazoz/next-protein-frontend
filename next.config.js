/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = withBundleAnalyzer({
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  reactStrictMode: false,
  swcMinify: true,
  env: {
    ANALYZE: process.env.ANALYZE,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
})

module.exports = nextConfig
