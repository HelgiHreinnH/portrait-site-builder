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

  const handleMobileScroll = () => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const page = Math.round(el.scrollLeft / el.clientWidth);
    if (page !== mobilePage) setMobilePage(page);
  };

  const scrollToMobilePage = (page: number) => {
    const el = mobileScrollRef.current;
    if (!el) return;
    el.scrollTo({ left: page * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section id="about" className="h-full flex flex-col">
      {/* ─── DESKTOP (md+) ─── */}
      {/* Top half */}
      <div className="hidden md:flex flex-1 flex-col section-inner !pb-0">
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

      {/* ─── MOBILE (<md) — horizontal snap pages ─── */}
      <div className="md:hidden flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Header */}
        <div className="shrink-0 px-[var(--section-px)] pt-[var(--section-pt)] pb-3">
          <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground leading-tight">
            From Convention to Insight
          </h2>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1.5">
            {mobilePage === 0 ? "01 — Mindset Shifts" : "02 — Ways to Work Together"}
          </p>
        </div>

        {/* Horizontal snap carousel */}
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="flex-1 min-h-0 overflow-x-auto overflow-y-hidden snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex h-full">
            {/* Page 1 — Mindset shifts */}
            <div className="snap-start shrink-0 w-screen h-full px-[var(--section-px)] py-2 flex">
              <div className="w-full h-full border border-border rounded-xl bg-background flex flex-col overflow-y-auto">
                <div className="p-4 flex flex-col gap-3 my-auto">
                  {shifts.map(([from, to], i) => (
                    <div key={i} className="flex flex-col gap-0.5">
                      <span className="text-[11px] text-muted-foreground/60 font-mono leading-tight line-through decoration-muted-foreground/30">
                        {from}
                      </span>
                      <span className="text-[13px] font-medium text-foreground leading-snug">
                        {to}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Page 2 — Ways to Work Together */}
            <div className="snap-start shrink-0 w-screen h-full px-[var(--section-px)] py-2 flex">
              <div className="w-full h-full bg-muted/40 rounded-xl flex flex-col overflow-y-auto">
                <div className="p-4 flex flex-col gap-3 my-auto">
                  {engagements.map((item) => (
                    <div
                      key={item.title}
                      className="border-b border-border/60 last:border-b-0 pb-2.5 last:pb-0"
                    >
                      <div className="flex items-baseline justify-between gap-3 mb-0.5">
                        <p className="font-display text-[14px] font-bold text-foreground">
                          {item.title}
                        </p>
                        <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground shrink-0">
                          {item.duration}
                        </p>
                      </div>
                      <p className="text-[11.5px] text-muted-foreground leading-snug">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="shrink-0 flex items-center justify-center gap-2 py-3">
          {[0, 1].map((p) => (
            <button
              key={p}
              onClick={() => scrollToMobilePage(p)}
              aria-label={`Go to page ${p + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                mobilePage === p ? "w-6 bg-foreground" : "w-1.5 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
