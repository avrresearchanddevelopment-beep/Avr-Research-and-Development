import type { NextConfig } from "next";

// Custom domain (avr.example.com)  -> leave NEXT_PUBLIC_BASE_PATH empty.
// Project page (user.github.io/REPO) -> set NEXT_PUBLIC_BASE_PATH=/REPO
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
