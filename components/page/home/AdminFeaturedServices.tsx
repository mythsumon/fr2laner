"use client";

import { useHomeData } from "@/contexts/HomeDataContext";
import Link from "next/link";
import { Star } from "lucide-react";

export const AdminFeaturedServices = () => {
  const { featuredServices } = useHomeData();

  if (featuredServices.length === 0) return null;

  return (
    <section className="bg-gradient-to-br from-[#2E5E99]/5 to-white py-16">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] mb-2">
            관리자 추천 서비스
          </h2>
          <p className="text-lg text-[#64748B]">
            특별히 선별된 프리미엄 서비스를 만나보세요
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="group bg-white rounded-xl border border-[#E2E8F0] p-6 hover:shadow-lg hover:border-[#2E5E99] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#2E5E99] transition-colors mb-1">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#64748B]">판매자: {service.seller}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-[#F59E0B] text-[#F59E0B]" />
                  <span className="text-sm font-semibold text-[#0F172A]">{service.rating}</span>
                </div>
                {service.orders > 0 && (
                  <span className="text-sm text-[#64748B]">({service.orders}주문)</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-[#2E5E99]">{service.price}</span>
                <span className="text-sm text-[#64748B]">부터</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

