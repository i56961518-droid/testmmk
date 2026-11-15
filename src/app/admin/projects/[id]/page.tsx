import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { adminAddComment, updateProjectStatus, uploadDeliverable } from "../../actions";
import { formatDate } from "@/lib/utils";

export default async function AdminProjectPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: {
      client: true,
      history: { orderBy: { createdAt: "asc" } },
      attachments: { orderBy: { createdAt: "desc" } },
      comments: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!project) notFound();

  const statuses = ["REQUEST_RECEIVED", "UNDER_REVIEW", "IN_PRODUCTION", "READY_FOR_REVIEW", "COMPLETED"];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start mb-10 border-b border-gray-800 pb-6 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">{project.name}</h1>
          <p className="text-gray-400">Client: {project.client.name} ({project.client.email})</p>
          <p className="text-magenta font-bold mt-1 text-sm uppercase tracking-widest">Reply Language: {project.client.language || "English (en)"}</p>
        </div>
        <form action={async (formData) => {
          "use server";
          await updateProjectStatus(project.id, formData.get("status") as string);
        }} className="flex gap-2">
          <select name="status" defaultValue={project.status} className="bg-gray-800 text-white border border-gray-700 p-2 rounded outline-none">
            {statuses.map(s => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
          </select>
          <button type="submit" className="bg-magenta text-white px-4 py-2 rounded font-bold hover:bg-pink transition-colors">Update Status</button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Chat */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-6">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Conversation</h2>
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
              {project.comments.map(c => (
                <div key={c.id} className={`p-4 rounded-lg ${c.authorId === project.clientId ? "bg-gray-800" : "bg-magenta/20 border border-magenta/30"}`}>
                  <p className="text-xs text-gray-400 mb-1">{c.authorId === project.clientId ? "Client" : "You (Admin)"}</p>
                  <p className="text-white">{c.text}</p>
                  <p className="text-[10px] text-gray-500 mt-2">{formatDate(c.createdAt)}</p>
                </div>
              ))}
              {project.comments.length === 0 && <p className="text-gray-500 text-sm italic">No messages yet.</p>}
            </div>
            <form action={adminAddComment} className="flex gap-2">
              <input type="hidden" name="projectId" value={project.id} />
              <input name="text" required placeholder="Reply to client..." className="flex-1 bg-[#222] text-white border border-gray-700 p-3 rounded outline-none focus:border-magenta transition-colors" />
              <button className="bg-white text-black px-6 font-bold rounded hover:bg-gray-200 transition-colors">Send</button>
            </form>
          </div>

          {/* Files */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-6">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Files & Deliverables</h2>
            <div className="space-y-2 mb-6">
              {project.attachments.map(a => (
                <div key={a.id} className="flex justify-between p-3 bg-[#222] rounded border border-gray-800">
                  <span className="text-white text-sm">{a.fileName} {a.isDeliverable ? <span className="text-magenta font-bold">(Deliverable)</span> : "(Client Ref)"}</span>
                  <a href={`/api/files/${a.id}`} className="text-magenta text-sm hover:underline">Download</a>
                </div>
              ))}
              {project.attachments.length === 0 && <p className="text-gray-500 text-sm italic">No files uploaded.</p>}
            </div>
            
            <form action={uploadDeliverable} className="flex flex-col md:flex-row gap-4 items-center bg-[#222] p-4 rounded border border-gray-700">
              <input type="hidden" name="projectId" value={project.id} />
              <input type="file" name="file" required className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-700 file:text-white file:cursor-pointer" />
              <button className="bg-magenta text-white px-4 py-2 rounded font-bold text-sm whitespace-nowrap hover:bg-pink transition-colors">Upload Final Deliverable</button>
            </form>
          </div>
        </div>

        {/* Brief Sidebar */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-6 h-fit">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Original Brief</h2>
          <p className="text-sm text-gray-300 whitespace-pre-wrap">{project.brief}</p>
        </div>
      </div>
    </div>
  );
}