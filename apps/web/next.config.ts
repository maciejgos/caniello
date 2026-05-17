import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  devIndicators: false,
  transpilePackages: ["@caniello/contracts"],
  redirects: async () => [
    {
      source: "/wave-2-exploration",
      destination: "/marketplace",
      permanent: true
    },
    {
      source: "/wave-3-research",
      destination: "/clinics",
      permanent: true
    }
  ]
};

export default nextConfig;
