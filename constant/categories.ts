export type SubCategory = {
  id: string;
  label: string;
  href: string;
};

export type Category = {
  id: string;
  label: string;
  href: string;
  subcategories?: SubCategory[];
};

export const CATEGORIES: Category[] = [
  {
    id: "design-branding",
    label: "디자인 & 브랜딩",
    href: "/category/design-branding",
    subcategories: [
      { id: "ai-design", label: "AI 디자인", href: "/category/design-branding/ai-design" },
      { id: "logo-design", label: "로고 디자인", href: "/category/design-branding/logo-design" },
      { id: "brand-identity", label: "브랜드 아이덴티티", href: "/category/design-branding/brand-identity" },
      { id: "ui-ux-design", label: "UI/UX 디자인", href: "/category/design-branding/ui-ux-design" },
    ],
  },
  {
    id: "it-programming",
    label: "IT · 프로그래밍",
    href: "/category/it-programming",
    subcategories: [
      { id: "ai-development", label: "AI 개발", href: "/category/it-programming/ai-development" },
      { id: "web-development", label: "웹 개발", href: "/category/it-programming/web-development" },
      { id: "mobile-development", label: "모바일 개발", href: "/category/it-programming/mobile-development" },
      { id: "backend-development", label: "백엔드 개발", href: "/category/it-programming/backend-development" },
    ],
  },
  {
    id: "video-photo-audio",
    label: "영상 · 사진 · 음향",
    href: "/category/video-photo-audio",
    subcategories: [
      { id: "video-editing", label: "영상 편집", href: "/category/video-photo-audio/video-editing" },
      { id: "photo-editing", label: "사진 편집", href: "/category/video-photo-audio/photo-editing" },
      { id: "audio-production", label: "음향 제작", href: "/category/video-photo-audio/audio-production" },
      { id: "animation", label: "애니메이션", href: "/category/video-photo-audio/animation" },
    ],
  },
  {
    id: "marketing-advertising",
    label: "마케팅 · 광고",
    href: "/category/marketing-advertising",
    subcategories: [
      { id: "ai-marketing", label: "AI 마케팅", href: "/category/marketing-advertising/ai-marketing" },
      { id: "sns-marketing", label: "SNS 마케팅", href: "/category/marketing-advertising/sns-marketing" },
      { id: "seo-sem", label: "SEO/SEM", href: "/category/marketing-advertising/seo-sem" },
      { id: "content-marketing", label: "콘텐츠 마케팅", href: "/category/marketing-advertising/content-marketing" },
    ],
  },
  {
    id: "document-writing",
    label: "문서 · 글쓰기",
    href: "/category/document-writing",
    subcategories: [
      { id: "copywriting", label: "카피라이팅", href: "/category/document-writing/copywriting" },
      { id: "blog-writing", label: "블로그 글쓰기", href: "/category/document-writing/blog-writing" },
      { id: "technical-writing", label: "기술 문서 작성", href: "/category/document-writing/technical-writing" },
      { id: "translation-writing", label: "번역 글쓰기", href: "/category/document-writing/translation-writing" },
    ],
  },
  {
    id: "startup-business",
    label: "창업 · 사업 지원",
    href: "/category/startup-business",
    subcategories: [
      { id: "business-plan", label: "사업계획서", href: "/category/startup-business/business-plan" },
      { id: "market-research", label: "시장 조사", href: "/category/startup-business/market-research" },
      { id: "fundraising", label: "자금 조달", href: "/category/startup-business/fundraising" },
      { id: "business-consulting", label: "사업 컨설팅", href: "/category/startup-business/business-consulting" },
    ],
  },
  {
    id: "tax-legal-labor",
    label: "세무 · 법무 · 노무",
    href: "/category/tax-legal-labor",
    subcategories: [
      { id: "tax-consulting", label: "세무 상담", href: "/category/tax-legal-labor/tax-consulting" },
      { id: "legal-consulting", label: "법무 상담", href: "/category/tax-legal-labor/legal-consulting" },
      { id: "labor-consulting", label: "노무 상담", href: "/category/tax-legal-labor/labor-consulting" },
      { id: "contract-drafting", label: "계약서 작성", href: "/category/tax-legal-labor/contract-drafting" },
    ],
  },
  {
    id: "ebook-learning",
    label: "전자책 · 학습",
    href: "/category/ebook-learning",
    subcategories: [
      { id: "ebook-creation", label: "전자책 제작", href: "/category/ebook-learning/ebook-creation" },
      { id: "online-course", label: "온라인 강의", href: "/category/ebook-learning/online-course" },
      { id: "study-material", label: "학습 자료", href: "/category/ebook-learning/study-material" },
      { id: "tutoring", label: "과외", href: "/category/ebook-learning/tutoring" },
    ],
  },
  {
    id: "ai-service",
    label: "AI 서비스",
    href: "/category/ai-service",
    subcategories: [
      { id: "ai-chatbot", label: "AI 챗봇", href: "/category/ai-service/ai-chatbot" },
      { id: "ai-automation", label: "AI 자동화", href: "/category/ai-service/ai-automation" },
      { id: "ai-analysis", label: "AI 분석", href: "/category/ai-service/ai-analysis" },
      { id: "ai-content", label: "AI 콘텐츠", href: "/category/ai-service/ai-content" },
    ],
  },
  {
    id: "translation-interpreting",
    label: "번역 · 통역",
    href: "/category/translation-interpreting",
    subcategories: [
      { id: "document-translation", label: "문서 번역", href: "/category/translation-interpreting/document-translation" },
      { id: "website-translation", label: "웹사이트 번역", href: "/category/translation-interpreting/website-translation" },
      { id: "simultaneous-interpreting", label: "동시 통역", href: "/category/translation-interpreting/simultaneous-interpreting" },
      { id: "consecutive-interpreting", label: "순차 통역", href: "/category/translation-interpreting/consecutive-interpreting" },
    ],
  },
  {
    id: "custom-production",
    label: "맞춤 제작",
    href: "/category/custom-production",
    subcategories: [
      { id: "custom-design", label: "맞춤 디자인", href: "/category/custom-production/custom-design" },
      { id: "custom-development", label: "맞춤 개발", href: "/category/custom-production/custom-development" },
      { id: "custom-content", label: "맞춤 콘텐츠", href: "/category/custom-production/custom-content" },
      { id: "custom-service", label: "맞춤 서비스", href: "/category/custom-production/custom-service" },
    ],
  },
  {
    id: "employment-admission",
    label: "취업 · 입시",
    href: "/category/employment-admission",
    subcategories: [
      { id: "resume-writing", label: "이력서 작성", href: "/category/employment-admission/resume-writing" },
      { id: "interview-prep", label: "면접 준비", href: "/category/employment-admission/interview-prep" },
      { id: "admission-consulting", label: "입시 상담", href: "/category/employment-admission/admission-consulting" },
      { id: "portfolio-creation", label: "포트폴리오 제작", href: "/category/employment-admission/portfolio-creation" },
    ],
  },
  {
    id: "consulting-coaching",
    label: "컨설팅 · 코칭",
    href: "/category/consulting-coaching",
    subcategories: [
      { id: "business-coaching", label: "비즈니스 코칭", href: "/category/consulting-coaching/business-coaching" },
      { id: "career-coaching", label: "커리어 코칭", href: "/category/consulting-coaching/career-coaching" },
      { id: "life-coaching", label: "라이프 코칭", href: "/category/consulting-coaching/life-coaching" },
      { id: "strategy-consulting", label: "전략 컨설팅", href: "/category/consulting-coaching/strategy-consulting" },
    ],
  },
  {
    id: "lifestyle-service",
    label: "라이프스타일 서비스",
    href: "/category/lifestyle-service",
    subcategories: [
      { id: "personal-assistant", label: "개인 비서", href: "/category/lifestyle-service/personal-assistant" },
      { id: "event-planning", label: "이벤트 기획", href: "/category/lifestyle-service/event-planning" },
      { id: "lifestyle-consulting", label: "라이프스타일 상담", href: "/category/lifestyle-service/lifestyle-consulting" },
      { id: "wellness-service", label: "웰니스 서비스", href: "/category/lifestyle-service/wellness-service" },
    ],
  },
];









