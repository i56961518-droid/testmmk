import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const projects = await prisma.project.findMany({
    include: { client: true },
    orderBy: { createdAt: "desc" },
  });

  const active = projects.filter(p => p.status !== "COMPLETED" && p.status !== "REQUEST_RECEIVED").length;
  const pending = projects.filter(p => p.status === "REQUEST_RECEIVED").length;

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-10">Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#1A1A1A] border border-gray-800 p-6 rounded-lg">
          <p className="text-sm text-gray-400 mb-2">Pending Requests</p>
          <p className="text-4xl font-bold text-magenta">{pending}</p>
        </div>
        <div className="bg-[#1A1A1A] border border-gray-800 p-6 rounded-lg">
          <p className="text-sm text-gray-400 mb-2">Active Projects</p>
          <p className="text-4xl font-bold text-white">{active}</p>
        </div>
        <div className="bg-[#1A1A1A] border border-gray-800 p-6 rounded-lg">
          <p className="text-sm text-gray-400 mb-2">Total Clients</p>
          <p className="text-4xl font-bold text-white">{new Set(projects.map(p => p.clientId)).size}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mb-6">Recent Inquiries</h2>
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg overflow-hidden">
        {projects.slice(0, 5).map(p => (
          <Link href={`/admin/projects/${p.id}`} key={p.id} className="flex justify-between items-center p-4 border-b border-gray-800 hover:bg-gray-800 transition-colors">
            <div>
              <p className="text-white font-bold">{p.name}</p>
              <p className="text-xs text-gray-500">{p.client.email}</p>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-magenta">{p.status.replace(/_/g, " ")}</span>
          </Link>
        ))}
        {projects.length === 0 && <p className="p-6 text-gray-500">No projects yet.</p>}
      </div>
    </div>
  );
}