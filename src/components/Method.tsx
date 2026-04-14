import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const smooth = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };

const phases = [
  {
    num: "01",
    title: "Analyse",
    label: "Analyse",
    subtitle: "Understand the real problem before anyone starts solving it",
    description:
      "I start by understanding the situation properly. User interviews, data analysis, observations, workshops. Insight before solution.",
    methods: ["User Research", "Stakeholder Mapping", "Data Analysis", "Behavioural Observation"],
  },
  {
    num: "02",
    title: "Strategise",
    label: "Strategise",
    subtitle: "Turn analysis into direction",
    description:
      "Insight is translated into a clear strategic foundation. What is the right thing to do, and why? This step prevents the most expensive mistakes.",
    methods: ["Strategic Brief", "Framework Design", "Alignment", "Prioritisation"],
  },
  {
    num: "03",
    title: "Design",
    label: "Design",
    subtitle: "Give the strategy a communicable form",
    description:
      "Design is communication. I design solutions that are clear, usable, and meaningful — for spaces, systems, and interfaces.",
    methods: ["Design Brief", "Wireframing", "Prototyping", "Spatial Concept"],
  },
  {
    num: "04",
    title: "Deliver",
    label: "Deliver",
    subtitle: "Follow through to reality",
    description:
      "Output can be a brief, a product, a space, or a strategy. It depends on the project — not on a fixed template.",
    methods: ["Project Management", "Quality Assurance", "Handover", "Implementation"],
  },
];

export function Method() {
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: none)');
    setIsTouch(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const radius = 160;

  const getPosition = (index: number) => {
    const angle = (245 + index * 90) * (Math.PI / 180);
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    };
  };

  return (
    <section id="method" className="relative h-full flex flex-col overflow-hidden">
      <div className="section-inner">
        {/* Row 1: Header */}
        <div className="shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-3"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-5">
              How I Work
            </h2>
            <p className="max-w-xl leading-relaxed text-muted-foreground text-base">
              Every project — whether it's about a workplace, an app, or a strategy — goes through the same four phases. It's not a model. It's a way of thinking.
            </p>
          </motion.div>
        </div>

        {/* Row 2: Two-column — 2/3 diagram, 1/3 text */}
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row items-center">
          {/* Left: Circle Diagram — 2/3 width */}
          <div className="hidden md:flex flex-[2] items-center justify-center h-full -ml-12" style={{ paddingRight: '48px' }}>
            <div className="relative" style={{ width: "400px", height: "400px" }}>
              {/* Center label */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10"
              >
                <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/40 uppercase">
                  Continuous Process
                </div>
              </motion.div>

              {/* Circle path */}
              <svg
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                width="380"
                height="380"
                viewBox="0 0 380 380"
              >
                <motion.circle
                  cx="190"
                  cy="190"
                  r={radius}
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
                />
              </svg>

              {/* Phase nodes */}
              {phases.map((phase, i) => {
                const pos = getPosition(i);
                const isActive = activePhase === i;

                return (
                  <motion.div
                    key={phase.num}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ ...smooth, delay: 0.5 + i * 0.15 }}
                    className="absolute cursor-pointer group"
                    style={{
                      left: "50%",
                      top: "50%",
                      marginLeft: `${pos.x}px`,
                      marginTop: `${pos.y}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onMouseEnter={() => setActivePhase(i)}
                    onMouseLeave={() => setActivePhase(null)}
                    onClick={() => setActivePhase(activePhase === i ? null : i)}
                  >
                    <motion.div
                      className="relative rounded-full px-5 py-2.5 bg-background border-2 border-border"
                      style={{
                        boxShadow: isActive
                          ? "0 12px 40px hsl(var(--foreground) / 0.1)"
                          : "0 4px 20px hsl(var(--foreground) / 0.04)",
                        borderColor: isActive ? "hsl(var(--foreground))" : undefined,
                      }}
                      animate={{ scale: isActive ? 1.08 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="font-mono text-xs tracking-[0.2em] uppercase text-foreground font-bold">
                        {phase.label}
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Detail Panel — 1/3 width */}
          <div className="hidden md:flex flex-[1] items-center justify-start h-full">
            <motion.div
              className="max-w-xs"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {activePhase !== null ? (
                <motion.div
                  key={activePhase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 border border-border bg-background">
                    <span className="font-display text-foreground text-sm font-bold">
                      Phase {phases[activePhase].num}
                    </span>
                  </div>

                  <h3 className="font-display text-foreground leading-tight mb-2 tracking-tight text-2xl md:text-3xl font-bold">
                    {phases[activePhase].title}
                  </h3>

                  <p className="text-xs text-muted-foreground mb-3">
                    {phases[activePhase].subtitle}
                  </p>

                  <p className="leading-relaxed mb-4 text-muted-foreground text-base">
                    {phases[activePhase].description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {phases[activePhase].methods.map((m) => (
                      <span
                        key={m}
                        className="font-mono text-[10px] tracking-wider uppercase rounded-full px-2.5 py-1 text-foreground border border-border bg-background"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="py-12">
                  <p className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground/40 uppercase">
                    {isTouch ? 'Tap a phase to explore' : 'Hover over a phase to explore'}
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Mobile stacked view */}
          <div className="flex flex-col gap-4 md:hidden w-full max-w-md">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...smooth, delay: i * 0.1 }}
                className="rounded-2xl p-4 border-2 border-border bg-background"
                onClick={() => setActivePhase(activePhase === i ? null : i)}
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-foreground text-2xl font-bold opacity-20">
                    {phase.num}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-foreground font-bold">
                    {phase.label}
                  </span>
                </div>
                {activePhase === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="overflow-hidden mt-2"
                  >
                    <p className="text-muted-foreground text-sm leading-relaxed">{phase.description}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
