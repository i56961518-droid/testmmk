import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { SettingsTabs } from "./SettingsTabs";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const session = await auth();
  
  // Instead of forcing a redirect that breaks on Vercel, we show a clean UI
  if (!session?.user?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F8]">
        <div className="text-center p-8 bg-white border border-ink/10 rounded-xl shadow-sm">
          <h1 className="text-2xl font-bold mb-4">Session Expired</h1>
          <p className="text-ink/60 mb-6">Please log in again to access your settings.</p>
          <Link href="/login" className="bg-ink text-paper px-6 py-3 rounded-md font-bold uppercase tracking-widest text-xs hover:bg-magenta transition-colors">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F8]">
        <div className="text-center p-8 bg-white border border-ink/10 rounded-xl shadow-sm">
          <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
          <p className="text-ink/60 mb-6">Please log in again.</p>
          <Link href="/login" className="bg-ink text-paper px-6 py-3 rounded-md font-bold uppercase tracking-widest text-xs hover:bg-magenta transition-colors">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F8] p-8 md:p-16">
      <div className="max-w-6xl mx-auto">
        <Link href="/dashboard" className="font-bold uppercase tracking-widest text-xs text-ink/50 hover:text-magenta mb-8 inline-block">
          ← Back to Dashboard
        </Link>
        <h1 className="font-poster text-6xl uppercase mb-12">Settings</h1>
        <SettingsTabs user={user} />
      </div>
    </div>
  );
}