import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminProjectsList() {
  const projects = await prisma.project.findMany({
    include: { client: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-10">All Projects</h1>
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg overflow-hidden">
        {projects.map(p => (
          <Link href={`/admin/projects/${p.id}`} key={p.id} className="flex flex-col md:flex-row md:justify-between md:items-center p-6 border-b border-gray-800 hover:bg-gray-800 transition-colors gap-4">
            <div>
              <p className="text-white font-bold text-lg">{p.name}</p>
              <p className="text-sm text-gray-500">{p.client.name} ({p.client.email})</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{new Date(p.createdAt).toLocaleDateString()}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-magenta bg-magenta/10 px-3 py-1 rounded">{p.status.replace(/_/g, " ")}</span>
            </div>
          </Link>
        ))}
        {projects.length === 0 && <p className="p-6 text-gray-500">No projects found.</p>}
      </div>
    </div>
  );
}