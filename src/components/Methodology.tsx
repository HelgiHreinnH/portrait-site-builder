import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const smooth = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };
const smoothFast = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

const phases = [
  {
    num: "01",
    title: "Analyse",
    subtitle: "Understand the real problem before solving it",
    description:
      "Workshops, user research, stakeholder mapping, data, and observation. The goal is clarity — not a finished product.",
    methods: ["User Research", "Stakeholder Mapping", "Data Collection", "Workshops"],
    bg: "#D5DEF4",
  },
  {
    num: "02",
    title: "Strategise",
    subtitle: "Turn findings into a clear direction",
    description:
      "Translate findings into priorities, a framework, or a shared understanding of what to build and why.",
    methods: ["Strategic Brief", "Framework Design", "Alignment", "Prioritisation"],
    bg: "#B8C9EE",
  },
  {
    num: "03",
    title: "Design",
    subtitle: "Give the strategy a communicable form",
    description:
      "Produce something concrete — a spatial concept, a product interface, a design brief, a wireframe, a prototype.",
    methods: ["Design Brief", "Wireframing", "Prototyping", "Spatial Concept"],
    bg: "#DCE8E6",
  },
  {
    num: "04",
    title: "Deliver",
    subtitle: "Follow through until it exists in reality",
    description:
      "Ensure what was designed actually comes to life as intended. From prototypes to launched products.",
    methods: ["Project Management", "Quality Assurance", "Handover", "Implementation"],
    bg: "#C5D5EC",
  },
];

// Each phase is positioned using CSS (top/left + transform) relative to the diagram container.
// The circle is drawn centered. Labels sit outside.
// Layout: Top(Analyse), Right(Strategise), Bottom(Design), Left(Deliver)

interface LabelLayout {
  dotStyle: React.CSSProperties;
  labelStyle: React.CSSProperties;
  textAlign: "left" | "right" | "center";
  justify: string;
}

function getLayouts(cx: number, cy: number, r: number): LabelLayout[] {
  const gap = 20; // space between dot edge and label
  return [
    // 01 Analyse — top
    {
      dotStyle: { left: cx, top: cy - r, transform: "translate(-50%, -50%)" },
      labelStyle: { left: cx, top: cy - r - gap, transform: "translate(-50%, -100%)", width: 260 },
      textAlign: "center",
      justify: "center",
    },
    // 02 Strategise — right
    {
      dotStyle: { left: cx + r, top: cy, transform: "translate(-50%, -50%)" },
      labelStyle: { left: cx + r + gap, top: cy, transform: "translate(0%, -50%)", width: 240 },
      textAlign: "left",
      justify: "flex-start",
    },
    // 03 Design — bottom
    {
      dotStyle: { left: cx, top: cy + r, transform: "translate(-50%, -50%)" },
      labelStyle: { left: cx, top: cy + r + gap, transform: "translate(-50%, 0%)", width: 260 },
      textAlign: "center",
      justify: "center",
    },
    // 04 Deliver — left
    {
      dotStyle: { left: cx + -r, top: cy, transform: "translate(-50%, -50%)" },
      labelStyle: { left: cx - r - gap, top: cy, transform: "translate(-100%, -50%)", width: 240 },
      textAlign: "right",
      justify: "flex-end",
    },
  ];
}

