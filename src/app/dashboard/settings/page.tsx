import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { SettingsTabs } from "./SettingsTabs";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-[#F9F9F8] p-8 md:p-16">
      <div className="max-w-6xl mx-auto">
        <Link href="/dashboard" className="font-bold uppercase tracking-widest text-xs text-ink/50 hover:text-magenta mb-8 inline-block">← Back to Dashboard</Link>
        <h1 className="font-poster text-6xl uppercase mb-12">Settings</h1>
        <SettingsTabs user={user} />
      </div>
    </div>
  );
}