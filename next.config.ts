import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // "" (empty) when the site is served from a custom domain root.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "/AVR_ORG",
};

export default nextConfig;
