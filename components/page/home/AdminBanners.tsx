"use client";

import { useHomeData } from "@/contexts/HomeDataContext";
import Link from "next/link";
import Image from "next/image";

export const AdminBanners = () => {
  const { banners } = useHomeData();
  const activeBanners = banners.filter((b) => b.active);

  if (activeBanners.length === 0) return null;

  return (
    <section className="bg-white py-8">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeBanners.map((banner) => (
            <Link
              key={banner.id}
              href={banner.url}
              className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={banner.image || "/placeholder-banner.jpg"}
                  alt={banner.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg">{banner.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

