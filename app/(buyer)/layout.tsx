import { BuyerDashboardLayout } from "@/components/page/buyer/layout/BuyerDashboardLayout";

export default function BuyerDashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BuyerDashboardLayout>{children}</BuyerDashboardLayout>;
}



