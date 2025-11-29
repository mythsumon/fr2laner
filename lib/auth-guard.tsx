"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import type { UserRole } from "@/types/common";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  redirectTo?: string;
}

export function AuthGuard({ children, requiredRole, redirectTo }: AuthGuardProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    // 로그인 안 되어 있으면 로그인 페이지로
    if (!isAuthenticated || !user) {
      // Admin routes should redirect to /admin/login
      const isAdminRoute = pathname?.startsWith("/admin");
      const loginUrl = redirectTo || (isAdminRoute 
        ? `/admin/login?redirect=${encodeURIComponent(pathname || "/")}`
        : `/login?redirect=${encodeURIComponent(pathname || "/")}`);
      router.push(loginUrl);
      return;
    }

    // status 체크
    if (user.status !== "active") {
      const isAdminRoute = pathname?.startsWith("/admin");
      const errorUrl = isAdminRoute 
        ? "/admin/login?error=account_suspended"
        : "/login?error=account_suspended";
      router.push(errorUrl);
      return;
    }

    // role 체크
    if (requiredRole && user.role !== requiredRole) {
      // 권한이 없으면 해당 role의 대시보드로 리다이렉트
      if (user.role === "admin") {
        router.push("/admin/dashboard");
      } else if (user.role === "client") {
        router.push("/client/dashboard");
      } else if (user.role === "expert") {
        router.push("/expert/dashboard");
      }
      return;
    }
  }, [isLoading, isAuthenticated, user, requiredRole, router, pathname, redirectTo]);

  // 로딩 중이거나 인증 실패 시 아무것도 렌더링하지 않음
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-sky-600 border-t-transparent mx-auto"></div>
          <p className="text-sm text-slate-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  if (user.status !== "active") {
    return null;
  }

  if (requiredRole && user.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}

