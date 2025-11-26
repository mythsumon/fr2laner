"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/shared/common";
import { homeFreelancers } from "@/entities/home";
import { 
  Star, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Award, 
  MessageSquare, 
  Briefcase,
  Globe,
  Mail,
  Phone,
  Linkedin,
  Github,
  Twitter,
  ArrowLeft,
  Clock,
  Users,
  TrendingUp,
  Share2,
  Heart,
  Copy,
  Check
} from "lucide-react";

// Mock data for freelancer profile details
const getFreelancerDetails = (slug: string) => {
  const details: Record<string, any> = {
    "maria-g": {
      location: "Seoul, South Korea",
      memberSince: "2020",
      languages: ["Korean", "English"],
      responseTime: "1 hour",
      deliveryTime: "3 days",
      completedOrders: 321,
      activeClients: 45,
      totalEarnings: "₩125,000,000",
      skills: ["Brand Identity", "Logo Design", "Visual Identity", "Brand Strategy", "Packaging Design"],
      portfolio: [
        {
          id: 1,
          title: "Tech Startup Brand Identity",
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSS1-YKko78pnK_njnMbeiBzFbjjxR0pHDqYXJSp1VTBgaM6T-V5ktBCZlbmPY2-_QdBxKuKe4DkT0qyguOxPoo6WrNvkypDQjdjgAAR5fUogjRrqubSJifRG9WuF6vim7B0RKozDU1qVbDcmzuD49fqGfOp9oUjG-oHHdG5yYsTjlg-tPOq1VK8r31FDl8vFZanMGsyz8co9jRCXCqUqXB9dOYVz7F0ieCob9go5PbIRSEirf-lf5Ug4U8Hh0zJqiYuWlyfcgfhQ",
          category: "Brand Identity"
        },
        {
          id: 2,
          title: "E-commerce Logo Design",
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMoRLWdj9FJWjInVDYgEYC7qbP5JTQohS0b1JsjEDSaGQJSZNH4_T_LalbbLvHSLk_XLeV80LwrMweYvG68o-y4wAbhayGBKzWUX6aCW3Y_Mnsf0xWCs3_ethzcfYIl1iYygdUPUQ_NiVAbELpDxpxPXjvA6D7eqQlUxGlGwSBhBwfyH1oFzWbhzkhxgIFEl8cjaRIBwAv9MhjEBtzZTfbwWW7IKOejlQo1jeBWJJtKPV29DT3S7JiiAVapEXsUy2pemUj48gZ2fE",
          category: "Logo Design"
        },
        {
          id: 3,
          title: "Restaurant Brand Package",
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiUbx8X0S95qNpyenE4vJZitJ3u1kzuR2s9zdXCjRkQ6aRM1GbDf4yTHECcucxT5-tDJ5UyX0aI-gQWIkZoAwwu0Yn7DYmMxOz4Laj44b-RNiDVjfG9BsmQn5ajl2JrrD5C708vLSzElcS6esbgsl8VT77fMBP_TucLBml_F9gLzLFGvD5HgAenvF4CL0oTjOgLjcJaYJxGM__yAVXowTUApAR_vFcBTNUeIPJsJIRfCweGYV_9tmbUAeaHkcBZAojqv8Eu_2-qUM",
          category: "Brand Identity"
        },
      ],
      services: [
        {
          id: 1,
          title: "Premium Logo Design Package",
          price: "₩250,000",
          delivery: "3 days",
          rating: 5.0,
          reviews: 89,
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSS1-YKko78pnK_njnMbeiBzFbjjxR0pHDqYXJSp1VTBgaM6T-V5ktBCZlbmPY2-_QdBxKuKe4DkT0qyguOxPoo6WrNvkypDQjdjgAAR5fUogjRrqubSJifRG9WuF6vim7B0RKozDU1qVbDcmzuD49fqGfOp9oUjG-oHHdG5yYsTjlg-tPOq1VK8r31FDl8vFZanMGsyz8co9jRCXCqUqXB9dOYVz7F0ieCob9go5PbIRSEirf-lf5Ug4U8Hh0zJqiYuWlyfcgfhQ"
        },
        {
          id: 2,
          title: "Complete Brand Identity System",
          price: "₩1,200,000",
          delivery: "7 days",
          rating: 5.0,
          reviews: 45,
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMoRLWdj9FJWjInVDYgEYC7qbP5JTQohS0b1JsjEDSaGQJSZNH4_T_LalbbLvHSLk_XLeV80LwrMweYvG68o-y4wAbhayGBKzWUX6aCW3Y_Mnsf0xWCs3_ethzcfYIl1iYygdUPUQ_NiVAbELpDxpxPXjvA6D7eqQlUxGlGwSBhBwfyH1oFzWbhzkhxgIFEl8cjaRIBwAv9MhjEBtzZTfbwWW7IKOejlQo1jeBWJJtKPV29DT3S7JiiAVapEXsUy2pemUj48gZ2fE"
        },
      ],
      reviews: [
        {
          id: 1,
          clientName: "Sarah Johnson",
          clientAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTVd1i-h3YbRq0U6Oq10uVimhqpK06nACgXpgUpUNMgijFYz19n4PTG4IyYSoRYuTFYRjs6XKRvDFBIYiqKwh87fsQ6UDzh0x3bCq_S32zYts67An3tgo5zjKsdhqUV9yjskJ5XCLi0LpAhLvNRy_d6mP2lm_WaSKllWtEZTLNqm3Lk3-r4FTg8m7p1DdpwJDoniBuNYSn0wG2yX8-03C6woquJgcfDJA0iRNhm62Nv-3eNncmysvyBFk9jqelauI_HTgl_z-hoAk",
          rating: 5,
          comment: "Maria created an amazing brand identity for our startup. Her attention to detail and creative vision exceeded our expectations!",
          date: "2 weeks ago",
          project: "Tech Startup Brand Identity"
        },
        {
          id: 2,
          clientName: "Michael Chen",
          clientAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyupedfv9FMFlwb31DM3gXLjeoFctkvQVINAmk_l4rsBfu-yJCB2UWRh_Lxj-YI1w0TXCZiRfxr4eGytsQpRuhJ-9mmrNjjXCER5TaDIM0_wQBYzrDAKgtu2_-GIT8VD2U0A5-8HXdGawv5FcIYU2fyQ66ZNjSjptHCty2Gwn2_aEd4prbSnkmc-pYSOZW2pGpJ8NidjHcp9is2yVECa2b6EStgu-8QNIynhPlf4fj6p2iS5U2gM4zp2chYTJoZ6vctJDg13o9XTg",
          rating: 5,
          comment: "Professional, responsive, and incredibly talented. The logo design perfectly captured our brand essence.",
          date: "1 month ago",
          project: "E-commerce Logo Design"
        },
      ],
      about: "I'm a passionate brand identity designer with over 5 years of experience helping businesses tell their unique stories through visual design. I specialize in creating memorable brands that resonate with audiences and drive business growth. My approach combines strategic thinking with creative excellence to deliver brand identities that stand the test of time.",
      education: "BFA in Graphic Design, Seoul National University",
      certifications: ["Adobe Certified Expert", "Brand Strategy Certification"]
    }
  };
  return details[slug] || details["maria-g"];
};

