import {
  type HomeCategoryCard,
  type HomeCategoryFilter,
  type HomeFreelancer,
  type HomePrimaryCategory,
  type HomeService,
  type HomeStep,
  type HomeTestimonial,
} from "./home-types";

export const homeCategoryFilters: HomeCategoryFilter[] = [
  { id: "logo", labelKey: "home.filters.logo" },
  { id: "branding", labelKey: "home.filters.branding" },
  { id: "uiux", labelKey: "home.filters.uiux" },
  { id: "development", labelKey: "home.filters.development" },
  { id: "marketing", labelKey: "home.filters.marketing" },
  { id: "video", labelKey: "home.filters.video" },
  { id: "writing", labelKey: "home.filters.writing" },
  { id: "all", labelKey: "home.filters.all" },
];

export const homeCategoryCards: HomeCategoryCard[] = [
  {
    id: "graphics-design",
    labelKey: "home.categories.items.graphicsDesign",
    altKey: "home.categories.alts.graphicsDesign",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBdaR5QGyzwdwKhEarTLJPrgscbo9777GAsHwrHt8etjdmzQ7MNWO20hDnSZgAik-8iENwShpSiXddQfLvkZ-vUuMOMqhSo3wmKza7FKCyO7fQfUP9nOjIPHTpL5qG_1MiKmLJQ9Mojxc2-PO179siZG_J3F4-KGIvPfQg3HUtNhncGZ4oYIdTOYPUS9UgWV5d2W6VBoo4BnGLQZeaLtclQHtg7BPXRwKVeVPrYuuICxlZsEknxuP4OxxNuCjuJZfeR97dnZci3h0",
  },
  {
    id: "development-it",
    labelKey: "home.categories.items.developmentIt",
    altKey: "home.categories.alts.developmentIt",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIKWA-MMQ7iml5QBc2A3qOI5pwt5EZhi_BXUe1BuEGUyrucUPrwjOzQ4ChqagC92dhUUkFbZwqB0eG24pmimzGuxXrnU1bewZK6v7N05_NW7TMcBadkryLQKLUgxNAymCVIiRZtj0Ru25cbeK8rtHS-SVAEr-rcZbQDDUAnhur4pMa-RY7lTqKgAjuymTCasTJa1db-U_rkjO9x6fPqGj-xZsOqHWwMR5PlvnpcAa7-ayphpcQX1jaDUGQDZZyqsW_wEQlrxND7jk",
  },
  {
    id: "digital-marketing",
    labelKey: "home.categories.items.digitalMarketing",
    altKey: "home.categories.alts.digitalMarketing",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXGxU3hcThL4PV4LqWcS3P8-hFStwT7bxRvIehdb7qmba6qavrt-TFpXyTisgjVQMtczGe1rsH3i1_tdf9tusvaaOUEcd6l4AMeN-IkbnqUGtXe7RdxTHfs1fsa9e0StC7SfeZFxjKLeqwnGbZ08u7rcQpRsUmWyDq4H5W3z_rbljeLSCdcJwktWFPnJ84D-wI3yTXjOm-bmBE7-WgT16HMWCuCHgHOffa3sufDTlW-nUHSzrkH07wjlnP9pnM5_vaa0OMgoLoJbs",
  },
  {
    id: "writing-translation",
    labelKey: "home.categories.items.writingTranslation",
    altKey: "home.categories.alts.writingTranslation",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiSUHibGR5F7-0cXThMhGvbDJivDDqLowSrM8mkfYPCUpCM86MNwRExtVpm9m-ZyV3h_X9VJhz3fyfz29RUduEj-AQb52R_2OZyYaHRIjV876zYlGmuiouxELFjh_VGqydnXZi8CxT6bf5Grzbi1mG4Xv9mx0L8UQjwLzhBTB_g57bu7mFrTukPb6KRDDHCN_tE7vF9G1zbQbuC83A07G0tyQ0VoOd4SwfiEMA8SK3yTZ1O4jCAkHpe7_oxHwzza6hU-w7JhqBSLY",
  },
  {
    id: "video-animation",
    labelKey: "home.categories.items.videoAnimation",
    altKey: "home.categories.alts.videoAnimation",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCe-h-1gNWqWrV9eITZi3fMPNzBN0HkNV-Z-G9vNuG4Ep_GtNCS2lspMMdVP6PeWnKV7yQwpjaCF4ifP9muf1AWCnza6JO_TJYuZH6di-Ekg7JIbq_M8gX-HonP5SGLge8OtfhEiv_tfGfGEzjQAgpWsY0WVL3TIGUMrxCBnZmSLEHe4fnQBKZtsqANU4fLo6ZzCireIxA_FWahWFW_5yarcK4fPF-A4NrGz9vPp0t-3eqNAldNcwBSXljMPF5gkKYSUtFzvO1fiII",
  },
  {
    id: "business",
    labelKey: "home.categories.items.business",
    altKey: "home.categories.alts.business",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmbsmooqtSgsIwvScT2OX4x145RbXv5_fidCwwCa2hAwToNLGpcorREPyyIfQwqzS45f4oKcZh-Q_Z3Z-Ns-vmAkAiOl2JmNCx1B4oeWaf3m60fdowZja2LsJVF076PYWYQT2ScgfWwqGy8PO3FLlfXZMco0GHPFtJ-pJmpyvWbpCZyT-Lm4nq6sFarY5osreTJD31hVFz6SP6o-u2uXr9vdQK_Vvn19XXzyljGXTO4-Ldt-jDt9PlyHZblqqwWcVN9kFF5dvD5LQ",
  },
  {
    id: "illustration",
    labelKey: "home.categories.items.illustration",
    altKey: "home.categories.alts.illustration",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCb4Kh3BnWSb3wQd4vWHwZ8Z1S0nZYIPspO2hE7FaQYmGdHSu7GRlBrHSv03eR8WPuIbdXlESMdw3i0w5_m7o1DIhteVQvdZc69nWNCV7QrnHSb1mYhD0R6slgrQnd0OdrVQXz1d3bgmU1cq_aYFmculLwT10X7Ule1ygtI6DiLULa9dU1S7niYk3l6nX1Q2t1F4CQ",
  },
  {
    id: "photography",
    labelKey: "home.categories.items.photography",
    altKey: "home.categories.alts.photography",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCX1P--GcVCWAgpS1ZYH8YpSzpkXfBKYRsXeZPxlnwGSn5g2a8Nn_7UPhgpVlAOZgkFyxZz-5azE13H9oQiU5RQ8m4_Oe-8p6SRhwGZNv1ak0NqCIJTNMcX3X82U2SR7dbINmMcYI7VBSoLhlnVqGmJzr37fgY",
  },
];

