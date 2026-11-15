import { requireUser } from "@/lib/rbac";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireUser();
  return (
    <div className="min-h-screen bg-paper">
      <main>{children}</main>
    </div>
  );
}