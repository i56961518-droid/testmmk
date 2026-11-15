"use server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function createAccount(formData: FormData) {
  const name = formData.get("name") as string;
  const email = (formData.get("email") as string).toLowerCase();
  const password = formData.get("password") as string;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { ok: false, error: "Email already exists" };

  await prisma.user.create({
    data: { name, email, passwordHash: await bcrypt.hash(password, 12), role: "CLIENT", emailVerified: new Date() },
  });
  return { ok: true };
}