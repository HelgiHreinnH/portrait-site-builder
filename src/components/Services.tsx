import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const smooth = { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const };

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

function ServiceCard({ service, index: i, active, setActive, compact = false }: {
  service: typeof services[number]; index: number; active: number | null; setActive: (v: number | null) => void; compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ ...smooth, delay: i * 0.08 }}
      onHoverStart={() => setActive(i)}
      onHoverEnd={() => setActive(null)}
      className="relative group cursor-default flex flex-col"
    >
      {/* Number outside the frame — with a horizontal rule */}
      <div className="flex items-end gap-3 mb-3">
        <motion.span
          className="font-display text-foreground leading-none"
          style={{ fontWeight: 700, fontSize: "clamp(36px, 4vw, 48px)" }}
          animate={{ opacity: active === i ? 0.3 : 0.1 }}
          transition={{ duration: 0.3 }}
        >
          {service.number}
        </motion.span>
        <div className="flex-1 h-px bg-border mb-2" />
      </div>

      {/* Card */}
      <div className="relative rounded-2xl overflow-hidden border border-border bg-background flex-1">
        <div className={`p-5 md:p-6 flex flex-col h-full ${compact ? 'min-h-[200px]' : 'min-h-[280px]'}`}>
          <div className="mb-2">
            <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              {service.discipline}
            </span>
          </div>
          <motion.h3
            className="font-display text-foreground tracking-tight leading-tight mb-3 text-lg md:text-xl font-bold"
            animate={{ y: active === i ? -4 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {service.title}
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: active === i ? 1 : 0, height: active === i ? "auto" : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">{service.description}</p>
          </motion.div>
          <div className="flex flex-wrap gap-2 mt-auto">
            {service.tags.map((tag) => (
              <motion.span
                key={tag}
                animate={{ opacity: active === i ? 1 : 0.4 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-[9px] tracking-wider uppercase rounded-full px-2.5 py-1 bg-foreground/[0.08] text-foreground"
              >
                {tag}
              </motion.span>
            ))}
          </div>
          <div className="flex justify-end mt-3">
            <motion.div
              animate={{ rotate: active === i ? 0 : 45, opacity: active === i ? 1 : 0.15 }}
              transition={{ duration: 0.3 }}
              className="text-foreground"
            >
              <ArrowUpRight size={18} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative min-h-screen flex flex-col justify-center py-24 md:py-32 px-6 md:px-14 overflow-hidden"
    >
      {/* Section header */}
      <div className="mb-20 max-w-[1400px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display tracking-tight text-foreground mb-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95]">
            What I Do
          </h2>
          <p className="max-w-xl leading-relaxed text-muted-foreground text-lg">
            Working at the intersection of people, buildings, and technology. The same method applies regardless of the medium.
          </p>
        </motion.div>
      </div>

      {/* 5 Column Card Grid */}
      <div className="max-w-[1400px] mx-auto w-full space-y-6 lg:space-y-8">
        {/* Row 1: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {services.slice(0, 3).map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} active={active} setActive={setActive} />
          ))}
        </div>
        {/* Row 2: 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {services.slice(3).map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i + 3} active={active} setActive={setActive} compact />
          ))}
        </div>
      </div>

      {/* Bottom note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 flex items-center gap-4 max-w-[1400px] mx-auto w-full"
      >
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
        <span className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
          People · Buildings · Technology
        </span>
      </motion.div>
    </section>
  );
}
