import { AdminShell } from "@/components/admin/AdminShell";
import { ToastProvider } from "@/components/admin/Toast";
import { AuthGuard } from "@/lib/admin/auth-context";

export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <ToastProvider>
        <AdminShell>{children}</AdminShell>
      </ToastProvider>
    </AuthGuard>
  );
}
