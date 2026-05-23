import { motion } from "framer-motion";
import { Calendar, Heart, MapPin } from "lucide-react";
import type { WeddingConfig } from "../config";
import Countdown from "./Countdown";

type Props = Readonly<{ wedding: WeddingConfig }>;

const MONTHS = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function buildWeekStrip(date: Date) {
  // build a Sun..Sat strip that contains the wedding date
  const day = date.getDay(); // 0..6 (Sun..Sat)
  const start = new Date(date);
  start.setDate(date.getDate() - day);
  const days: number[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d.getDate());
  }
  return { days, highlightIndex: day };
}

function downloadIcs(w: WeddingConfig) {
  const dt = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  const start = w.date;
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Hossam & Rana Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${start.getTime()}@hossam-rana-wedding`,
    `DTSTAMP:${dt(new Date())}`,
    `DTSTART:${dt(start)}`,
    `DTEND:${dt(end)}`,
    `SUMMARY:${w.groom} & ${w.bride} Wedding`,
    `LOCATION:${w.venueName}, ${w.venueAddress}`,
    `DESCRIPTION:Save the Date — ${w.dateLabel} at ${w.timeLabel}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${w.groom}-and-${w.bride}-save-the-date.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function Invitation({ wedding }: Props) {
  const { days, highlightIndex } = buildWeekStrip(wedding.date);
  const monthLabel = MONTHS[wedding.date.getMonth()];

  const containerVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.9, ease: [0.2, 0.6, 0.2, 1], delayChildren: 0.1, staggerChildren: 0.08 },
    },
  } as const;

  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.6, 0.2, 1] } },
  } as const;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="relative w-[min(92vw,560px)] mx-auto rounded-md bg-[#FBF6EC]/95 border border-[#e8dcc2] shadow-card backdrop-blur-sm"
    >
      {/* faint inner border */}
      <div className="pointer-events-none absolute inset-2 rounded-[2px] border border-gold/20" />

      <div className="relative px-6 sm:px-10 py-10 sm:py-12 text-center text-ink">
        <motion.p variants={item} className="font-serif tracking-[0.45em] text-[11px] sm:text-xs text-ink/80">
          {monthLabel}
        </motion.p>

        {/* Calendar strip */}
        <motion.div variants={item} className="mt-4 grid grid-cols-7 gap-1 sm:gap-2 max-w-md mx-auto">
          {DAY_LABELS.map((d) => (
            <div key={d} className="font-serif italic text-[11px] sm:text-xs text-ink/70">
              {d}
            </div>
          ))}
          {days.map((n, i) => {
            const isWedding = i === highlightIndex;
            return (
              <div key={`${n}-${i}`} className="relative py-1">
                <span
                  className={`font-serif text-base sm:text-lg ${
                    isWedding ? "text-ink" : "text-ink/85"
                  }`}
                >
                  {n}
                </span>
                {isWedding && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-1 -bottom-1 border border-dashed border-gold/60 rounded-full w-7 sm:w-8 mx-auto"
                  />
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Heart marker line dropping from highlighted date */}
        <motion.div variants={item} className="relative mt-2 mx-auto h-10 w-px bg-gold/40">
          <Heart
            className="absolute left-1/2 -translate-x-1/2 -bottom-2 text-gold fill-gold"
            size={16}
            strokeWidth={1.5}
          />
        </motion.div>

        <motion.h2 variants={item} className="mt-6 font-script text-5xl sm:text-6xl text-ink">
          save the date
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-4 font-serif tracking-[0.4em] text-[10px] sm:text-xs text-ink/80"
        >
          FOR THE WEDDING OF
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-2 font-serif tracking-[0.25em] text-2xl sm:text-3xl text-ink"
        >
          {wedding.groom.toUpperCase()} <span className="text-gold">&amp;</span>{" "}
          {wedding.bride.toUpperCase()}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-3 font-serif tracking-[0.3em] text-[10px] sm:text-xs text-ink/85"
        >
          {wedding.dateLabel.toUpperCase()}
        </motion.p>

        {/* Venue */}
        <motion.div
          variants={item}
          className="mt-6 flex flex-col items-center gap-1 text-ink/75 font-serif text-sm"
        >
          <a
            href={wedding.venueMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-gold transition-colors"
          >
            <MapPin size={14} className="text-gold" />
            <span>{wedding.venueName}</span>
          </a>
          <a
            href={wedding.venueMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink/75 text-xs hover:text-gold underline-offset-2 hover:underline"
          >
            {wedding.venueAddress}
          </a>
          <div className="text-ink/75 text-xs">{wedding.timeLabel}</div>
        </motion.div>

        {/* divider */}
        <motion.div variants={item} className="mt-7 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-gold/40" />
          <Heart size={12} className="text-gold fill-gold" />
          <span className="h-px w-12 bg-gold/40" />
        </motion.div>

        {/* Countdown */}
        <motion.div variants={item} className="mt-6">
          <p className="font-serif tracking-[0.35em] text-[10px] sm:text-xs text-ink/75 mb-3">
            COUNTING DOWN
          </p>
          <Countdown target={wedding.date} />
        </motion.div>

        {/* CTA */}
        <motion.div variants={item} className="mt-8">
          <button
            type="button"
            onClick={() => downloadIcs(wedding)}
            className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-ivory/70 px-5 py-2 font-serif tracking-[0.2em] text-xs text-ink hover:bg-gold hover:text-ivory transition-colors"
          >
            <Calendar size={14} />
            ADD TO CALENDAR
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
