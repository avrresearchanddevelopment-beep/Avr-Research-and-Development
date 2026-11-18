// restore-db.mjs
// Restores data from backup-data.json after a migration reset.
// Run with: node restore-db.mjs
// Run AFTER `npx prisma migrate reset` (and after the DB is empty/fresh).
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";

const prisma = new PrismaClient();

async function main() {
  console.log("Restoring database from backup-data.json...");

  const raw = readFileSync("backup-data.json", "utf-8");
  const data = JSON.parse(raw);

  // Order matters: parents before children (foreign key dependencies).

  if (data.domains?.length) {
    for (const row of data.domains) {
      await prisma.domain.create({ data: row });
    }
    console.log(`  domains: ${data.domains.length} restored`);
  }

  if (data.domainModules?.length) {
    for (const row of data.domainModules) {
      await prisma.domainModule.create({ data: row });
    }
    console.log(`  domainModules: ${data.domainModules.length} restored`);
  }

  if (data.projects?.length) {
    for (const row of data.projects) {
      await prisma.project.create({ data: row });
    }
    console.log(`  projects: ${data.projects.length} restored`);
  }

  if (data.moduleItems?.length) {
    for (const row of data.moduleItems) {
      await prisma.moduleItem.create({ data: row });
    }
    console.log(`  moduleItems: ${data.moduleItems.length} restored`);
  }

  if (data.users?.length) {
    for (const row of data.users) {
      await prisma.user.create({ data: row });
    }
    console.log(`  users: ${data.users.length} restored`);
  }

  if (data.studentProfiles?.length) {
    for (const row of data.studentProfiles) {
      await prisma.studentProfile.create({ data: row });
    }
    console.log(`  studentProfiles: ${data.studentProfiles.length} restored`);
  }

  if (data.clientProfiles?.length) {
    for (const row of data.clientProfiles) {
      await prisma.clientProfile.create({ data: row });
    }
    console.log(`  clientProfiles: ${data.clientProfiles.length} restored`);
  }

  if (data.services?.length) {
    for (const row of data.services) {
      await prisma.service.create({ data: row });
    }
    console.log(`  services: ${data.services.length} restored`);
  }

  if (data.products?.length) {
    for (const row of data.products) {
      await prisma.product.create({ data: row });
    }
    console.log(`  products: ${data.products.length} restored`);
  }

  if (data.portfolioItems?.length) {
    for (const row of data.portfolioItems) {
      await prisma.portfolioItem.create({ data: row });
    }
    console.log(`  portfolioItems: ${data.portfolioItems.length} restored`);
  }

  if (data.galleryImages?.length) {
    for (const row of data.galleryImages) {
      await prisma.galleryImage.create({ data: row });
    }
    console.log(`  galleryImages: ${data.galleryImages.length} restored`);
  }

  console.log("\nRestore complete.");
}

main()
  .catch((e) => {
    console.error("Restore failed:", e);
    console.error(
      "\nIf this failed partway through, some rows may already be restored.",
    );
    console.error(
      "Check the error above - a common cause is a field that no longer",
      "exists in the new schema (e.g. a renamed column). You may need to",
      "manually edit backup-data.json to drop/rename that field before retrying.",
    );
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
