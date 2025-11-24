"use client";

import { usePathname } from "next/navigation";
import { AdminDashboardLayout } from "@/components/page/admin/layout/AdminDashboardLayout";

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // Don't apply dashboard layout to login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}

