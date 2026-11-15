import { mkdir, writeFile, readFile, unlink } from "fs/promises";
import { randomUUID } from "crypto";
import { extname, join, resolve } from "path";

const LOCAL_DIR = resolve(process.env.UPLOAD_DIR ?? ".data/uploads");
export type SavedFile = { storageKey: string; fileName: string; mimeType: string; size: number; };

export const storage = {
  async save(file: File): Promise<SavedFile> {
    await mkdir(LOCAL_DIR, { recursive: true });
    const ext = extname(file.name).toLowerCase();
    const key = `${randomUUID()}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(join(LOCAL_DIR, key), buffer);
    return { storageKey: key, fileName: file.name, mimeType: file.type || "application/octet-stream", size: buffer.length };
  },
  async read(key: string) {
    try { return await readFile(join(LOCAL_DIR, key)); } catch { return null; }
  },
};