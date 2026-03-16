import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const smooth = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };
const smoothFast = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

const services = [
  {
    number: "01",
    title: "Workplace Strategy",
    discipline: "People + Buildings",
    tags: ["Analysis", "Strategy", "Design Brief"],
    description:
      "From analysis to design brief. Activity-based environments, employee experience, and spatial strategy grounded in how people actually use space.",
    accent: "#D5DEF4",
  },
  {
    number: "02",
    title: "Digital Product Development",
    discipline: "People + Technology",
    tags: ["UX Research", "Product Strategy", "UI/UX"],
    description:
      "User research, product strategy, and interface design. From user insight to working prototype — applying the same analytical method to digital tools.",
    accent: "#B8C9EE",
  },
  {
    number: "03",
    title: "Full-Scope Projects",
    discipline: "All Three Fields",
    tags: ["End-to-End", "Brief to Delivery", "Cross-discipline"],
    description:
      "End-to-end from brief to delivery. For teams that need someone who understands the whole picture — people, buildings, and technology together.",
    accent: "#DCE8E6",
  },
  {
    number: "04",
    title: "Innovation & PropTech",
    discipline: "Buildings + Technology",
    tags: ["PropTech", "Data Tools", "AI"],
    description:
      "Building tools that connect spatial design with data. Occupancy analytics, AR tools, and platforms that make better design decisions possible.",
    accent: "#C5D5EC",
  },
  {
    number: "05",
    title: "Strategic Advisory",
    discipline: "Knowledge Transfer",
    tags: ["Workshops", "Briefs", "Frameworks"],
    description:
      "Analytical, strategic, and design briefs for teams who need clarity before committing to a direction. The first three phases are where the most expensive mistakes get prevented.",
    accent: "#D5DEF4",
  },
];

function ServiceColumn({
  service,
  index,
  active,
  onHover,
  onLeave,
}: {
  service: (typeof services)[0];
  index: number;
  active: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ ...smooth, delay: index * 0.06 }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      className="relative flex flex-col cursor-default border-r border-border last:border-r-0 px-5 py-6 min-h-0"
    >
      {/* Hover accent */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 0.25 : 0 }}
        style={{ background: service.accent }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Content */}
      <div className="relative flex flex-col h-full">
        {/* Number */}
        <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground mb-2">
          {service.number}
        </span>

        {/* Title */}
        <motion.h3
          animate={{ y: active ? -2 : 0 }}
          transition={smoothFast}
          className="font-display text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2 leading-tight"
        >
          {service.title}
        </motion.h3>

        {/* Discipline */}
        <p className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground/60 mb-4">
          {service.discipline}
        </p>

        {/* Expanding description */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
              className="overflow-hidden"
            >
              <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-1 border border-border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Arrow at bottom */}
        <div className="mt-auto pt-4">
          <motion.div
            animate={{
              x: active ? 3 : 0,
              y: active ? -3 : 0,
            }}
            transition={smoothFast}
          >
            <ArrowUpRight size={18} className="text-muted-foreground" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="services" className="min-h-screen flex flex-col justify-center py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
        {/* Section header */}
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smooth, duration: 0.8 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] text-foreground"
          >
            What I Do
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smooth, duration: 0.8, delay: 0.1 }}
            className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl"
          >
            Working at the intersection of people, buildings, and technology. The same method applies regardless of the medium.
          </motion.p>
        </div>

        {/* Desktop: 5 columns */}
        <div className="hidden md:grid grid-cols-5 border-t border-l border-border">
          {services.map((service, i) => (
            <ServiceColumn
              key={service.number}
              service={service}
              index={i}
              active={active === i}
              onHover={() => setActive(i)}
              onLeave={() => setActive(null)}
            />
          ))}
        </div>

        {/* Mobile: stacked rows */}
        <div className="md:hidden border-t border-border">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...smooth, delay: i * 0.05 }}
              onTap={() => setActive(active === i ? null : i)}
              className="relative border-b border-border py-5 px-1 cursor-pointer"
            >
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: active === i ? 0.25 : 0 }}
                style={{ background: service.accent }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                    {service.number}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-foreground mt-1">
                    {service.title}
                  </h3>
                </div>
                <ArrowUpRight size={16} className="text-muted-foreground shrink-0" />
              </div>
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                    className="overflow-hidden relative"
                  >
                    <p className="text-sm leading-relaxed text-muted-foreground mt-3">
                      {service.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-6 flex justify-between items-center">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground/50">
            People · Buildings · Technology
          </span>
        </div>
      </div>
    </section>
  );
}
