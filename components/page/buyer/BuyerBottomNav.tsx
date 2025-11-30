"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, ListChecks, User } from "lucide-react";
import { cn } from "@/components/shared/utils";

const navItems = [
  { href: "/client/dashboard", label: "Home", icon: Home },
  { href: "/client/messages", label: "Messages", icon: MessageSquare },
  { href: "/client/orders", label: "Orders", icon: ListChecks },
  { href: "/client/profile", label: "Profile", icon: User },
];

export const BuyerBottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E2E8F0] bg-white/95 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-2xl items-center justify-around py-3 text-xs font-semibold text-[#94A3B8]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors",
                isActive ? "text-[#2E5E99]" : "hover:text-[#2E5E99]"
              )}
            >
              <Icon className="size-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

