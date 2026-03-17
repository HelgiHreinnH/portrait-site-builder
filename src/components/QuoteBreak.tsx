import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const smooth = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

const TOP_WORDS = [
  "knowledge", "complexity", "analysis", "research", "insight", "data", "ambition", "vision",
];
const BOTTOM_WORDS = [
  "strategy", "clarity", "delivery", "results", "action", "impact",
];

const CHAR_SPEED = 70; // ms per character

function TypewriterWord({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const completeCalled = useRef(false);

  useEffect(() => {
    setDisplayed("");
    completeCalled.current = false;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        if (onComplete && !completeCalled.current) {
          completeCalled.current = true;
          onComplete();
        }
      }
    }, CHAR_SPEED);
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
    >
      {displayed}
      <motion.span
        className="inline-block w-[3px] h-[0.85em] bg-current ml-1 align-text-bottom"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse" }}
      />
    </motion.span>
  );
}

export function QuoteBreak() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "typingTop" | "waitAfterTop" | "typingBottom" | "waitAfterBottom">("idle");

  // Sequenced cycle: type top → pause → type bottom → long pause → repeat
  useEffect(() => {
    if (!isInView) return;
    // Start first cycle after initial entrance animation
    const start = setTimeout(() => setPhase("typingTop"), 2500);
    return () => clearTimeout(start);
  }, [isInView]);

  // After top word finishes typing, wait then start bottom
  const onTopComplete = useCallback(() => {
    setPhase("waitAfterTop");
  }, []);

  // After bottom word finishes typing, wait then restart cycle
  const onBottomComplete = useCallback(() => {
    setPhase("waitAfterBottom");
  }, []);

  useEffect(() => {
    if (phase === "waitAfterTop") {
      const t = setTimeout(() => {
        setBottomIndex((p) => (p + 1) % BOTTOM_WORDS.length);
        setPhase("typingBottom");
      }, 800); // pause between top finishing and bottom starting
      return () => clearTimeout(t);
    }
    if (phase === "waitAfterBottom") {
      const t = setTimeout(() => {
        setTopIndex((p) => (p + 1) % TOP_WORDS.length);
        setPhase("typingTop");
      }, 3500); // long pause to read the full sentence
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...smooth, delay: 0.4 }}
        className="absolute top-52 md:top-60 right-8 md:right-16 max-w-sm font-mono text-sm md:text-base leading-relaxed text-muted-foreground text-right"
      >
        Analyse the real problem. Build a strategy. Design something communicable. Follow through to delivery.
      </motion.p>

      <div className="relative z-10 max-w-7xl px-6 md:px-10">
        {/* TURN */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-[-0.03em] leading-[0.9] uppercase text-foreground">
            turn
          </span>
        </motion.div>

        {/* TOP WORD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-[-0.03em] leading-[0.9] uppercase text-foreground min-h-[1em]">
            <AnimatePresence mode="wait">
              <TypewriterWord
                key={`top-${topIndex}`}
                text={TOP_WORDS[topIndex]}
                onComplete={phase === "typingTop" ? onTopComplete : undefined}
              />
            </AnimatePresence>
          </span>
        </motion.div>

        {/* INTO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-[-0.03em] leading-[0.9] uppercase text-foreground">
            into
          </span>
        </motion.div>

        {/* BOTTOM WORD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-[-0.03em] leading-[0.9] uppercase text-user-blue min-h-[1em]">
            <AnimatePresence mode="wait">
              <TypewriterWord
                key={`bottom-${bottomIndex}`}
                text={BOTTOM_WORDS[bottomIndex]}
                onComplete={phase === "typingBottom" ? onBottomComplete : undefined}
              />
            </AnimatePresence>
          </span>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-10 px-6 md:px-10 flex justify-between items-center">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50">
          Helgi Hreinn Hjálmarsson · People, Buildings, Technology
        </span>
        <motion.button
          onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="hidden md:flex font-mono text-[11px] tracking-widest uppercase rounded-full px-5 py-2 transition-colors duration-500 bg-foreground/5 text-foreground/65 border border-foreground/10 hover:bg-foreground/10"
        >
          Get in touch →
        </motion.button>
      </div>
    </section>
  );
}
