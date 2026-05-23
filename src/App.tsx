import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "./config";
import BotanicalAccents from "./components/BotanicalAccents";
import Envelope from "./components/Envelope";
import Invitation from "./components/Invitation";

type Phase = "closed" | "opening" | "open";

export default function App() {
  const [phase, setPhase] = useState<Phase>("closed");

  // Auto-open after delay
  useEffect(() => {
    if (phase !== "closed" || wedding.autoOpenMs <= 0) return;
    const id = setTimeout(() => setPhase("opening"), wedding.autoOpenMs);
    return () => clearTimeout(id);
  }, [phase]);

  // Transition opening -> open after envelope animation finishes
  useEffect(() => {
    if (phase !== "opening") return;
    const id = setTimeout(() => setPhase("open"), 4700);
    return () => clearTimeout(id);
  }, [phase]);

  const open = () => {
    if (phase === "closed") setPhase("opening");
  };

  return (
    <div className="silk-bg relative min-h-[100dvh] w-full overflow-hidden">
      <BotanicalAccents />

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
                hint={wedding.hint}
                state={phase}
                onOpen={open}
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
              <Invitation wedding={wedding} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 pb-6 text-center font-serif italic text-xs text-ink/45">
        with love, {wedding.groom} &amp; {wedding.bride}
      </footer>
    </div>
  );
}
