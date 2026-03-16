import { motion } from "framer-motion";

const phases = [
  {
    num: "01",
    title: "Behavioral Intelligence Gathering",
    label: "Observe",
    description:
      "Ethnographic observation and behavioral mapping combined with quantitative data collection via occupancy sensors and usage analytics.",
    methods: ["Ethnographic Observation", "Sensor Data", "Behavioral Mapping", "Cultural Analysis"],
    bg: "#D5DEF4",
  },
  {
    num: "02",
    title: "Strategic Behavioral Design",
    label: "Design",
    description:
      "Evidence-based spatial intervention design with cross-functional collaboration. Integration of behavioral psychology principles with architectural solutions.",
    methods: ["Spatial Intervention", "Behavioral Psychology", "Iterative Testing", "Co-design"],
    bg: "#B8C9EE",
  },
  {
    num: "03",
    title: "Impact Evaluation & Learning",
    label: "Measure",
    description:
      "Post-occupancy behavioral assessment and documentation of behavioral change outcomes. Continuous optimization based on observed patterns.",
    methods: ["Post-occupancy Eval", "Behavioral Metrics", "Continuous Optimization", "Knowledge Transfer"],
    bg: "#C5D5EC",
  },
];

function PhaseBlock({ phase }: { phase: (typeof phases)[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-12 py-12 border-b border-border"
    >
      {/* Phase badge + giant number */}
      <div className="flex md:flex-col items-start gap-4">
        <span
          className="inline-block font-mono text-[11px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
          style={{ background: phase.bg }}
        >
          {phase.label}
        </span>
        <span className="font-display text-6xl md:text-8xl font-bold text-foreground/5 leading-none">
          {phase.num}
        </span>
      </div>

      {/* Content */}
      <div>
        <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-3">
          {phase.title}
        </h3>
        <p className="text-[15px] leading-relaxed text-muted-foreground mb-6 max-w-xl">
          {phase.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {phase.methods.map((m) => (
            <span
              key={m}
              className="font-mono text-[10px] tracking-[0.1em] uppercase px-3 py-1 border border-border text-muted-foreground"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Methodology() {
  return (
    <section id="methodology" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-[-0.02em] text-foreground">
            Three-Phase Framework
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground max-w-lg">
            From observation to transformation — a systematic approach that turns complex human behavior into actionable design.
          </p>
        </div>

        {/* Phases */}
        {phases.map((phase) => (
          <PhaseBlock key={phase.num} phase={phase} />
        ))}

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-20 text-center"
        >
          <p className="font-display text-2xl md:text-3xl italic text-foreground/80 max-w-2xl mx-auto">
            "Environments that don't fight human nature —
            <br />
            they work with it."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
