"use client";

import { useTranslation } from "react-i18next";
import { cn } from "@/components/shared/utils";
import { homeTestimonials } from "@/entities/home";
import SectionHeader from "@/components/common/SectionHeader";

export const Testimonials = () => {
  const { t } = useTranslation();

  // Duplicate testimonials multiple times for seamless infinite loop
  // Using 3 copies to ensure smooth looping on all screen sizes
  const duplicatedTestimonials = [
    ...homeTestimonials,
    ...homeTestimonials,
    ...homeTestimonials,
  ];

  const renderTestimonial = (testimonial: typeof homeTestimonials[0], index: number) => {
    return (
      <article
        key={`${testimonial.id}-${index}`}
        className={cn(
          "group flex min-w-[320px] flex-shrink-0 flex-col gap-4 rounded-2xl bg-white p-8 shadow-[0_8px_24px_rgba(46,94,153,0.08)] transition-all duration-300 ease-out",
          "hover:-translate-y-2 hover:shadow-[0_12px_32px_rgba(46,94,153,0.12)]"
        )}
      >
        <div className="flex items-center gap-4">
          <img
            src={testimonial.avatar}
            alt={t(testimonial.nameKey)}
            className="h-14 w-14 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <div>
            <p className="text-lg font-semibold text-[#0F172A] transition-colors duration-300 group-hover:text-[#2E5E99]">
              {t(testimonial.nameKey)}
            </p>
            <span className="text-sm text-[#94A3B8]">{t(testimonial.roleKey)}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[#F59E0B]">
          {Array.from({ length: 5 }).map((_, starIndex) => (
            <span key={`${testimonial.id}-star-${starIndex}`} className="text-lg">★</span>
          ))}
        </div>
        <p className="flex-1 text-sm leading-relaxed text-[#475569]">{t(testimonial.quoteKey)}</p>
      </article>
    );
  };

  return (
    <section id="testimonials" className="bg-[#F8FAFC] pt-20 pb-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-12 text-center">
          <SectionHeader
            label={t("home.sections.testimonials.label", { defaultValue: "TESTIMONIALS" })}
            title={t("home.testimonials.title")}
            description={t("home.testimonials.subtitle")}
            align="center"
          />
        </div>

        {/* Infinite Loop Carousel - Single Row for All Screen Sizes */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays for fade effect */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent" />
          
          <div className="testimonial-carousel flex gap-6">
            {duplicatedTestimonials.map((testimonial, index) => renderTestimonial(testimonial, index))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideTestimonials {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        .testimonial-carousel {
          animation: slideTestimonials 80s linear infinite;
          width: fit-content;
          will-change: transform;
        }

        .testimonial-carousel:hover {
          animation-play-state: paused;
        }

        /* Smooth animation on all devices */
        @media (prefers-reduced-motion: no-preference) {
          .testimonial-carousel {
            animation: slideTestimonials 80s linear infinite;
          }
        }

        /* Respect user's motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .testimonial-carousel {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};
