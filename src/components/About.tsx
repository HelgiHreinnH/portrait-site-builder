import { useState, useRef } from "react";
import { motion } from "framer-motion";

const smooth = { duration: 1, ease: [0.22, 1, 0.36, 1] as const };

const shifts = [
  ["Assume how spaces should be used", "Observe how spaces are actually used"],
  ["Design for average user", "Design for real behavioural patterns"],
  ["One-time delivery", "Continuous learning and optimisation"],
  ["Satisfaction surveys", "Outcome-based measurement"],
  ["Space-centred thinking", "People-centred thinking"],
];

const engagements = [
  { title: "Advisory", duration: "Ongoing", description: "Workshops, frameworks, and strategic advice for teams navigating complex problems." },
  { title: "Product Sprint", duration: "2 – 6 weeks", description: "Rapid prototyping and validation for digital tools and platforms." },
  { title: "Strategic Brief", duration: "4 – 8 weeks", description: "Analytical, strategic, or design brief — clarity before commitment." },
  { title: "Full-Scope Project", duration: "3 – 12 months", description: "End-to-end from analysis to delivery — workplace strategy, digital product, or both." },
];

export function About() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [mobilePage, setMobilePage] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="h-full flex flex-col">
      {/* ─── DESKTOP (md+) ─── */}
      {/* Top half */}
      <div className="hidden md:flex flex-1 flex-col min-h-0">
        <div className="flex-1 flex flex-col min-h-0 w-full max-w-[var(--section-max-w)] mx-auto px-[var(--section-px)] md:px-[var(--section-px-md)] pt-[var(--section-pt)]">
        <div className="shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={smooth}
            className="mb-3"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-5">
              From Convention to Insight
            </h2>
          </motion.div>
        </div>

        {/* Centered card */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...smooth, delay: 0.1 }}
            className="w-full max-w-4xl border border-border rounded-xl px-8 md:px-10 py-8 bg-background"
          >
            <div className="flex flex-col gap-4">
              {shifts.map(([from, to], i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...smooth, delay: 0.08 * i }}
                  className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-4"
                >
                  <span className="flex-1 text-sm md:text-base text-muted-foreground/60 md:text-right font-mono leading-tight line-through decoration-muted-foreground/30">
                    {from}
                  </span>
                  <svg width="32" height="12" viewBox="0 0 32 12" className="shrink-0 text-muted-foreground/30 hidden md:block">
                    <line x1="0" y1="6" x2="26" y2="6" stroke="currentColor" strokeWidth="1" />
                    <polygon points="26,3 32,6 26,9" fill="currentColor" />
                  </svg>
                  <span className="flex-1 text-sm md:text-base font-medium text-foreground leading-tight">
                    {to}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        </div>
      </div>

      {/* Desktop bottom half */}
      <div className="hidden md:flex h-[360px] shrink-0 flex-col justify-start px-[var(--section-px)] md:px-[var(--section-px-md)] pt-8 pb-[72px] bg-muted/40">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...smooth, delay: 0.2 }}
          >
            <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold tracking-[-0.02em] text-foreground mb-8">
              Ways to Work Together
            </h3>

            <div className="relative">
              <div className="hidden md:block absolute top-[6px] left-0 right-0 h-px bg-border" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0">
                {engagements.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...smooth, delay: 0.1 + i * 0.08 }}
                    className="relative cursor-pointer group md:pr-10 md:border-r md:last:border-r-0 border-border"
                    onMouseEnter={() => setActiveNode(i)}
                    onMouseLeave={() => setActiveNode(null)}
                  >
                    <div className="hidden md:block absolute top-0 left-0">
                      <motion.div
                        animate={{
                          scale: activeNode === i ? 1.6 : 1,
                          backgroundColor: activeNode === i ? "hsl(var(--foreground))" : "hsl(var(--border))",
                        }}
                        transition={{ duration: 0.25 }}
                        className="w-3 h-3 rounded-full border border-foreground/20"
                      />
                    </div>

                    <div className="md:pt-7 md:pl-0">
                      <p className="font-display text-base font-bold text-foreground mb-1 group-hover:text-foreground/80 transition-colors">
                        {item.title}
                      </p>
                      <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-2.5">
                        {item.duration}
                      </p>
                      <motion.p
                        animate={{ opacity: activeNode === i ? 1 : 0.6 }}
                        className="text-sm text-muted-foreground leading-relaxed"
                      >
                        {item.description}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── MOBILE (<md) — single-screen toggle card ─── */}
      <div className="md:hidden flex-1 flex flex-col min-h-0 px-[var(--section-px)] pt-[var(--section-pt)] pb-6 overflow-y-auto">
        <div className="shrink-0 mb-4">
          <h2 className="font-display text-[26px] leading-[1.1] font-bold tracking-[-0.02em] text-foreground">
            From Convention to Insight
          </h2>
          <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
            How my approach differs from convention — and the ways we can work together to put it into practice.
          </p>
        </div>

        <div className="shrink-0 mb-4 grid grid-cols-2 gap-2 rounded-lg bg-muted/50 p-1">
          <button
            type="button"
            onClick={() => setMobilePage(0)}
            aria-pressed={mobilePage === 0}
            className={`min-h-[40px] rounded-md px-3 py-2 text-left transition-colors ${
              mobilePage === 0 ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            <span className="block font-mono text-[10px] tracking-[0.18em] uppercase">01</span>
            <span className="block font-display text-[13px] font-bold leading-tight mt-1">Mindset shifts</span>
          </button>
          <button
            type="button"
            onClick={() => setMobilePage(1)}
            aria-pressed={mobilePage === 1}
            className={`min-h-[40px] rounded-md px-3 py-2 text-left transition-colors ${
              mobilePage === 1 ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            <span className="block font-mono text-[10px] tracking-[0.18em] uppercase">02</span>
            <span className="block font-display text-[13px] font-bold leading-tight mt-1">Ways to work together</span>
          </button>
        </div>

        <div className="shrink-0">
          <div
            ref={mobileScrollRef}
            className={`w-full rounded-xl border border-border ${
              mobilePage === 0 ? "bg-background" : "bg-muted/40"
            } px-4 py-4`}
          >
            {mobilePage === 0 ? (
              <div className="flex flex-col gap-4">
                {shifts.map(([from, to], i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <span className="text-[12px] text-muted-foreground/60 font-mono leading-tight line-through decoration-muted-foreground/30">
                      {from}
                    </span>
                    <span className="text-[15px] font-medium text-foreground leading-snug">
                      {to}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {engagements.map((item) => (
                  <div key={item.title} className="border-b border-border/60 last:border-b-0 pb-3 last:pb-0">
                    <div className="flex flex-col gap-1 mb-1.5">
                      <p className="font-display text-[15px] font-bold text-foreground leading-tight">{item.title}</p>
                      <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                        {item.duration}
                      </p>
                    </div>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
