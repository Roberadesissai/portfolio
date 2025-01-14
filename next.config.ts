import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ghchart.rshah.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
