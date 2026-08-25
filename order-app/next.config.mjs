


import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/** @type {import('next').NextConfig} */
const baseConfig = {
  images: {
    // Product assets are already resized WebP files; serve them directly to avoid
    // expensive first-request transcoding in the portfolio preview.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [390, 640, 768, 1024, 1280, 1440],
    imageSizes: [64, 96, 160, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
};

export default function nextConfig(phase) {
  return {
    ...baseConfig,
    // Keep the live preview isolated from production builds.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  };
}
