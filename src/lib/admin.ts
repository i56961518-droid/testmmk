"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/rbac";
import { ProjectStatus } from "@/lib/constants";

export async function updateProjectStatus(formData: FormData) {
  await requireAdmin();
  const projectId = String(formData.get("projectId"));
  const to = formData.get("status") as ProjectStatus;
  await prisma.project.update({ where: { id: projectId }, data: { status: to } });
  revalidatePath("/admin/projects");
}