function MobilePhase({
  phase,
  index,
  active,
  onTap,
}: {
  phase: (typeof phases)[0];
  index: number;
  active: boolean;
  onTap: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...smooth, delay: index * 0.05 }}
      onClick={onTap}
      className="relative border-b border-border py-5 px-1 cursor-pointer"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 0.25 : 0 }}
        style={{ background: phase.bg }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <div className="relative">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">{phase.num}</span>
          <h3 className="font-display text-lg font-semibold text-foreground">{phase.title}</h3>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{phase.subtitle}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {phase.methods.map((m) => (
            <span key={m} className="font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-1 border border-border text-muted-foreground">{m}</span>
          ))}
        </div>
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={smoothFast}
              className="overflow-hidden"
            >
              <p className="text-sm leading-relaxed text-muted-foreground mt-3">{phase.description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function Methodology() {
  const [active, setActive] = useState<number | null>(null);

  // Diagram dimensions
  const containerW = 900;
  const containerH = 620;
  const cx = containerW / 2;
  const cy = containerH / 2;
  const r = 140;

  const layouts = getLayouts(cx, cy, r);

  return (
    <section id="methodology" className="min-h-screen relative py-16 md:py-24">
      {/* Header — top left */}
      <div className="absolute top-24 md:top-32 left-6 md:left-10 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={smooth}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] text-foreground"
        >
          How I Work
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...smooth, delay: 0.1 }}
          className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl"
        >
          The same four steps apply to every project — whether the problem is spatial, organisational, or digital.
        </motion.p>
      </div>

      {/* Diagram — centered */}
      <div className="hidden md:flex items-center justify-center min-h-screen w-full">
        <div className="relative" style={{ width: containerW, height: containerH }}>

          {/* SVG: circle + dashed connectors */}
          <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${containerW} ${containerH}`}>
            {/* Main circle */}
            <motion.circle
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke="hsl(0, 0%, 88%)"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ ...smooth, duration: 1.2 }}
            />
            {/* Dashed cross lines */}
            {[0, 1, 2, 3].map((i) => {
              const a1 = [270, 0, 90, 180][i];
              const a2 = [270, 0, 90, 180][(i + 1) % 4];
              const rad1 = (a1 * Math.PI) / 180;
              const rad2 = (a2 * Math.PI) / 180;
              return (
                <motion.line
                  key={i}
                  x1={cx + Math.cos(rad1) * r} y1={cy + Math.sin(rad1) * r}
                  x2={cx + Math.cos(rad2) * r} y2={cy + Math.sin(rad2) * r}
                  stroke="hsl(0, 0%, 90%)"
                  strokeWidth={0.5}
                  strokeDasharray="4 4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.4 }}
                  viewport={{ once: true }}
                  transition={{ ...smooth, delay: 0.5 + i * 0.1 }}
                />
              );
            })}
          </svg>

          {/* Phase dots + labels */}
          {phases.map((phase, i) => {
            const layout = layouts[i];
            const isActive = active === i;

            return (
              <div key={phase.num}>
                {/* Dot */}
                <motion.div
                  className="absolute rounded-full border-2 border-foreground z-10"
                  style={{
                    ...layout.dotStyle,
                    backgroundColor: phase.bg,
                    width: isActive ? 20 : 14,
                    height: isActive ? 20 : 14,
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ ...smooth, delay: 0.3 + i * 0.1 }}
                />

                {/* Label block */}
                <motion.div
                  className="absolute z-5"
                  style={{ ...layout.labelStyle, position: "absolute" }}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ ...smooth, delay: 0.4 + i * 0.1 }}
                >
                  {/* Num + Title */}
                  <div
                    className="flex items-baseline gap-2"
                    style={{ justifyContent: layout.justify }}
                  >
                    <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                      {phase.num}
                    </span>
                    <span className="font-display text-xl font-semibold text-foreground">
                      {phase.title}
                    </span>
                  </div>

                  {/* Subtitle */}
                  <p
                    className="text-xs text-muted-foreground mt-1 leading-snug"
                    style={{ textAlign: layout.textAlign }}
                  >
                    {phase.subtitle}
                  </p>

                  {/* Tags */}
                  <div
                    className="flex flex-wrap gap-1 mt-2"
                    style={{ justifyContent: layout.justify }}
                  >
                    {phase.methods.map((m) => (
                      <span
                        key={m}
                        className="font-mono text-[8px] tracking-[0.08em] uppercase px-1.5 py-0.5 border border-border text-muted-foreground whitespace-nowrap"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  {/* Hover: description */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={smoothFast}
                        className="overflow-hidden"
                      >
                        <p
                          className="text-sm leading-relaxed text-muted-foreground mt-2"
                          style={{ textAlign: layout.textAlign }}
                        >
                          {phase.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden border-t border-border mt-40 px-6">
        {phases.map((phase, i) => (
          <MobilePhase
            key={phase.num}
            phase={phase}
            index={i}
            active={active === i}
            onTap={() => setActive(active === i ? null : i)}
          />
        ))}
      </div>

      {/* Bottom quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...smooth, duration: 1 }}
        className="absolute bottom-12 left-0 right-0 text-center"
      >
        <p className="font-display text-2xl md:text-3xl italic text-foreground/80 max-w-2xl mx-auto">
          "Brief-making at a high level is where
          <br />
          the most expensive decisions get made."
        </p>
      </motion.div>
    </section>
  );
}
