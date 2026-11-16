import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { uploadReferenceFile, addComment, requestRevision } from "../../actions";
import { formatDate } from "@/lib/utils";

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) return null;

  const project = await prisma.project.findUnique({
    where: { id: params.id, clientId: session.user.id },
    include: { 
      history: { orderBy: { createdAt: "asc" } },
      attachments: { orderBy: { createdAt: "desc" } },
      comments: { orderBy: { createdAt: "asc" } }
    },
  });

  if (!project) notFound();

  const deliverables = project.attachments.filter(a => a.isDeliverable);

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-ink">
      <div className="max-w-6xl mx-auto px-5 py-16 md:px-10">
        
        <Link href="/dashboard" className="font-bold uppercase tracking-widest text-xs text-ink/50 hover:text-magenta mb-12 inline-block transition-colors">
          ← Back to Dashboard
        </Link>

        <header className="mb-12 border-b border-ink/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-magenta mb-2">Project Workspace</p>
            <h1 className="font-poster text-6xl md:text-8xl uppercase leading-none">{project.name}</h1>
          </div>
          <div className="flex flex-col gap-2">
             <span className="bg-ink text-paper px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-widest text-center">
               {project.status.replace(/_/g, " ")}
             </span>
             <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40 text-center">
               Started {formatDate(project.createdAt)}
             </span>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-8">
            
            <section className="bg-paper border border-ink/10 rounded-xl p-8 shadow-sm">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-4">The Brief</h2>
              <p className="text-lg leading-relaxed text-ink/80 whitespace-pre-wrap">{project.brief}</p>
            </section>

            <section className="bg-paper border border-ink/10 rounded-xl p-8 shadow-sm">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-4">Files & Deliverables</h2>
              
              <div className="space-y-3 mb-6">
                {project.attachments.map(file => (
                  <div key={file.id} className={`flex justify-between items-center p-3 border rounded-lg transition-colors ${file.isDeliverable ? "border-magenta/30 bg-magenta/5" : "border-ink/10 bg-[#F9F9F8]"}`}>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-sm truncate ${file.isDeliverable ? "text-magenta" : "text-ink/70"}`}>
                        {file.isDeliverable ? "FINAL: " : ""} {file.fileName}
                      </span>
                    </div>
                    <a href={`/api/files/${file.id}`} target="_blank" className="text-ink font-bold text-[10px] uppercase tracking-widest hover:text-magenta bg-paper px-3 py-1.5 rounded border border-ink/10 hover:border-magenta transition-colors">
                      Download
                    </a>
                  </div>
                ))}
                {project.attachments.length === 0 && <p className="text-ink/50 italic text-sm">No files uploaded yet.</p>}
              </div>

              <form action={async (formData) => {
                "use server";
                await uploadReferenceFile(formData);
              }} className="bg-[#F9F9F8] border-2 border-dashed border-ink/20 p-6 rounded-lg flex flex-col md:flex-row gap-4 items-center justify-between">
                <input type="hidden" name="projectId" value={project.id} />
                <input type="file" name="file" required className="block w-full text-sm text-ink/60 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-ink file:text-paper hover:file:bg-magenta transition-colors cursor-pointer" />
                <button type="submit" className="bg-magenta text-paper px-6 py-3 rounded-md font-bold uppercase tracking-widest text-[10px] hover:bg-ink transition-colors whitespace-nowrap">
                  Upload File
                </button>
              </form>
            </section>

            <section className="bg-paper border border-ink/10 rounded-xl p-8 shadow-sm">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-6">Project Messages</h2>
              
              <div className="space-y-6 mb-8 max-h-96 overflow-y-auto pr-4">
                {project.comments.map(comment => {
                  const isMe = comment.authorId === session.user.id;
                  return (
                    <div key={comment.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                      <div className={`max-w-[80%] p-4 text-sm ${isMe ? "bg-ink text-paper rounded-2xl rounded-tr-sm" : "bg-[#F9F9F8] border border-ink/10 text-ink rounded-2xl rounded-tl-sm shadow-sm"}`}>
                         <p className="font-bold mb-1 opacity-60 text-[10px] uppercase tracking-widest">{isMe ? "You" : "MMK Team"}</p>
                         <p>{comment.text}</p>
                      </div>
                      <p className="text-[10px] font-bold text-ink/30 mt-2 uppercase tracking-widest">{formatDate(comment.createdAt)}</p>
                    </div>
                  )
                })}
                {project.comments.length === 0 && <p className="text-ink/50 italic text-sm">No messages yet. Send a message to the team below.</p>}
              </div>

              <form action={async (formData) => {
                "use server";
                await addComment(formData);
              }} className="flex gap-2">
                <input type="hidden" name="projectId" value={project.id} />
                <input name="text" required placeholder="Type a message to the agency..." className="flex-1 bg-[#F9F9F8] border border-ink/10 rounded-md p-4 text-sm outline-none focus:border-ink transition-colors" />
                <button type="submit" className="bg-ink text-paper px-6 py-3 rounded-md font-bold uppercase tracking-widest text-[10px] hover:bg-magenta transition-colors">Send</button>
              </form>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-6">
            
            {/* DOWNLOAD ALL / COMPLETED BANNER */}
            {project.status === "COMPLETED" && deliverables.length > 0 && (
              <div className="bg-green-50 border border-green-200 p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-green-800 text-lg mb-2">Project Completed!</h3>
                <p className="text-green-700/70 text-sm mb-6">Your final deliverables are ready to download.</p>
                <div className="space-y-2">
                  {deliverables.map(file => (
                    <a key={file.id} href={`/api/files/${file.id}`} download target="_blank" className="block w-full text-center bg-green-600 text-white px-6 py-3 rounded-md font-bold text-[10px] uppercase tracking-widest hover:bg-green-700 transition-colors shadow-sm">
                      Download {file.fileName}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-paper border border-ink/10 p-8 rounded-xl shadow-sm sticky top-24">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-6">Progress Timeline</h2>
              <div className="relative border-l-2 border-ink/10 ml-3 space-y-8 pb-4">
                {project.history.map((step, i) => (
                  <div key={step.id} className="relative pl-6">
                    <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-paper ${i === project.history.length - 1 ? "bg-magenta" : "bg-ink/20"}`} />
                    <p className="font-bold text-[11px] uppercase tracking-widest mb-1 text-ink">{step.to.replace(/_/g, " ")}</p>
                    <p className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">{formatDate(step.createdAt)}</p>
                  </div>
                ))}
              </div>

              {/* REQUEST REVISION BUTTON */}
              {project.status !== "COMPLETED" && project.status !== "REVISION_REQUESTED" && (
                <div className="border-t border-ink/10 pt-6 mt-6">
                  <h3 className="font-bold text-[11px] uppercase tracking-widest mb-2">Not quite right?</h3>
                  <p className="text-xs text-ink/60 mb-4">If you need changes made to the current files, click below to notify the team.</p>
                  <form action={async () => {
                    "use server";
                    await requestRevision(project.id);
                  }}>
                    <button className="w-full border-2 border-ink text-ink py-3 rounded-md font-bold text-[10px] uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors">
                      Request Revision
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}