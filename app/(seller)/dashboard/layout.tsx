import { SellerDashboardLayout } from "@/components/page/seller/layout/SellerDashboardLayout";

export default function SellerDashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SellerDashboardLayout>{children}</SellerDashboardLayout>;
}
