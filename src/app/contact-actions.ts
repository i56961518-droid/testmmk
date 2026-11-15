"use server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(100),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message is too short").max(2000),
});

export async function sendContactEmail(formData: FormData) {
  // 1. Rate Limiting (using a placeholder IP for local dev, in production use headers)
  const ip = "local-user"; 
  if (!checkRateLimit(ip, 3, 60000)) {
    return { success: false, error: "Too many requests. Please wait a minute." };
  }

  // 2. Validate Input
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { name, email, message } = parsed.data;

  // 3. Send Email
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