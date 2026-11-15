"use server";
import { prisma } from "@/lib/prisma";
import { auth, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { storage } from "@/lib/storage";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");
  return session.user;
}

export async function adminLogout() {
  await signOut({ redirectTo: "/" });
}

export async function updateProjectStatus(projectId: string, newStatus: string) {
  await requireAdmin();
  await prisma.project.update({
    where: { id: projectId },
    data: { status: newStatus },
  });
  await prisma.statusHistory.create({
    data: { projectId, to: newStatus },
  });
  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath("/admin");
  revalidatePath(`/dashboard/projects/${projectId}`);
}

export async function adminAddComment(formData: FormData) {
  const admin = await requireAdmin();
  const projectId = formData.get("projectId") as string;
  const text = formData.get("text") as string;

  if (!text) return;

  await prisma.comment.create({
    data: { projectId, authorId: admin.id, text },
  });
  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath(`/dashboard/projects/${projectId}`);
}

export async function uploadDeliverable(formData: FormData) {
  await requireAdmin();
  const projectId = formData.get("projectId") as string;
  const file = formData.get("file") as File;

  if (!file || file.size === 0) return;

  const saved = await storage.save(file);
  await prisma.attachment.create({
    data: {
      projectId,
      fileName: saved.fileName,
      storageKey: saved.storageKey,
      isDeliverable: true, 
    },
  });
  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath(`/dashboard/projects/${projectId}`);
}