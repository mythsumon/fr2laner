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
import { AdminFeaturedServices } from "@/components/page/home/AdminFeaturedServices";
import { HomeBannerSlider } from "@/components/page/home/HomeBannerSlider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeBannerSlider />
      <CategoriesShowcase />
      <MultiRecommendationSection />
      <FeaturedFreelancers />
      <AdminFeaturedServices />
      <HowItWorks />
      <Testimonials />
      <FinalCallToAction />
    </>
  );
}
