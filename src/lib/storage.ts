export type SavedFile = {
  storageKey: string; // We will store the Base64 string here
  fileName: string;
  mimeType: string;
  size: number;
};

export const storage = {
  async save(file: File): Promise<SavedFile> {
    // Convert the file to a Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Convert the buffer to a Base64 string
    const base64 = buffer.toString("base64");
    
    // Create a Data URI that the browser can render directly
    const dataUri = `data:${file.type || "application/octet-stream"};base64,${base64}`;

    return {
      storageKey: dataUri, 
      fileName: file.name,
      mimeType: file.type || "application/octet-stream",
      size: buffer.length,
    };
  },
};