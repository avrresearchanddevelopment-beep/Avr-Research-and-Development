export const dynamic = 'force-static';
import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin/dashboard",
        "/student/dashboard",
        "/client/dashboard",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
