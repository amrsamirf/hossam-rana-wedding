import { useEffect, useState } from "react";

type Props = Readonly<{ target: Date }>;

function diff(target: Date) {
  const ms = target.getTime() - Date.now();
  if (ms <= 0) return null;
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s };
}

export default function Countdown({ target }: Props) {
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!t) {
    return (
      <p className="font-script text-3xl text-gold mt-2">Today&rsquo;s the day!</p>
    );
  }

  const items: Array<[number, string]> = [
    [t.d, "Days"],
    [t.h, "Hours"],
    [t.m, "Minutes"],
    [t.s, "Seconds"],
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
          <div className="mt-1 font-serif tracking-[0.2em] text-[9px] sm:text-[10px] uppercase text-ink/80">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
