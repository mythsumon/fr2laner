"use client";

const stats = [
  { number: "50,000+", label: "등록된 전문가", icon: "👥" },
  { number: "100만+", label: "완료된 프로젝트", icon: "✅" },
  { number: "95%", label: "만족도", icon: "⭐" },
  { number: "150+", label: "서비스 카테고리", icon: "🎯" },
];

export const FindTalentStats = () => {
  return (
    <section className="bg-[#2E5E99] py-16 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-3 text-4xl">{stat.icon}</div>
              <div className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">{stat.number}</div>
              <div className="mt-2 text-base text-white/80 sm:text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};





