"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, Clock } from "lucide-react";
import type { Portfolio } from "@/hooks/useSearchResult";

interface PortfolioCardProps {
  portfolio: Portfolio;
}

export const PortfolioCard = ({ portfolio }: PortfolioCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)}주 전`;
    } else {
      return `${Math.floor(diffDays / 30)}개월 전`;
    }
  };

  return (
    <Link
      href={`/portfolio/${portfolio.id}`}
      className="group flex h-full flex-col gap-4 rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(46,94,153,0.12)]"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Image
          src={portfolio.thumb}
          alt={portfolio.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-3 right-3 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1 rounded-full bg-black/50 backdrop-blur px-3 py-1.5 text-white text-xs">
            <Eye className="size-3.5" />
            <span>{portfolio.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-black/50 backdrop-blur px-3 py-1.5 text-white text-xs">
            <Heart className="size-3.5" />
            <span>{portfolio.likes.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5">
        <div>
          <h3 className="line-clamp-2 text-base font-semibold text-[#0F172A] mb-1">
            {portfolio.title}
          </h3>
          <p className="line-clamp-2 text-sm text-[#475569]">{portfolio.description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {portfolio.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <Image
              src={portfolio.sellerAvatar}
              alt={portfolio.sellerName}
              width={24}
              height={24}
              className="size-6 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-[#0F172A]">{portfolio.sellerName}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#94A3B8]">
            <Clock className="size-3.5" />
            <span>{formatDate(portfolio.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};





