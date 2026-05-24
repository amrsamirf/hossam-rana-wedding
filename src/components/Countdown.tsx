import { useEffect, useState } from "react";
import { translations, type Lang } from "../i18n";

type Props = Readonly<{ target: Date; lang: Lang }>;

function diff(target: Date) {
  const ms = target.getTime() - Date.now();
  if (ms <= 0) return null;
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s };
}

export default function Countdown({ target, lang }: Props) {
  const tr = translations[lang];
  const isAr = lang === "ar";
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!t) {
    return (
      <p
        className={`text-3xl text-gold mt-2 ${isAr ? "font-arabic" : "font-script"}`}
        style={isAr ? { fontFamily: "'Amiri', serif", fontStyle: "italic" } : undefined}
      >
        {tr.todayIsTheDay}
      </p>
    );
  }

  const items: Array<[number, string]> = [
    [t.d, tr.days],
    [t.h, tr.hours],
    [t.m, tr.minutes],
    [t.s, tr.seconds],
  ];

  return (
    <div className="flex items-stretch justify-center gap-2 sm:gap-3">
      {items.map(([value, label]) => (
        <div
          key={label}
          className="min-w-[58px] sm:min-w-[68px] rounded-md border border-gold/30 bg-ivory/60 px-2 py-2 sm:px-3 sm:py-2.5 backdrop-blur-sm"
        >
          <div className="font-serif text-2xl sm:text-3xl text-ink tabular-nums leading-none">
            {String(value).padStart(2, "0")}
          </div>
          <div
            className={`mt-1 text-[9px] sm:text-[10px] text-ink/80 ${isAr ? "font-arabic" : "font-serif tracking-[0.2em] uppercase"}`}
            style={isAr ? { fontFamily: "'Amiri', serif" } : undefined}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
