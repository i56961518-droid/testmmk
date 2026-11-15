import { prisma } from "./prisma";
import type { NotificationKind } from "@prisma/client";
type Payload = { kind: NotificationKind; title: string; body?: string; href?: string };
export async function notify(userId: string, payload: Payload) {
  await prisma.notification.create({ data: { userId, ...payload } });
}