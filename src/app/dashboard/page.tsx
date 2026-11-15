import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { handleLogout } from "./actions";
import { NewProjectForm } from "./NewProjectForm";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const projects = await prisma.project.findMany({
    where: { clientId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-ink flex">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-ink/10 hidden lg:flex flex-col justify-between bg-paper">
        <div>
          <div className="p-8">
            <Link href="/" className="font-poster text-3xl tracking-tighter text-ink hover:text-magenta transition-colors">MMK</Link>
          </div>
          <nav className="px-4 space-y-1">
            <Link href="/dashboard" className="block px-4 py-3 bg-ink/5 font-bold text-sm rounded-md">Projects</Link>
            <Link href="/dashboard/billing" className="block px-4 py-3 text-ink/60 font-medium text-sm hover:bg-ink/5 rounded-md transition-colors">Billing & Plans</Link>
            <Link href="/contact" className="block px-4 py-3 text-ink/60 font-medium text-sm hover:bg-ink/5 rounded-md transition-colors">Contact Support</Link>
            <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-ink/60 font-medium text-sm hover:bg-ink/5 rounded-md transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              Settings
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t border-ink/10">
          <div className="px-4 mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-ink/40">Client</p>
            <p className="text-sm font-medium truncate">{session.user.email}</p>
          </div>
          <form action={handleLogout}>
            <button className="w-full text-left px-4 py-2 text-sm font-bold text-magenta hover:bg-magenta/5 rounded-md transition-colors">Log Out</button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-16 max-w-6xl mx-auto w-full">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-magenta mb-2">Workspace</p>
            <h1 className="font-poster text-5xl md:text-7xl uppercase leading-none text-deep">Projects</h1>
          </div>
          <div className="flex gap-8">
             <div>
                <p className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-1">Active</p>
                <p className="text-2xl font-bold">{projects.filter(p => p.status !== "COMPLETED").length}</p>
             </div>
             <div>
                <p className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-1">Completed</p>
                <p className="text-2xl font-bold">{projects.filter(p => p.status === "COMPLETED").length}</p>
             </div>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <NewProjectForm />
          {projects.map((project) => (
            <Link href={`/dashboard/projects/${project.id}`} key={project.id} className="bg-paper border border-ink/10 p-8 flex flex-col justify-between h-56 hover:shadow-xl hover:border-ink/30 transition-all group">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-magenta mb-3">{project.status.replace(/_/g, " ")}</p>
                <h3 className="font-display text-2xl font-bold leading-tight group-hover:underline decoration-2 underline-offset-4">{project.name}</h3>
              </div>
              <div className="flex justify-between items-end border-t border-ink/10 pt-4">
                <p className="text-xs font-medium text-ink/40">{formatDate(project.createdAt)}</p>
                <span className="text-xl font-bold group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}