"use client";

import { ReactNode } from "react";

// This layout inherits from the parent (admin) layout
// The parent layout (app/(admin)/layout.tsx) already handles authentication
// and wraps content with AdminDashboardLayout, so we don't need to add AuthGuard here

export default function AdminSubLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Just pass through children - parent layout handles all auth checks
  return <>{children}</>;
}


