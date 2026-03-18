import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const smooth = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

const TOP_WORDS = [
  "knowledge", "complexity", "analysis", "research", "insight", "data", "ambition", "vision",
];
const BOTTOM_WORDS = [
  "strategy", "clarity", "delivery", "results", "action", "impact",
];

const CHAR_SPEED = 70;

function TypewriterWord({ text, typing, onComplete }: { text: string; typing: boolean; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState(typing ? "" : text);
  const completeCalled = useRef(false);

  useEffect(() => {
    if (!typing) {
      setDisplayed(text);
      return;
    }
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
  }, [text, typing, onComplete]);

  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
    >
      {displayed}
      {typing && (
        <motion.span
          className="inline-block w-[3px] h-[0.85em] bg-current ml-1 align-text-bottom"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
    </motion.span>
  );
}

export function QuoteBreak() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [topTyping, setTopTyping] = useState(false);
  const [bottomTyping, setBottomTyping] = useState(false);

  // Start first cycle after entrance animation
  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => {
      setTopIndex(1); // move to second word to trigger first typewriter
      setTopTyping(true);
    }, 3000);
    return () => clearTimeout(t);
  }, [isInView]);

  const onTopComplete = useCallback(() => {
    setTopTyping(false);
    // After top finishes, pause then type bottom
    setTimeout(() => {
      setBottomIndex((p) => (p + 1) % BOTTOM_WORDS.length);
      setBottomTyping(true);
    }, 800);
  }, []);

  const onBottomComplete = useCallback(() => {
    setBottomTyping(false);
    // Long reading pause, then cycle top again
    setTimeout(() => {
      setTopIndex((p) => (p + 1) % TOP_WORDS.length);
      setTopTyping(true);
    }, 3500);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...smooth, delay: 0.4 }}
        className="absolute bottom-16 md:bottom-20 right-8 md:right-16 max-w-sm font-mono text-sm md:text-base font-medium leading-relaxed text-muted-foreground text-right flex flex-col gap-1"
      >
        <span>Analyse the real problem.</span>
        <span>Build a strategy.</span>
        <span>Design something communicable.</span>
        <span>Follow through to delivery.</span>
      </motion.div>

      <div className="relative z-10 max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0, ease: [0.22, 1, 0.36, 1] }}
          className="ml-0 md:ml-4"
        >
          <span className="block font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-[-0.03em] leading-[0.9] uppercase text-foreground">
            turn
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="ml-6 md:ml-16"
        >
          <span className="block font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-[-0.03em] leading-[0.9] uppercase text-foreground" style={{ minHeight: '1.15em' }}>
            <AnimatePresence mode="wait">
              <TypewriterWord
                key={`top-${topIndex}`}
                text={TOP_WORDS[topIndex]}
                typing={topTyping}
                onComplete={onTopComplete}
              />
            </AnimatePresence>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="ml-10 md:ml-28"
        >
          <span className="block font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-[-0.03em] leading-[0.9] uppercase text-foreground">
            into
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
          className="ml-3 md:ml-10"
        >
          <span className="block font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-[-0.03em] leading-[0.9] uppercase text-user-blue" style={{ minHeight: '1.15em' }}>
            <AnimatePresence mode="wait">
              <TypewriterWord
                key={`bottom-${bottomIndex}`}
                text={BOTTOM_WORDS[bottomIndex]}
                typing={bottomTyping}
                onComplete={onBottomComplete}
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
