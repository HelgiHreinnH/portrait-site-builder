import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const smooth = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

/* ── Word pools ── */
const TOP_WORDS = [
  "knowledge", "complexity", "analysis", "research", "insight", "data", "ambition", "vision",
];
const BOTTOM_WORDS = [
  "strategy", "clarity", "delivery", "results", "action", "impact",
];

/* ── Animation styles ── */
type AnimStyle = "slideUp" | "typewriter" | "clipReveal" | "blur" | "scaleUp";
const TOP_ANIMS: AnimStyle[] = ["slideUp", "typewriter", "clipReveal", "blur", "scaleUp", "slideUp", "clipReveal", "typewriter"];
const BOTTOM_ANIMS: AnimStyle[] = ["clipReveal", "slideUp", "blur", "typewriter", "scaleUp", "clipReveal"];

/* ── Typewriter hook ── */
function useTypewriter(text: string, active: boolean, speed = 55) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) { setDisplayed(""); return; }
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, active, speed]);
  return displayed;
}

/* ── Animation components ── */
function SlideUpWord({ text }: { text: string }) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ y: "110%", rotateX: -80 }}
        animate={{ y: "0%", rotateX: 0 }}
        exit={{ y: "-110%", rotateX: 80 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "bottom" }}
      >
        {text}
      </motion.span>
    </span>
  );
}

function ClipRevealWord({ text }: { text: string }) {
  return (
    <motion.span
      className="inline-block"
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={{ clipPath: "inset(0 0% 0 0)" }}
      exit={{ clipPath: "inset(0 0 0 100%)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </motion.span>
  );
}

function TypewriterWord({ text }: { text: string }) {
  const displayed = useTypewriter(text, true, 65);
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      {displayed}
      <motion.span
        className="inline-block w-[3px] h-[0.85em] bg-foreground ml-1 align-text-bottom"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
      />
    </motion.span>
  );
}

function BlurWord({ text }: { text: string }) {
  return (
    <motion.span
      className="inline-block"
      initial={{ filter: "blur(16px)", opacity: 0 }}
      animate={{ filter: "blur(0px)", opacity: 1 }}
      exit={{ filter: "blur(16px)", opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </motion.span>
  );
}

function ScaleUpWord({ text }: { text: string }) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );
}

function AnimatedWord({ text, animStyle }: { text: string; animStyle: AnimStyle }) {
  const Component =
    animStyle === "typewriter" ? TypewriterWord
    : animStyle === "clipReveal" ? ClipRevealWord
    : animStyle === "blur" ? BlurWord
    : animStyle === "scaleUp" ? ScaleUpWord
    : SlideUpWord;
  return <Component text={text} />;
}

export function QuoteBreak() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);

  // Variable timing: each word stays visible for a different duration
  useEffect(() => {
    if (!isInView) return;
    const topDurations = [4500, 3800, 5200, 4000, 4600, 3500, 5000, 4200];
    let timeout: ReturnType<typeof setTimeout>;
    const cycle = (idx: number) => {
      timeout = setTimeout(() => {
        const next = (idx + 1) % TOP_WORDS.length;
        setTopIndex(next);
        cycle(next);
      }, topDurations[idx]);
    };
    cycle(topIndex);
    return () => clearTimeout(timeout);
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;
    const bottomDurations = [5000, 4200, 4800, 3800, 5500, 4400];
    let timeout: ReturnType<typeof setTimeout>;
    const cycle = (idx: number) => {
      timeout = setTimeout(() => {
        const next = (idx + 1) % BOTTOM_WORDS.length;
        setBottomIndex(next);
        cycle(next);
      }, bottomDurations[idx]);
    };
    cycle(bottomIndex);
    return () => clearTimeout(timeout);
  }, [isInView]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...smooth, delay: 0.4 }}
        className="absolute top-52 md:top-60 right-8 md:right-16 max-w-sm font-mono text-sm md:text-base leading-relaxed text-muted-foreground text-right"
      >
        Analyse the real problem. Build a strategy. Design something communicable. Follow through to delivery.
      </motion.p>

      {/* Main quote with animated words */}
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

        {/* ANIMATED TOP WORD (knowledge, complexity, etc.) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-[-0.03em] leading-[0.9] uppercase text-foreground min-h-[1em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={topIndex}
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <AnimatedWord text={TOP_WORDS[topIndex]} animStyle={TOP_ANIMS[topIndex]} />
              </motion.span>
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

        {/* ANIMATED BOTTOM WORD (strategy, clarity, etc.) — accent color */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-[-0.03em] leading-[0.9] uppercase text-user-blue min-h-[1em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={bottomIndex}
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <AnimatedWord text={BOTTOM_WORDS[bottomIndex]} animStyle={BOTTOM_ANIMS[bottomIndex]} />
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>
      </div>

      {/* Bottom bar */}
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
