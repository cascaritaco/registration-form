import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/registration-form",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
