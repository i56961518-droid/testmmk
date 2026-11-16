"use server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function sendResetEmail(formData: FormData) {
  try {
    const email = (formData.get("email") as string).toLowerCase();
    if (!email) return { success: false, error: "Email is required" };

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { success: true }; 

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60); 

    await prisma.passwordResetToken.create({
      data: { email, token, expires },
    });

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const resetLink = `${baseUrl}/reset-password?token=${token}`;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("EMAIL CREDENTIALS MISSING. Reset Link:", resetLink);
      return { success: true }; 
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset your MMK Password",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="font-size: 32px; text-transform: uppercase;">Reset Your Password</h1>
          <p>You requested to reset your password for MMK.</p>
          <a href="${resetLink}" style="display: inline-block; background: #D90368; color: white; padding: 16px 32px; text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px;">Reset Password</a>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Password reset error:", error);
    return { success: false, error: "Failed to process request." };
  }
}