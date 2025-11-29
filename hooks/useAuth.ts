"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { User, UserRole } from "@/types/common";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const loadUser = () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        
        if (token && userData) {
          try {
            setUser(JSON.parse(userData));
          } catch (e) {
            console.error("Failed to parse user data:", e);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
          }
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    };

    loadUser();

    // Listen for storage changes (for cross-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user" || e.key === "token") {
        loadUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (userData: Omit<User, "password_hash">, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  const requireAuth = useCallback((requiredRole?: UserRole) => {
    if (isLoading) return false;
    
    if (!user) {
      // Determine login page based on current path
      const redirectUrl = pathname ? `?redirect=${encodeURIComponent(pathname)}` : "";
      router.push(`/login${redirectUrl}`);
      return false;
    }

    // status 체크
    if (user.status !== "active") {
      router.push("/login?error=account_suspended");
      return false;
    }

    if (requiredRole && user.role !== requiredRole) {
      // Redirect to appropriate dashboard based on user's role
      if (user.role === "admin") {
        router.push("/admin/dashboard");
      } else if (user.role === "client") {
        router.push("/client/dashboard");
      } else if (user.role === "expert") {
        router.push("/expert/dashboard");
      }
      return false;
    }

    return true;
  }, [isLoading, user, pathname, router]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    requireAuth,
  };
};

