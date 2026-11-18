export const dynamic = 'force-static';
import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