export const homePrimaryCategories: HomePrimaryCategory[] = [
  {
    id: "design-branding",
    labelKey: "home.primaryCategories.items.designBranding",
    icon: "palette",
    gradientFrom: "#E6ECFF",
    gradientTo: "#D4DBFF",
    accent: "#8F9CF5",
    image: "/assets/icons/categories/design-branding.png",
  },
  {
    id: "it-development",
    labelKey: "home.primaryCategories.items.itDevelopment",
    icon: "laptopCode",
    gradientFrom: "#E6F7FF",
    gradientTo: "#D2EBFF",
    accent: "#7EC4F8",
    image: "/assets/icons/categories/IT & Development.png",
  },

  {    id: "video-photo-audio",
    labelKey: "home.primaryCategories.items.videoPhotoAudio",
    icon: "cameraAudio",
    gradientFrom: "#FFEFF6",
    gradientTo: "#FFD9EC",
    accent: "#F59BCF",
    image: "/assets/icons/categories/video.png",
  },
  {
    id: "marketing-advertising",
    labelKey: "home.primaryCategories.items.marketingAdvertising",
    icon: "megaphone",
    gradientFrom: "#FFF5E5",
    gradientTo: "#FFE6C7",
    accent: "#F6C27A",
    image: "/assets/icons/categories/marketing.png",
  },
  {
    id: "writing-content",
    labelKey: "home.primaryCategories.items.writingContent",
    icon: "pencilDocument",
    gradientFrom: "#F1F5FF",
    gradientTo: "#E1EAFF",
    accent: "#A5BAFF",
    image: "/assets/icons/categories/writing.png",
  },
  {
    id: "startup-business-support",
    labelKey: "home.primaryCategories.items.startupBusinessSupport",
    icon: "buildingArrow",
    gradientFrom: "#EAF8F0",
    gradientTo: "#D6F0E4",
    accent: "#89D0B3",
    image: "/assets/icons/categories/startup.png",
  },
  {
    id: "legal-tax-hr",
    labelKey: "home.primaryCategories.items.legalTaxHr",
    icon: "scale",
    gradientFrom: "#F3F4FD",
    gradientTo: "#E1E3FB",
    accent: "#AEB5F3",
    image: "/assets/icons/categories/legal.png",
  },
  {
    id: "ebooks-learning",
    labelKey: "home.primaryCategories.items.ebooksLearning",
    icon: "openBook",
    gradientFrom: "#F2F6FF",
    gradientTo: "#E0EBFF",
    accent: "#9AB8FF",
    image: "/assets/icons/categories/ebook.png",
  },
  {
    id: "ai-services",
    labelKey: "home.primaryCategories.items.aiServices",
    icon: "sparkles",
    gradientFrom: "#F5F0FF",
    gradientTo: "#E8DCFF",
    accent: "#B79EFF",
    image: "/assets/icons/categories/ai.png",
  },
  {
    id: "translation-interpretation",
    labelKey: "home.primaryCategories.items.translationInterpretation",
    icon: "flags",
    gradientFrom: "#E7F6FF",
    gradientTo: "#D4ECFF",
    accent: "#8DC7F9",
    image: "/assets/icons/categories/translate.png",
  },
  {
    id: "custom-orders",
    labelKey: "home.primaryCategories.items.customOrders",
    icon: "gift",
    gradientFrom: "#FFF2F3",
    gradientTo: "#FFE0E5",
    accent: "#FFA6B5",  
    image: "/assets/icons/categories/custom.png",
  },
  {
    id: "career-exam-prep",
    labelKey: "home.primaryCategories.items.careerExamPrep",
    icon: "briefcase",
    gradientFrom: "#EAF1FF",
    gradientTo: "#DBE6FF",
    accent: "#98B6FF",
    image: "/assets/icons/categories/career.png",
  },
  {
    id: "consulting-coaching",
    labelKey: "home.primaryCategories.items.consultingCoaching",
    icon: "lightbulb",
    gradientFrom: "#FFF8E6",
    gradientTo: "#FFEFC2",
    accent: "#F4D27F",
    image: "/assets/icons/categories/advice.png",
  },
  {
    id: "lifestyle-services",
    labelKey: "home.primaryCategories.items.lifestyleServices",
    icon: "house",
    gradientFrom: "#EFFFF7",
    gradientTo: "#D9F7E7",
    accent: "#93DDBE",
    image: "/assets/icons/categories/lifestyle.png",
  },
];

