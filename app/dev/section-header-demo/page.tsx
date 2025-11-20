"use client";

import SectionHeader from "@/components/common/SectionHeader";

const SectionHeaderDemoPage = () => {
  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-12">
        <SectionHeader
          label="CATEGORIES"
          title="Discover premium services"
          description="Browse 14 curated categories to kick-start your next project."
        />

        <SectionHeader
          label="RECOMMENDED"
          title="예비창업가들을 위한 추천 서비스"
          description="초기 창업가들이 가장 많이 찾는 대표 서비스입니다."
        />

        <SectionHeader
          label="PROCESS"
          title="How it works"
          description="세 단계로 간단하게 프로젝트를 진행할 수 있습니다."
          align="center"
        />
      </div>
    </main>
  );
};

export default SectionHeaderDemoPage;


