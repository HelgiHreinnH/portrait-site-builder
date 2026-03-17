import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";

const smooth = { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };

const PORTRAIT =
  "https://images.unsplash.com/photo-1571059314690-91e84c43dc0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhcmNoaXRlY3QlMjBtYW4lMjBwb3J0cmFpdCUyMG1pbmltYWx8ZW58MXx8fHwxNzczMTQxNjYwfDA&ixlib=rb-4.1.0&q=80&w=1080";

const CLIENTS = [
  "LEGO", "Barclays", "Beumer Group", "Colliers", "Ubiqisense", "Bygningsstyrelsen",
  "LEGO", "Barclays", "Beumer Group", "Colliers", "Ubiqisense", "Bygningsstyrelsen",
];

/* ── Rotating phrases ── */
const PHRASES = [
  { prefix: "Turn", word: "analysis", suffix: "into results" },
  { prefix: "Turn", word: "ideas", suffix: "into buildings" },
  { prefix: "Turn", word: "complexity", suffix: "into clarity" },
  { prefix: "Turn", word: "knowledge", suffix: "into strategy" },
  { prefix: "Turn", word: "design", suffix: "into delivery" },
];

type AnimStyle = "slideUp" | "typewriter" | "clipReveal";
const ANIM_STYLES: AnimStyle[] = ["slideUp", "typewriter", "clipReveal", "slideUp", "typewriter"];

/* ── Typewriter hook ── */
function useTypewriter(text: string, active: boolean, speed = 55) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      return;
    }
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

/* ── SlideUp word component ── */
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

/* ── ClipReveal word component ── */
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

/* ── Typewriter word component ── */
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
        className="inline-block w-[2px] h-[1em] bg-foreground ml-0.5 align-text-bottom"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
      />
    </motion.span>
  );
}

/* ── Animated phrase ── */
function AnimatedPhrase({ phrase, animStyle }: { phrase: typeof PHRASES[0]; animStyle: AnimStyle }) {
  const WordComponent = animStyle === "typewriter" ? TypewriterWord
    : animStyle === "clipReveal" ? ClipRevealWord
    : SlideUpWord;

  return (
    <span className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
      <span className="text-muted-foreground font-light">{phrase.prefix} </span>
      <AnimatePresence mode="wait">
        <WordComponent key={phrase.word} text={phrase.word} />
      </AnimatePresence>
      <br className="hidden md:block" />
      <span className="text-muted-foreground font-light"> {phrase.suffix}</span>
    </span>
  );
}

export function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [phraseIndex, setPhraseIndex] = useState(0);

  const nextPhrase = useCallback(() => {
    setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(nextPhrase, 3000);
    return () => clearInterval(timer);
  }, [isInView, nextPhrase]);

  const currentPhrase = PHRASES[phraseIndex];
  const currentAnim = ANIM_STYLES[phraseIndex];

  return (
    <section className="relative min-h-screen overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-16 left-6 right-6 h-px bg-foreground/5" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-8 min-h-screen flex flex-col">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left side - Typography */}
          <div className="flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...smooth, delay: 0.1 }}
              className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-8"
            >
              People · Buildings · Technology
            </motion.p>

            {/* Animated headline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ ...smooth, delay: 0.3 }}
              className="min-h-[120px] md:min-h-[160px] flex items-start"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={phraseIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <AnimatedPhrase phrase={currentPhrase} animStyle={currentAnim} />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Phrase indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ ...smooth, delay: 0.5 }}
              className="flex gap-2 mt-6"
            >
              {PHRASES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPhraseIndex(i)}
                  className={`h-[2px] transition-all duration-500 ${
                    i === phraseIndex
                      ? "w-8 bg-foreground"
                      : "w-4 bg-foreground/15 hover:bg-foreground/30"
                  }`}
                />
              ))}
            </motion.div>

            {/* Description and stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...smooth, delay: 0.6 }}
              className="mt-8 md:mt-12"
            >
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-md">
                I analyse the real problem, build a strategy around the findings,
                design something communicable, and follow through to delivery.
              </p>

              <div className="flex gap-8 mt-8">
                {[
                  { v: "10+", l: "Years" },
                  { v: "10K+", l: "People impacted" },
                  { v: "3", l: "Countries" },
                ].map(({ v, l }) => (
                  <div key={l} className="text-center">
                    <div className="font-display text-3xl font-bold text-foreground">{v}</div>
                    <div className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right side - Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...smooth, delay: 0.3 }}
            className="relative"
          >
            <p className="font-mono text-[11px] leading-relaxed text-muted-foreground max-w-xs mb-6 text-right ml-auto">
              Architect by training. Working across the boundary between physical space, organisational thinking, and digital product.
            </p>

            <div className="relative overflow-hidden" style={{ outline: "1px solid rgba(0,0,0,0.08)", outlineOffset: "-1px" }}>
              <img
                src={PORTRAIT}
                alt="Helgi Hreinn Hjálmarsson"
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/60 to-transparent">
                <p className="font-display text-primary-foreground text-lg font-medium">Helgi Hreinn Hjálmarsson</p>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary-foreground/70">Architect · Copenhagen</p>
              </div>
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-2 text-center">
                <div className="font-display text-xl font-bold text-foreground">580</div>
                <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground">Largest project</div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <motion.button
                onClick={() => {
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ y: 3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-center gap-3 group"
              >
                <ArrowDown size={16} className="text-muted-foreground" />
                <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground">Explore</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Client marquee */}
        <div className="mt-auto pt-8 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <span key={i} className="font-mono text-[11px] tracking-[0.3em] uppercase text-foreground/20 mx-4">
                {client}
                <span className="ml-4">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
