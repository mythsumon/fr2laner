import type { CategoryDetail } from "./category-types";

export const categoryDetails: CategoryDetail[] = [
  {
    slug: "design",
    titleKey: "category.design.header.title",
    subtitleKey: "category.design.header.subtitle",
    icon: "🎨",
    backgroundGradient: "from-[#E8F1FF] via-white to-[#F8FBFE]",
    breadcrumbs: [
      { labelKey: "category.design.header.breadcrumb.home", href: "/" },
      { labelKey: "category.design.header.breadcrumb.categories", href: "/#categories" },
      { labelKey: "category.design.header.title", href: "/category/design" },
    ],
    subcategories: [
      { id: "logo", labelKey: "category.design.header.tags.logo" },
      { id: "branding", labelKey: "category.design.header.tags.branding" },
      { id: "uiux", labelKey: "category.design.header.tags.uiux" },
      { id: "ppt", labelKey: "category.design.header.tags.ppt" },
      { id: "banner", labelKey: "category.design.header.tags.banner" },
    ],
    services: [
      {
        id: "design-logo-01",
        titleKey: "category.design.services.logo.premiumIdentity.title",
        descriptionKey: "category.design.services.logo.premiumIdentity.description",
        sellerNameKey: "category.design.services.logo.premiumIdentity.seller",
        sellerTaglineKey: "category.design.services.logo.premiumIdentity.tagline",
        sellerAvatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
        badge: "pro",
        rating: 4.9,
        reviews: 1620,
        price: 680,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBSS1-YKko78pnK_njnMbeiBzFbjjxR0pHDqYXJSp1VTBgaM6T-V5ktBCZlbmPY2-_QdBxKuKe4DkT0qyguOxPoo6WrNvkypDQjdjgAAR5fUogjRrqubSJifRG9WuF6vim7B0RKozDU1qVbDcmzuD49fqGfOp9oUjG-oHHdG5yYsTjlg-tPOq1VK8r31FDl8vFZanMGsyz8co9jRCXCqUqXB9dOYVz7F0ieCob9go5PbIRSEirf-lf5Ug4U8Hh0zJqiYuWlyfcgfhQ",
        deliveryDays: 4,
        verified: true,
        subcategoryId: "logo",
      },
      {
        id: "design-branding-01",
        titleKey: "category.design.services.branding.expansion.title",
        descriptionKey: "category.design.services.branding.expansion.description",
        sellerNameKey: "category.design.services.branding.expansion.seller",
        sellerTaglineKey: "category.design.services.branding.expansion.tagline",
        sellerAvatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDQaEff0g2V0JD9hj3bhp-1euXu11pM0y9w0dYq0SnGAP2CUgWWZtQcKFm3X9Fo-PbrnsLaryZkVbny9vo22Dx-XIv5j6SvAxiZui5IXF-3M6ZX5-1xwYPse-akcciRAuUfQXvUAxwEFn6UmMsIkMC09jxseo8QJOs3KAbsLT_NYJFMJiI5uym1YuKSwKEWlgvtebfzdJPIsrk2Z1ZmJ6-U17ffMVeXX1TdG9177Vx7scYjEpo7sH7NAKZkXLe4vVJJgD-aoU79UfU",
        badge: "best",
        rating: 5,
        reviews: 980,
        price: 920,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDMoRLWdj9FJWjInVDYgEYC7qbP5JTQohS0b1JsjEDSaGQJSZNH4_T_LalbbLvHSLk_XLeV80LwrMweYvG68o-y4wAbhayGBKzWUX6aCW3Y_Mnsf0xWCs3_ethzcfYIl1iYygdUPUQ_NiVAbELpDxpxPXjvA6D7eqQlUxGlGwSBhBwfyH1oFzWbhzkhxgIFEl8cjaRIBwAv9MhjEBtzZTfbwWW7IKOejlQo1jeBWJJtKPV29DT3S7JiiAVapEXsUy2pemUj48gZ2fE",
        deliveryDays: 7,
        verified: true,
        subcategoryId: "branding",
      },
      {
        id: "design-uiux-01",
        titleKey: "category.design.services.uiux.product.title",
        descriptionKey: "category.design.services.uiux.product.description",
        sellerNameKey: "category.design.services.uiux.product.seller",
        sellerTaglineKey: "category.design.services.uiux.product.tagline",
        sellerAvatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAee4oFsmj2FRYn8rqTluB0ZJ4S5pWmy6JPd68q-MhwRxx6Z2NtfJ7F16xz5WTxQcaycbikwY6J3bt63inTVuUWVMgl6W22a1Nslo1mNP4v3ekZLZjfrKOhBoo-UZJhQ9VlDTJqpRQn8qF5JVnNwpunpAoS5FVGdqNq9O6kzwn5Vhgah3Gq44IlcpDQjrYBR84fzqeHgACSQcZ7F6kz09yJQslUgu3JFGxxV4fOvi2ILmLjxBESa2Gy8NJCtkbnKfdDWbK1h6BQpDs",
        badge: "pro",
        rating: 4.95,
        reviews: 2450,
        price: 1200,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCnNegvYssHxjP9gReMrkgl7rFmk-RM5eyEeZ-VsQ3OiCCIfspB2SLaYePrct2S47RvIpkuWqJbbhAjNLBx20ZR83cDTrnVq49UwSr73-UclRiHsBxiAjM2LX5lxXCEmNRobD_oQ39IljQrCi9AWjI27Aex552nt1P6pzwFcfVLegAGw-D5yRRDtYLZjPnjPLF2LXua_miW7OJsiR8NwzeIIHSMwscvudLyYoEr4fR6Dgnr3oUxHwb153Kf7aWtH8cHQsVOFuzIQLY",
        deliveryDays: 10,
        verified: true,
        subcategoryId: "uiux",
      },
      {
        id: "design-ppt-01",
        titleKey: "category.design.services.ppt.investorDeck.title",
        descriptionKey: "category.design.services.ppt.investorDeck.description",
        sellerNameKey: "category.design.services.ppt.investorDeck.seller",
        sellerTaglineKey: "category.design.services.ppt.investorDeck.tagline",
        sellerAvatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBO3mnvRE_MHV9zJugPIrl7_XSa1uvfzz6BggZ1suPfPH4xPDL5W2UrUoOHmo_cwu8RJPq43KK7a9nstZfXV1XIysBPFu3PB3cXByu3IFDOJ7qODeULuoCrKQAv9BeCF0XRBrCPlqbFxJiCZfkzjV4WMOn_plOZjbyUgUW1_jdktnIu1JQ1dq8DQlHEWOiQgIooTXN9Y6TRbKrRdjMKu6DzZLkEjKjT3TBxIgROZ8mHcSZAH1IXOiFwApXzasQGdiFsksE_8Svhu8g",
        badge: "best",
        rating: 4.87,
        reviews: 640,
        price: 540,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuB-i-z6mtQkgVAzR5G5hrEsbJm2UOK1319U0kW9hmubFqa7ec4dgK8Z67oGLwOY3QLQOdonQfobJRp2X7G7pC-L5ocrNhBsYhJpRsl6KvLH_Qe54NzBEunRnXMzDMupz8oRDH1U1BFhrlDTwGOPJRm_iP7aPofqcs68A5_X1v_R3eduxN_-h0wcYVuvh201MgTFyZ3Ri1Cf1v_xB9zK1R8ewvsMBh6XVV2K39C29p-St-mya0RrgJk1OaGfBtniQwF8vmA1oG2Vvxk",
        deliveryDays: 3,
        verified: true,
        subcategoryId: "ppt",
      },
      {
        id: "design-banner-01",
        titleKey: "category.design.services.banner.performanceSet.title",
        descriptionKey: "category.design.services.banner.performanceSet.description",
        sellerNameKey: "category.design.services.banner.performanceSet.seller",
        sellerTaglineKey: "category.design.services.banner.performanceSet.tagline",
        sellerAvatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCUvUUfDc6Bdi7kT96Fz6JeMq6Q8ngumlii6V-RtJ2PaSY3gWS3N360H7EDoWNkj57X8-bPd99M-RNGeNf3JoCmNlesZDpjiq5URMM2wf19CetG5kfIeOsc2E5l-od0KttMFoZv5Lc4u-VfrQLCY017E3FzVsrWkGBnAnjMw6ZTDHGo6hqUsFV1fxDpobKFPUVwkAds2ywcIEz22yq80gllcOnZ_9ArgqrL_e1N9XLRhvA05Aq897rm_qzST7vMETgvRuLAL7uEaTU",
        badge: "new",
        rating: 4.82,
        reviews: 312,
        price: 320,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA7S1UOblJR2cx4JR39YixpEGU1UHui-W6K5kBdV85e76LIcmyTE3BeCcYGa4R4cK59DG7eLmT8zVfyxZ8S2WnPFRgDrmJfESgK0ZXdmLgCKbe7uu4voBOeYYQitTabm9CCRsWS5plwGzHa9jPp6blda4FLhJIS8NGIA_f--lbM_42vO-5QEeNJgs8xKMyHjMw2U6bGuDGJ7N9EIXZU-4Wp7FmYji3ZkER4Ao5ej1MnPXZCgaT2wE7A0Mu-u5vdgxAKUUD1aifcK0c",
        deliveryDays: 2,
        verified: true,
        subcategoryId: "banner",
      },
      {
        id: "design-uiux-02",
        titleKey: "category.design.services.uiux.mobile.title",
        descriptionKey: "category.design.services.uiux.mobile.description",
        sellerNameKey: "category.design.services.uiux.mobile.seller",
        sellerTaglineKey: "category.design.services.uiux.mobile.tagline",
        sellerAvatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCiUbx8X0S95qNpyenE4vJZitJ3u1kzuR2s9zdXCjRkQ6aRM1GbDf4yTHECcucxT5-tDJ5UyX0aI-gQWIkZoAwwu0Yn7DYmMxOz4Laj44b-RNiDVjfG9BsmQn5ajl2JrrD5C708vLSzElcS6esbgsl8VT77fMBP_TucLBml_F9gLzLFGvD5HgAenvF4CL0oTjOgLjcJaYJxGM__yAVXowTUApAR_vFcBTNUeIPJsJIRfCweGYV_9tmbUAeaHkcBZAojqv8Eu_2-qUM",
        badge: "pro",
        rating: 4.97,
        reviews: 1680,
        price: 1100,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCnNegvYssHxjP9gReMrkgl7rFmk-RM5eyEeZ-VsQ3OiCCIfspB2SLaYePrct2S47RvIpkuWqJbbhAjNLBx20ZR83cDTrnVq49UwSr73-UclRiHsBxiAjM2LX5lxXCEmNRobD_oQ39IljQrCi9AWjI27Aex552nt1P6pzwFcfVLegAGw-D5yRRDtYLZjPnjPLF2LXua_miW7OJsiR8NwzeIIHSMwscvudLyYoEr4fR6Dgnr3oUxHwb153Kf7aWtH8cHQsVOFuzIQLY",
        deliveryDays: 9,
        verified: true,
        subcategoryId: "uiux",
      },
    ],
  },
];
