"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import { homeFreelancers } from "@/entities/home";
import { 
  Star, 
  ArrowLeft,
  Clock,
  CheckCircle2,
  Grid3x3,
  List,
  Filter,
  Search as SearchIcon
} from "lucide-react";
import { useState } from "react";

// Mock data for freelancer services
const getFreelancerServices = (slug: string) => {
  const services: Record<string, any[]> = {
    "maria-g": [
      {
        id: 1,
        title: "Premium Logo Design Package",
        description: "Professional logo design with 3 initial concepts, unlimited revisions, and full brand guidelines. Perfect for startups and established businesses.",
        price: "₩250,000",
        delivery: "3 days",
        rating: 5.0,
        reviews: 89,
        orders: 234,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSS1-YKko78pnK_njnMbeiBzFbjjxR0pHDqYXJSp1VTBgaM6T-V5ktBCZlbmPY2-_QdBxKuKe4DkT0qyguOxPoo6WrNvkypDQjdjgAAR5fUogjRrqubSJifRG9WuF6vim7B0RKozDU1qVbDcmzuD49fqGfOp9oUjG-oHHdG5yYsTjlg-tPOq1VK8r31FDl8vFZanMGsyz8co9jRCXCqUqXB9dOYVz7F0ieCob9go5PbIRSEirf-lf5Ug4U8Hh0zJqiYuWlyfcgfhQ",
        category: "Logo Design",
        featured: true
      },
      {
        id: 2,
        title: "Complete Brand Identity System",
        description: "Full brand identity package including logo, color palette, typography, business cards, letterhead, and brand guidelines document.",
        price: "₩1,200,000",
        delivery: "7 days",
        rating: 5.0,
        reviews: 45,
        orders: 78,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMoRLWdj9FJWjInVDYgEYC7qbP5JTQohS0b1JsjEDSaGQJSZNH4_T_LalbbLvHSLk_XLeV80LwrMweYvG68o-y4wAbhayGBKzWUX6aCW3Y_Mnsf0xWCs3_ethzcfYIl1iYygdUPUQ_NiVAbELpDxpxPXjvA6D7eqQlUxGlGwSBhBwfyH1oFzWbhzkhxgIFEl8cjaRIBwAv9MhjEBtzZTfbwWW7IKOejlQo1jeBWJJtKPV29DT3S7JiiAVapEXsUy2pemUj48gZ2fE",
        category: "Brand Identity",
        featured: true
      },
      {
        id: 3,
        title: "Business Card Design",
        description: "Professional business card design with print-ready files. Multiple design concepts included.",
        price: "₩80,000",
        delivery: "2 days",
        rating: 4.9,
        reviews: 156,
        orders: 412,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiUbx8X0S95qNpyenE4vJZitJ3u1kzuR2s9zdXCjRkQ6aRM1GbDf4yTHECcucxT5-tDJ5UyX0aI-gQWIkZoAwwu0Yn7DYmMxOz4Laj44b-RNiDVjfG9BsmQn5ajl2JrrD5C708vLSzElcS6esbgsl8VT77fMBP_TucLBml_F9gLzLFGvD5HgAenvF4CL0oTjOgLjcJaYJxGM__yAVXowTUApAR_vFcBTNUeIPJsJIRfCweGYV_9tmbUAeaHkcBZAojqv8Eu_2-qUM",
        category: "Print Design"
      },
      {
        id: 4,
        title: "Social Media Branding Package",
        description: "Complete social media branding including profile images, cover photos, and post templates for Instagram, Facebook, and LinkedIn.",
        price: "₩350,000",
        delivery: "5 days",
        rating: 4.8,
        reviews: 92,
        orders: 189,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSS1-YKko78pnK_njnMbeiBzFbjjxR0pHDqYXJSp1VTBgaM6T-V5ktBCZlbmPY2-_QdBxKuKe4DkT0qyguOxPoo6WrNvkypDQjdjgAAR5fUogjRrqubSJifRG9WuF6vim7B0RKozDU1qVbDcmzuD49fqGfOp9oUjG-oHHdG5yYsTjlg-tPOq1VK8r31FDl8vFZanMGsyz8co9jRCXCqUqXB9dOYVz7F0ieCob9go5PbIRSEirf-lf5Ug4U8Hh0zJqiYuWlyfcgfhQ",
        category: "Social Media"
      },
      {
        id: 5,
        title: "Packaging Design",
        description: "Creative packaging design for products. Includes label design, box design, and print-ready files.",
        price: "₩450,000",
        delivery: "6 days",
        rating: 5.0,
        reviews: 67,
        orders: 123,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMoRLWdj9FJWjInVDYgEYC7qbP5JTQohS0b1JsjEDSaGQJSZNH4_T_LalbbLvHSLk_XLeV80LwrMweYvG68o-y4wAbhayGBKzWUX6aCW3Y_Mnsf0xWCs3_ethzcfYIl1iYygdUPUQ_NiVAbELpDxpxPXjvA6D7eqQlUxGlGwSBhBwfyH1oFzWbhzkhxgIFEl8cjaRIBwAv9MhjEBtzZTfbwWW7IKOejlQo1jeBWJJtKPV29DT3S7JiiAVapEXsUy2pemUj48gZ2fE",
        category: "Packaging"
      },
      {
        id: 6,
        title: "Website Mockup Design",
        description: "Professional website mockup design with responsive layouts. Includes homepage and key pages design.",
        price: "₩600,000",
        delivery: "8 days",
        rating: 4.9,
        reviews: 134,
        orders: 267,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiUbx8X0S95qNpyenE4vJZitJ3u1kzuR2s9zdXCjRkQ6aRM1GbDf4yTHECcucxT5-tDJ5UyX0aI-gQWIkZoAwwu0Yn7DYmMxOz4Laj44b-RNiDVjfG9BsmQn5ajl2JrrD5C708vLSzElcS6esbgsl8VT77fMBP_TucLBml_F9gLzLFGvD5HgAenvF4CL0oTjOgLjcJaYJxGM__yAVXowTUApAR_vFcBTNUeIPJsJIRfCweGYV_9tmbUAeaHkcBZAojqv8Eu_2-qUM",
        category: "Web Design"
      },
    ]
  };
  return services[slug] || services["maria-g"];
};

