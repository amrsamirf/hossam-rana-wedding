import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "./config";
import { translations, type Lang } from "./i18n";
import BotanicalAccents from "./components/BotanicalAccents";
import Envelope from "./components/Envelope";
import Invitation from "./components/Invitation";

type Phase = "closed" | "opening" | "open";

export default function App() {
  const [phase, setPhase] = useState<Phase>("closed");
  const [lang, setLang] = useState<Lang>(() => {
    const param = new URLSearchParams(window.location.search).get("lang");
    return param === "ar" ? "ar" : "en";
  });

  // Auto-open after delay
  useEffect(() => {
    if (phase !== "closed" || wedding.autoOpenMs <= 0) return;
    const id = setTimeout(() => setPhase("opening"), wedding.autoOpenMs);
    return () => clearTimeout(id);
  }, [phase]);

  // Transition opening -> open after envelope animation finishes
  useEffect(() => {
    if (phase !== "opening") return;
    const id = setTimeout(() => setPhase("open"), 2700);
    return () => clearTimeout(id);
  }, [phase]);

  const open = () => {
    if (phase === "closed") setPhase("opening");
  };

  const isAr = lang === "ar";
  const t = translations[lang];
  const hint = isAr ? wedding.hintAr : wedding.hint;
  const groom = isAr ? wedding.groomAr : wedding.groom;
  const bride = isAr ? wedding.brideAr : wedding.bride;

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="silk-bg relative min-h-[100dvh] w-full overflow-hidden"
    >
      <BotanicalAccents />

      {/* Language toggle */}
      <button
        type="button"
        onClick={() => {
          const next: Lang = isAr ? "en" : "ar";
          setLang(next);
          const url = new URL(window.location.href);
          url.searchParams.set("lang", next);
          window.history.replaceState(null, "", url.toString());
        }}
        className="absolute top-4 right-4 z-20 font-serif text-xs tracking-widest text-ink/60 hover:text-gold transition-colors border border-ink/20 hover:border-gold/50 rounded-full px-3 py-1 bg-ivory/60 backdrop-blur-sm"
        style={{ fontFamily: isAr ? "'Amiri', serif" : undefined }}
      >
        {isAr ? "English" : "العربية"}
      </button>

      <main className="relative z-10 min-h-[100dvh] w-full flex items-center justify-center px-4 py-10">
        <AnimatePresence mode="wait">
          {phase !== "open" ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <Envelope
                initials={wedding.initials}
                hint={hint}
                state={phase}
                onOpen={open}
                lang={lang}
                groom={groom}
                bride={bride}
              />
            </motion.div>
          ) : (
            <motion.div
              key="invitation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full flex justify-center"
            >
              <Invitation wedding={wedding} lang={lang} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer
        className="relative z-10 pb-6 text-center text-xs text-ink/60"
        style={{ fontFamily: isAr ? "'Amiri', serif" : "'Cormorant Garamond', serif", fontStyle: "italic" }}
      >
        {t.withLove}, {groom} &amp; {bride}
      </footer>
    </div>
  );
}
