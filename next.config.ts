import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Avr-Research-and-Development",
  assetPrefix: "/Avr-Research-and-Development/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;