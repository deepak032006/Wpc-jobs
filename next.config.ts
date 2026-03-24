import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip TypeScript type checking during builds
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;