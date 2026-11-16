"use server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(100),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message is too short").max(2000),
});

export async function sendContactEmail(formData: FormData) {
  const ip = "local-user"; 
  if (!checkRateLimit(ip, 3, 60000)) {
    return { success: false, error: "Too many requests. Please wait a minute." };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { name, email, message } = parsed.data;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "mmkaimarketingagency@gmail.com",
      subject: `New Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error: "Failed to send. Please try again later." };
  }
}

// ───────────────────────── NEWSLETTER ACTION ─────────────────────────

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string;
  if (!email) return { success: false, error: "Email is required" };

  try {
    const existing = await prisma.subscriber.findUnique({ where: { email } });
    if (existing) return { success: true, message: "Already subscribed!" };

    await prisma.subscriber.create({ data: { email } });
    return { success: true, message: "Thanks for subscribing!" };
  } catch (error) {
    console.error("Newsletter error:", error);
    return { success: false, error: "Something went wrong." };
  }
}