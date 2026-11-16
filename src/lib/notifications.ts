import { prisma } from "./prisma";

type Payload = { kind: string; title: string };

export async function notify(userId: string, payload: Payload) {
  await prisma.notification.create({
    data: {
      userId,
      kind: payload.kind,
      title: payload.title,
    },
  });
}