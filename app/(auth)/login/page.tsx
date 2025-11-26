"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AuthLayout, LoginForm, LoginModeSelector, type LoginMode } from "@/components/auth";

function LoginContent() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<LoginMode | null>(null);

  useEffect(() => {
    const modeParam = searchParams.get("mode");
    if (modeParam === "client" || modeParam === "expert") {
      setMode(modeParam);
    }
  }, [searchParams]);

  return (
    <AuthLayout>
      {mode ? <LoginForm mode={mode} onResetMode={() => setMode(null)} /> : <LoginModeSelector onSelect={setMode} />}
    </AuthLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block size-8 animate-spin rounded-full border-4 border-solid border-[#2E5E99] border-r-transparent"></div>
          <p className="text-sm text-[#94A3B8]">Loading...</p>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
