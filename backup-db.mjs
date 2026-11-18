// backup-db.mjs
// Dumps all current data to backup-data.json before a migration reset.
// Run with: node backup-db.mjs
import { PrismaClient } from "@prisma/client";
import { writeFileSync } from "fs";

const prisma = new PrismaClient();

async function main() {
  console.log("Backing up database...");

  const data = {
    users: await prisma.user.findMany(),
    studentProfiles: await prisma.studentProfile.findMany(),
    clientProfiles: await prisma.clientProfile.findMany(),
    services: await prisma.service.findMany(),
    products: await prisma.product.findMany(),
    portfolioItems: await prisma.portfolioItem.findMany(),
    galleryImages: await prisma.galleryImage.findMany(),
    domains: await prisma.domain.findMany(),
    domainModules: await prisma.domainModule.findMany(),
    projects: await prisma.project.findMany(),
    moduleItems: await prisma.moduleItem.findMany(),
  };

  for (const [key, rows] of Object.entries(data)) {
    console.log(`  ${key}: ${rows.length} row(s)`);
  }

  writeFileSync("backup-data.json", JSON.stringify(data, null, 2));
  console.log("\nBackup written to backup-data.json");
}

main()
  .catch((e) => {
    console.error("Backup failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
