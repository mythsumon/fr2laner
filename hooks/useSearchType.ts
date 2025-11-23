"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export type SearchType = "gigs" | "sellers" | "portfolios";

export function useSearchType() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentType = useMemo((): SearchType => {
    const type = searchParams.get("type");
    if (type === "sellers" || type === "portfolios") {
      return type;
    }
    return "gigs"; // default
  }, [searchParams]);

  const setType = useCallback(
    (nextType: SearchType) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("type", nextType);
      params.set("page", "1"); // Reset page to 1 when changing type
      router.push(`/search?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  return { currentType, setType };
}





