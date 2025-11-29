"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminDashboardLayout } from "@/components/page/admin/layout/AdminDashboardLayout";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, requireAuth } = useAuth();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage) {
      if (isLoading) return;
      
      if (!user) {
        router.push("/admin/login");
        return;
      }
      
      // Check user status
      if (user.status !== "active") {
        router.push("/admin/login?error=account_suspended");
        return;
      }
      
      if (user.role !== "admin") {
        // Redirect to appropriate dashboard based on user role
        if (user.role === "client") {
          router.push("/client/dashboard");
        } else if (user.role === "expert") {
          router.push("/expert/dashboard");
        } else {
          router.push("/admin/login");
        }
        return;
      }
    }
  }, [isLoginPage, isLoading, user, router]);

  // Don't apply dashboard layout to login page - return immediately
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show loading state for non-login pages
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

  if (!user || user.role !== "admin" || user.status !== "active") {
    return null; // Will redirect in useEffect
  }

  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}

