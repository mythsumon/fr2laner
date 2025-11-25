"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/components/shared/utils";

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  rating: number;
  quote: string;
};

type Props = {
  items: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
};

// Custom hook to determine visible count based on viewport
const useVisibleCount = () => {
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      if (width >= 1024) {
        setVisibleCount(3);
      } else if (width >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  return visibleCount;
};

export const TestimonialCarousel: React.FC<Props> = ({
  items,
  autoPlay = true,
  autoPlayInterval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const visibleCount = useVisibleCount();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Create extended items for infinite loop
  const extendedItems = useRef<Testimonial[]>([]);

  useEffect(() => {
    if (items.length === 0) return;

    // Clone items for infinite loop: [lastN..., items..., firstN...]
    const lastN = items.slice(-visibleCount);
    const firstN = items.slice(0, visibleCount);
    extendedItems.current = [...lastN, ...items, ...firstN];
    
    // Start at the first real item (after cloned lastN)
    setCurrentIndex(visibleCount);
  }, [items, visibleCount]);

  // Navigate to a specific index
  const goToIndex = useCallback(
    (index: number, skipTransition = false) => {
      if (skipTransition) {
        setIsTransitioning(false);
      } else {
        setIsTransitioning(true);
      }
      setCurrentIndex(index);
    },
    []
  );

  // Handle transition end to reset position for infinite loop
  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);

    // If we're in the cloned lastN region (before real items)
    if (currentIndex < visibleCount) {
      // Jump to corresponding position in real items without animation
      const newIndex = items.length + currentIndex;
      goToIndex(newIndex, true);
    }
    // If we're in the cloned firstN region (after real items)
    else if (currentIndex >= visibleCount + items.length) {
      // Jump to corresponding position in real items without animation
      const newIndex = currentIndex - items.length;
      goToIndex(newIndex, true);
    }
  }, [currentIndex, visibleCount, items.length, goToIndex]);

  // Next slide
  const next = useCallback(() => {
    if (items.length <= visibleCount) return;
    const maxIndex = visibleCount + items.length;
    const nextIndex = currentIndex + 1;
    if (nextIndex >= maxIndex) {
      // Will be handled by transition end
      goToIndex(nextIndex);
    } else {
      goToIndex(nextIndex);
    }
  }, [currentIndex, items.length, visibleCount, goToIndex]);

  // Previous slide
  const prev = useCallback(() => {
    if (items.length <= visibleCount) return;
    const prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      // Will be handled by transition end
      goToIndex(prevIndex);
    } else {
      goToIndex(prevIndex);
    }
  }, [currentIndex, goToIndex]);

  // Autoplay logic
  useEffect(() => {
    if (!autoPlay || items.length <= visibleCount || isHovering) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      next();
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, isHovering, items.length, visibleCount, next]);

  // Calculate translateX
  const translateX = -(currentIndex * (100 / visibleCount));

  // Calculate number of logical groups for dots
  const dotCount = Math.ceil(items.length / visibleCount);
  const currentDot = Math.floor((currentIndex - visibleCount) / visibleCount);

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={cn(
              "text-lg",
              index < rating ? "text-[#F59E0B]" : "text-[#CBD5E1]"
            )}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <section aria-label="Client testimonials" className="relative w-full">
      {/* Carousel Container */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Track */}
        <div
          className={cn(
            "flex",
            isTransitioning && "transition-transform duration-500 ease-out"
          )}
          style={{
            transform: `translateX(${translateX}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedItems.current.map((item, index) => (
            <article
              key={`${item.id}-${index}`}
              aria-label={`Testimonial from ${item.name}`}
              className={cn(
                "flex-shrink-0 px-4",
                visibleCount === 3 && "w-1/3",
                visibleCount === 2 && "w-1/2",
                visibleCount === 1 && "w-full"
              )}
            >
              <div className="flex h-full flex-col gap-4 rounded-2xl bg-white px-8 py-7 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
                {/* Avatar and Name/Role */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.avatarUrl}
                    alt={item.name}
                    className="h-14 w-14 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-lg font-semibold text-[#0F172A]">{item.name}</p>
                    <span className="text-sm text-[#94A3B8]">{item.role}</span>
                  </div>
                </div>

                {/* Star Rating */}
                {renderStars(item.rating)}

                {/* Quote */}
                <p className="flex-1 text-sm leading-relaxed text-[#475569]">{item.quote}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Navigation Arrows (md+ only) */}
        {items.length > visibleCount && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[#E2E8F0] bg-white p-2 shadow-md transition-all hover:bg-[#F8FAFC] md:block hidden"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-[#475569]" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[#E2E8F0] bg-white p-2 shadow-md transition-all hover:bg-[#F8FAFC] md:block hidden"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-[#475569]" />
            </button>
          </>
        )}
      </div>

      {/* Dot Indicators */}
      {items.length > visibleCount && dotCount > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: dotCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                const targetIndex = visibleCount + index * visibleCount;
                goToIndex(targetIndex);
              }}
              className={cn(
                "h-2 rounded-full transition-all",
                index === currentDot ? "w-6 bg-sky-500" : "w-3 bg-slate-300"
              )}
              aria-label={`Go to testimonial group ${index + 1}`}
              aria-pressed={index === currentDot}
            />
          ))}
        </div>
      )}
    </section>
  );
};

// Mock testimonials for testing
export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "CEO, Tech Innovators",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTVd1i-h3YbRq0U6Oq10uVimhqpK06nACgXpgUpUNMgijFYz19n4PTG4IyYSoRYuTFYRjs6XKRvDFBIYiqKwh87fsQ6UDzh0x3bCq_S32zYts67An3tgo5zjKsdhqUV9yjskJ5XCLi0LpAhLvNRy_d6mP2lm_WaSKllWtEZTLNqm3Lk3-r4FTg8m7p1DdpwJDoniBuNYSn0wG2yX8-03C6woquJgcfDJA0iRNhm62Nv-3eNncmysvyBFk9jqelauI_HTgl_z-hoAk",
    rating: 5,
    quote: "Working with a designer from FreelanceMarket was a game-changer for our rebrand. The quality of work and the speed of delivery were absolutely outstanding. Highly recommended!",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Founder, Startup Solutions",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyupedfv9FMFlwb31DM3gXLjeoFctkvQVINAmk_l4rsBfu-yJCB2UWRh_Lxj-YI1w0TXCZiRfxr4eGytsQpRuhJ-9mmrNjjXCER5TaDIM0_wQBYzrDAKgtu2_-GIT8VD2U0A5-8HXdGawv5FcIYU2fyQ66ZNjSjptHCty2Gwn2_aEd4prbSnkmc-pYSOZW2pGpJ8NidjHcp9is2yVECa2b6EStgu-8QNIynhPlf4fj6p2iS5U2gM4zp2chYTJoZ6vctJDg13o9XTg",
    rating: 5,
    quote: "We needed a complex web application built from scratch. The developer we hired was professional, communicative, and delivered a product that exceeded our expectations on all fronts.",
  },
  {
    id: "3",
    name: "Jessica Lee",
    role: "Marketing Director, Creative Co.",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAY3ZhTdF6zx7tthrM461Nx7rFmk-RM5eyEeZ-VsQ3OiCCIfspB2SLaYePrct2S47RvIpkuWqJbbhAjNLBx20ZR83cDTrnVq49UwSr73-UclRiHsBxiAjM2LX5lxXCEmNRobD_oQ39IljQrCi9AWjI27Aex552nt1P6pzwFcfVLegAGw-D5yRRDtYLZjPnjPLF2LXua_miW7OJsiR8NwzeIIHSMwscvudLyYoEr4fR6Dgnr3oUxHwb153Kf7aWtH8cHQsVOFuzIQLY",
    rating: 5,
    quote: "The content writers on this platform are top-notch. They quickly understood our brand voice and produced high-quality blog posts that have significantly boosted our organic traffic.",
  },
  {
    id: "4",
    name: "David Kim",
    role: "CTO, AI Solutions Inc.",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB07jKR091KENUBAHWEcLsCBFH4yT-JB94YRH9PvqZisw1s6aHxROhuaWT1WJStxpRbjSEReSmzFod1uOhzMFI9F5AtkuDO5dMRXoaIl6u0u92sfI_8mBww06BSC3cmuSEDZUPbivEzIqeGRBV0RYJqIhjFiPOSNeVwIJ9SzCiv7lLOoCLzFeT0O7bRsXNl7W-9quCvjFUCUh1IMNzLYTYjizaJ-7qR78pTwM6D7FLPjmebHOz2hGLHMdrhFT2u1COq2HiRYf3hmvg",
    rating: 5,
    quote: "We needed an AI service expert and found one here. The project was completed much faster than expected, and both technical skills and communication were excellent.",
  },
  {
    id: "5",
    name: "Emily Park",
    role: "Brand Manager, Digital Media Co.",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiUbx8X0S95qNpyenE4vJZitJ3u1kzuR2s9zdXCjRkQ6aRM1GbDf4yTHECcucxT5-tDJ5UyX0aI-gQWIkZoAwwu0Yn7DYmMxOz4Laj44b-RNiDVjfG9BsmQn5ajl2JrrD5C708vLSzElcS6esbgsl8VT77fMBP_TucLBml_F9gLzLFGvD5HgAenvF4CL0oTjOgLjcJaYJxGM__yAVXowTUApAR_vFcBTNUeIPJsJIRfCweGYV_9tmbUAeaHkcBZAojqv8Eu_2-qUM",
    rating: 5,
    quote: "We hired a video editing specialist for our marketing campaign, and the results were truly impressive. Our views and conversion rates increased significantly!",
  },
  {
    id: "6",
    name: "James Wilson",
    role: "International Business Director",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_FKhIQKokNqOg9HECJ6QTjhBysweZFQ1n-eL5WCxDP_IFUpE5ZWy7F6Tih4_AG0ZkCEGzR7SdobyqJOGfS-z8R4zEzCHcKIO0cIVze6XZeqk_iU9MNwG6Nrr9feLMZLBSDlViHwtsQYwIy-cojNIYgK46EN58zvq2gno-k2zJvoTIvds8sAKvAaBLwI26eFXk81o3HAXdklCXM1xXUfo4a6Dsa8_apjMpjvxuWAvb9CukFQamsuR4B_AHQwU-8GL1_NwdMEA1KTY",
    rating: 5,
    quote: "The translation service was truly professional. They translated our technical documents into multiple languages with perfect accuracy and quality. It was a huge help for our global expansion.",
  },
];

// Example component
export const TestimonialCarouselExample: React.FC = () => {
  return (
    <section className="bg-[#F8FAFC] py-20">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl">
            Testimonials
          </h2>
          <p className="mt-4 text-lg text-[#475569]">
            What Our Clients Say
          </p>
          <p className="mt-2 text-sm text-[#64748B]">
            Discover how businesses have found success on our platform
          </p>
        </div>
        <TestimonialCarousel items={MOCK_TESTIMONIALS} />
      </div>
    </section>
  );
};


