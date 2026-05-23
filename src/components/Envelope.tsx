import { motion, type Variants } from "framer-motion";
import WaxSeal from "./WaxSeal";

type Props = Readonly<{
  initials: string;
  hint: string;
  state: "closed" | "opening" | "open";
  onOpen: () => void;
}>;

const flapVariants: Variants = {
  closed: { rotateX: 0, transition: { duration: 0.6, ease: [0.4, 0.01, 0.2, 1] } },
  // 165° peels the flap back like a real letter (not fully flat) revealing the V opening below.
  opening: { rotateX: 90, transition: { duration: 0.8, ease: [0.4, 0.01, 0.2, 1] } },
  open: { rotateX: 90, transition: { duration: 0 } },
};

const sealVariants: Variants = {
  closed: { scale: 1, opacity: 1, y: 0 },
  opening: {
    scale: [1, 1.15, 0.6],
    opacity: [1, 1, 0],
    y: [0, -10, 30],
    transition: { duration: 0.7, times: [0, 0.4, 1], ease: "easeIn" },
  },
  open: { opacity: 0, scale: 0.6, y: 0 },
};

const cardLiftVariants: Variants = {
  closed: { y: 0, opacity: 1 },
  opening: {
    y: -180,
    opacity: 1,
    transition: { delay: 0.6, duration: 1.0, ease: [0.2, 0.6, 0.2, 1] },
  },
  open: { y: -180, opacity: 1 },
};

const envelopeFadeVariants: Variants = {
  closed: { opacity: 1, scale: 1 },
  opening: {
    opacity: 0,
    scale: 0.96,
    transition: { delay: 1.5, duration: 0.5 },
  },
  open: { opacity: 0, scale: 0.96 },
};

export default function Envelope({ initials, hint, state, onOpen }: Props) {
  const interactive = state === "closed";
  return (
    <motion.div
      className="relative"
      style={{ perspective: "1600px", transformStyle: "preserve-3d" }}
      variants={envelopeFadeVariants}
      initial="closed"
      animate={state}
    >
      <button
        type="button"
        aria-label="Open invitation"
        onClick={interactive ? onOpen : undefined}
        className={`group relative block ${interactive ? "cursor-pointer" : "cursor-default"}`}
      >
        {/* Envelope stage: relative so the card can rise above without clipping */}
        <div className="relative w-[320px] h-[210px] sm:w-[420px] sm:h-[275px] md:w-[480px] md:h-[315px]">
          {/* z-0: back paper (the envelope's inside, visible through the open flap) */}
          <div
            className="absolute inset-0 rounded-[6px] shadow-envelope"
            style={{
              background:
                "linear-gradient(180deg, #efdfc1 0%, #e3cd9f 60%, #d8bf91 100%)",
              zIndex: 0,
            }}
          />

          {/* z-1: the card (sits inside the envelope, hidden by the front pocket until it lifts).
              Note: centered via `left: 6%` (not translate-x) because framer-motion's `y` transform
              would otherwise overwrite Tailwind's -translate-x-1/2, shifting the card sideways. */}
          <motion.div
            variants={cardLiftVariants}
            className="absolute w-[88%] h-[92%] rounded-[4px] bg-[#FBF6EC] shadow-card border border-[#e8dcc2] flex flex-col items-center justify-center text-ink"
            style={{ top: "4%", left: "6%", zIndex: 1 }}
          >
            <p className="font-script text-3xl sm:text-4xl text-gold">save the date</p>
            <p className="mt-2 font-serif tracking-[0.3em] text-xs sm:text-sm text-ink/85">
              HOSSAM &amp; RANA
            </p>
          </motion.div>

          {/* z-2: front pocket — covers the envelope body with a V-cut at the top
              so the card (behind it) emerges through the V as it lifts up */}
          <div
            className="absolute inset-0"
            style={{
              zIndex: 2,
              clipPath: "polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)",
              background: "linear-gradient(180deg, #e7d2a8 0%, #cdaf7b 100%)",
              boxShadow: "inset 0 4px 8px rgba(120, 80, 30, 0.18)",
            }}
          />

          {/* z-3: top flap — same 50% height as the pocket's V-cut so they meet perfectly when closed */}
          <motion.div
            variants={flapVariants}
            className="absolute inset-x-0 top-0 h-[50%]"
            style={{ zIndex: 3, transformStyle: "preserve-3d", transformOrigin: "top center", backfaceVisibility: "visible" }}
          >
            {/* outer face of flap (visible when closed) */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(180deg, #f3e3c5 0%, #d9bd8a 100%)",
                boxShadow: "inset 0 -2px 6px rgba(120, 80, 30, 0.25)",
                backfaceVisibility: "hidden",
              }}
            />
            {/* underside of flap (visible after rotation) */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(180deg, #fbf3df 0%, #ead2a4 100%)",
                transform: "rotateX(180deg)",
                backfaceVisibility: "hidden",
              }}
            />
          </motion.div>

          {/* z-4: wax seal, centered on the envelope */}
          <motion.div
            variants={sealVariants}
            className="absolute left-1/2 top-1/2"
            style={{
              width: 120,
              height: 120,
              marginLeft: -60,
              marginTop: -60,
              zIndex: 4,
            }}
          >
            <div className={interactive ? "animate-sealPulse" : ""}>
              <WaxSeal initials={initials} size={120} />
            </div>
          </motion.div>
        </div>
      </button>

      {/* Hint */}
      {interactive && (
        <p className="mt-6 text-center font-serif tracking-[0.35em] text-xs sm:text-sm text-ink/80 uppercase animate-floaty">
          {hint}
        </p>
      )}
    </motion.div>
  );
}
