import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { adminLogout } from "./actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-300 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-800 bg-[#111] flex flex-col justify-between shrink-0">
        <div>
          <div className="p-8 border-b border-gray-800">
            <Link href="/admin" className="font-poster text-3xl tracking-tighter text-magenta">
              MMK <span className="text-white">Admin</span>
            </Link>
          </div>
          <nav className="p-4 space-y-2">
            <Link href="/admin" className="block px-4 py-2 hover:bg-gray-800 rounded transition-colors text-white font-bold">Overview</Link>
            <Link href="/admin/projects" className="block px-4 py-2 hover:bg-gray-800 rounded transition-colors">All Projects</Link>
            <Link href="/" className="block px-4 py-2 hover:bg-gray-800 rounded transition-colors mt-8 text-gray-500">← Back to Site</Link>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-800">
          <form action={adminLogout}>
            <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded transition-colors">Log Out</button>
          </form>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}