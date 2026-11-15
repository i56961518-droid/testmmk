import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!existing) {
      await prisma.user.create({
        data: {
          name: "MMK Admin",
          email: email.toLowerCase(),
          passwordHash: await bcrypt.hash(password, 12),
          role: "ADMIN",
          emailVerified: new Date(),
        },
      });
      console.log(`Admin created: ${email}`);
    }
  }
}
main().finally(() => prisma.$disconnect());