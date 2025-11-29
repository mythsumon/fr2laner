import { AuthGuard } from "@/lib/auth-guard";
import { BuyerDashboardLayout } from "@/components/page/buyer/layout/BuyerDashboardLayout";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRole="client">
      <BuyerDashboardLayout>{children}</BuyerDashboardLayout>
    </AuthGuard>
  );
}