export const homeTestimonials: HomeTestimonial[] = [
  {
    id: "sarah-johnson",
    quoteKey: "home.testimonials.items.sarah.quote",
    nameKey: "home.testimonials.items.sarah.name",
    roleKey: "home.testimonials.items.sarah.role",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTVd1i-h3YbRq0U6Oq10uVimhqpK06nACgXpgUpUNMgijFYz19n4PTG4IyYSoRYuTFYRjs6XKRvDFBIYiqKwh87fsQ6UDzh0x3bCq_S32zYts67An3tgo5zjKsdhqUV9yjskJ5XCLi0LpAhLvNRy_d6mP2lm_WaSKllWtEZTLNqm3Lk3-r4FTg8m7p1DdpwJDoniBuNYSn0wG2yX8-03C6woquJgcfDJA0iRNhm62Nv-3eNncmysvyBFk9jqelauI_HTgl_z-hoAk",
  },
  {
    id: "michael-chen",
    quoteKey: "home.testimonials.items.michael.quote",
    nameKey: "home.testimonials.items.michael.name",
    roleKey: "home.testimonials.items.michael.role",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDyupedfv9FMFlwb31DM3gXLjeoFctkvQVINAmk_l4rsBfu-yJCB2UWRh_Lxj-YI1w0TXCZiRfxr4eGytsQpRuhJ-9mmrNjjXCER5TaDIM0_wQBYzrDAKgtu2_-GIT8VD2U0A5-8HXdGawv5FcIYU2fyQ66ZNjSjptHCty2Gwn2_aEd4prbSnkmc-pYSOZW2pGpJ8NidjHcp9is2yVECa2b6EStgu-8QNIynhPlf4fj6p2iS5U2gM4zp2chYTJoZ6vctJDg13o9XTg",
  },
  {
    id: "jessica-lee",
    quoteKey: "home.testimonials.items.jessica.quote",
    nameKey: "home.testimonials.items.jessica.name",
    roleKey: "home.testimonials.items.jessica.role",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAY3ZhTdF6zx7tthrM461Nx7rFmk-RM5eyEeZ-VsQ3OiCCIfspB2SLaYePrct2S47RvIpkuWqJbbhAjNLBx20ZR83cDTrnVq49UwSr73-UclRiHsBxiAjM2LX5lxXCEmNRobD_oQ39IljQrCi9AWjI27Aex552nt1P6pzwFcfVLegAGw-D5yRRDtYLZjPnjPLF2LXua_miW7OJsiR8NwzeIIHSMwscvudLyYoEr4fR6Dgnr3oUxHwb153Kf7aWtH8cHQsVOFuzIQLY",
  },
  {
    id: "david-kim",
    quoteKey: "home.testimonials.items.david.quote",
    nameKey: "home.testimonials.items.david.name",
    roleKey: "home.testimonials.items.david.role",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB07jKR091KENUBAHWEcLsCBFH4yT-JB94YRH9PvqZisw1s6aHxROhuaWT1WJStxpRbjSEReSmzFod1uOhzMFI9F5AtkuDO5dMRXoaIl6u0u92sfI_8mBww06BSC3cmuSEDZUPbivEzIqeGRBV0RYJqIhjFiPOSNeVwIJ9SzCiv7lLOoCLzFeT0O7bRsXNl7W-9quCvjFUCUh1IMNzLYTYjizaJ-7qR78pTwM6D7FLPjmebHOz2hGLHMdrhFT2u1COq2HiRYf3hmvg",
  },
  {
    id: "emily-park",
    quoteKey: "home.testimonials.items.emily.quote",
    nameKey: "home.testimonials.items.emily.name",
    roleKey: "home.testimonials.items.emily.role",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCiUbx8X0S95qNpyenE4vJZitJ3u1kzuR2s9zdXCjRkQ6aRM1GbDf4yTHECcucxT5-tDJ5UyX0aI-gQWIkZoAwwu0Yn7DYmMxOz4Laj44b-RNiDVjfG9BsmQn5ajl2JrrD5C708vLSzElcS6esbgsl8VT77fMBP_TucLBml_F9gLzLFGvD5HgAenvF4CL0oTjOgLjcJaYJxGM__yAVXowTUApAR_vFcBTNUeIPJsJIRfCweGYV_9tmbUAeaHkcBZAojqv8Eu_2-qUM",
  },
  {
    id: "james-wilson",
    quoteKey: "home.testimonials.items.james.quote",
    nameKey: "home.testimonials.items.james.name",
    roleKey: "home.testimonials.items.james.role",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_FKhIQKokNqOg9HECJ6QTjhBysweZFQ1n-eL5WCxDP_IFUpE5ZWy7F6Tih4_AG0ZkCEGzR7SdobyqJOGfS-z8R4zEzCHcKIO0cIVze6XZeqk_iU9MNwG6Nrr9feLMZLBSDlViHwtsQYwIy-cojNIYgK46EN58zvq2gno-k2zJvoTIvds8sAKvAaBLwI26eFXk81o3HAXdklCXM1xXUfo4a6Dsa8_apjMpjvxuWAvb9CukFQamsuR4B_AHQwU-8GL1_NwdMEA1KTY",
  },
  {
    id: "lisa-anderson",
    quoteKey: "home.testimonials.items.lisa.quote",
    nameKey: "home.testimonials.items.lisa.name",
    roleKey: "home.testimonials.items.lisa.role",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
  },
  {
    id: "robert-martinez",
    quoteKey: "home.testimonials.items.robert.quote",
    nameKey: "home.testimonials.items.robert.name",
    roleKey: "home.testimonials.items.robert.role",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-i-z6mtQkgVAzR5G5hrEsbJm2UOK1319U0kW9hmubFqa7ec4dgK8Z67oGLwOY3QLQOdonQfobJRp2X7G7pC-L5ocrNhBsYhJpRsl6KvLH_Qe54NzBEunRnXMzDMupz8oRDH1U1BFhrlDTwGOPJRm_iP7aPofqcs68A5_X1v_R3eduxN_-h0wcYVuvh201MgTFyZ3Ri1Cf1v_xB9zK1R8ewvsMBh6XVV2K39C29p-St-mya0RrgJk1OaGfBtniQwF8vmA1oG2Vvxk",
  },
  {
    id: "sophia-brown",
    quoteKey: "home.testimonials.items.sophia.quote",
    nameKey: "home.testimonials.items.sophia.name",
    roleKey: "home.testimonials.items.sophia.role",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMoRLWdj9FJWjInVDYgEYC7qbP5JTQohS0b1JsjEDSaGQJSZNH4_T_LalbbLvHSLk_XLeV80LwrMweYvG68o-y4wAbhayGBKzWUX6aCW3Y_Mnsf0xWCs3_ethzcfYIl1iYygdUPUQ_NiVAbELpDxpxPXjvA6D7eqQlUxGlGwSBhBwfyH1oFzWbhzkhxgIFEl8cjaRIBwAv9MhjEBtzZTfbwWW7IKOejlQo1jeBWJJtKPV29DT3S7JiiAVapEXsUy2pemUj48gZ2fE",
  },
];

