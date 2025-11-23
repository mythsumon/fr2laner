"use client";

import { useState } from "react";
import { AuthLayout, SignupForm, SignupModeSelector, type SignupMode } from "@/components/auth";

export default function SignupPage() {
  const [mode, setMode] = useState<SignupMode | null>(null);

  return (
    <AuthLayout>
      {mode ? <SignupForm mode={mode} onResetMode={() => setMode(null)} /> : <SignupModeSelector onSelect={setMode} />}
    </AuthLayout>
  );
}
