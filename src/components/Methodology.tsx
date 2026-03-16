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
    angle: 270, // top
  },
  {
    num: "02",
    title: "Strategise",
    subtitle: "Turn findings into a clear direction",
    description:
      "Translate findings into priorities, a framework, or a shared understanding of what to build and why.",
    methods: ["Strategic Brief", "Framework Design", "Cross-discipline Alignment", "Prioritisation"],
    bg: "#B8C9EE",
    angle: 0, // right
  },
  {
    num: "03",
    title: "Design",
    subtitle: "Give the strategy a communicable form",
    description:
      "Produce something concrete — a spatial concept, a product interface, a design brief, a wireframe, a prototype.",
    methods: ["Design Brief", "Wireframing", "Prototyping", "Spatial Concept"],
    bg: "#DCE8E6",
    angle: 90, // bottom
  },
  {
    num: "04",
    title: "Deliver",
    subtitle: "Follow through until it exists in reality",
    description:
      "Ensure what was designed actually comes to life as intended. From prototypes to launched products.",
    methods: ["Project Management", "Quality Assurance", "Handover", "Implementation"],
    bg: "#C5D5EC",
    angle: 180, // left
  },
];

// Position config for each dot: where the label block sits relative to the dot
const labelPositions: Record<number, { 
  align: string; 
  offsetX: number; 
  offsetY: number;
  textAlign: "left" | "right" | "center";
  anchorX: string;
  anchorY: string;
}> = {
  270: { align: "top", offsetX: 0, offsetY: -24, textAlign: "center", anchorX: "-50%", anchorY: "-100%" },
  0:   { align: "right", offsetX: 24, offsetY: 0, textAlign: "left", anchorX: "0%", anchorY: "-50%" },
  90:  { align: "bottom", offsetX: 0, offsetY: 24, textAlign: "center", anchorX: "-50%", anchorY: "0%" },
  180: { align: "left", offsetX: -24, offsetY: 0, textAlign: "right", anchorX: "-100%", anchorY: "-50%" },
};

function getDotPosition(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

function PhaseNode({
  phase,
  index,
  radius,
  active,
  onHover,
  onLeave,
}: {
  phase: (typeof phases)[0];
  index: number;
  radius: number;
  active: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const pos = getDotPosition(phase.angle, radius);
  const lp = labelPositions[phase.angle];

  return (
    <motion.g
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ ...smooth, delay: index * 0.12 }}
    >
      {/* Dot */}
      <motion.circle
        cx={pos.x}
        cy={pos.y}
        r={active ? 10 : 7}
        fill={phase.bg}
        stroke="hsl(220, 40%, 13%)"
        strokeWidth={2}
        style={{ cursor: "pointer" }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        transition={{ duration: 0.3 }}
      />

      {/* Label block — positioned via foreignObject */}
      <foreignObject
        x={pos.x + lp.offsetX}
        y={pos.y + lp.offsetY}
        width={280}
        height={300}
        style={{
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <div
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          style={{
            transform: `translate(${lp.anchorX}, ${lp.anchorY})`,
            textAlign: lp.textAlign,
            pointerEvents: "auto",
            cursor: "default",
            width: 260,
          }}
        >
          {/* Number + Title */}
          <div className="flex items-baseline gap-2" style={{ justifyContent: lp.textAlign === "center" ? "center" : lp.textAlign === "right" ? "flex-end" : "flex-start" }}>
            <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
              {phase.num}
            </span>
            <span
              className="font-display text-lg md:text-xl font-semibold text-foreground"
            >
              {phase.title}
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-xs text-muted-foreground mt-1 leading-snug">
            {phase.subtitle}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-2" style={{ justifyContent: lp.textAlign === "center" ? "center" : lp.textAlign === "right" ? "flex-end" : "flex-start" }}>
            {phase.methods.map((m) => (
              <span
                key={m}
                className="font-mono text-[8px] tracking-[0.1em] uppercase px-1.5 py-0.5 border border-border text-muted-foreground"
              >
                {m}
              </span>
            ))}
          </div>

          {/* Hover description */}
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={smoothFast}
                className="overflow-hidden"
              >
                <p className="text-sm leading-relaxed text-muted-foreground mt-2">
                  {phase.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </foreignObject>
    </motion.g>
  );
}

// Mobile version — stacked
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
      <div className="relative flex items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
            {phase.num}
          </span>
          <h3 className="font-display text-lg font-semibold text-foreground mt-1">
            {phase.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{phase.subtitle}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mt-2 relative">
        {phase.methods.map((m) => (
          <span key={m} className="font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-1 border border-border text-muted-foreground">
            {m}
          </span>
        ))}
      </div>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
            className="overflow-hidden relative"
          >
            <p className="text-sm leading-relaxed text-muted-foreground mt-3">
              {phase.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Methodology() {
  const [active, setActive] = useState<number | null>(null);
  const radius = 140;
  const padding = 180; // space for labels outside the circle
  const svgSize = (radius + padding) * 2;
  const center = svgSize / 2;

  return (
    <section id="methodology" className="min-h-screen relative py-16 md:py-24">
      {/* Container 1: Header — top left */}
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

      {/* Container 2: Diagram — centered */}
      <div className="hidden md:flex items-center justify-center min-h-screen w-full">
        <svg
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="w-full max-w-[700px]"
          style={{ overflow: "visible" }}
        >
          <g transform={`translate(${center}, ${center})`}>
            {/* Circle ring */}
            <motion.circle
              cx={0}
              cy={0}
              r={radius}
              fill="none"
              stroke="hsl(0, 0%, 92%)"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ ...smooth, duration: 1.2 }}
            />

            {/* Connection lines between dots */}
            {phases.map((phase, i) => {
              const next = phases[(i + 1) % phases.length];
              const p1 = getDotPosition(phase.angle, radius);
              const p2 = getDotPosition(next.angle, radius);
              return (
                <motion.line
                  key={`line-${i}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="hsl(0, 0%, 92%)"
                  strokeWidth={0.5}
                  strokeDasharray="4 4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.5 }}
                  viewport={{ once: true }}
                  transition={{ ...smooth, delay: 0.4 + i * 0.1 }}
                />
              );
            })}

            {/* Phase nodes */}
            {phases.map((phase, i) => (
              <PhaseNode
                key={phase.num}
                phase={phase}
                index={i}
                radius={radius}
                active={active === i}
                onHover={() => setActive(i)}
                onLeave={() => setActive(null)}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Mobile: stacked */}
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
