ALTER TABLE "services" DROP CONSTRAINT IF EXISTS "services_slug_key";
ALTER TABLE "services" ADD CONSTRAINT "services_audience_slug_key" UNIQUE ("audience", "slug");
CREATE INDEX IF NOT EXISTS "services_audience_isPublished_idx" ON "services" ("audience", "isPublished");