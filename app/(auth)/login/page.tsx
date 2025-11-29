"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AuthLayout, LoginForm, LoginModeSelector, type LoginMode } from "@/components/auth";

function LoginContent() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<LoginMode | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const modeParam = searchParams.get("mode");
    if (modeParam === "client" || modeParam === "expert") {
      setMode(modeParam);
    }
    
    const errorParam = searchParams.get("error");
    if (errorParam === "account_suspended") {
      setError("계정이 정지되었습니다.");
    }
  }, [searchParams]);

  return (
    <AuthLayout>
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}
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
