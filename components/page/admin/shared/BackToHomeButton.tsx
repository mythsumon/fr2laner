"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/shared/common";

export const BackToHomeButton = () => {
  return (
    <Link href="/">
      <Button
        type="outline"
        size="sm"
        className="flex items-center gap-2 text-[#64748B] hover:text-[#2E5E99] hover:border-[#2E5E99]"
      >
        <Home className="size-4" />
        Homepage
      </Button>
    </Link>
  );
};


