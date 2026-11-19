export const dynamic = 'force-static';
import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

const baseUrl = siteConfig.url;

const paths = [
  "",
  "/about",
  "/services",
  "/products",
  "/portfolio",
  "/projects",
  "/training",
  "/internships",
  "/workshops",
  "/research",
  "/gallery",
  "/contact",
  "/faq",
  "/privacy-policy",
  "/terms-of-service",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${baseUrl}${path}${path ? "/" : ""}`,
    lastModified: new Date(),
  }));
}
