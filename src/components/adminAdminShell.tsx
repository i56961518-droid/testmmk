import Link from "next/link";
export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <div className="bg-ink text-paper p-4">
        <Link href="/adminlayout" className="font-poster text-2xl">MMK Admin</Link>
      </div>
      <main className="p-8">{children}</main>
    </div>
  );
}