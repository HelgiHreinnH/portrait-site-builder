import { motion } from "framer-motion";
import { useState } from "react";

const smooth = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };

const phases = [
  {
    num: "01",
    title: "Analyse",
    label: "Analyse",
    subtitle: "Understand the real problem before solving it",
    description:
      "Workshops, user research, stakeholder mapping, data, and observation. The goal is clarity — not a finished product.",
    methods: ["User Research", "Stakeholder Mapping", "Data Collection", "Workshops"],
    bg: "#D5DEF4",
  },
  {
    num: "02",
    title: "Strategise",
    label: "Strategise",
    subtitle: "Turn findings into a clear direction",
    description:
      "Translate findings into priorities, a framework, or a shared understanding of what to build and why.",
    methods: ["Strategic Brief", "Framework Design", "Alignment", "Prioritisation"],
    bg: "#B8C9EE",
  },
  {
    num: "03",
    title: "Design",
    label: "Design",
    subtitle: "Give the strategy a communicable form",
    description:
      "Produce something concrete — a spatial concept, a product interface, a design brief, a wireframe, a prototype.",
    methods: ["Design Brief", "Wireframing", "Prototyping", "Spatial Concept"],
    bg: "#DCE8E6",
  },
  {
    num: "04",
    title: "Deliver",
    label: "Deliver",
    subtitle: "Follow through until it exists in reality",
    description:
      "Ensure what was designed actually comes to life as intended. From prototypes to launched products.",
    methods: ["Project Management", "Quality Assurance", "Handover", "Implementation"],
    bg: "#C5D5EC",
  },
];

export function Methodology() {
  const [activePhase, setActivePhase] = useState<number | null>(null);

  const radius = 180;

  const getPosition = (index: number) => {
    const angle = (245 + index * 90) * (Math.PI / 180);
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    };
  };

  return (
    <section
      id="methodology"
      className="relative h-full flex flex-col justify-center py-10 md:py-14 px-6 md:px-14 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <div className="mb-6 md:mb-8 text-center shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-foreground leading-tight tracking-tight mb-2 text-3xl md:text-4xl lg:text-5xl font-bold" style={{ lineHeight: 0.95 }}>
              How I Work
            </h2>
            <p className="max-w-2xl mx-auto leading-relaxed text-muted-foreground text-sm">
              The same four steps apply to every project — whether the problem is spatial, organisational, or digital.
            </p>
          </motion.div>
        </div>

        {/* Circular Process Diagram */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Circle Container - Desktop */}
          <div className="hidden lg:block relative" style={{ width: "500px", height: "500px" }}>
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

            {/* Connecting circle path */}
            <svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              width="440"
              height="440"
              viewBox="0 0 440 440"
            >
              <motion.circle
                cx="220"
                cy="220"
                r="180"
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

          {/* Mobile stacked view */}
          <div className="flex flex-col gap-4 lg:hidden w-full max-w-md">
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

          {/* Detail Panel - Desktop */}
          <motion.div
            className="hidden lg:block flex-1 max-w-lg"
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

                <p className="leading-relaxed mb-4 text-muted-foreground text-sm">
                  {phases[activePhase].description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {phases[activePhase].methods.map((m) => (
                    <span
                      key={m}
                      className="font-mono text-[9px] tracking-wider uppercase rounded-full px-2.5 py-1 text-foreground border border-border bg-background"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <p className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground/40 uppercase">
                  Hover over a phase to explore
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
