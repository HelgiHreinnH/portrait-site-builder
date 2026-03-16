import { motion } from "framer-motion";

export function QuoteBreak() {
  const quoteLines = [
    { text: "turn", style: "solid" as const },
    { text: "knowledge", style: "solid" as const },
    { text: "into", style: "solid" as const },
    { text: "design", style: "accent" as const },
  ];

  const indentMap: Record<number, string> = {
    1: "clamp(24px, 5vw, 100px)",
    2: "clamp(8px, 1.5vw, 32px)",
    3: "clamp(40px, 8vw, 160px)",
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-user-blue-light via-user-blue-mist to-user-sage opacity-40" />

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute top-12 right-8 md:right-16 max-w-xs font-mono text-[11px] leading-relaxed text-muted-foreground text-right"
      >
        Analyse the real problem. Build a strategy. Design something communicable. Follow through to delivery.
      </motion.p>

      {/* Main quote */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {quoteLines.map((line, i) => (
          <motion.div
            key={line.text}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ paddingLeft: indentMap[i] || "0" }}
          >
            <span
              className={`block font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-[-0.03em] leading-[0.9] uppercase ${
                line.style === "accent" ? "text-user-blue" : "text-foreground"
              }`}
            >
              {line.text}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Bottom scroll cue */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 mt-16 flex justify-between items-center">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50">
          Helgi Hreinn Hjálmarsson · People, Buildings, Technology
        </span>
        <motion.button
          onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="hidden md:flex font-mono text-[11px] tracking-widest uppercase rounded-full px-5 py-2 transition-all duration-300 bg-foreground/5 text-foreground/65 border border-foreground/10 hover:bg-foreground/10"
        >
          Get in touch →
        </motion.button>
      </div>
    </section>
  );
}
