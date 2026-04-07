import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";

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

export function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [topTyping, setTopTyping] = useState(false);
  const [bottomTyping, setBottomTyping] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => {
      setTopIndex(1);
      setTopTyping(true);
    }, 3000);
    return () => clearTimeout(t);
  }, [isInView]);

  const onTopComplete = useCallback(() => {
    setTopTyping(false);
    setTimeout(() => {
      setBottomIndex((p) => (p + 1) % BOTTOM_WORDS.length);
      setBottomTyping(true);
    }, 800);
  }, []);

  const onBottomComplete = useCallback(() => {
    setBottomTyping(false);
    setTimeout(() => {
      setTopIndex((p) => (p + 1) % TOP_WORDS.length);
      setTopTyping(true);
    }, 3500);
  }, []);

  return (
    <section ref={ref} className="relative h-full flex flex-col justify-center items-center overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div className="relative z-10 w-full max-w-7xl px-6 md:px-10 flex items-end justify-between">
        {/* Left — animated headline */}
        <div>
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0.1 } : { duration: 1, delay: 0, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block font-display text-5xl md:text-7xl lg:text-8xl xl:text-[8rem] font-bold tracking-[-0.03em] leading-[0.9] uppercase text-foreground">
              turn
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block font-display text-5xl md:text-7xl lg:text-8xl xl:text-[8rem] font-bold tracking-[-0.03em] leading-[0.9] uppercase text-foreground" style={{ minHeight: '1.1em' }}>
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
          >
            <span className="block font-display text-5xl md:text-7xl lg:text-8xl xl:text-[8rem] font-bold tracking-[-0.03em] leading-[0.9] uppercase text-foreground">
              into
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block font-display text-5xl md:text-7xl lg:text-8xl xl:text-[8rem] font-bold tracking-[-0.03em] leading-[0.9] uppercase text-user-blue" style={{ minHeight: '1.1em' }}>
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

        {/* Right — subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...smooth, delay: 0.5 }}
          className="hidden md:flex flex-col gap-1 font-mono text-base md:text-lg font-medium leading-relaxed text-muted-foreground text-right pb-2"
        >
          <span>I analyse. I strategise.</span>
          <span>I design. I deliver.</span>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50">
          People, Buildings, Technology
        </span>
      </div>
    </section>
  );
}
