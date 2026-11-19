export const dynamic = 'force-static';
import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

const baseUrl = siteConfig.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
