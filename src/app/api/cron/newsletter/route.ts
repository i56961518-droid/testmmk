import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function GET(req: Request) {
  try {
    const subscribers = await prisma.subscriber.findMany();
    if (subscribers.length === 0) return NextResponse.json({ success: true, message: "No subscribers" });

    // Generate a daily design/marketing tip (Simulated AI)
    const topics = [
      "Why negative space is the secret to premium branding.",
      "3 typography pairings that make your brand look expensive.",
      "How to use AI for moodboarding without losing your unique voice.",
      "The psychology behind high-converting color palettes.",
      "Why your social media carousels aren't getting saved (and how to fix it)."
    ];
    const dailyTip = topics[Math.floor(Math.random() * topics.length)];

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    for (const sub of subscribers) {
      await transporter.sendMail({
        from: `"MMK Studio" <${process.env.EMAIL_USER}>`,
        to: sub.email,
        subject: "Your Daily MMK Creative Tip",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #F4F1EA; padding: 40px;">
            <h1 style="font-size: 32px; font-weight: 900; text-transform: uppercase;">Today's Creative Tip</h1>
            <p style="font-size: 18px; line-height: 1.6;">${dailyTip}</p>
            <br/>
            <p style="font-size: 14px; color: #666;">Designed by humans. Produced by AI.</p>
            <a href="http://localhost:3000" style="display: inline-block; background: #D90368; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px;">Visit MMK</a>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, emailsSent: subscribers.length });
  } catch (error) {
    console.error("Newsletter Cron Error:", error);
    return NextResponse.json({ success: false, error: "Cron failed" }, { status: 500 });
  }
}