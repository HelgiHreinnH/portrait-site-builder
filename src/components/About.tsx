import { useState } from "react";
import { motion } from "framer-motion";

const smooth = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

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

  return (
    <section id="about" className="h-full flex flex-col">
      {/* Top container — 2/3 height */}
      <div className="flex-[2] flex flex-col justify-start pt-12 md:pt-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={smooth}
            className="my-[48px]"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-0 px-[4px]">
              From Convention to Insight
            </h2>
          </motion.div>

          {/* Centered card */}
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ ...smooth, delay: 0.1 }}
              className="w-full max-w-3xl border border-border rounded-xl px-8 py-6 bg-background"
            >
              <div className="flex flex-col gap-3">
                {shifts.map(([from, to], i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
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

      {/* Bottom container — 1/3 height, subtle background */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-10 bg-muted/40">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...smooth, delay: 0.2 }}
          >
            <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold tracking-[-0.02em] text-foreground mb-5">
              Ways to Work Together
            </h3>

            <div className="relative">
              <div className="hidden md:block absolute top-[6px] left-0 right-0 h-px bg-border" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0">
                {engagements.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...smooth, delay: 0.1 + i * 0.08 }}
                    className="relative cursor-pointer group md:pr-4"
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

                    <div className="md:pt-5 md:pl-0">
                      <p className="font-display text-sm font-bold text-foreground mb-0.5 group-hover:text-foreground/80 transition-colors">
                        {item.title}
                      </p>
                      <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5">
                        {item.duration}
                      </p>
                      <motion.p
                        animate={{ opacity: activeNode === i ? 1 : 0.6 }}
                        className="text-xs text-muted-foreground leading-relaxed"
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
    </section>
  );
}
