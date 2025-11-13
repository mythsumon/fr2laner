"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CategoryEmptyState,
  CategoryFiltersBar,
  CategoryHeader,
  CategoryResults,
  CategorySeoFaq,
  CategorySidebar,
  type CategoryService,
  type SortOption,
  type ViewMode,
} from "@/components/page/category";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const keywordTagKeys = [
  "category.design.header.tags.logo",
  "category.design.header.tags.branding",
  "category.design.header.tags.uiux",
  "category.design.header.tags.illustration",
  "category.design.header.tags.banner",
  "category.design.header.tags.ppt",
  "category.design.header.tags.thumbnail",
  "category.design.header.tags.packaging",
  "category.design.header.tags.icon",
  "category.design.header.tags.web",
];

const mockServices: CategoryService[] = [
  {
    id: "svc-1",
    title: "I will craft a premium logo and full brand guideline",
    sellerName: "Eunji Park",
    sellerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
    sellerLevel: "Pro",
    rating: 4.9,
    reviews: 1230,
    delivery: "3 days",
    revisions: "Unlimited",
    price: 450,
    thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSS1-YKko78pnK_njnMbeiBzFbjjxR0pHDqYXJSp1VTBgaM6T-V5ktBCZlbmPY2-_QdBxKuKe4DkT0qyguOxPoo6WrNvkypDQjdjgAAR5fUogjRrqubSJifRG9WuF6vim7B0RKozDU1qVbDcmzuD49fqGfOp9oUjG-oHHdG5yYsTjlg-tPOq1VK8r31FDl8vFZanMGsyz8co9jRCXCqUqXB9dOYVz7F0ieCob9go5PbIRSEirf-lf5Ug4U8Hh0zJqiYuWlyfcgfhQ",
    badge: "pro",
  },
  {
    id: "svc-2",
    title: "I will design a conversion-focused landing page UI",
    sellerName: "David Kim",
    sellerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAee4oFsmj2FRYn8rqTluB0ZJ4S5pWmy6JPd68q-MhwRxx6Z2NtfJ7F16xz5WTxQcaycbikwY6J3bt63inTVuUWVMgl6W22a1Nslo1mNP4v3ekZLZjfrKOhBoo-UZJhQ9VlDTJqpRQn8qF5JVnNwpunpAoS5FVGdqNq9O6kzwn5Vhgah3Gq44IlcpDQjrYBR84fzqeHgACSQcZ7F6kz09yJQslUgu3JFGxxV4fOvi2ILmLjxBESa2Gy8NJCtkbnKfdDWbK1h6BQpDs",
    sellerLevel: "Level 2",
    rating: 5,
    reviews: 890,
    delivery: "5 days",
    revisions: "4 revisions",
    price: 600,
    thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMoRLWdj9FJWjInVDYgEYC7qbP5JTQohS0b1JsjEDSaGQJSZNH4_T_LalbbLvHSLk_XLeV80LwrMweYvG68o-y4wAbhayGBKzWUX6aCW3Y_Mnsf0xWCs3_ethzcfYIl1iYygdUPUQ_NiVAbELpDxpxPXjvA6D7eqQlUxGlGwSBhBwfyH1oFzWbhzkhxgIFEl8cjaRIBwAv9MhjEBtzZTfbwWW7IKOejlQo1jeBWJJtKPV29DT3S7JiiAVapEXsUy2pemUj48gZ2fE",
    badge: "best",
  },
  {
    id: "svc-3",
    title: "I will create an animated explainer video storyboard and assets",
    sellerName: "Olivia Choi",
    sellerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO3mnvRE_MHV9zJugPIrl7_XSa1uvfzz6BggZ1suPfPH4xPDL5W2UrUoOHmo_cwu8RJPq43KK7a9nstZfXV1XIysBPFu3PB3cXByu3IFDOJ7qODeULuoCrKQAv9BeCF0XRBrCPlqbFxJiCZfkzjV4WMOn_plOZjbyUgUW1_jdktnIu1JQ1dq8DQlHEWOiQgIooTXN9Y6TRbKrRdjMKu6DzZLkEjKjT3TBxIgROZ8mHcSZAH1IXOiFwApXzasQGdiFsksE_8Svhu8g",
    sellerLevel: "Pro",
    rating: 4.8,
    reviews: 540,
    delivery: "7 days",
    revisions: "3 revisions",
    price: 720,
    thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-i-z6mtQkgVAzR5G5hrEsbJm2UOK1319U0kW9hmubFqa7ec4dgK8Z67oGLwOY3QLQOdonQfobJRp2X7G7pC-L5ocrNhBsYhJpRsl6KvLH_Qe54NzBEunRnXMzDMupz8oRDH1U1BFhrlDTwGOPJRm_iP7aPofqcs68A5_X1v_R3eduxN_-h0wcYVuvh201MgTFyZ3Ri1Cf1v_xB9zK1R8ewvsMBh6XVV2K39C29p-St-mya0RrgJk1OaGfBtniQwF8vmA1oG2Vvxk",
    badge: null,
  },
  {
    id: "svc-4",
    title: "I will design presentation decks with premium storytelling",
    sellerName: "Chen Wu",
    sellerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUvUUfDc6Bdi7kT96Fz6JeMq6Q8ngumlii6V-RtJ2PaSY3gWS3N360H7EDoWNkj57X8-bPd99M-RNGeNf3JoCmNlesZDpjiq5URMM2wf19CetG5kfIeOsc2E5l-od0KttMFoZv5Lc4u-VfrQLCY017E3FzVsrWkGBnAnjMw6ZTDHGo6hqUsFV1fxDpobKFPUVwkAds2ywcIEz22yq80gllcOnZ_9ArgqrL_e1N9XLRhvA05Aq897rm_qzST7vMETgvRuLAL7uEaTU",
    sellerLevel: "Level 2",
    rating: 4.9,
    reviews: 1120,
    delivery: "4 days",
    revisions: "2 revisions",
    price: 380,
    thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQaEff0g2V0JD9hj3bhp-1euXu11pM0y9w0dYq0SnGAP2CUgWWZtQcKFm3X9Fo-PbrnsLaryZkVbny9vo22Dx-XIv5j6SvAxiZui5IXF-3M6ZX5-1xwYPse-akcciRAuUfQXvUAxwEFn6UmMsIkMC09jxseo8QJOs3KAbsLT_NYJFMJiI5uym1YuKSwKEWlgvtebfzdJPIsrk2Z1ZmJ6-U17ffMVeXX1TdG9177Vx7scYjEpo7sH7NAKZkXLe4vVJJgD-aoU79UfU",
    badge: "best",
  },
  {
    id: "svc-5",
    title: "I will design ecommerce product detail pages",
    sellerName: "Noah Lee",
    sellerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnNegvYssHxjP9gReMrkgl7rFmk-RM5eyEeZ-VsQ3OiCCIfspB2SLaYePrct2S47RvIpkuWqJbbhAjNLBx20ZR83cDTrnVq49UwSr73-UclRiHsBxiAjM2LX5lxXCEmNRobD_oQ39IljQrCi9AWjI27Aex552nt1P6pzwFcfVLegAGw-D5yRRDtYLZjPnjPLF2LXua_miW7OJsiR8NwzeIIHSMwscvudLyYoEr4fR6Dgnr3oUxHwb153Kf7aWtH8cHQsVOFuzIQLY",
    sellerLevel: "Level 1",
    rating: 4.7,
    reviews: 312,
    delivery: "6 days",
    revisions: "3 revisions",
    price: 520,
    thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMoRLWdj9FJWjInVDYgEYC7qbP5JTQohS0b1JsjEDSaGQJSZNH4_T_LalbbLvHSLk_XLeV80LwrMweYvG68o-y4wAbhayGBKzWUX6aCW3Y_Mnsf0xWCs3_ethzcfYIl1iYygdUPUQ_NiVAbELpDxpxPXjvA6D7eqQlUxGlGwSBhBwfyH1oFzWbhzkhxgIFEl8cjaRIBwAv9MhjEBtzZTfbwWW7IKOejlQo1jeBWJJtKPV29DT3S7JiiAVapEXsUy2pemUj48gZ2fE",
    badge: null,
  },
  {
    id: "svc-6",
    title: "I will deliver icon systems and component libraries",
    sellerName: "Hana Seo",
    sellerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB07jKR091KENUBAHWEcLsCBFH4yT-JB94YRH9PvqZisw1s6aHxROhuaWT1WJStxpRbjSEReSmzFod1uOhzMFI9F5AtkuDO5dMRXoaIl6u0u92sfI_8mBww06BSC3cmuSEDZUPbivEzIqeGRBV0RYJqIhjFiPOSNeVwIJ9SzCiv7lLOoCLzFeT0O7bRsXNl7W-9quCvjFUCUh1IMNzLYTYjizaJ-7qR78pTwM6D7FLPjmebHOz2hGLHMdrhFT2u1COq2HiRYf3hmvg",
    sellerLevel: "Pro",
    rating: 5,
    reviews: 640,
    delivery: "5 days",
    revisions: "Unlimited",
    price: 690,
    thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiUbx8X0S95qNpyenE4vJZitJ3u1kzuR2s9zdXCjRkQ6aRM1GbDf4yTHECcucxT5-tDJ5UyX0aI-gQWIkZoAwwu0Yn7DYmMxOz4Laj44b-RNiDVjfG9BsmQn5ajl2JrrD5C708vLSzElcS6esbgsl8VT77fMBP_TucLBml_F9gLzLFGvD5HgAenvF4CL0oTjOgLjcJaYJxGM__yAVXowTUApAR_vFcBTNUeIPJsJIRfCweGYV_9tmbUAeaHkcBZAojqv8Eu_2-qUM",
    badge: "pro",
  },
];

