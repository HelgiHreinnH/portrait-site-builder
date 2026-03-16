import { motion } from "framer-motion";

const smooth = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

const phases = [
  {
    num: "01",
    title: "Understand the real problem before solving it",
    label: "Analyse",
    description:
      "Workshops, user research, stakeholder mapping, data, and observation. The goal is clarity — not a finished product. Output: an analytical brief that frames the problem and the opportunity.",
    methods: ["User Research", "Stakeholder Mapping", "Data Collection", "Workshops"],
    bg: "#D5DEF4",
  },
  {
    num: "02",
    title: "Turn findings into a clear direction",
    label: "Strategise",
    description:
      "Translate findings into priorities, a framework, or a shared understanding of what to build and why. This requires working across disciplines — talking to managers, sociologists, developers, and users in a shared language.",
    methods: ["Strategic Brief", "Framework Design", "Cross-discipline Alignment", "Prioritisation"],
    bg: "#B8C9EE",
  },
  {
    num: "03",
    title: "Give the strategy a communicable form",
    label: "Design",
    description:
      "Produce something concrete — a spatial concept, a product interface, a design brief, a wireframe, a prototype. The output is designed to communicate intent clearly enough to be tested and reacted to.",
    methods: ["Design Brief", "Wireframing", "Prototyping", "Spatial Concept"],
    bg: "#DCE8E6",
  },
  {
    num: "04",
    title: "Follow through until it exists in reality",
    label: "Deliver",
    description:
      "Ensure what was designed actually comes to life as intended. From design manuals to built environments, from prototypes to launched products.",
    methods: ["Project Management", "Quality Assurance", "Handover", "Implementation"],
    bg: "#C5D5EC",
  },
];

function PhaseBlock({ phase, index }: { phase: (typeof phases)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...smooth, delay: index * 0.08 }}
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
        <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
          {phase.title}
        </h3>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-6 max-w-xl">
          {phase.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {phase.methods.map((m) => (
            <span
              key={m}
              className="font-mono text-[11px] tracking-[0.1em] uppercase px-3 py-1.5 border border-border text-muted-foreground"
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
    <section id="methodology" className="min-h-screen flex flex-col justify-center py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smooth }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] text-foreground"
          >
            How I Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smooth, delay: 0.1 }}
            className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl"
          >
            The same four steps apply to every project — whether the problem is spatial, organisational, or digital. The first three phases typically produce briefs. That is where the most expensive mistakes get prevented.
          </motion.p>
        </div>

        {/* Phases */}
        {phases.map((phase, i) => (
          <PhaseBlock key={phase.num} phase={phase} index={i} />
        ))}

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...smooth, duration: 1 }}
          className="mt-20 text-center"
        >
          <p className="font-display text-3xl md:text-4xl italic text-foreground/80 max-w-2xl mx-auto">
            "Brief-making at a high level is where
            <br />
            the most expensive decisions get made."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
