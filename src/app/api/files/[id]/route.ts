import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });
  
  const { id } = await params;

  const file = await prisma.attachment.findUnique({
    where: { id },
    include: { project: { select: { clientId: true } } },
  });

  if (!file) return new NextResponse("Not found", { status: 404 });

  // Ensure only the admin or the client who owns the project can see it
  if (session.user.role !== "ADMIN" && file.project.clientId !== session.user.id) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // If the file is a Base64 string (data:image/...), redirect to it so the browser can download it
  if (file.storageKey.startsWith("data:")) {
    return NextResponse.redirect(file.storageKey);
  }

  return new NextResponse("File format not supported", { status: 400 });
}