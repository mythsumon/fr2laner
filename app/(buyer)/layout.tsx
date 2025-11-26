"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { BuyerDashboardLayout } from "@/components/page/buyer/layout/BuyerDashboardLayout";
import { useAuth } from "@/hooks/useAuth";

export default function BuyerDashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, requireAuth } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      requireAuth("buyer");
    } else if (!isLoading && user && user.role !== "buyer") {
      requireAuth("buyer");
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

  if (!user || user.role !== "buyer") {
    return null; // Will redirect in useEffect
  }

  return <BuyerDashboardLayout>{children}</BuyerDashboardLayout>;
}



