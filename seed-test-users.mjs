import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const USERS = [
  {
    role: "ADMIN",
    name: process.env.SEED_ADMIN_NAME || "Admin",
    email: process.env.SEED_ADMIN_EMAIL || "admin@avrsofttech.com",
    password: process.env.SEED_ADMIN_PASSWORD || "AdminPass123!",
  },
  {
    role: "STUDENT",
    name: process.env.SEED_STUDENT_NAME || "Test Student",
    email: process.env.SEED_STUDENT_EMAIL || "student@avrsofttech.com",
    password: process.env.SEED_STUDENT_PASSWORD || "StudentPass123!",
  },
  {
    role: "CLIENT",
    name: process.env.SEED_CLIENT_NAME || "Test Client",
    email: process.env.SEED_CLIENT_EMAIL || "client@avrsofttech.com",
    password: process.env.SEED_CLIENT_PASSWORD || "ClientPass123!",
  },
];

for (const u of USERS) {
  const passwordHash = await bcrypt.hash(u.password, 12);

  const user = await prisma.user.upsert({
    where: { email: u.email },
    update: { role: u.role, passwordHash },
    create: {
      name: u.name,
      email: u.email,
      passwordHash,
      role: u.role,
      ...(u.role === "STUDENT" ? { studentProfile: { create: {} } } : {}),
      ...(u.role === "CLIENT" ? { clientProfile: { create: {} } } : {}),
    },
  });

  console.log(`${user.role.padEnd(7)} ready: ${user.email} / ${u.password}`);
}

console.log("\nIMPORTANT: change these passwords before using this on a real/public deployment.");

await prisma.$disconnect();
