import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Change these before running, or override with env vars.
const ADMIN_NAME = process.env.SEED_ADMIN_NAME || "Admin";
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "admin@avrsofttech.com";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";

const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

const user = await prisma.user.upsert({
  where: { email: ADMIN_EMAIL },
  update: { role: "ADMIN" },
  create: {
    name: ADMIN_NAME,
    email: ADMIN_EMAIL,
    passwordHash,
    role: "ADMIN",
  },
});

console.log(`Admin ready: ${user.email} (role: ${user.role})`);
console.log(`Login with password: ${ADMIN_PASSWORD}`);
console.log(`IMPORTANT: change this password after first login if this is a real deployment.`);

await prisma.$disconnect();
