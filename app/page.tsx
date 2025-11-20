"use client";

import {
  Hero,
  CategoriesShowcase,
  MultiRecommendationSection,
  FeaturedFreelancers,
  HowItWorks,
  Testimonials,
  FinalCallToAction,
} from "@/components/page/home";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesShowcase />
      <MultiRecommendationSection />
      <FeaturedFreelancers />
      <HowItWorks />
      <Testimonials />
      <FinalCallToAction />
    </>
  );
}
