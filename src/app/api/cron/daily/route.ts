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

    for (const user of users) {
      if (user.projects.length > 0) {
        const projectList = user.projects.map(p => `- ${p.name} (${p.status})`).join("\n");
        
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Your Daily MMK Project Update",
          text: `Hi ${user.name},\n\nHere is a quick update on your active projects with MMK:\n\n${projectList}\n\nLog in to your dashboard to view details: http://localhost:3000/dashboard\n\nBest,\nThe MMK Team`,
        });
        emailsSent++;
      }
    }

    return NextResponse.json({ success: true, emailsSent });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Cron failed" }, { status: 500 });
  }
}