export default function FreelancerServicesPage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useTranslation();
  const slug = params.slug as string;
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const freelancer = useMemo(() => {
    return homeFreelancers.find((f) => f.id === slug);
  }, [slug]);

  const allServices = useMemo(() => {
    return getFreelancerServices(slug);
  }, [slug]);

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return allServices;
    const query = searchQuery.toLowerCase();
    return allServices.filter(
      (service) =>
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query)
    );
  }, [allServices, searchQuery]);

  if (!freelancer) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0F172A]">Freelancer not found</h1>
          <Link href="/" className="mt-4 text-[#2E5E99] hover:underline">
            Go back to homepage
          </Link>
        </div>
      </div>
    );
  }

  const displayName = t(freelancer.nameKey);
  const role = t(freelancer.roleKey);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href={`/freelancer/${slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#475569] transition-colors hover:text-[#2E5E99]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Profile
              </Link>
              <div className="h-6 w-px bg-[#E2E8F0]" />
              <div>
                <h1 className="text-xl font-bold text-[#0F172A]">{displayName}'s Services</h1>
                <p className="text-sm text-[#94A3B8]">{role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-10 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2E5E99] focus:outline-none focus:ring-2 focus:ring-[#2E5E99]/20"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-md p-2 transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#2E5E99] text-white"
                    : "text-[#475569] hover:bg-[#F8FAFC]"
                }`}
                aria-label="Grid view"
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-md p-2 transition-colors ${
                  viewMode === "list"
                    ? "bg-[#2E5E99] text-white"
                    : "text-[#475569] hover:bg-[#F8FAFC]"
                }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Results Count */}
            <div className="text-sm text-[#475569]">
              <span className="font-semibold text-[#0F172A]">{filteredServices.length}</span> services found
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid/List */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        {filteredServices.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white">
            <div className="text-center">
              <p className="text-lg font-semibold text-[#0F172A]">No services found</p>
              <p className="mt-2 text-sm text-[#94A3B8]">Try adjusting your search query</p>
            </div>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                : "space-y-4"
            }
          >
            {filteredServices.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className={`group overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white transition-all hover:-translate-y-1 hover:shadow-lg ${
                  viewMode === "list" ? "flex gap-6" : "flex flex-col"
                }`}
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden ${
                    viewMode === "list"
                      ? "h-48 w-64 flex-shrink-0"
                      : "h-48 w-full"
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {service.featured && (
                    <span className="absolute left-3 top-3 rounded-full bg-[#2E5E99] px-3 py-1 text-xs font-semibold text-white">
                      Featured
                    </span>
                  )}
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#2E5E99]">
                    {service.category}
                  </span>
                </div>

                {/* Content */}
                <div className={`flex flex-col p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <h3 className="mb-2 text-lg font-bold text-[#0F172A] group-hover:text-[#2E5E99] transition-colors line-clamp-2">
                    {service.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm text-[#475569]">
                    {service.description}
                  </p>

                  {/* Stats */}
                  <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-[#F59E0B]">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-semibold text-[#0F172A]">{service.rating}</span>
                      <span className="text-[#94A3B8]">({service.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#94A3B8]">
                      <Clock className="h-4 w-4" />
                      <span>{service.delivery}</span>
                    </div>
                    <div className="text-[#94A3B8]">
                      {service.orders} orders
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#2E5E99]">{service.price}</span>
                    <div className="rounded-lg bg-[#2E5E99] px-4 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-[#1d4673]">
                      View Details
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

