import { PrismaClient } from "@prisma/client";
import { readFileSync, readdirSync, existsSync } from "fs";
import { createHash } from "crypto";

const prisma = new PrismaClient();

const rows = await prisma.$queryRawUnsafe(
  'SELECT migration_name, checksum, finished_at, rolled_back_at FROM "_prisma_migrations" ORDER BY started_at'
);

console.log("=== Recorded in database (_prisma_migrations) ===");
for (const r of rows) {
  const file = `prisma/migrations/${r.migration_name}/migration.sql`;
  let status = "(file missing on disk)";
  let local = "";
  if (existsSync(file)) {
    local = createHash("sha256").update(readFileSync(file)).digest("hex");
    status = local === r.checksum ? "checksum OK" : "CHECKSUM MISMATCH";
  }
  console.log(
    `${r.migration_name} | finished=${r.finished_at ? "yes" : "NO"} | rolledBack=${r.rolled_back_at ? "yes" : "no"} | ${status}`,
  );
  if (status === "CHECKSUM MISMATCH") {
    console.log(`   recorded: ${r.checksum}`);
    console.log(`   on disk:  ${local}`);
  }
}

console.log("\n=== Migration folders on disk ===");
for (const d of readdirSync("prisma/migrations")) {
  if (d.endsWith(".toml")) continue;
  const recorded = rows.some((r) => r.migration_name === d);
  console.log(`${d} | ${recorded ? "recorded in DB" : "NOT applied in DB"}`);
}

console.log("\n=== What actually exists in the database ===");
const checks = await prisma.$queryRawUnsafe(`
  SELECT
    to_regclass('public.testimonials') IS NOT NULL AS testimonials_table,
    to_regclass('public.client_logos') IS NOT NULL AS client_logos_table,
    to_regclass('public.blog_posts') IS NOT NULL AS blog_posts_table,
    to_regclass('public.contact_submissions') IS NOT NULL AS contact_submissions_table,
    EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='audience') AS services_audience_col,
    EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='isFeatured') AS projects_isFeatured_col,
    EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='client') AS projects_client_col
`);
console.log(checks[0]);

await prisma.$disconnect();
