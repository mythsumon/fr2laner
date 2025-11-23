"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  useEffect(() => {
    document.body.classList.add("auth-page");
    return () => {
      document.body.classList.remove("auth-page");
    };
  }, []);

  return (
    <main className="flex min-h-screen items-start justify-center bg-gradient-to-b from-slate-50 via-sky-50/70 to-slate-50 px-4 py-10 md:items-center">
      <div className="w-full max-w-4xl rounded-3xl border border-white/60 bg-white/90 px-6 py-6 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur md:px-10 md:py-8">
        <div className="space-y-6 md:space-y-8">{children}</div>
      </div>
    </main>
  );
};

