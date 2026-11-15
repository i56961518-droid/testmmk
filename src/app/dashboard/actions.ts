"use server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { storage } from "@/lib/storage";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

const projectSchema = z.object({
  name: z.string().min(2, "Project name is too short"),
  brief: z.string().min(10, "Please provide more details"),
});

export async function createProject(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  const parsed = projectSchema.safeParse({
    name: formData.get("name"),
    brief: formData.get("brief"),
  });

  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

  try {
    const project = await prisma.project.create({
      data: {
        clientId: session.user.id,
        name: parsed.data.name,
        brief: parsed.data.brief,
        status: "REQUEST_RECEIVED",
      },
    });

    await prisma.statusHistory.create({
      data: { projectId: project.id, to: "REQUEST_RECEIVED" }
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to create project." };
  }
}

export async function uploadReferenceFile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  const projectId = formData.get("projectId") as string;
  const file = formData.get("file") as File;

  if (!file || file.size === 0) return { success: false, error: "No file selected" };
  if (file.size > 5 * 1024 * 1024) return { success: false, error: "File too large (max 5MB)" };

  try {
    const saved = await storage.save(file);
    await prisma.attachment.create({
      data: {
        projectId,
        fileName: saved.fileName,
        storageKey: saved.storageKey,
        isDeliverable: false,
      },
    });
    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Upload failed" };
  }
}

export async function handleLogout() {
  await signOut({ redirectTo: "/" });
}

export async function addComment(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  const projectId = formData.get("projectId") as string;
  const text = formData.get("text") as string;

  if (!text || text.trim().length === 0) return { success: false, error: "Message cannot be empty" };

  await prisma.comment.create({
    data: {
      projectId,
      authorId: session.user.id,
      text,
    },
  });

  revalidatePath(`/dashboard/projects/${projectId}`);
  return { success: true };
}

/* ───────────────────────── SETTINGS ACTIONS ───────────────────────── */

export async function updateGeneral(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        timezone: formData.get("timezone") as string,
      },
    });
    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update general settings" };
  }
}

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        businessName: formData.get("businessName") as string,
        phone: formData.get("phone") as string,
        website: formData.get("website") as string,
        address: formData.get("address") as string,
      },
    });
    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update profile" };
  }
}

export async function updateSecurity(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const twoFactorEnabled = formData.get("twoFactorEnabled") === "on";

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return { success: false, error: "User not found" };

  if (currentPassword && newPassword) {
    if (!user.passwordHash) return { success: false, error: "No password set" };
    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValid) return { success: false, error: "Incorrect current password" };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      twoFactorEnabled,
      ...(newPassword ? { passwordHash: await bcrypt.hash(newPassword, 12) } : {}),
    },
  });
  
  revalidatePath("/dashboard/settings");
  return { success: true };
}

export async function updateNotifications(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        emailNotifications: formData.get("emailNotifications") === "on",
        marketingEmails: formData.get("marketingEmails") === "on",
      },
    });
    
    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to save notification preferences" };
  }
}

/* ───────────────────────── DANGER ZONE ACTIONS ───────────────────────── */

export async function requestDeleteAccount(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  const password = formData.get("password") as string;
  const confirmText = formData.get("confirmText") as string;

  if (confirmText !== "DELETE") {
    return { success: false, error: "You must type DELETE to confirm." };
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user?.passwordHash) return { success: false, error: "User not found" };

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return { success: false, error: "Incorrect password." };

  if (user.twoFactorEnabled) {
    // Generate secure token for email confirmation
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes

    await prisma.passwordResetToken.create({
      data: { email: user.email, token, expires },
    });

    const confirmLink = `http://localhost:3000/delete-account?token=${token}`;

    // Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Confirm Account Deletion - MMK",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="font-size: 32px; text-transform: uppercase; color: #D90368;">Deletion Request</h1>
          <p>We received a request to permanently delete your MMK account. Since you have 2FA enabled, please confirm this action by clicking the link below.</p>
          <p>This link expires in 15 minutes.</p>
          <a href="${confirmLink}" style="display: inline-block; background: #000; color: white; padding: 16px 32px; text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px;">Confirm Deletion</a>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">If you did not request this, please change your password immediately.</p>
        </div>
      `,
    });

    return { success: true, message: "Confirmation email sent. Please check your inbox to finalize deletion." };
  } else {
    // 2FA off, delete immediately
    await prisma.user.delete({ where: { id: user.id } });
    return { success: true, deleted: true };
  }
}

export async function confirmDeleteAccount(token: string) {
  try {
    const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });
    if (!resetToken) return { success: false, error: "Invalid or expired token." };
    if (new Date() > resetToken.expires) return { success: false, error: "Token expired." };

    await prisma.user.delete({ where: { email: resetToken.email } });
    await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete account." };
  }
}