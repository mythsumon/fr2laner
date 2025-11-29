"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const ConditionalLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  
  // Hide header and footer on security pages, settings pages, and admin pages
  const isSecurityPage = pathname?.includes("/settings/security") || pathname?.includes("/dashboard/settings/security");
  const isSettingsPage = pathname?.startsWith("/client/settings") || pathname?.startsWith("/expert/settings");
  const isAdminPage = pathname?.startsWith("/admin");
  
  return (
    <>
      {!isSecurityPage && !isSettingsPage && !isAdminPage && <Header />}
      {children}
      {!isSecurityPage && !isSettingsPage && !isAdminPage && <Footer />}
    </>
  );
};

