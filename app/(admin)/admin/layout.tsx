import { ReactNode } from "react";

// This layout inherits from the parent (admin) layout
// No additional wrapper needed as the parent layout already provides AdminDashboardLayout

export default function AdminSubLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}


