"use client";

import { useState } from "react";
import { AuthLayout, LoginForm, LoginModeSelector, type LoginMode } from "@/components/auth";

export default function LoginPage() {
  const [mode, setMode] = useState<LoginMode | null>(null);

  return (
    <AuthLayout>
      {mode ? <LoginForm mode={mode} onResetMode={() => setMode(null)} /> : <LoginModeSelector onSelect={setMode} />}
    </AuthLayout>
  );
}