export default function FreelancerProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useTranslation();
  const slug = params.slug as string;
  const [isFavorited, setIsFavorited] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const freelancer = useMemo(() => {
    return homeFreelancers.find((f) => f.id === slug);
  }, [slug]);

  const details = useMemo(() => {
    return getFreelancerDetails(slug);
  }, [slug]);

  // Get related freelancers (same tag or similar role)
  const relatedFreelancers = useMemo(() => {
    if (!freelancer) return [];
    return homeFreelancers
      .filter((f) => f.id !== slug && (f.tag === freelancer.tag || f.roleKey === freelancer.roleKey))
      .slice(0, 4);
  }, [freelancer, slug]);

  const handleContact = () => {
    // Navigate to messages page with freelancer ID
    router.push(`/messages?freelancer=${slug}`);
  };

  const handleViewServices = () => {
    // Navigate to freelancer's services page
    router.push(`/freelancer/${slug}/services`);
  };

  const handleShare = async () => {
    if (!freelancer) return;
    const displayName = t(freelancer.nameKey);
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${displayName} - Freelancer Profile`,
          text: `Check out ${displayName}'s profile on FreelanceMarket`,
          url: url,
        });
      } catch (err) {
        // User cancelled or error occurred
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleFavorite = () => {
    if (typeof window === "undefined") return;
    setIsFavorited(!isFavorited);
    // Save to favorites in localStorage
    const favorites = JSON.parse(localStorage.getItem("favorite_freelancers") || "[]");
    if (isFavorited) {
      const updated = favorites.filter((id: string) => id !== slug);
      localStorage.setItem("favorite_freelancers", JSON.stringify(updated));
    } else {
      favorites.push(slug);
      localStorage.setItem("favorite_freelancers", JSON.stringify(favorites));
    }
  };

  // Load favorite status from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const favorites = JSON.parse(localStorage.getItem("favorite_freelancers") || "[]");
      setIsFavorited(favorites.includes(slug));
    }
  }, [slug]);

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
  const tagline = t(freelancer.taglineKey);
  const reviewsText = t(freelancer.reviewsKey);

  return (
    <main className="min-h-screen bg-white">
      {/* Header with Back Button */}
      <div className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#475569] transition-colors hover:text-[#2E5E99]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Profile Header */}
      <section className="border-b border-[#E2E8F0] bg-gradient-to-b from-white to-[#F8FAFC] py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative">
                <Image
                  src={freelancer.avatar}
                  alt={displayName}
                  width={160}
                  height={160}
                  className="h-40 w-40 rounded-full object-cover ring-4 ring-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 rounded-full bg-white p-1 shadow-md">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="mb-4">
                <h1 className="mb-2 text-4xl font-bold text-[#0F172A]">{displayName}</h1>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-[#E9EEF8] px-4 py-2 text-sm font-semibold text-[#2E5E99]">
                    {role}
                  </span>
                  <div className="flex items-center gap-1 text-[#F59E0B]">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="text-lg font-bold text-[#0F172A]">{freelancer.rating.toFixed(1)}</span>
                    <span className="text-sm text-[#94A3B8]">{reviewsText}</span>
                  </div>
                </div>
                <p className="text-lg text-[#475569]">{tagline}</p>
              </div>

              {/* Stats */}
              <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="mb-1 flex items-center gap-2 text-sm text-[#94A3B8]">
                    <Briefcase className="h-4 w-4" />
                    <span>Completed</span>
                  </div>
                  <div className="text-2xl font-bold text-[#0F172A]">{details.completedOrders}</div>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="mb-1 flex items-center gap-2 text-sm text-[#94A3B8]">
                    <Users className="h-4 w-4" />
                    <span>Active Clients</span>
                  </div>
                  <div className="text-2xl font-bold text-[#0F172A]">{details.activeClients}</div>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="mb-1 flex items-center gap-2 text-sm text-[#94A3B8]">
                    <Clock className="h-4 w-4" />
                    <span>Response</span>
                  </div>
                  <div className="text-2xl font-bold text-[#0F172A]">{details.responseTime}</div>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="mb-1 flex items-center gap-2 text-sm text-[#94A3B8]">
                    <TrendingUp className="h-4 w-4" />
                    <span>Earnings</span>
                  </div>
                  <div className="text-2xl font-bold text-[#0F172A]">{details.totalEarnings}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  type="primary"
                  shape="round"
                  onClick={handleContact}
                  className="bg-[#2E5E99] px-6 py-2 text-sm font-semibold text-white hover:bg-[#1d4673]"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Me
                </Button>
                <Button
                  type="default"
                  shape="round"
                  onClick={handleViewServices}
                  className="border border-[#2E5E99] bg-transparent px-6 py-2 text-sm font-semibold text-[#2E5E99] hover:bg-[#2E5E99] hover:text-white"
                >
                  View Services
                </Button>
                <Button
                  type="default"
                  shape="round"
                  onClick={handleShare}
                  className="border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] hover:bg-[#F8FAFC]"
                >
                  {isCopied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </>
                  )}
                </Button>
                <Button
                  type="default"
                  shape="round"
                  onClick={handleFavorite}
                  className={`border px-4 py-2 text-sm font-semibold transition-colors ${
                    isFavorited
                      ? "border-[#EF4444] bg-[#FEE2E2] text-[#EF4444] hover:bg-[#FECACA]"
                      : "border-[#E2E8F0] bg-white text-[#475569] hover:bg-[#F8FAFC]"
                  }`}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
                  {isFavorited ? "Saved" : "Save"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Sidebar */}
          <aside className="lg:col-span-1">
            <div className="space-y-6">
              {/* Location & Info */}
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-[#0F172A]">Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-[#475569]">
                    <MapPin className="h-4 w-4 text-[#94A3B8]" />
                    <span>{details.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#475569]">
                    <Calendar className="h-4 w-4 text-[#94A3B8]" />
                    <span>Member since {details.memberSince}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#475569]">
                    <Clock className="h-4 w-4 text-[#94A3B8]" />
                    <span>Avg. response: {details.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#475569]">
                    <Award className="h-4 w-4 text-[#94A3B8]" />
                    <span>Delivery: {details.deliveryTime}</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-[#0F172A]">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {details.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="rounded-full bg-[#E9EEF8] px-3 py-1 text-xs font-semibold text-[#2E5E99]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-[#0F172A]">Languages</h3>
                <div className="space-y-2">
                  {details.languages.map((lang: string) => (
                    <div key={lang} className="text-sm text-[#475569]">
                      {lang}
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-[#0F172A]">Connect</h3>
                <div className="flex gap-3">
                  <a href="#" className="text-[#94A3B8] hover:text-[#2E5E99]">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-[#94A3B8] hover:text-[#2E5E99]">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-[#94A3B8] hover:text-[#2E5E99]">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-[#94A3B8] hover:text-[#2E5E99]">
                    <Globe className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* About */}
              <section className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-2xl font-bold text-[#0F172A]">About</h2>
                <p className="mb-6 leading-relaxed text-[#475569]">{details.about}</p>
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold text-[#0F172A]">Education: </span>
                    <span className="text-[#475569]">{details.education}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#0F172A]">Certifications: </span>
                    <span className="text-[#475569]">{details.certifications.join(", ")}</span>
                  </div>
                </div>
              </section>

              {/* Services */}
              <section className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold text-[#0F172A]">Services</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {details.services.map((service: any) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.id}`}
                      className="group overflow-hidden rounded-xl border border-[#E2E8F0] transition-all hover:shadow-lg"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="mb-2 font-semibold text-[#0F172A] group-hover:text-[#2E5E99]">
                          {service.title}
                        </h3>
                        <div className="mb-2 flex items-center gap-2">
                          <div className="flex items-center gap-1 text-[#F59E0B]">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-semibold text-[#0F172A]">{service.rating}</span>
                          </div>
                          <span className="text-sm text-[#94A3B8]">({service.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-[#2E5E99]">{service.price}</span>
                          <span className="text-sm text-[#94A3B8]">{service.delivery}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Portfolio */}
              <section className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold text-[#0F172A]">Portfolio</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {details.portfolio.map((item: any) => (
                    <div key={item.id} className="group overflow-hidden rounded-xl">
                      <div className="relative h-64 overflow-hidden rounded-xl border border-[#E2E8F0]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                      </div>
                      <div className="mt-3">
                        <h3 className="font-semibold text-[#0F172A]">{item.title}</h3>
                        <p className="text-sm text-[#94A3B8]">{item.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Reviews */}
              <section className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold text-[#0F172A]">Client Reviews</h2>
                <div className="space-y-6">
                  {details.reviews.map((review: any) => (
                    <div key={review.id} className="border-b border-[#E2E8F0] pb-6 last:border-0 last:pb-0">
                      <div className="mb-3 flex items-start gap-4">
                        <Image
                          src={review.clientAvatar}
                          alt={review.clientName}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <h4 className="font-semibold text-[#0F172A]">{review.clientName}</h4>
                            <div className="flex items-center gap-1 text-[#F59E0B]">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-current" />
                              ))}
                            </div>
                          </div>
                          <p className="mb-2 text-sm text-[#94A3B8]">{review.date}</p>
                          <p className="text-[#475569]">{review.comment}</p>
                          <p className="mt-2 text-sm text-[#94A3B8]">Project: {review.project}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Related Freelancers */}
        {relatedFreelancers.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-[#0F172A]">Related Freelancers</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {relatedFreelancers.map((related) => {
                const relatedDisplayName = t(related.nameKey);
                const relatedRole = t(related.roleKey);
                const relatedTagline = t(related.taglineKey);
                const relatedReviewsText = t(related.reviewsKey);
                
                return (
                  <Link
                    key={related.id}
                    href={`/freelancer/${related.id}`}
                    className="group flex flex-col items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Image
                      src={related.avatar}
                      alt={relatedDisplayName}
                      width={96}
                      height={96}
                      className="h-24 w-24 rounded-full object-cover shadow-md ring-4 ring-white"
                    />
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#2E5E99] transition-colors">
                        {relatedDisplayName}
                      </h3>
                      <span className="inline-flex items-center rounded-full bg-[#E9EEF8] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2E5E99]">
                        {relatedRole}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-sm text-[#475569]">{relatedTagline}</p>
                    <div className="flex items-center gap-1 text-sm text-[#F59E0B]">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-semibold text-[#475569]">{related.rating.toFixed(1)}</span>
                      <span className="text-[#94A3B8]">{relatedReviewsText}</span>
                    </div>
                    <div className="w-full">
                      <div className="w-full rounded-lg border border-[#2E5E99] bg-transparent px-4 py-2 text-center text-sm font-semibold text-[#2E5E99] transition-colors group-hover:bg-[#2E5E99] group-hover:text-white">
                        View Profile
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

