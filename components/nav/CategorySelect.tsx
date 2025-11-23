"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CATEGORIES, type Category, type SubCategory } from "@/constant/categories";
import { useCategorySelect } from "@/hooks/useCategorySelect";
import { cn } from "@/components/shared/utils";
import { ChevronDown, X, ChevronRight } from "lucide-react";

type CategorySelectProps = {
  onSelectCategory?: (category: Category) => void;
  onSelectSubCategory?: (subcategory: SubCategory, parentCategory: Category) => void;
};

export const CategorySelect = ({ onSelectCategory, onSelectSubCategory }: CategorySelectProps) => {
  const { t } = useTranslation();
  const {
    isOpen,
    selectedIndex,
    triggerRef,
    menuRef,
    close,
    toggle,
    handleKeyDown,
    setSelectedIndex,
  } = useCategorySelect();

  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);

  // Scroll selected item into view
  useEffect(() => {
    if (isOpen && selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [isOpen, selectedIndex]);

  // Handle mobile menu outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleMobileClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        mobileMenuRef.current &&
        triggerRef.current &&
        !mobileMenuRef.current.contains(target) &&
        !triggerRef.current.contains(target)
      ) {
        close();
      }
    };

    // Only add listener for mobile (when mobile menu is visible)
    if (window.innerWidth < 768) {
      document.addEventListener("mousedown", handleMobileClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleMobileClickOutside);
      };
    }
  }, [isOpen, close]);

  const handleSelect = (category: Category, index: number) => {
    // If category has subcategories, don't close on click (show submenu)
    if (category.subcategories && category.subcategories.length > 0) {
      return;
    }
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    close();
  };

  const handleSubCategorySelect = (subcategory: SubCategory, parentCategory: Category) => {
    if (onSelectSubCategory) {
      onSelectSubCategory(subcategory, parentCategory);
    }
    close();
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    const result = handleKeyDown(e, CATEGORIES.length);
    if (result !== null && result !== undefined && result >= 0) {
      handleSelect(CATEGORIES[result], result);
    }
  };

  const handleItemKeyDown = (e: React.KeyboardEvent, index: number) => {
    const result = handleKeyDown(e, CATEGORIES.length);
    if (result !== null && result !== undefined && result >= 0) {
      handleSelect(CATEGORIES[result], result);
    }
  };

  const getDesignCategoryHref = (categoryId: string, subcategoryId: string) => {
    const params = new URLSearchParams();
    params.set("category", categoryId);
    params.set("subcategory", subcategoryId);
    return `/design?${params.toString()}`;
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        onKeyDown={handleTriggerKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t("header.menu.categories")}
        className={cn(
          "flex items-center gap-1.5 text-sm font-semibold text-[#0F172A] transition-colors",
          "hover:text-[#2E5E99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5E99]",
          isOpen && "text-[#2E5E99]"
        )}
      >
        {t("header.menu.categories")}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {/* Desktop Menu */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
            onClick={close}
            aria-hidden="true"
          />

          {/* Desktop Menu Panel */}
          <div
            ref={menuRef}
            className={cn(
              "absolute left-0 top-full z-50 mt-2 flex overflow-hidden rounded-2xl border border-[#E0ECF8] bg-white shadow-[0_18px_48px_rgba(30,60,120,0.18)]",
              "hidden md:flex",
              "category-menu-enter"
            )}
            onMouseLeave={() => setHoveredCategoryId(null)}
          >
            {/* Main Categories List */}
            <div className="w-[260px] max-h-[420px] overflow-y-auto py-2 border-r border-[#E0ECF8]">
              {CATEGORIES.map((category, index) => {
                const isSelected = selectedIndex === index;
                const isHovered = hoveredCategoryId === category.id;
                const hasSubcategories = category.subcategories && category.subcategories.length > 0;

                return (
                  <div
                    key={category.id}
                    onMouseEnter={() => {
                      setSelectedIndex(index);
                      if (hasSubcategories) {
                        setHoveredCategoryId(category.id);
                      }
                    }}
                    className="relative"
                  >
                    <Link
                      ref={(el) => {
                        itemRefs.current[index] = el;
                      }}
                      href={category.href}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(category, index)}
                      onKeyDown={(e) => handleItemKeyDown(e, index)}
                      className={cn(
                        "flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm text-slate-700 transition-colors",
                        "hover:bg-[#EAF6FF] hover:text-[#3A82D9] cursor-pointer",
                        isSelected && "bg-[#EAF6FF] text-[#3A82D9]",
                        isHovered && "bg-[#EAF6FF] text-[#3A82D9]"
                      )}
                    >
                      <span>{category.label}</span>
                      {hasSubcategories && (
                        <ChevronRight className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Submenu Panel */}
            {hoveredCategoryId && (() => {
              const hoveredCategory = CATEGORIES.find((cat) => cat.id === hoveredCategoryId);
              return hoveredCategory?.subcategories && hoveredCategory.subcategories.length > 0 ? (
                <div className="w-[280px] max-h-[420px] overflow-y-auto py-2">
                  <div className="px-4 py-2 mb-1 border-b border-[#E0ECF8]">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {hoveredCategory.label}
                    </h3>
                  </div>
                  {hoveredCategory.subcategories.map((subcategory) => {
                    const destination = getDesignCategoryHref(hoveredCategory.id, subcategory.id);
                    return (
                      <Link
                        key={subcategory.id}
                        href={destination}
                        onClick={() => {
                          handleSubCategorySelect(subcategory, hoveredCategory);
                        }}
                        className={cn(
                          "flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-slate-700 transition-colors",
                          "hover:bg-[#EAF6FF] hover:text-[#3A82D9] cursor-pointer"
                        )}
                      >
                        <span>{subcategory.label}</span>
                      </Link>
                    );
                  })}
                </div>
              ) : null;
            })()}
          </div>

          {/* Mobile Bottom Sheet */}
          <div
            ref={mobileMenuRef}
            role="listbox"
            className={cn(
              "fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-hidden rounded-t-3xl border-t border-[#E0ECF8] bg-white shadow-[0_-18px_48px_rgba(30,60,120,0.18)]",
              "block md:hidden",
              "flex flex-col",
              "category-menu-enter-mobile"
            )}
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between border-b border-[#E0ECF8] px-6 py-4">
              <h2 className="text-lg font-semibold text-[#1B2B3A]">
                {t("header.menu.categories")}
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-[#EAF6FF] hover:text-[#3A82D9]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Mobile Options List */}
            <div className="flex-1 overflow-y-auto py-2">
              {CATEGORIES.map((category, index) => {
                const isSelected = selectedIndex === index;
                const isExpanded = expandedMobileCategory === category.id;
                const hasSubcategories = category.subcategories && category.subcategories.length > 0;

                return (
                  <div key={category.id}>
                    <button
                      type="button"
                      onClick={() => {
                        if (hasSubcategories) {
                          setExpandedMobileCategory(isExpanded ? null : category.id);
                        } else {
                          if (onSelectCategory) {
                            onSelectCategory(category);
                          }
                          close();
                        }
                      }}
                      onKeyDown={(e) => handleItemKeyDown(e, index)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        "flex w-full items-center justify-between gap-2 px-6 py-3 text-left text-base text-slate-700 transition-colors",
                        "hover:bg-[#EAF6FF] hover:text-[#3A82D9]",
                        isSelected && "bg-[#EAF6FF] text-[#3A82D9]"
                      )}
                    >
                      <span>{category.label}</span>
                      {hasSubcategories && (
                        <ChevronRight
                          className={cn(
                            "h-5 w-5 flex-shrink-0 transition-transform",
                            isExpanded && "rotate-90"
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                    {isExpanded && hasSubcategories && (
                      <div className="bg-[#F8FAFC] border-t border-[#E0ECF8]">
                        {category.subcategories?.map((subcategory) => {
                          const destination = getDesignCategoryHref(category.id, subcategory.id);
                          return (
                            <Link
                              key={subcategory.id}
                              href={destination}
                              onClick={() => {
                                if (onSelectSubCategory) {
                                  onSelectSubCategory(subcategory, category);
                                }
                                close();
                              }}
                              className={cn(
                                "flex w-full items-center gap-2 px-10 py-2.5 text-left text-sm text-slate-600 transition-colors",
                                "hover:bg-[#EAF6FF] hover:text-[#3A82D9]"
                              )}
                            >
                              <span>{subcategory.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .category-menu-enter {
          animation: fadeInUp 120ms ease-out;
        }
        
        .category-menu-enter-mobile {
          animation: slideUp 200ms ease-out;
        }
      `}</style>
    </div>
  );
};








