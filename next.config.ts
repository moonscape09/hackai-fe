import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Allow production builds even if you have ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
