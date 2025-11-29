"use client";

import { useState, useEffect } from "react";
import { useHomeData } from "@/contexts/HomeDataContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const FindTalentHeroSlider = () => {
  const { findTalentImages } = useHomeData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeImages, setActiveImages] = useState<any[]>([]);

  useEffect(() => {
    // Filter only active images
    const active = findTalentImages.filter(img => img.active);
    setActiveImages(active);
  }, [findTalentImages]);

  useEffect(() => {
    if (activeImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex === activeImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [activeImages]);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? activeImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === activeImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (activeImages.length === 0) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1d4673] via-[#2E5E99] to-[#1d4673] pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <div className="relative mx-auto w-full max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            {/* Hero content will be added here */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#1d4673] via-[#2E5E99] to-[#1d4673] pt-20 pb-16 md:pt-32 md:pb-24">
      {/* Background image slider */}
      <div className="absolute inset-0">
        {activeImages.map((image, index) => (
          <div 
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {image.image ? (
              <img 
                src={image.image} 
                alt={image.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#1d4673] via-[#2E5E99] to-[#1d4673]" />
            )}
            {/* Overlay to maintain text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/80" />
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      {activeImages.length > 1 && (
        <>
          <button 
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button 
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="size-6" />
          </button>
          
          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {activeImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
      
      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Hero content will be added here */}
        </div>
      </div>
    </div>
  );
};