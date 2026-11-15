"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function resetPassword(formData: FormData) {
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;

  if (!token || !password) {
    return { success: false, error: "Missing token or password" };
  }

  if (password.length < 8) {
    return { success: false, error: "Password must be at least 8 characters" };
  }

  try {
    // 1. Find the token in the database
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken) {
      return { success: false, error: "Invalid or expired reset link." };
    }

    // 2. Check if it's expired
    if (new Date() > resetToken.expires) {
      await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });
      return { success: false, error: "This reset link has expired. Please request a new one." };
    }

    // 3. Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. Update the user's password
    await prisma.user.update({
      where: { email: resetToken.email },
      data: { passwordHash: hashedPassword },
    });

    // 5. Delete the token so it can't be used again
    await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });

    return { success: true };
  } catch (error) {
    console.error("Reset password error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}