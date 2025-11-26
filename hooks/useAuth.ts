"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "buyer" | "seller" | "admin";
}

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

  const login = (userData: User, token: string) => {
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

  const requireAuth = useCallback((requiredRole?: "buyer" | "seller" | "admin") => {
    if (isLoading) return false;
    
    if (!user) {
      // Determine login page based on current path
      if (pathname?.startsWith("/admin")) {
        router.push("/admin/login");
      } else if (pathname?.startsWith("/dashboard")) {
        router.push("/login?mode=expert");
      } else {
        router.push("/login?mode=client");
      }
      return false;
    }

    if (requiredRole && user.role !== requiredRole) {
      // Redirect to appropriate dashboard
      if (user.role === "buyer") {
        router.push("/buyer-dashboard");
      } else if (user.role === "seller") {
        router.push("/dashboard");
      } else if (user.role === "admin") {
        router.push("/admin/dashboard");
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