export const homeServices: HomeService[] = [
  {
    id: "modern-logo",
    titleKey: "home.services.items.modernLogo.title",
    sellerNameKey: "home.services.items.modernLogo.seller",
    sellerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB07jKR091KENUBAHWEcLsCBFH4yT-JB94YRH9PvqZisw1s6aHxROhuaWT1WJStxpRbjSEReSmzFod1uOhzMFI9F5AtkuDO5dMRXoaIl6u0u92sfI_8mBww06BSC3cmuSEDZUPbivEzIqeGRBV0RYJqIhjFiPOSNeVwIJ9SzCiv7lLOoCLzFeT0O7bRsXNl7W-9quCvjFUCUh1IMNzLYTYjizaJ-7qR78pTwM6D7FLPjmebHOz2hGLHMdrhFT2u1COq2HiRYf3hmvg",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBSS1-YKko78pnK_njnMbeiBzFbjjxR0pHDqYXJSp1VTBgaM6T-V5ktBCZlbmPY2-_QdBxKuKe4DkT0qyguOxPoo6WrNvkypDQjdjgAAR5fUogjRrqubSJifRG9WuF6vim7B0RKozDU1qVbDcmzuD49fqGfOp9oUjG-oHHdG5yYsTjlg-tPOq1VK8r31FDl8vFZanMGsyz8co9jRCXCqUqXB9dOYVz7F0ieCob9go5PbIRSEirf-lf5Ug4U8Hh0zJqiYuWlyfcgfhQ",
    rating: 4.9,
    reviewsKey: "home.services.items.modernLogo.reviews",
    priceKey: "home.services.items.modernLogo.price",
    category: "design",
  },
  {
    id: "mobile-uiux",
    titleKey: "home.services.items.mobileUiux.title",
    sellerNameKey: "home.services.items.mobileUiux.seller",
    sellerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCiUbx8X0S95qNpyenE4vJZitJ3u1kzuR2s9zdXCjRkQ6aRM1GbDf4yTHECcucxT5-tDJ5UyX0aI-gQWIkZoAwwu0Yn7DYmMxOz4Laj44b-RNiDVjfG9BsmQn5ajl2JrrD5C708vLSzElcS6esbgsl8VT77fMBP_TucLBml_F9gLzLFGvD5HgAenvF4CL0oTjOgLjcJaYJxGM__yAVXowTUApAR_vFcBTNUeIPJsJIRfCweGYV_9tmbUAeaHkcBZAojqv8Eu_2-qUM",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMoRLWdj9FJWjInVDYgEYC7qbP5JTQohS0b1JsjEDSaGQJSZNH4_T_LalbbLvHSLk_XLeV80LwrMweYvG68o-y4wAbhayGBKzWUX6aCW3Y_Mnsf0xWCs3_ethzcfYIl1iYygdUPUQ_NiVAbELpDxpxPXjvA6D7eqQlUxGlGwSBhBwfyH1oFzWbhzkhxgIFEl8cjaRIBwAv9MhjEBtzZTfbwWW7IKOejlQo1jeBWJJtKPV29DT3S7JiiAVapEXsUy2pemUj48gZ2fE",
    rating: 5,
    reviewsKey: "home.services.items.mobileUiux.reviews",
    priceKey: "home.services.items.mobileUiux.price",
    category: "design",
  },
  {
    id: "seo-content",
    titleKey: "home.services.items.seoContent.title",
    sellerNameKey: "home.services.items.seoContent.seller",
    sellerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_FKhIQKokNqOg9HECJ6QTjhBysweZFQ1n-eL5WCxDP_IFUpE5ZWy7F6Tih4_AG0ZkCEGzR7SdobyqJOGfS-z8R4zEzCHcKIO0cIVze6XZeqk_iU9MNwG6Nrr9feLMZLBSDlViHwtsQYwIy-cojNIYgK46EN58zvq2gno-k2zJvoTIvds8sAKvAaBLwI26eFXk81o3HAXdklCXM1xXUfo4a6Dsa8_apjMpjvxuWAvb9CukFQamsuR4B_AHQwU-8GL1_NwdMEA1KTY",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCnNegvYssHxjP9gReMrkgl7rFmk-RM5eyEeZ-VsQ3OiCCIfspB2SLaYePrct2S47RvIpkuWqJbbhAjNLBx20ZR83cDTrnVq49UwSr73-UclRiHsBxiAjM2LX5lxXCEmNRobD_oQ39IljQrCi9AWjI27Aex552nt1P6pzwFcfVLegAGw-D5yRRDtYLZjPnjPLF2LXua_miW7OJsiR8NwzeIIHSMwscvudLyYoEr4fR6Dgnr3oUxHwb153Kf7aWtH8cHQsVOFuzIQLY",
    rating: 4.9,
    reviewsKey: "home.services.items.seoContent.reviews",
    priceKey: "home.services.items.seoContent.price",
    category: "marketing",
  },
  {
    id: "explainer-video",
    titleKey: "home.services.items.explainerVideo.title",
    sellerNameKey: "home.services.items.explainerVideo.seller",
    sellerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-i-z6mtQkgVAzR5G5hrEsbJm2UOK1319U0kW9hmubFqa7ec4dgK8Z67oGLwOY3QLQOdonQfobJRp2X7G7pC-L5ocrNhBsYhJpRsl6KvLH_Qe54NzBEunRnXMzDMupz8oRDH1U1BFhrlDTwGOPJRm_iP7aPofqcs68A5_X1v_R3eduxN_-h0wcYVuvh201MgTFyZ3Ri1Cf1v_xB9zK1R8ewvsMBh6XVV2K39C29p-St-mya0RrgJk1OaGfBtniQwF8vmA1oG2Vvxk",
    rating: 5,
    reviewsKey: "home.services.items.explainerVideo.reviews",
    priceKey: "home.services.items.explainerVideo.price",
    category: "video",
  },
  {
    id: "web-app-development",
    titleKey: "home.services.items.webAppDevelopment.title",
    sellerNameKey: "home.services.items.webAppDevelopment.seller",
    sellerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA99k2utL6GPB1_dmW0C11b9yxoBwH75f9-CxKMtwBiBwSm0XkbxhPoONkt5gf0DY4UuaWS71bJG8A4H8h0-asv6dKqUq2MWXbgeC5K5oz7mCIuxtqPgVeg2D9JfL3jaf9cOhlm7Owei2xUlw8rrXZPz0kMLY0",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCzVX9zPJ6u84N5wLlZgkR8T4mL7d_-8mshByd5yzCk-8CSGCX0l9lqiXGL-Qn4h5Gx0bXXqeH2rHbZKdgOc5dQOZ-NPZJz9R8USi7FxHwhPvb5mQtp2zZCMHDGRYz8RHBf19x-pnKZD3YbK4UB2swiZfE3ODzt",
    rating: 4.8,
    reviewsKey: "home.services.items.webAppDevelopment.reviews",
    priceKey: "home.services.items.webAppDevelopment.price",
    category: "development",
  },
  {
    id: "email-automation",
    titleKey: "home.services.items.emailAutomation.title",
    sellerNameKey: "home.services.items.emailAutomation.seller",
    sellerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBYDKYD8szh-Okd7qnRJ4yM07yXLlBFsrCVkNN5rPSKkORcUWQX586biqEqIlbEMmdS9Fp-BvJds14wUhZP_JWlP1Jd5bfg-hjh28cF0g8QhPMSSzVKBvGnxaA_m5SapPfYbl9X0U3QLb6VGQm5rNCUSj8g9Hk",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmjaMyWYMFO375iAkLFnF3vF2OQzK4cblzi6S5nQLQp3sz90WqSGw95ZkMcbppjvZFvdtO2-EzcF6cn1clmGeKqoiMeoakdbPXl5dVABzC9xY-jjgIhnm3nC14zO_4AIypsnFfcqx78koxXV9g8UkuHbwJ6Mni",
    rating: 4.7,
    reviewsKey: "home.services.items.emailAutomation.reviews",
    priceKey: "home.services.items.emailAutomation.price",
    category: "ai",
  },
];

