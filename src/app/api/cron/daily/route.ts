import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany({
      where: { emailNotifications: true, role: "CLIENT" },
      include: { projects: { where: { status: { not: "COMPLETED" } } } }
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    let emailsSent = 0;
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    for (const user of users) {
      // BULLETPROOF CHECK: If they got an email in the last 24 hours, skip them!
      if (user.lastDigestSentAt && user.lastDigestSentAt > twentyFourHoursAgo) {
        continue; 
      }

      if (user.projects.length > 0) {
        const projectList = user.projects.map(p => `- ${p.name} (${p.status})`).join("\n");
        
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Your Daily MMK Project Update",
          text: `Hi ${user.name},\n\nHere is a quick update on your active projects with MMK:\n\n${projectList}\n\nLog in to your dashboard to view details: https://testmmk.vercel.app/dashboard\n\nBest,\nThe MMK Team`,
        });

        // Remember when we emailed them
        await prisma.user.update({
          where: { id: user.id },
          data: { lastDigestSentAt: now }
        });

        emailsSent++;
      }
    }

    return NextResponse.json({ success: true, emailsSent });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Cron failed" }, { status: 500 });
  }
}