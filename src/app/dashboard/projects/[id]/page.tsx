import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { uploadReferenceFile, addComment } from "../../actions";

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

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-ink">
      <div className="max-w-6xl mx-auto px-5 py-16 md:px-10">
        
        <Link href="/dashboard" className="font-bold uppercase tracking-widest text-xs text-ink/50 hover:text-magenta mb-12 inline-block">
          ← Back to Dashboard
        </Link>

        <header className="mb-12 border-b border-ink/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-magenta mb-2">Project Workspace</p>
            <h1 className="font-poster text-6xl md:text-8xl uppercase leading-none">{project.name}</h1>
          </div>
          <div className="flex flex-col gap-2">
             <span className="bg-deep text-paper px-4 py-2 text-xs font-bold uppercase tracking-widest text-center">{project.status.replace(/_/g, " ")}</span>
             <span className="text-xs font-bold uppercase tracking-widest text-ink/40 text-center">Started {new Date(project.createdAt).toLocaleDateString()}</span>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-8">
            
            <section className="bg-paper border border-ink/10 p-8 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-4">The Brief</h2>
              <p className="text-lg leading-relaxed text-ink/80 whitespace-pre-wrap">{project.brief}</p>
            </section>

            <section className="bg-paper border border-ink/10 p-8 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-4">Files & Deliverables</h2>
              
              <div className="space-y-3 mb-6">
                {project.attachments.map(file => (
                  <div key={file.id} className={`flex justify-between items-center border-b pb-3 ${file.isDeliverable ? "border-magenta/30" : "border-ink/10"}`}>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-sm truncate ${file.isDeliverable ? "text-magenta" : ""}`}>
                        {file.isDeliverable ? "📦 DELIVERABLE: " : ""} {file.fileName}
                      </span>
                    </div>
                    <a href={`/api/files/${file.id}`} target="_blank" className="text-magenta font-bold text-xs uppercase tracking-widest hover:underline">Download</a>
                  </div>
                ))}
                {project.attachments.length === 0 && <p className="text-ink/50 italic text-sm">No files uploaded yet.</p>}
              </div>

              <form action={async (formData) => {
                "use server";
                await uploadReferenceFile(formData);
              }} className="bg-sand border-2 border-dashed border-ink/20 p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <input type="hidden" name="projectId" value={project.id} />
                <input type="file" name="file" required className="block w-full text-sm text-ink/60 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-deep file:text-paper hover:file:bg-magenta transition-colors cursor-pointer" />
                <button type="submit" className="bg-magenta text-paper px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-ink transition-colors whitespace-nowrap">Upload File</button>
              </form>
            </section>

            <section className="bg-paper border border-ink/10 p-8 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-6">Project Messages</h2>
              
              <div className="space-y-6 mb-8 max-h-96 overflow-y-auto pr-4">
                {project.comments.map(comment => {
                  const isMe = comment.authorId === session.user.id;
                  return (
                    <div key={comment.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                      <div className={`max-w-[80%] p-4 ${isMe ? "bg-electric text-paper rounded-t-xl rounded-bl-xl" : "bg-sand border border-ink/10 rounded-t-xl rounded-br-xl"}`}>
                         <p className="text-sm font-bold mb-1 opacity-70">{isMe ? "You" : "MMK Team"}</p>
                         <p>{comment.text}</p>
                      </div>
                      <p className="text-[10px] text-ink/40 mt-1">{new Date(comment.createdAt).toLocaleString()}</p>
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
                <input name="text" required placeholder="Type a message to the agency..." className="flex-1 border border-ink/20 p-4 text-sm outline-none focus:border-magenta transition-colors" />
                <button type="submit" className="bg-deep text-paper px-6 font-bold uppercase tracking-widest text-xs hover:bg-magenta transition-colors">Send</button>
              </form>
            </section>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-paper border border-ink/10 p-8 shadow-sm sticky top-24">
              <h2 className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-6">Progress Timeline</h2>
              <div className="relative border-l-2 border-ink/10 ml-3 space-y-8 pb-4">
                {project.history.map((step, i) => (
                  <div key={step.id} className="relative pl-6">
                    <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-paper ${i === project.history.length - 1 ? "bg-magenta" : "bg-ink/20"}`} />
                    <p className="font-bold text-sm uppercase tracking-widest mb-1">{step.to.replace(/_/g, " ")}</p>
                    <p className="text-xs text-ink/40">{new Date(step.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}