export default function DesignCategoryPage() {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortOption, setSortOption] = useState<SortOption>("best");
  const [activeFilters, setActiveFilters] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  const services = useMemo(() => mockServices, []);
  const totalResults = services.length * 4;
  const keywordTags = useMemo(() => keywordTagKeys.map((key) => t(key)), [t]);

  const handleClearFilters = () => {
    setActiveFilters(0);
  };

  return (
    <main className="bg-white text-[#0F172A]">
      <CategoryHeader
        title={t("category.design.header.title")}
        description={t("category.design.header.description")}
        stats={[t("category.design.header.stats.services"), t("category.design.header.stats.rating")]}
        keywordTags={keywordTags}
      />

      <CategoryFiltersBar
        totalResults={totalResults}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        activeFilters={activeFilters}
        onClearFilters={handleClearFilters}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-16 pt-8 lg:flex-row lg:px-6">
        {isDesktop && (
          <CategorySidebar onApply={() => undefined} onReset={handleClearFilters} />
        )}
        <div className="flex-1 space-y-10">
          {services.length === 0 ? (
            <CategoryEmptyState onClear={handleClearFilters} />
          ) : (
            <CategoryResults
              services={services}
              viewMode={viewMode}
              currentPage={currentPage}
              totalPages={6}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>

      <CategorySeoFaq />
    </main>
  );
}
