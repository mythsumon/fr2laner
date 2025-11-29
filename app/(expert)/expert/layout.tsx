import { AuthGuard } from "@/lib/auth-guard";
import { SellerDashboardLayout } from "@/components/page/seller/layout/SellerDashboardLayout";

export default function ExpertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRole="expert">
      <SellerDashboardLayout>{children}</SellerDashboardLayout>
    </AuthGuard>
  );
}

