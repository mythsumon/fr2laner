"use client";

export type LoginMode = "client" | "expert";

type LoginModeSelectorProps = {
  onSelect: (mode: LoginMode) => void;
};

const cards: Array<{
  mode: LoginMode;
  title: string;
  description: string;
  emoji: string;
}> = [
  {
    mode: "client",
    title: "의뢰인으로 이용",
    description: "내가 원하는 서비스의 전문가를 찾아서 도움을 받고 싶어요.",
    emoji: "🧑‍💻",
  },
  {
    mode: "expert",
    title: "전문가로 활동",
    description: "내가 잘하는 분야의 전문가로 활동하고 수익을 창출하고 싶어요.",
    emoji: "🚀",
  },
];

export const LoginModeSelector = ({ onSelect }: LoginModeSelectorProps) => {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">사용 타입 선택</p>
        <h2 className="text-2xl font-semibold text-slate-900">크몽에서 서비스를 어떻게 이용하고 싶으세요?</h2>
        <p className="text-sm text-slate-500">아래에서 이용 방식을 선택하고 계속 진행해주세요.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <button
            key={card.mode}
            type="button"
            onClick={() => onSelect(card.mode)}
            className="group flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-7 text-left shadow-[0_10px_40px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_18px_55px_rgba(15,23,42,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-3xl transition-colors group-hover:bg-sky-100">
              {card.emoji}
            </span>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
              <p className="text-sm text-slate-500">{card.description}</p>
            </div>
            <span className="mt-2 text-sm font-semibold text-sky-600 opacity-0 transition-opacity group-hover:opacity-100">
              선택하고 계속하기 →
            </span>
          </button>
        ))}
      </div>
      <p className="text-center text-sm text-slate-400">가입 이후에도 언제든 원하는 상태로 전환할 수 있어요!</p>
    </div>
  );
};


