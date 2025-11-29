"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SellerDashboardLayout } from "@/components/page/seller/layout/SellerDashboardLayout";
import { useAuth } from "@/hooks/useAuth";

export default function SellerDashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, requireAuth } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      requireAuth("expert");
    } else if (!isLoading && user && user.role !== "expert") {
      requireAuth("expert");
    }
  }, [isLoading, user, requireAuth]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block size-8 animate-spin rounded-full border-4 border-solid border-[#2E5E99] border-r-transparent"></div>
          <p className="text-sm text-[#94A3B8]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "expert") {
    return null; // Will redirect in useEffect
  }

  return <SellerDashboardLayout>{children}</SellerDashboardLayout>;
}