export const homeFreelancers: HomeFreelancer[] = [
  {
    id: "maria-g",
    nameKey: "home.freelancers.items.maria.name",
    roleKey: "home.freelancers.items.maria.role",
    taglineKey: "home.freelancers.items.maria.tagline",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQaEff0g2V0JD9hj3bhp-1euXu11pM0y9w0dYq0SnGAP2CUgWWZtQcKFm3X9Fo-PbrnsLaryZkVbny9vo22Dx-XIv5j6SvAxiZui5IXF-3M6ZX5-1xwYPse-akcciRAuUfQXvUAxwEFn6UmMsIkMC09jxseo8QJOs3KAbsLT_NYJFMJiI5uym1YuKSwKEWlgvtebfzdJPIsrk2Z1ZmJ6-U17ffMVeXX1TdG9177Vx7scYjEpo7sH7NAKZkXLe4vVJJgD-aoU79UfU",
    rating: 5,
    reviewsKey: "home.freelancers.items.maria.reviews",
    tag: "topRated",
  },
  {
    id: "david-k",
    nameKey: "home.freelancers.items.david.name",
    roleKey: "home.freelancers.items.david.role",
    taglineKey: "home.freelancers.items.david.tagline",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAee4oFsmj2FRYn8rqTluB0ZJ4S5pWmy6JPd68q-MhwRxx6Z2NtfJ7F16xz5WTxQcaycbikwY6J3bt63inTVuUWVMgl6W22a1Nslo1mNP4v3ekZLZjfrKOhBoo-UZJhQ9VlDTJqpRQn8qF5JVnNwpunpAoS5FVGdqNq9O6kzwn5Vhgah3Gq44IlcpDQjrYBR84fzqeHgACSQcZ7F6kz09yJQslUgu3JFGxxV4fOvi2ILmLjxBESa2Gy8NJCtkbnKfdDWbK1h6BQpDs",
    rating: 4.9,
    reviewsKey: "home.freelancers.items.david.reviews",
    tag: "topRated",
  },
  {
    id: "olivia-c",
    nameKey: "home.freelancers.items.olivia.name",
    roleKey: "home.freelancers.items.olivia.role",
    taglineKey: "home.freelancers.items.olivia.tagline",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBO3mnvRE_MHV9zJugPIrl7_XSa1uvfzz6BggZ1suPfPH4xPDL5W2UrUoOHmo_cwu8RJPq43KK7a9nstZfXV1XIysBPFu3PB3cXByu3IFDOJ7qODeULuoCrKQAv9BeCF0XRBrCPlqbFxJiCZfkzjV4WMOn_plOZjbyUgUW1_jdktnIu1JQ1dq8DQlHEWOiQgIooTXN9Y6TRbKrRdjMKu6DzZLkEjKjT3TBxIgROZ8mHcSZAH1IXOiFwApXzasQGdiFsksE_8Svhu8g",
    rating: 5,
    reviewsKey: "home.freelancers.items.olivia.reviews",
    tag: "newArrivals",
  },
  {
    id: "chen-w",
    nameKey: "home.freelancers.items.chen.name",
    roleKey: "home.freelancers.items.chen.role",
    taglineKey: "home.freelancers.items.chen.tagline",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCUvUUfDc6Bdi7kT96Fz6JeMq6Q8ngumlii6V-RtJ2PaSY3gWS3N360H7EDoWNkj57X8-bPd99M-RNGeNf3JoCmNlesZDpjiq5URMM2wf19CetG5kfIeOsc2E5l-od0KttMFoZv5Lc4u-VfrQLCY017E3FzVsrWkGBnAnjMw6ZTDHGo6hqUsFV1fxDpobKFPUVwkAds2ywcIEz22yq80gllcOnZ_9ArgqrL_e1N9XLRhvA05Aq897rm_qzST7vMETgvRuLAL7uEaTU",
    rating: 4.9,
    reviewsKey: "home.freelancers.items.chen.reviews",
    tag: "mostHired",
  },
  {
    id: "alex-p",
    nameKey: "home.freelancers.items.alex.name",
    roleKey: "home.freelancers.items.alex.role",
    taglineKey: "home.freelancers.items.alex.tagline",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAnNLNyX-xD47kwQxmkHkAY4SfvPOJoJVcCMQvhU-hzFonX3XTIrNnT1pK_19RDZnqT0t-KRDd3zpLVuvgJ-yNY_mKkRT7EemsCZBu7SeRVBUUBAxFxb-5KH1KmOdt3NfoRs8ZCiu2Xz2gLJ5EgF6iJE9UTdgaFwtqUytfeOUSyJxA-P54gpg2Ou34JNhPQQMdCvHX-nm62geX1DF3wtNoAi8AXsCeUCiN5cvUIzHStQvKHnvaei-Q_BkN0CBdT8P4fQtzy6FvpUJg",
    rating: 5,
    reviewsKey: "home.freelancers.items.alex.reviews",
    tag: "mostHired",
  },
  {
    id: "amelia-r",
    nameKey: "home.freelancers.items.amelia.name",
    roleKey: "home.freelancers.items.amelia.role",
    taglineKey: "home.freelancers.items.amelia.tagline",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB0CRQys25Y6X2gV1bGkFRdHDHG3HjBf32s3zdGkSovEz1Cq9Ct8sE8i220fdjKruUzulHUL-4zFN3UvqThCtetZHSjsaVgLrWWYB-v2waTYjL0sB2r7L6tvEboLE4AQie1apG-PTpAXE2TaIhY0uzuh8WfgZ0",
    rating: 4.8,
    reviewsKey: "home.freelancers.items.amelia.reviews",
    tag: "newArrivals",
  },
  {
    id: "liam-s",
    nameKey: "home.freelancers.items.liam.name",
    roleKey: "home.freelancers.items.liam.role",
    taglineKey: "home.freelancers.items.liam.tagline",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA0g2UXV_aSuYVYeW5MfTk6B05SttIX6jq9GPQCuvapg8x54F-dYZYboEglXgSPyxSl7OkKM0Av0cDmWRg8xV8YvTWKmqd1ZuLJLCikjYvMJ6kqsZdJB-NEUZQdrzrbYpB7l_-X6pPp-O7Ur0ZzMC0C3PIgwRk",
    rating: 4.7,
    reviewsKey: "home.freelancers.items.liam.reviews",
    tag: "topRated",
  },
];

export const homeSteps: HomeStep[] = [
  {
    id: "browse",
    icon: "search",
    titleKey: "home.steps.items.browse.title",
    descriptionKey: "home.steps.items.browse.description",
  },
  {
    id: "collaborate",
    icon: "users",
    titleKey: "home.steps.items.collaborate.title",
    descriptionKey: "home.steps.items.collaborate.description",
  },
  {
    id: "pay",
    icon: "payments",
    titleKey: "home.steps.items.pay.title",
    descriptionKey: "home.steps.items.pay.description",
  },
];
